import './ControlPanel.css';

function ControlPanel({ numRoomsInput, setNumRoomsInput, onBook, onReset, onRandom }) {
  return (
    <div className="control-panel">
      <div className="input-group">
        <label htmlFor="numRooms">No of Rooms:</label>
        <input
          id="numRooms"
          type="number"
          min="1"
          max="5"
          value={numRoomsInput}
          onChange={(e) => setNumRoomsInput(e.target.value)}
          placeholder="Enter 1-5"
          className="rooms-input"
        />
      </div>
      <button onClick={onBook} className="btn btn-book">
        Book
      </button>
      <button onClick={onReset} className="btn btn-reset">
        Reset
      </button>
      <button onClick={onRandom} className="btn btn-random">
        Random
      </button>
    </div>
  );
}

export default ControlPanel;

