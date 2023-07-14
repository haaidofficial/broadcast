import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CommonSnackbarAlert({ snackbarBehaviourState }) {

    const { isOpen, message, severity, clearAlerts } = snackbarBehaviourState;
    const [open, setOpen] = React.useState(isOpen);

    console.log(snackbarBehaviourState, open);
    React.useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);



    React.useEffect(() => {
        if (open) {
            handleClick()
        }
    }, [open]);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        clearAlerts()
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
        </Stack>
    );
}