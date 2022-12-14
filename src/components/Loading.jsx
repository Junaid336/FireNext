import React from "react";

import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return(
        <div
         style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            top: '36%'
         }}
        >
            <CircularProgress size='5rem' />
        </div>
    )
}

export default Loading;