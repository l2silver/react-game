import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useState } from 'react';

import './App.css';

import Game from './Game';
import BasicList from './List';

export type $gameState = {[key: number]: {[key: number]: {averageTime: number}}};

function App() {
  const [mode, setMode] = useState<'game' | 'list'>('list');
  const [dimensions, setDimensions] = useState<number>(3);
  const [currentGame, setCurrentGame] = useState<[number, number]>([0, 0]);
  const [gameState, setGameState] = useState<$gameState>(JSON.parse(window.localStorage.getItem('gameState') || '{}'));
  
  if(mode === 'game') {
    return <Game onWin={(times)=>{
      const nextGameState = {
        ...gameState,
        [currentGame[0]]: {
          ...(gameState[currentGame[0]] || {}),
          [currentGame[1]]: {
            averageTime: times.reduce((a, b) => a + b, 0) / (times.length || 1),
          }
        }
      }
      setGameState(nextGameState);
      setMode("list");
      window.localStorage.setItem('gameState', JSON.stringify(nextGameState));
    }} dimensions={dimensions} />
  }
  return <BasicList gameState={gameState} setCurrentGame={setCurrentGame} setMode={setMode} setDimensions={setDimensions}/>
}

export default App;
