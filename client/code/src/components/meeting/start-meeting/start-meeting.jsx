import * as React from 'react';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Button from '@mui/material/Button';
import './index.css';




import { socket } from '../../../services/socket/socket-connection';
import { io } from 'socket.io-client';
import { useSocketContext } from '../../../contexts/socket-context';
import { CommonSnackbarAlert } from '../../notification/snackbar-alert';



import { startNewMeeting } from '../../../services/meeting/start-meeting';

export function StartMeeting() {

    const { createMeeting, meetingAlert } = useSocketContext();


    // function startMeetingHandler() {
    //     // const id = startNewMeeting();



    //     // socket.join(id)
    //     // console.log(id);

    //     socket.emit('create-meeting', 2023);
    // }



    function sendMessage() {
        io.sockets.in(2023).emit('new-message', 'Hello everyone');
    }


    const snackbarBehaviour = {
        isOpen: meetingAlert.isVisible,
        message: meetingAlert.message,
        severity: meetingAlert.severity
    };

    return (
        <>
            <CommonSnackbarAlert snackbarBehaviourState={snackbarBehaviour} />
            <Button
                variant="contained"
                startIcon={
                    <VideocamOutlinedIcon fontSize="inherit" />
                }
                onClick={createMeeting}
            >
                Start a meeting
            </Button>


            <button onClick={sendMessage}>Send Message</button>
        </>
    );
}