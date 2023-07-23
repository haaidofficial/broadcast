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


export function MeetingDialog({ createMeetingDialogProps }) {
    const { isOpen, meetingId, dialogContentText, dialogTitle, meetingDialogOpen, setMeetingDialogOpen, setMeetingAlert, setMeetingIdInfo, meetingIdInfo } = createMeetingDialogProps;
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const { updateComponentView } = useRouterContext();
    const { createMeeting, meetingIdRef, isMeetingCreated, setIsMeetingCreated } = useSocketContext();

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
        setMeetingDialogOpen(false);
    };


    async function handleStartMeeting() {

        try {
            const { action, isVisible, severity, message, meetingId } = await createMeeting("", userName);

            setMeetingAlert({
                action,
                isVisible,
                severity,
                message
            });

            // need if condition for promise
            meetingIdRef.current = meetingId;

            setMeetingIdInfo(meetingId);


            const url = 'http://localhost:5200/?meetingId=' + meetingId;
            const data = {
                state: {
                    meetingId,
                    action: 'join-meeting-after-meeting-creating',
                    user: {
                        username: userName
                    }
                },
                url
            };

            windowHistoryApi(data);

            setIsMeetingCreated('meeting-created');
        }
        catch (err) {

        }
    }


    function handleChange(ev) {
        setUserName(ev.target.value.trim());
    }

    function handleJoinMeeting() {
        updateComponentView('?meetingId=' + meetingId);
    }

    console.log(isMeetingCreated);

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
                        <Stack spacing={2} direction="column" sx={{ width: '100%' }}>
                            {
                                meetingId && <Box sx={{ background: 'rgb(241,243,244)', width: '100%', padding: '16px 0', textAlign: 'center' }}>
                                    {meetingId}
                                </Box>
                            }

                            <Box className='join-meeting-username-container'>
                                <div className='join-meeting-username'>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        required
                                        id="filled-required"
                                        label="Enter name"
                                        variant="filled"
                                        value={userName}
                                        onChange={handleChange}
                                        inputProps={
                                            { readOnly: isMeetingCreated === 'meeting-created' ? true : false, }
                                        }
                                    />
                                </div>
                            </Box>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {
                        meetingIdInfo
                            ?
                            <Button variant="text" sx={{ color: '#6a6e74' }} onClick={handleJoinMeeting}>Join Meeting</Button>
                            :
                            <Button variant="text" sx={{ color: '#6a6e74' }} onClick={handleStartMeeting}>Create Meeting</Button>
                    }
                    {/* <Button variant="text" sx={{ color: '#6a6e74' }} onClick={handleStartMeeting}>Create Meeting</Button>
                    <Button variant="text" sx={{ color: '#6a6e74' }} onClick={handleJoinMeeting}>Join Meeting</Button> */}
                    <Button onClick={handleClose}>Dismiss</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}