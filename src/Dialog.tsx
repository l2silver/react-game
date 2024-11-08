import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { text } from './text';
import { getRandomIndex, getRandomItem } from './utils';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const textArray = text.split(/\. |\? /);

export default function FullScreenDialog({open, handleClose, onSuccess}: {open: boolean, handleClose: () => void, onSuccess: (timeDiff: number) => void}) {
    const [textSubset, setTextSubset] = React.useState<string>("");
    const [randomize, setRandomize] = React.useState<number>(Math.random());
    const [startTime, setStartTime] = React.useState<number>((Date.now()));
    React.useEffect(() => {
        const randomIndex = getRandomIndex(textArray)
        setTextSubset(textArray.slice(randomIndex, randomIndex + 2).join('. '));
        setStartTime(Date.now());
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
            <Button autoFocus color="inherit" onClick={()=>onSuccess(Date.now() - startTime)}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <h1>
            1st degree, 2nd degree, 2nd degree next, rhet
        </h1>
        <p style={{width: '300px', margin: '30px auto', fontSize: '30px'}}>
            {textSubset}
        </p>
      </Dialog>
  );
}