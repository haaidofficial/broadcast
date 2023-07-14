import * as React from 'react';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Button from '@mui/material/Button';
import './index.css';




import { socket } from '../../../services/socket/socket-connection';
import { io } from 'socket.io-client';
import { useSocketContext } from '../../../contexts/socket-context';
import { CommonSnackbarAlert } from '../../notification/snackbar-alert';
import { MeetingDialog } from '../../dialogs/meeting-dialog/MeetingDialog';



import { startNewMeeting } from '../../../services/meeting/start-meeting';


const infoTexts = {
    dialogContentText: 'Share this joining info with people that you want in the meeting',
    dialogTitle: 'Here\'s the link to your meeting'
};

export function StartMeeting() {

    const [meetingAlert, setMeetingAlert] = React.useState({
        action: '',
        isVisible: false,
        severity: '',
        message: '',
    });

    const [meetingIdInfo, setMeetingIdInfo] = React.useState('');

    const { createMeeting } = useSocketContext();


    // function startMeetingHandler() {
    //     // const id = startNewMeeting();



    //     // socket.join(id)
    //     // console.log(id);

    //     socket.emit('create-meeting', 2023);
    // }



    function sendMessage() {
        io.sockets.in(2023).emit('new-message', 'Hello everyone');
    }

    async function handleCreateMeeting() {
        const { action, isVisible, severity, message, meetingId } = await createMeeting();
        setMeetingAlert({
            action,
            isVisible,
            severity,
            message,
        });

        setMeetingIdInfo(meetingId);

    }


    function clearAlerts() {
        setMeetingAlert({
            action: '',
            isVisible: false,
            severity: '',
            message: '',
        });
    }

    const snackbarBehaviour = {
        isOpen: meetingAlert.isVisible,
        message: meetingAlert.message,
        severity: meetingAlert.severity,
        clearAlerts
    };


    const createMeetingDialogProps = {
        isOpen: meetingAlert.isVisible,
        meetingId: meetingIdInfo,
        dialogContentText: infoTexts.dialogContentText,
        dialogTitle: infoTexts.dialogTitle
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={
                    <VideocamOutlinedIcon fontSize="inherit" />
                }
                onClick={handleCreateMeeting}
            >
                Start a meeting
            </Button>


            {/* <button onClick={sendMessage}>Send Message</button> */}

            <MeetingDialog createMeetingDialogProps={createMeetingDialogProps} />
            <span> <CommonSnackbarAlert snackbarBehaviourState={snackbarBehaviour} /></span>


        </>
    );
}