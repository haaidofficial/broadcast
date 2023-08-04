import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSocketContext } from "../../../contexts/socket-context";
import "./index.css";


function VirtualizedList() {
  const { participantList } = useSocketContext();

  function generateList() {
    return participantList.map((participant, index) => {
      const { username, userId, peerId, userType } = participant;
      const secondary = {};
      if (userType === "organiser") {
        secondary.secondary = userType;
      }

      return (
        <ListItem key={index} component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              sx={{ color: "white" }}
              primary={username}
              {...secondary}
            />
          </ListItemButton>
        </ListItem>
      );
    });
  }

  const list = generateList();

  return (
    <Box className="participant-item-list-scroll">
      <div className="participant-item-list">{list}</div>
    </Box>
  );
}

export function ParticipantList() {

  return (
    <>
      <Grid item md={4} sm={12} xs={12}>
        <Box className="participant-list">
          <div className="participant-list-container">
            <div className="participant-list-wrapper">
              <div className="participant-list-header"></div>
              <div className="participant-list-box">
                <VirtualizedList />
              </div>
            </div>
          </div>
        </Box>
      </Grid>
    </>
  );
}