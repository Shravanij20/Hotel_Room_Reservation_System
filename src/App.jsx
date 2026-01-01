import { useState, useMemo } from 'react';
import { initializeRooms, bookOptimalRooms, generateRandomOccupancy } from './utils/roomUtils';
import RoomGrid from './components/RoomGrid';
import ControlPanel from './components/ControlPanel';
import './App.css';

function App() {
  const [rooms, setRooms] = useState(() => initializeRooms());
  const [numRoomsInput, setNumRoomsInput] = useState('');
  const [totalTravelTime, setTotalTravelTime] = useState(0);

  const handleBook = () => {
    const numRooms = parseInt(numRoomsInput);
    
    if (isNaN(numRooms) || numRooms < 1) {
      alert('Please enter a valid number of rooms (1-5)');
      return;
    }
    
    if (numRooms > 5) {
      alert('Maximum 5 rooms can be booked at a time!');
      return;
    }
    
    const availableCount = rooms.filter(r => !r.booked).length;
    if (availableCount < numRooms) {
      alert(`Only ${availableCount} room(s) available. Cannot book ${numRooms} rooms.`);
      return;
    }
    
    const roomsCopy = rooms.map(r => ({ ...r }));
    const selectedRooms = bookOptimalRooms(roomsCopy, numRooms);
    
    if (selectedRooms.length === 0) {
      alert('No suitable rooms found!');
      return;
    }
    
    // Mark selected rooms as booked
    const updatedRooms = rooms.map(room => {
      const selected = selectedRooms.find(sr => sr.id === room.id);
      return selected ? { ...room, booked: true } : room;
    });
    
    // Calculate and display travel time
    const travelTime = calculateTotalTravelTime(selectedRooms);
    setTotalTravelTime(travelTime);
    
    setRooms(updatedRooms);
    setNumRoomsInput('');
    
    // Show booking confirmation
    const roomIds = selectedRooms.map(r => r.id).join(', ');
    alert(`Booked ${numRooms} room(s): ${roomIds}\nTotal Travel Time: ${travelTime} minutes`);
  };

  const calculateTotalTravelTime = (selectedRooms) => {
    if (selectedRooms.length <= 1) return 0;
    
    const sorted = [...selectedRooms].sort((a, b) => {
      if (a.floor !== b.floor) return a.floor - b.floor;
      return a.roomNumber - b.roomNumber;
    });
    
    let totalTime = 0;
    for (let i = 1; i < sorted.length; i++) {
      const floorDiff = Math.abs(sorted[i].floor - sorted[i - 1].floor);
      const roomDiff = Math.abs(sorted[i].roomNumber - sorted[i - 1].roomNumber);
      totalTime += floorDiff * 2 + roomDiff * 1;
    }
    
    return totalTime;
  };

  const handleReset = () => {
    setRooms(initializeRooms());
    setNumRoomsInput('');
    setTotalTravelTime(0);
  };

  const handleRandom = () => {
    const roomsCopy = rooms.map(r => ({ ...r }));
    const updated = generateRandomOccupancy(roomsCopy, 0.4);
    setRooms(updated);
    setNumRoomsInput('');
    setTotalTravelTime(0);
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

  return (
    <div className="app">
      <h1 className="app-title">Hotel Room Reservation System</h1>
      <div className="stats">
        <span>Total Rooms: {rooms.length}</span>
        <span>Available: {availableCount}</span>
        <span>Booked: {bookedCount}</span>
        {totalTravelTime > 0 && <span>Travel Time: {totalTravelTime} min</span>}
      </div>
      
      <ControlPanel
        numRoomsInput={numRoomsInput}
        setNumRoomsInput={setNumRoomsInput}
        onBook={handleBook}
        onReset={handleReset}
        onRandom={handleRandom}
      />
      
      <RoomGrid roomsByFloor={roomsByFloor} />
    </div>
  );
}

export default App;

