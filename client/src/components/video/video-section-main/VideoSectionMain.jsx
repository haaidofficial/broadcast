import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { localMediaStream } from "../../../services/localMediaStream";
import { VideoTile } from "../video-tile/VideoTile";
import "./index.css";

function VideoContainer() {
  return (
    <Box className="video-section-container">
      <VideoTile />
    </Box>
  );
}

export function VideoSectionMain({ children }) {
  return (
    <>
      <Grid item md={8} sm={12} xs={12}>
        <VideoContainer />
        {children}
      </Grid>
    </>
  );
}
