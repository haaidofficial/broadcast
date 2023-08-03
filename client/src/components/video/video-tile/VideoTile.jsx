import * as React from 'react';
import { useEffect, useRef } from "react";
import { useUserMediaContext } from "../../../contexts/user-media-context";
import { VideoPlayer } from './VideoPlayer';
import "./index.css";


import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function VideoTile() {
  const {
    streamRef,
    mediaStream,
    startMediaCapture,
    videoStreamState,
    handleVideoTrack,
    handleAudioTrack,
    meetingLiveStreams
  } = useUserMediaContext();
  const userVideoRef = useRef(null);

  useEffect(() => {
    if (videoStreamState.action === "video") {
      if (videoStreamState.video) {
        startMediaCapture(userVideoRef.current);
      } else {
        handleVideoTrack();
      }
    } else if (videoStreamState.action === "audio") {
      handleAudioTrack();
    }
  }, [videoStreamState]);



  function generateVideos() {
    debugger
    console.log(meetingLiveStreams);
    if (meetingLiveStreams.length) {
      return meetingLiveStreams.map((liveStream, index) => {
        let xs = 0;
        let sm = 0;
        let md = 0;

        if (meetingLiveStreams.length === 1) {
          xs = 12;
          sm = 12;
          md = 12;
        }
        else if (meetingLiveStreams.length === 2) {
          xs = 6;
          sm = 6;
          md = 6;
        }
        else if (meetingLiveStreams.length === 3) {
          xs = 4;
          sm = 4;
          md = 4;
        }
        else if (meetingLiveStreams.length >= 4) {
          xs = 3;
          sm = 3;
          md = 3;
        }

        return (
          <>
            <Grid item xs={xs} sm={sm} md={md} key={index}>
              <Item>
                <VideoPlayer videoStream={liveStream} />
              </Item>
            </Grid>
          </>
        );
      });
    }

  }


  const videos = generateVideos();

  console.log(videos);

  return (
    <>
      <div className="user-video-container">
        <div className="user-video">

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {videos}
            </Grid>
          </Box>

          {/* <video id="main-video" ref={userVideoRef} autoPlay>
            <source type="video/mp4" />
          </video> */}
        </div>
      </div>
    </>
  );
}

