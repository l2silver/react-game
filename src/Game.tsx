

import { useState } from 'react';
import { nouns } from './nouns';
import { getRandomItem, getXbyX, shuffle } from './utils';
import RadioG from './Radio';

import FullScreenDialog from './Dialog';



function Game({dimensions, onWin}: {dimensions: number, onWin: (times: number[]) => void}) {
  const [randomItem] = useState(getRandomItem(nouns));
  const [ randomItems ] = useState(shuffle(Array.from({ length: 9 }).map(() => getRandomItem(nouns)).concat(randomItem)));
  const [ boxes, setBoxes ] = useState(getXbyX(dimensions));
  const [open, setOpen] = useState(false);
  const [indexes, setIndexes] = useState([-1, -1]);
  const [times, setTimes] = useState<number[]>([])
  return (
    <div className="Game">
      <FullScreenDialog open={open} handleClose={()=>{setOpen(false)}} onSuccess={(timeDiff)=>{
          boxes[indexes[0]][indexes[1]] = true
          setBoxes([...boxes])
          setOpen(false)
          console.log('timeDiff', timeDiff);
          setTimes([...times, timeDiff])
      }}/>
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
                        return <td style={{
                          backgroundColor: boxes[i][j] ? 'transparent' : 'black' 
                        }} onClick={()=>{
                          setOpen(true)
                          setIndexes([i, j])
                        }} key={j}></td>
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <RadioG onWin={()=>{
            console.log('times', times);
            onWin(times)
        }} answers={randomItems} correctAnswer={randomItem} reset={()=>{}}/>
      </div>
    </div>
  );
}

export default Game;
