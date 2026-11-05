import React, { useReducer, useEffect, useCallback } from 'react';
import './App.css';
import Board from './components/Board';
import Status from './components/Status';
import Scoreboard from './components/Scoreboard';
import { gameReducer, initialState } from './game/gameReducer';
import { isDraw } from './game/gameLogic';
import { getBestMove } from './game/ai';

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const currentBoard = state.history[state.currentStep];
  const draw = isDraw(currentBoard);

  const handleSquareClick = useCallback(
    (index) => {
      if (state.gameOver) return;
      if (state.vsComputer && state.currentPlayer === 'O') return;
      dispatch({ type: 'MAKE_MOVE', index, player: state.currentPlayer });
    },
    [state.gameOver, state.vsComputer, state.currentPlayer]
  );

  // AI turn
  useEffect(() => {
    if (!state.vsComputer) return;
    if (state.gameOver) return;
    if (state.currentPlayer !== 'O') return;

    const timer = setTimeout(() => {
      const move = getBestMove(currentBoard, 'O');
      if (move !== null && move !== undefined) {
        dispatch({ type: 'MAKE_MOVE', index: move, player: 'O' });
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [state.vsComputer, state.currentPlayer, state.gameOver, currentBoard]);

  return (
    <div className="app">
      <h1 className="title">TIC TAC TOE</h1>
      <p className="subtitle">React + useReducer</p>

      <label className="toggle">
        <input
          type="checkbox"
          checked={state.vsComputer}
          onChange={() => dispatch({ type: 'TOGGLE_VS_COMPUTER' })}
        />
        Play vs Computer (O)
      </label>

      <Status
        winner={state.winner}
        isDraw={draw}
        currentPlayer={state.currentPlayer}
        vsComputer={state.vsComputer}
      />

      <Board
        board={currentBoard}
        winningLine={state.winningLine}
        onSquareClick={handleSquareClick}
        disabled={state.gameOver}
      />

      <div className="controls">
        <button
          className="btn primary"
          onClick={() => dispatch({ type: 'RESET' })}
        >
          Restart
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: 'UNDO' })}
          disabled={state.currentStep === 0}
        >
          Undo
        </button>
      </div>

      <Scoreboard
        scores={state.scores}
        onReset={() => dispatch({ type: 'RESET_SCORES' })}
      />

      {state.moveHistory.length > 0 && (
        <div style={{ marginTop: 20, textAlign: 'left' }}>
          <p
            style={{
              fontSize: '0.8rem',
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 8,
            }}
          >
            Move History (click to time travel)
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              justifyContent: 'center',
            }}
          >
            <button
              className="btn"
              style={{ padding: '6px 10px', fontSize: '0.75rem' }}
              onClick={() => dispatch({ type: 'JUMP_TO', step: 0 })}
            >
              Start
            </button>
            {state.moveHistory.map((m, i) => (
              <button
                key={i}
                className="btn"
                style={{
                  padding: '6px 10px',
                  fontSize: '0.75rem',
                  background:
                    state.currentStep === i + 1 ? '#38bdf8' : undefined,
                  color: state.currentStep === i + 1 ? '#0f172a' : undefined,
                }}
                onClick={() => dispatch({ type: 'JUMP_TO', step: i + 1 })}
              >
                {i + 1}. {m.player} → {m.index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;