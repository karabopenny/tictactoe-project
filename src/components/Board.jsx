import React from 'react';
import Square from './Square';

function Board({ board, winningLine, onSquareClick, disabled }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((value, i) => (
        <Square
          key={i}
          index={i}
          value={value}
          isWinning={winningLine?.includes(i)}
          isAvailable={!value && !disabled}
          onClick={onSquareClick}
        />
      ))}
    </div>
  );
}

export default React.memo(Board);