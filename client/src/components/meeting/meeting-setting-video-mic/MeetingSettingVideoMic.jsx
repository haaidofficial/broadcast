import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './index.css';


export function MeetingSettingVideoMic(params) {
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Box className=''>
                        <Box>

                        </Box>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </>
    )
}