
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';

import './index.css';


export function MeetingControlPanel() {
    return (
        <>
            <Grid item md={8} sm={12} xs={12}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" sx={{ color: '#6a6e74', border: '1px solid #5d5d5d' }}>
                            <VideocamIcon />
                        </Button>
                        <Button variant="outlined" sx={{ color: '#6a6e74', border: '1px solid #5d5d5d' }}>
                            <VolumeUpIcon />
                        </Button>
                        <Button variant="outlined" sx={{ color: '#6a6e74', border: '1px solid #5d5d5d' }}>
                            <CallEndIcon />
                        </Button>
                        <Button variant="outlined" sx={{ color: '#6a6e74', border: '1px solid #5d5d5d' }}>
                            <PresentToAllIcon />
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </>
    );
}