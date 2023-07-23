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
import { useSocketContext } from '../../../contexts/socket-context';
import { useRouterContext } from '../../../contexts/route-context';
import { windowHistoryRemoveState } from '../../../services/windowHistoryApi';


export function LeaveMeetingDialog({ leaveMeetingDialogProps }) {
    const { removeUserFromMeeting, userRef, meetingIdRef } = useSocketContext();
    const { updateComponentView } = useRouterContext();
    const { leaveMeetingDialogOpen, setLeaveMeetingDialogOpen } = leaveMeetingDialogProps;
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (leaveMeetingDialogOpen) {
            handleClickOpen();
        }
    }, [leaveMeetingDialogOpen]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setLeaveMeetingDialogOpen(false);
    };

    async function handleLeaveMeeting() {
        debugger
        const params = {
            userId: userRef.current.userId,
            meetingId: meetingIdRef.current
        }


        try {
            const { status, userId, meetingId } = await removeUserFromMeeting(params);
            if (status === 'user-removed') {
                windowHistoryRemoveState({ state: null, key: null, url: '/' });
                updateComponentView('/');
            }
            console.log(status);
        }
        catch (err) {
            console.log(err);
        }

    }






    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Alert
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to leave this meeting?
                    </DialogContentText>

                    {/* <Box sx={{ display: 'flex', justifyCon
                    tent: 'center', alignItems: 'center', marginTop: '30px' }}>
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
                    </Box> */}
                </DialogContent>
                <DialogActions>
                    <Button variant="text" sx={{ color: '#6a6e74' }} onClick={handleLeaveMeeting}>Leave Meeting</Button>
                    {/* <Button variant="text" sx={{ color: '#6a6e74' }} onClick={handleStartMeeting}>Create Meeting</Button>
                    <Button variant="text" sx={{ color: '#6a6e74' }} onClick={handleJoinMeeting}>Join Meeting</Button> */}
                    <Button onClick={handleClose}>Dismiss</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}