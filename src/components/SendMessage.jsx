import React, { useState } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

const SendMessage = ({onMessageSend}) => {
    const [text, setText] = useState('')
   


    return(
      <Box sx={{
        position: 'absolute',
        bottom: '1rem',
        // left: '50%', 
        width: '95%',
        // transform: 'translate(-50%)'
      }}>
        <form onSubmit={(e)=>{
          e.preventDefault();
          if(text.trim() !== '')
            onMessageSend(text.trim());
          setText('');
        }}>
          <TextField
          label="type message..."
          value={text}
          fullWidth
          autoComplete={false}
          onChange={(e)=>setText(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton type='submit' color='primary'>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </form>
    </Box>
    );
}

export default SendMessage;