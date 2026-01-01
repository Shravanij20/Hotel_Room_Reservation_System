import { useState, useMemo } from 'react';
import { initializeRooms, bookOptimalRooms, generateRandomOccupancy, loadTestCase } from './utils/roomUtils';
import RoomGrid from './components/RoomGrid';
import ControlPanel from './components/ControlPanel';
import BookingResults from './components/BookingResults';
import TestCaseMode from './components/TestCaseMode';
import './App.css';

function App() {
  const [rooms, setRooms] = useState(() => initializeRooms());
  const [numRoomsInput, setNumRoomsInput] = useState('');
  const [bookingResult, setBookingResult] = useState(null);
  const [isTestMode, setIsTestMode] = useState(false);
  const [error, setError] = useState(null);

  const handleBook = () => {
    const numRooms = parseInt(numRoomsInput);
    
    // Edge case validation: Invalid input
    if (isNaN(numRooms) || numRooms < 1) {
      setError('Please enter a valid number of rooms (1-5)');
      setBookingResult(null);
      return;
    }
    
    if (numRooms > 5) {
      setError('Maximum 5 rooms can be booked at a time!');
      setBookingResult(null);
      return;
    }
    
    const availableCount = rooms.filter(r => !r.booked).length;
    if (availableCount < numRooms) {
      setError(`Only ${availableCount} room(s) available. Cannot book ${numRooms} rooms.`);
      setBookingResult(null);
      return;
    }
    
    setError(null);
    
    // Use the optimal booking algorithm
    const roomsCopy = rooms.map(r => ({ ...r }));
    const result = bookOptimalRooms(roomsCopy, numRooms);
    
    // Handle errors from booking function
    if (result.error) {
      setError(result.error);
      setBookingResult(null);
      return;
    }
    
    if (!result.selectedRooms || result.selectedRooms.length === 0) {
      setError('No suitable rooms found!');
      setBookingResult(null);
      return;
    }
    
    // Mark selected rooms as booked
    const updatedRooms = rooms.map(room => {
      const selected = result.selectedRooms.find(sr => sr.id === room.id);
      return selected ? { ...room, booked: true } : room;
    });
    
    setRooms(updatedRooms);
    setNumRoomsInput('');
    setBookingResult(result);
  };

  const handleReset = () => {
    setRooms(initializeRooms());
    setNumRoomsInput('');
    setBookingResult(null);
    setError(null);
    setIsTestMode(false);
  };

  const handleRandom = () => {
    const roomsCopy = rooms.map(r => ({ ...r }));
    const updated = generateRandomOccupancy(roomsCopy, 0.4);
    setRooms(updated);
    setNumRoomsInput('');
    setBookingResult(null);
    setError(null);
  };

  const handleLoadTest = () => {
    const testRooms = loadTestCase();
    setRooms(testRooms);
    setNumRoomsInput('');
    setBookingResult(null);
    setError(null);
  };

  // Organize rooms by floor for display
  const roomsByFloor = useMemo(() => {
    const byFloor = {};
    rooms.forEach(room => {
      if (!byFloor[room.floor]) {
        byFloor[room.floor] = [];
      }
      byFloor[room.floor].push(room);
    });
    
    // Sort rooms on each floor by room number
    Object.keys(byFloor).forEach(floor => {
      byFloor[floor].sort((a, b) => a.roomNumber - b.roomNumber);
    });
    
    return byFloor;
  }, [rooms]);

  const bookedCount = rooms.filter(r => r.booked).length;
  const availableCount = rooms.length - bookedCount;
  const canBook = availableCount > 0;

  return (
    <div className="app">
      <h1 className="app-title">Hotel Room Reservation System</h1>
      <div className="stats">
        <span>Total Rooms: {rooms.length}</span>
        <span>Available: {availableCount}</span>
        <span>Booked: {bookedCount}</span>
      </div>
      
      <TestCaseMode 
        isTestMode={isTestMode}
        onToggle={(e) => setIsTestMode(e.target.checked)}
        onLoadTest={handleLoadTest}
      />
      
      <ControlPanel
        numRoomsInput={numRoomsInput}
        setNumRoomsInput={setNumRoomsInput}
        onBook={handleBook}
        onReset={handleReset}
        onRandom={handleRandom}
        canBook={canBook}
      />
      
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}
      
      {bookingResult && (
        <BookingResults bookingResult={bookingResult} />
      )}
      
      <RoomGrid roomsByFloor={roomsByFloor} />
    </div>
  );
}

export default App;
