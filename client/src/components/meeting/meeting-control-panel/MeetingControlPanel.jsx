import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";

import { LeaveMeetingDialog } from "../../dialogs/meeting-dialog/LeaveMeetingDialog";

import { useUserMediaContext } from "../../../contexts/user-media-context";

import "./index.css";

export function MeetingControlPanel() {
  const [leaveMeetingDialogOpen, setLeaveMeetingDialogOpen] = React.useState(
    false
  );
  const {
    startMediaCapture,
    toggleVideo,
    toggleAudio,
    showVideoStream,
    videoStreamState,
    stopVideoTrack,
    stopAudioTrack,
    videoVolume,
    handleVideoVolume
  } = useUserMediaContext();

  const leaveMeetingDialogProps = {
    leaveMeetingDialogOpen,
    setLeaveMeetingDialogOpen
  };

  function handleLeaveMeetingDialog() {
    setLeaveMeetingDialogOpen(true);
  }

  function handleStartMediaCapture() {
    startMediaCapture();
  }

  console.log(videoVolume);

  return (
    <>
      <LeaveMeetingDialog leaveMeetingDialogProps={leaveMeetingDialogProps} />
      <Grid item md={12} sm={12} xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px"
          }}
        >
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              sx={{ color: "white", border: "1px solid #5d5d5d" }}
              onClick={toggleVideo}
            >
              {videoStreamState.video ? <VideocamIcon /> : <VideocamOffIcon />}
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "white", border: "1px solid #5d5d5d" }}
              onClick={toggleAudio}
            >
              {videoStreamState.audio ? <MicIcon /> : <MicOffIcon />}
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ color: "#6a6e74" }}
              onClick={handleLeaveMeetingDialog}
            >
              <CallEndIcon sx={{ color: "white" }} />
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "white", border: "1px solid #5d5d5d" }}
              onClick={handleVideoVolume}
            >
              {videoVolume ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "white", border: "1px solid #5d5d5d" }}
            >
              <PresentToAllIcon />
            </Button>
          </Stack>
        </Box>
      </Grid>
    </>
  );
}
//https://dev.to/jeffersonxavier/webrtc-a-simple-video-chat-with-javascript-1686
