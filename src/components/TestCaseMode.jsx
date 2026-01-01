import './TestCaseMode.css';

function TestCaseMode({ isTestMode, onToggle, onLoadTest }) {
  return (
    <div className="test-case-mode">
      <label className="test-toggle">
        <input
          type="checkbox"
          checked={isTestMode}
          onChange={onToggle}
        />
        <span>📄 Show PDF Test Case</span>
      </label>
      
      {isTestMode && (
        <div className="test-case-info">
          <div className="test-case-description">
            <p><strong>Test Case from PDF:</strong></p>
            <div className="test-rooms">
              <div><strong>Floor 1:</strong> 101, 102, 105, 106</div>
              <div><strong>Floor 2:</strong> 201, 202, 203, 210</div>
              <div><strong>Floor 3:</strong> 301, 302</div>
            </div>
            <p className="test-instruction">
              <strong>Expected:</strong> When booking 4 rooms, should select 101, 102, 105, 106 (same floor, minimum travel time).
            </p>
            <button onClick={onLoadTest} className="btn-load-test">
              Load Test Case
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestCaseMode;

