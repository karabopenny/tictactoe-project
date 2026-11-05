import React from 'react';

function Status({ winner, isDraw, currentPlayer, vsComputer }) {
  let text = `Next Player: ${currentPlayer}`;
  let cls = 'status';

  if (winner) {
    text = `Winner: ${winner}`;
    cls += ' win';
  } else if (isDraw) {
    text = 'Draw!';
    cls += ' draw';
  } else if (vsComputer && currentPlayer === 'O') {
    text = 'Computer is thinking…';
  }

  return (
    <div className={cls} role="status" aria-live="polite">
      {text}
    </div>
  );
}

export default React.memo(Status);