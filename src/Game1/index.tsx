import { useEffect, useState } from 'react';

import Game from './Game';
import BasicList from './List';
import { genGameKey } from './utils';
import { Button } from '@mui/material';

export type $board = {[key: string]: {index: number, time: number, words: string, qualities: string, question?: string, questionIndex: number}};
export type $gameState = {[key: string]: {averageTime: number, board: $board}};

function buildGameState(): $gameState {
  return Object.keys(localStorage).reduce((acc, key) => {
    if(/[0-9]+-[0-9]+/.test(key)) {
      const parsed = JSON.parse(localStorage[key]);
      return {
        ...acc,
        [key]: parsed
      }
    }
    return acc;  
  }, {})
}



function Game1() {
  const [mode, setMode] = useState<'game' | 'list'>('list');
  const [dimensions, setDimensions] = useState<number>(3);
  const [currentGame, setCurrentGame] = useState<[number, number]>([0, 0]);
  const [gameState, setGameState] = useState<$gameState>(buildGameState());
  const getGameKey = () => genGameKey(currentGame[0], currentGame[1]);
  useEffect(() => {
    if(localStorage.getItem('version') !== '1') {
      localStorage.clear();
      localStorage.setItem('version', '1');
    }
  })
  function onWin(averageTime: number) {
    const nextGameState = {
      ...gameState,
      [getGameKey()]: {
        ...((gameState[getGameKey()] || {})),
        averageTime,
      }
    }

    setGameState(nextGameState);
    setMode("list");
    window.localStorage.setItem(getGameKey(), JSON.stringify(nextGameState[getGameKey()]));
  }
  function saveInGameState(inGameState: $board) {
    const nextGameState = {
      ...gameState,
      [getGameKey()]: {
          ...(gameState[getGameKey()] || {}),
          board: inGameState
      }
    }
    setGameState(nextGameState);
    window.localStorage.setItem(getGameKey(), JSON.stringify(nextGameState[getGameKey()]));
  }
  if(mode === 'game') {
    const currentBoard = (gameState[getGameKey()] || {}).board;
    return <div>
      <Button onClick={()=>setMode("list")}>List</Button>
      <Game inGameState={currentBoard} saveInGameState={saveInGameState} onWin={onWin} dimensions={dimensions} />
    </div>
  }
  return <BasicList gameState={gameState} setCurrentGame={setCurrentGame} setMode={setMode} setDimensions={setDimensions}/>
}

export default Game1;
