import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { windowHistoryApi } from '../../../services/windowHistoryApi';
import { useRouterContext } from '../../../contexts/route-context';
import { useSocketContext } from '../../../contexts/socket-context';


export function ParticipantJoinMeetingDialog({ createMeetingDialogProps }) {
    const { dialogContentText, dialogTitle, meetingDialogOpen, setMeetingDialogOpen, participantJoined, meetingInfo, setParticipantUserName, joinParticipantInMeeting } = createMeetingDialogProps;
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = React.useState('');

    console.log(meetingDialogOpen);
    React.useEffect(() => {
        if (meetingDialogOpen) {
            handleClickOpen();
        }
    }, [meetingDialogOpen]);

    const handleClickOpen = () => {
        // setMeetingDialogOpen(true);
    };

    const handleClose = () => {
        // setMeetingDialogOpen(false);
    };


    // async function handleStartMeeting() {


    //     const { action, isVisible, severity, message, meetingId } = await createMeeting("", userName);

    //     setMeetingAlert({
    //         action,
    //         isVisible,
    //         severity,
    //         message
    //     });

    //     // need if condition for promise
    //     meetingIdRef.current = meetingId;

    //     setMeetingIdInfo(meetingId);


    //     const url = 'http://localhost:5200/?meetingId=' + meetingId;
    //     const data = {
    //         state: {
    //             meetingId,
    //             action: 'join-meeting-after-meeting-creating',
    //             user: {
    //                 username: userName
    //             }
    //         },
    //         url
    //     };

    //     windowHistoryApi(data);

    // }


    function handleChange(ev) {
        setUserName(ev.target.value.trim());
    }

    function handleJoinMeeting() {
        setParticipantUserName(userName)
    }

    return (
        <div>
            <Dialog
                open={meetingDialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContentText}
                    </DialogContentText>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                        <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
                            <Box className='join-meeting-username-container'>
                                <div className='join-meeting-username'>
                                    <TextField
                                        required
                                        id="filled-required"
                                        label="Enter name"
                                        variant="filled"
                                        value={userName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Box>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" sx={{ color: '#6a6e74' }} onClick={handleJoinMeeting}>Join Meeting</Button>
                    {/* <Button variant="text" sx={{ color: '#6a6e74' }} onClick={handleStartMeeting}>Create Meeting</Button>
                    <Button variant="text" sx={{ color: '#6a6e74' }} onClick={handleJoinMeeting}>Join Meeting</Button> */}
                    <Button onClick={handleClose}>Dismiss</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}