import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './index.css';

export function JoinMeeting() {
    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Stack spacing={2} direction="row">
                    <TextField id="enter-meeting-code" label="enter meeting code" variant="outlined" className='join-meeting' size='small' sx={{ height: '10px' }} />
                    <Button variant="text" sx={{ color: '#6a6e74' }}>Join</Button>
                </Stack>
            </Box>
        </>
    );
}