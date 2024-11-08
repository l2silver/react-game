import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { ListSubheader } from '@mui/material';
import { $gameState } from './App';

export default function BasicList({setCurrentGame, setDimensions, setMode, gameState}: {gameState: $gameState, setCurrentGame: (game: [number, number])=>void, setMode: (type: "game")=>void, setDimensions: (dimensions: number) => void}) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
            Array.from({ length: 10 }).map((_, jindex) => {
                const dimensions = jindex + 2;
            return <nav key={jindex} aria-label="secondary mailbox folders">
            <List>
                <ListSubheader component="div" id="nested-list-subheader">
                    {`${dimensions} x ${dimensions}`}
                </ListSubheader>
    
                {
                    Array.from({ length: 20 }).map((_, index) => {
                        const done = !!(gameState[dimensions] && gameState[dimensions][index]);
                    return <ListItem disablePadding key={index}>
                    <ListItemButton disabled={done} onClick={()=>{
                        setDimensions(dimensions)
                        setCurrentGame([dimensions, index])
                        setMode('game');
                    }}>
                      <ListItemText>{index + 1}{done && <DraftsIcon />}{done && `${gameState[dimensions][index].averageTime/1000}s`}</ListItemText>
                    </ListItemButton>
                  </ListItem>
        
                })
                }
            </List>
          </nav>
        
            })
        }

    </Box>
  );
}