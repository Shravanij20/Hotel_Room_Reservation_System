import './BookingResults.css';

function BookingResults({ bookingResult }) {
  if (!bookingResult || !bookingResult.selectedRooms || bookingResult.selectedRooms.length === 0) {
    return null;
  }

  const { selectedRooms, travelTime, combinationsEvaluated, nextBestTravelTime } = bookingResult;

  return (
    <div className="booking-results">
      <div className="results-header">
        <h3>✅ Booking Confirmed</h3>
      </div>
      
      <div className="results-main">
        <div className="selected-rooms">
          <strong>Selected Rooms:</strong>
          <span className="room-list">
            {selectedRooms.map((room, idx) => (
              <span key={room.id} className="room-badge">
                {room.id}{idx < selectedRooms.length - 1 ? ', ' : ''}
              </span>
            ))}
          </span>
        </div>
        
        <div className="travel-time-metrics">
          <div className="metric-item">
            <span className="metric-label">🕒 Total Travel Time:</span>
            <span className="metric-value">{travelTime.total} minutes</span>
          </div>
          
          <div className="breakdown">
            <div className="breakdown-item">
              <span className="breakdown-label">Horizontal:</span>
              <span className="breakdown-value">{travelTime.horizontal} minutes</span>
            </div>
            <div className="breakdown-item">
              <span className="breakdown-label">Vertical:</span>
              <span className="breakdown-value">{travelTime.vertical} minutes</span>
            </div>
          </div>
        </div>
      </div>
      
      <details className="explanation-section">
        <summary className="explanation-toggle">
          <strong>Why were these rooms selected?</strong>
        </summary>
        <div className="explanation-content">
          <p>
            <strong>Evaluated {combinationsEvaluated} possible combinations.</strong>
          </p>
          <p>
            Selected combination has the <strong>minimum travel time ({travelTime.total} minutes)</strong>.
          </p>
          {nextBestTravelTime !== travelTime.total && (
            <p>
              Next best alternative had <strong>{nextBestTravelTime} minutes</strong>.
            </p>
          )}
          {nextBestTravelTime === travelTime.total && (
            <p>
              All optimal combinations have the same travel time. Selected the combination with lowest floor numbers and room numbers.
            </p>
          )}
          <div className="explanation-details">
            <p><strong>Selection Criteria:</strong></p>
            <ul>
              <li>✅ Same floor priority (minimizes vertical travel)</li>
              <li>✅ Minimum total travel time (horizontal + vertical)</li>
              <li>✅ Deterministic tie-breaking (lower floors, then lower rooms)</li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}

export default BookingResults;

