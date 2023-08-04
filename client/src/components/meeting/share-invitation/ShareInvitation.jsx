import * as React from 'react';
import Button from '@mui/material/Button';
import ReplyIcon from "@mui/icons-material/Reply";
import { CommonSnackbarAlert } from '../../notification/snackbar-alert';
import { serverConstants } from '../../../constants/server-constants';
import { useSocketContext } from '../../../contexts/socket-context';
import './index.css';


export function ShareInvitationButton() {

    const { meetingIdRef } = useSocketContext();

    const [invitationAlert, setInvitationAlert] = React.useState({
        isVisible: false,
        message: "",
        severity: ""
    });

    async function handleCopyInviteLink() {
        const invitationLink = `${serverConstants.BASE_URL}?action=joinMeeting&meetingId=${meetingIdRef.current}`;

        try {
            await navigator.clipboard.writeText(invitationLink);
            setInvitationAlert({
                isVisible: true,
                message: "Invitation link copied",
                severity: "success",
            });
        } catch (err) {
            console.log(err);
        }
    }

    function clearAlerts() {
        setInvitationAlert({
            isVisible: false,
            severity: "",
            message: "",
        });
    }

    const snackbarBehaviour = {
        isOpen: invitationAlert.isVisible,
        message: invitationAlert.message,
        severity: invitationAlert.severity,
        clearAlerts,
    };


    return (
        <>
            <span>
                <CommonSnackbarAlert snackbarBehaviourState={snackbarBehaviour} />
            </span>
            <Button
                className="tab-btn invitation-btn"
                onClick={handleCopyInviteLink}
            >
                <ReplyIcon
                    sx={{
                        color: "white",
                        transform: "rotate(180deg)",
                        transform: "scaleX(-1)"
                    }}
                />
                <span style={{ color: 'white' }}>Share invite</span>
            </Button>
        </>
    )
}