import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Chat } from "../../chat/chat-main-section/Chat";
import { VideoSectionMain } from "../../video/video-section-main/VideoSectionMain";
import { MeetingControlPanel } from "../meeting-control-panel/MeetingControlPanel";
import './index.css';

export function MeetingSection() {


    return (
        <>
            <Box className='bg-dark'>
                <Container maxWidth="xl">
                    <Grid container >
                        <VideoSectionMain />
                        <Chat />
                        <MeetingControlPanel />
                    </Grid>
                </Container>
            </Box>
        </>
    )
}