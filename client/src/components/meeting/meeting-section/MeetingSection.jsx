import { useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Chat } from "../../chat/chat-main-section/Chat";
import { VideoSectionMain } from "../../video/video-section-main/VideoSectionMain";
import { MeetingControlPanel } from "../meeting-control-panel/MeetingControlPanel";
import { windowHistoryApi } from "../../../services/windowHistoryApi";
import { useSocketContext } from "../../../contexts/socket-context";
import './index.css';

export function MeetingSection() {
    const { createMeeting, meetingIdRef } = useSocketContext();
    useEffect(() => {

        const urlSearchParams = new URLSearchParams(window.location.search);

        if (urlSearchParams.has('meetingId') && urlSearchParams.get('meetingId')) {
            if (urlSearchParams.has('action') && urlSearchParams.get('action')) {
                const url = window.location.href;
                const data = {
                    state: {
                        meetingId: urlSearchParams.get('meetingId'),
                        action: 'join-meeting-after-meeting-creating',
                    },
                    url
                };


                windowHistoryApi(data);

            }




            handleCreateMeeting()

        }

    }, []);



    async function handleCreateMeeting() {
        const historyState = window.history.state;
        if (historyState != null) {
            if (historyState.meetingId) {
                const existingMeetingId = historyState.meetingId;
                const {
                    message
                } = await createMeeting(existingMeetingId);

                meetingIdRef.current = existingMeetingId;
            }
        }



    }


    return (
        <>
            <Box className='bg-dark'>
                <Container maxWidth="xl">
                    <Grid container >
                        <VideoSectionMain>
                            <MeetingControlPanel />
                        </VideoSectionMain>
                        <Chat />
                    </Grid>
                </Container>
            </Box>
        </>
    )
}