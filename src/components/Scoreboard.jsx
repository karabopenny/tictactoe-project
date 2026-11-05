import React from 'react';

function Scoreboard({ scores, onReset }) {
  return (
    <div>
      <div className="scoreboard">
        <div className="score-card x">
          <div className="label">X Wins</div>
          <div className="value">{scores.X}</div>
        </div>
        <div className="score-card d">
          <div className="label">Draws</div>
          <div className="value">{scores.draws}</div>
        </div>
        <div className="score-card o">
          <div className="label">O Wins</div>
          <div className="value">{scores.O}</div>
        </div>
      </div>
      <button className="btn" onClick={onReset} style={{ marginTop: 8 }}>
        Reset Scores
      </button>
    </div>
  );
}

export default React.memo(Scoreboard);