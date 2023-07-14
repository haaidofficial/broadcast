import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { AppDetails } from '../app-details/AppDetails';
import { Header } from '../header/Header';
import { StartMeeting } from "../meeting/start-meeting/start-meeting";
import { JoinMeeting } from "../meeting/join-meeting/join-meeting";


export function Home() {
    console.log('Home');
    return (
        <>
            <Header />
            <Container maxWidth="xl">
                <Grid container >
                    <AppDetails>
                        <Grid container sx={{ marginTop: '15px' }}>
                            <Grid item md={3} xs={6}>
                                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                    <StartMeeting />
                                </Box>
                            </Grid>
                            <Grid item md={1} xs={1}>
                                <Box sx={{ width: '100%', height: '100%', color: '#6a6e74', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span>or</span></Box>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <JoinMeeting />
                            </Grid>
                        </Grid>
                    </AppDetails>

                    <Grid item md={6} xs={6}>

                    </Grid>
                </Grid>
            </Container>
        </>
    );

}