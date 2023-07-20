import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useSocketContext } from "../../../contexts/socket-context";
import "./index.css";

export function ChatSendInputBox() {
    const { sendMessageInsideMeeting, userRef } = useSocketContext();
    const [chatMessage, setChatMessage] = useState("");
    const historyState = window.history.state;

    function handleChange(ev) {
        const text = ev.target.value.trim();
        if (text != "") {
            setChatMessage(text);
        }
    }


    function sendMessageInChat() {

        if (chatMessage != "") {
            const { meetingId } = historyState;
            const payload = {
                meetingId,
                user: userRef.current,
                event: "send_message_inside_meeting",
                message: chatMessage
            };

            sendMessageInsideMeeting(payload);
        }
    }

    return (
        <>
            <div className="chat-message-input">
                <TextField
                    id="chat-message-input-field"
                    label="Send Message"
                    multiline
                    maxRows={4}
                    variant="standard"
                    className="chat-message-input-field"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    onChange={handleChange}
                />

                <div className="chat-message-input-btn">
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ background: "#03203C" }}
                        endIcon={<SendIcon />}
                        onClick={sendMessageInChat}
                    >
                        Send
                    </Button>
                </div>
            </div>
        </>
    );
}
