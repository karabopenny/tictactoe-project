import {
  PLAYER_X,
  PLAYER_O,
  calculateWinner,
  getAvailableMoves,
} from './gameLogic';

/**
 * Minimax with alpha-beta pruning.
 * `aiPlayer` = the symbol the computer plays as.
 * Returns the best move index.
 */
export function getBestMove(board, aiPlayer, depthLimit = Infinity) {
  const humanPlayer = aiPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;

  function minimax(currentBoard, currentPlayer, depth, alpha, beta) {
    const { winner } = calculateWinner(currentBoard);

    if (winner === aiPlayer) return { score: 10 - depth };
    if (winner === humanPlayer) return { score: depth - 10 };
    if (getAvailableMoves(currentBoard).length === 0) return { score: 0 };
    if (depth >= depthLimit) return { score: 0 };

    const moves = getAvailableMoves(currentBoard);

    if (currentPlayer === aiPlayer) {
      let best = { score: -Infinity, index: null };
      for (const move of moves) {
        const next = currentBoard.slice();
        next[move] = currentPlayer;
        const { score } = minimax(next, humanPlayer, depth + 1, alpha, beta);
        if (score > best.score) best = { score, index: move };
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
      return best;
    } else {
      let best = { score: Infinity, index: null };
      for (const move of moves) {
        const next = currentBoard.slice();
        next[move] = currentPlayer;
        const { score } = minimax(next, aiPlayer, depth + 1, alpha, beta);
        if (score < best.score) best = { score, index: move };
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
      return best;
    }
  }

  // Easy mode = random move
  if (depthLimit === 0) {
    const moves = getAvailableMoves(board);
    return moves[Math.floor(Math.random() * moves.length)];
  }

  const result = minimax(board, aiPlayer, 0, -Infinity, Infinity);
  return result.index;
}