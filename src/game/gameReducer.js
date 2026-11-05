import {
  EMPTY_BOARD,
  PLAYER_X,
  calculateWinner,
  isBoardFull,
  switchPlayer,
} from './gameLogic';

export const initialState = {
  // History of board states — last entry is the current board
  history: [EMPTY_BOARD.slice()],
  // History of moves for time-travel display (each: { player, index })
  moveHistory: [],
  // Which history index we're currently viewing
  currentStep: 0,
  // Whose turn it is right now
  currentPlayer: PLAYER_X,
  // { winner, line } or nulls
  winner: null,
  winningLine: null,
  // Cumulative scores across games
  scores: { X: 0, O: 0, draws: 0 },
  // Set true when the current game is finished (win or draw)
  gameOver: false,
  // For score bookkeeping — make sure we only count a finished game once
  scoreCounted: false,
  // Whether the computer plays as O
  vsComputer: false,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { index, player } = action;
      const board = state.history[state.currentStep];

      // Guard: invalid move
      if (
        state.gameOver ||
        index < 0 ||
        index > 8 ||
        board[index] !== null
      ) {
        return state;
      }

      // If it's not this player's turn, ignore
      if (player !== state.currentPlayer) return state;

      const nextBoard = board.slice();
      nextBoard[index] = player;

      // Truncate any "future" history if user made a move after undoing
      const truncatedHistory = state.history.slice(0, state.currentStep + 1);
      const truncatedMoves = state.moveHistory.slice(0, state.currentStep);

      const newHistory = [...truncatedHistory, nextBoard];
      const newMoveHistory = [
        ...truncatedMoves,
        { player, index },
      ];

      const { winner, line } = calculateWinner(nextBoard);
      const draw = !winner && isBoardFull(nextBoard);

      let scores = state.scores;
      let scoreCounted = state.scoreCounted;

      // Count score once per finished game
      if ((winner || draw) && !state.scoreCounted) {
        if (winner === 'X') scores = { ...scores, X: scores.X + 1 };
        else if (winner === 'O') scores = { ...scores, O: scores.O + 1 };
        else if (draw) scores = { ...scores, draws: scores.draws + 1 };
        scoreCounted = true;
      }

      return {
        ...state,
        history: newHistory,
        moveHistory: newMoveHistory,
        currentStep: newHistory.length - 1,
        currentPlayer: winner || draw ? state.currentPlayer : switchPlayer(player),
        winner,
        winningLine: line,
        scores,
        scoreCounted,
        gameOver: Boolean(winner) || draw,
      };
    }

    case 'RESET': {
      return {
        ...state,
        history: [EMPTY_BOARD.slice()],
        moveHistory: [],
        currentStep: 0,
        currentPlayer: PLAYER_X,
        winner: null,
        winningLine: null,
        gameOver: false,
        scoreCounted: false,
      };
    }

    case 'RESET_SCORES': {
      return {
        ...state,
        scores: { X: 0, O: 0, draws: 0 },
      };
    }

    case 'UNDO': {
      if (state.currentStep === 0) return state;
      const prevStep = state.currentStep - 1;
      const prevBoard = state.history[prevStep];
      const { winner, line } = calculateWinner(prevBoard);

      return {
        ...state,
        currentStep: prevStep,
        currentPlayer: switchPlayer(state.currentPlayer),
        winner,
        winningLine: line,
        gameOver: false,
        scoreCounted: state.scoreCounted, // keep scores as-is
      };
    }

    case 'JUMP_TO': {
      const step = action.step;
      if (step < 0 || step >= state.history.length) return state;
      const board = state.history[step];
      const { winner, line } = calculateWinner(board);
      const draw = !winner && isBoardFull(board);
      // If we jump to a step, determine the next player from the move count
      const nextPlayer = step % 2 === 0 ? PLAYER_X : 'O';

      return {
        ...state,
        currentStep: step,
        currentPlayer: winner || draw ? state.currentPlayer : nextPlayer,
        winner,
        winningLine: line,
        gameOver: Boolean(winner) || draw,
        // If jumping back to before the game finished, we can allow more scoring
        scoreCounted: step < state.history.length - 1 ? state.scoreCounted : state.scoreCounted,
      };
    }

    case 'TOGGLE_VS_COMPUTER': {
      // Reset the board when switching modes to avoid weird states
      const vsComputer = !state.vsComputer;
      return {
        ...state,
        vsComputer,
        history: [EMPTY_BOARD.slice()],
        moveHistory: [],
        currentStep: 0,
        currentPlayer: PLAYER_X,
        winner: null,
        winningLine: null,
        gameOver: false,
        scoreCounted: false,
      };
    }

    default:
      return state;
  }
}