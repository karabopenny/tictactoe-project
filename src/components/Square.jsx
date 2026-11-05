import React from 'react';

function Square({ value, index, isWinning, isAvailable, onClick }) {
  const classes = ['square'];
  if (value === 'X') classes.push('x');
  if (value === 'O') classes.push('o');
  if (value) classes.push('filled');
  else classes.push('available');
  if (isWinning) classes.push('winning');

  return (
    <button
      type="button"
      className={classes.join(' ')}
      onClick={() => onClick(index)}
      disabled={Boolean(value)}
      aria-label={`Square ${index + 1}${value ? `, ${value}` : ', empty'}`}
    >
      {value}
    </button>
  );
}

export default React.memo(Square);