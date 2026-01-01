import './RoomGrid.css';

function RoomGrid({ roomsByFloor }) {
  const floors = Object.keys(roomsByFloor)
    .map(f => parseInt(f))
    .sort((a, b) => b - a); // Display top floor first

  return (
    <div className="room-grid-container">
      <div className="staircase-box">
        <div className="staircase-label">Stairs/Lift</div>
      </div>
      <div className="rooms-container">
        {floors.map(floor => (
          <div key={floor} className="floor-row">
            <div className="floor-label">Floor {floor}</div>
            <div className="rooms-row">
              {roomsByFloor[floor].map(room => (
                <div
                  key={room.id}
                  className={`room-cell ${room.booked ? 'booked' : 'available'}`}
                  title={`Room ${room.id} - Floor ${room.floor}, Room ${room.roomNumber}`}
                >
                  <div className="room-number">{room.id}</div>
                  {room.booked && <div className="booked-indicator">✓</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomGrid;

