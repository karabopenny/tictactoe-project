# Tic Tac Toe

A responsive Tic Tac Toe game built with React and Vite, designed to be simple, smooth, and easy to use. The project uses a reducer-based state model to manage gameplay, scores, move history, and AI interactions in a clean and efficient way.

This project includes both local two-player mode and a single-player mode where the computer plays as O using an unbeatable minimax strategy.

## Features

- Full 3x3 Tic Tac Toe gameplay with X starting first
- Win and draw detection
- Prevention of illegal moves on filled squares
- Score tracking across multiple rounds
- Undo function for the previous move
- Move history with time-travel navigation
- Play against the computer
- Responsive layout for desktop and mobile devices
- Highlighted winning combination

## Custom Feature

One standout feature in this project is the move history and time-travel system. Players can jump back to any earlier move in the game and continue from that point, creating a more dynamic and interactive experience than a standard Tic Tac Toe app.

## Tech Stack

- React
- Vite
- JavaScript
- CSS

## Project Structure

```bash
tictactoe/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Square.jsx
│   │   ├── Status.jsx
│   │   └── Scoreboard.jsx
│   └── game/
│       ├── gameLogic.js
│       ├── gameReducer.js
│       └── ai.js
└── dist/
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

The app will run in the browser, usually at:

```bash
http://localhost:3000
```

### Build for production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Preview the production build

```bash
npm run preview
```

## How to Play

- In two-player mode, click any empty square to place your mark.
- X and O alternate turns automatically.
- A player wins by forming a row, column, or diagonal.
- If the board fills up without a winner, the game ends in a draw.
- Toggle the computer mode to play against the AI.
- Use Undo to reverse the latest move.
- Use the move history controls to revisit previous game states.
- Reset the board or scoreboard whenever needed.

## Game Logic and Architecture

The app uses a reducer to manage all game states in one place. This keeps the logic predictable and reduces errors that can happen when state is spread across many components.

The game logic is separated into pure helper functions, while the AI uses minimax with alpha-beta pruning to choose strong moves and make the computer opponent difficult to beat.

## Deployment

This project is a static React app and can be deployed to services such as:

- Vercel
- Netlify
- GitHub Pages

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## Troubleshooting

- If you see a missing script error, use `npm run dev` instead of `npm start`.
- If the page appears blank, check the browser console for errors.
- If dependencies are missing, run `npm install` again.
- If port 3000 is already in use, change the Vite configuration or use another port.

## Scripts

```bash
npm run dev
```
Starts the development server.

```bash
npm run build
```
Creates the production build.

```bash
npm run preview
```
Serves the built app locally.

## Summary

This project is a strong example of a clean React application that combines responsive UI design, reducer-based state management, and AI gameplay in a compact and well-structured game project.
