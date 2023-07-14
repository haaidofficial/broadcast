import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


export function MeetingDialog({ createMeetingDialogProps }) {
    const { isOpen, meetingId, dialogContentText, dialogTitle } = createMeetingDialogProps;
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            handleClickOpen();
        }
    }, [isOpen]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
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
                            <Box sx={{ background: 'rgb(241,243,244)', width: '100%', padding: '10px 0', textAlign: 'center' }}>
                                {meetingId}
                            </Box>
                            <Box>

                            </Box>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" sx={{ color: '#6a6e74' }}>Join Meeting</Button>
                    <Button onClick={handleClose}>Dismiss</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}