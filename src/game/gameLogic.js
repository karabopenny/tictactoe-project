// Pure game logic — no React. Easy to test, easy to reason about.

export const EMPTY_BOARD = Array(9).fill(null);

export const PLAYER_X = 'X';
export const PLAYER_O = 'O';

// All 8 winning lines (rows, cols, diagonals)
export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Returns { winner: 'X'|'O'|null, line: number[]|null }
 */
export function calculateWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
}

export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

export function isDraw(board) {
  return !calculateWinner(board).winner && isBoardFull(board);
}

export function getAvailableMoves(board) {
  const moves = [];
  board.forEach((cell, i) => {
    if (cell === null) moves.push(i);
  });
  return moves;
}

export function switchPlayer(player) {
  return player === PLAYER_X ? PLAYER_O : PLAYER_X;
}