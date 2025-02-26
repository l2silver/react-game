

import { useEffect, useState } from 'react';
import { nouns } from '../nouns';
import { getRandomIndex, getRandomItem, getXbyX, questions, shuffle } from './utils';
import RadioG from '../Radio';

import FullScreenDialog from './Dialog';
import { $board, $gameState } from './';
import { textArray } from '../text';

const dicKey = (i: number, j: number)=>`${i}-${j}`;

function Game({dimensions, onWin, inGameState, saveInGameState}: {saveInGameState: (inGameState: $board)=>void, inGameState?: $board, dimensions: number, onWin: (averageTime: number) => void}) {
  const [randomItem] = useState(getRandomItem(nouns));
  const [ randomItems ] = useState(shuffle(Array.from({ length: 9 }).map(() => getRandomItem(nouns)).concat(randomItem)));
  const [open, setOpen] = useState(false);
  const [indexes, setIndexes] = useState([-1, -1]);
  useEffect(()=>{
    if(!inGameState){
        
        const nextInGameState = getXbyX(dimensions, ()=>{
            const randomIndex = getRandomIndex(textArray)
            return {index: randomIndex, time: -1, words: '', qualities: '', questionIndex: getRandomIndex(questions)}
        })
        saveInGameState(nextInGameState)
    }
  }, [])
  function onSuccess(timeDiff: number, words: string, qualities: string) {
    if(inGameState){
        saveInGameState({
            ...inGameState,
            [dicKey(indexes[0], indexes[1])]: {
                ...inGameState[dicKey(indexes[0], indexes[1])],
                time: timeDiff,
                words,
                qualities,
            }
        });
    }
    setOpen(false)
  }
  
  if(!inGameState){
    return null;
  }
  const getAverageTime = () => {
    const times = Object.keys(inGameState).map((key)=>inGameState[key].time).filter((time)=>time !== -1);
    return times.reduce((a, b) => a + b, 0) / (times.length || 1) / 1000;
  }
  return (
    <div className="Game">
      {indexes[0] !== -1 && indexes[1] !== -1 && <FullScreenDialog options={inGameState[dicKey(indexes[0], indexes[1])]} index={inGameState[dicKey(indexes[0], indexes[1])].index} open={open} handleClose={()=>{setOpen(false)}} onSuccess={onSuccess}/>}
      <div style={{height: '240px'}}>
        <table style={{
          backgroundImage: `url(https://loremflickr.com/320/240/${randomItem})`,
          width: '320px',
          height: '240px',
        }}>
          <tbody>
            {
              Array.from({ length: dimensions }).map((_, i) => {
                return (
                  <tr key={i}>
                    {
                      Array.from({ length: dimensions }).map((_, j) => {
                        const game = inGameState[dicKey(i, j)]
                        console.log('game', game)
                        const incomplete = game.time === -1
                        return <td style={{
                            color: 'white',
                            textAlign: 'center',
                          backgroundColor: incomplete ? 'black' : 'transparent'
                        }} onClick={()=>{
                          setOpen(true)
                          setIndexes([i, j])
                        }} key={j}>{incomplete ? game.questionIndex : null}</td>
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <div>
            {`Average Time: ${getAverageTime()}`}
        </div>
        <RadioG onWin={()=>{
            onWin(getAverageTime())
        }} answers={randomItems} correctAnswer={randomItem} reset={()=>{}}/>
      </div>
    </div>
  );
}

export default Game;
