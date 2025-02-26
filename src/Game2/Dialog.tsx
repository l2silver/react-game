import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { essayTopicsArray } from '../essaytopics';
import { questions } from './utils';
import { TextField } from '@mui/material';
import { dic0_1000 } from '../dictionary0-1000';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
    index, open, handleClose, onSuccess, options
}: {options: {words: string, qualities: string, time: number, questionIndex: number}, index: number, open: boolean, handleClose: () => void, onSuccess: (timeDiff: number, words: string, qualities: string) => void}) {
    const [textSubset, setTextSubset] = React.useState<string>("");
    const [randomize, setRandomize] = React.useState<number>(Math.random());
    const [startTime, setStartTime] = React.useState<number>((Date.now()));
    const [qualities, setQualities] = React.useState<string>(options.words);
    const [words, setWords] = React.useState<string>(options.qualities);
    const [ help, setHelp ] = React.useState(false);
    React.useEffect(() => {
        if(options.questionIndex !== 2){
            setTextSubset(essayTopicsArray[index]);
        } else {
            setTextSubset(`${dic0_1000[index].word}\n---------|---------\n${dic0_1000[index].definition}`);
        }
        
        setStartTime(Date.now());
        setWords(options.words);
        setQualities(options.qualities);
    }, [open, randomize]);
  return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Button autoFocus color="inherit" onClick={()=>setRandomize(Math.random())}>
              Shuffle
            </Button>
            <Button autoFocus color="inherit" onClick={()=>onSuccess(Date.now() - startTime, words, qualities)}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        {
            options.time !== -1 && `Time: ${options.time / 1000}`
        }
        <h1>
            {
                questions[options.questionIndex]
            }
        </h1>
        <p style={{width: '300px', margin: '30px auto', fontSize: '30px'}}>
            {textSubset}
        </p>
        {
            !help && <div>
                <TextField label={"Chosen things"} value={words} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setWords(event.target.value);
            }} fullWidth/>
                <br />
                <br />
                <TextField
                    label="Qualities"
                    multiline
                    rows={4}
                    value={qualities}
                    fullWidth
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setQualities(event.target.value);
                      }}
                />
                
            </div>
        }
      </Dialog>
  );
}