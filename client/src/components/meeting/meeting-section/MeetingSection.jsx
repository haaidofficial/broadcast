import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Chat } from "../../chat/chat-main-section/Chat";
import { VideoSectionMain } from "../../video/video-section-main/VideoSectionMain";
import { MeetingControlPanel } from "../meeting-control-panel/MeetingControlPanel";
import { windowHistoryApi } from "../../../services/windowHistoryApi";
import { useSocketContext } from "../../../contexts/socket-context";
import { ParticipantJoinMeetingDialog } from "../../dialogs/meeting-dialog/ParticipantJoinMeetingDialog";
import { TabParticipantTab } from "../chat-participant-tab/TabParticipantTab";
import { ParticipantList } from "../participant-list/ParticipantList";
import { UserMediaProvider } from "../../../contexts/user-media-context";
import "./index.css";

const tabDrivenComponent = {
  chat: <Chat />,
  participant: <ParticipantList />
};

export function MeetingSection() {
  console.log("MeetingSection");
  const { createMeeting, meetingIdRef, createUser } = useSocketContext();
  const [meetingInfo, setMeetingInfo] = useState({
    status: "",
    participantUsername: ""
  });
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const [tab, setTab] = useState("chat");

  useEffect(() => {
    debugger
    // const historyState = window.history.state;
    // if (historyState != null) {
    //   if (historyState.meetingId) {
    //     const existingMeetingId = historyState.meetingId;
    //     const username = historyState.user.username;

    //   }
    // }

    popupAlertWhenUserReloadsPage();

    if (urlSearchParams.has("meetingId") && urlSearchParams.get("meetingId")) {
      if (urlSearchParams.has("action") && urlSearchParams.get("action") === 'joinMeeting') {
        const historyState = window.history.state;
        if (historyState != null) {
          if (historyState.user.info === "participant") {
            handleCreateMeeting('participant');
          } else {
            openModalParticipantJoin();
          }
        } else {
          openModalParticipantJoin();
        }

        // const url = window.location.href;
        // // const { user } = createUser();
        // const data = {
        //   state: {
        //     meetingId: urlSearchParams.get("meetingId"),
        //     action: "join-meeting-after-meeting-creating",
        //     //user
        //   },
        //   url
        // };

        // windowHistoryApi(data);
      } else {
        handleCreateMeeting('organiser');
      }
    }
  }, []);

  useEffect(() => {
    if (meetingInfo.status === "open-modal-to-join-participant") {
      setMeetingDialogOpen(true);
    } else if (meetingInfo.status === "participant-username-created") {
      joinParticipantInMeeting(meetingInfo.participantUsername);
    }
  }, [meetingInfo.status]);

  async function handleCreateMeeting(userType) {
    debugger;
    const historyState = window.history.state;
    if (historyState != null) {
      if (historyState.meetingId) {
        const existingMeetingId = historyState.meetingId;
        const username = historyState.user.username;
        const { message } = await createMeeting(existingMeetingId, username, userType);

        meetingIdRef.current = existingMeetingId;
      }
    }
  }

  function openModalParticipantJoin() {
    setMeetingInfo({
      status: "open-modal-to-join-participant",
      participantUsername: ""
    });
  }

  function participantJoined() {
    setMeetingInfo((prevstate) => ({ status: "participant-joined-meeting" }));
  }

  function setParticipantUserName(username) {
    setMeetingInfo({
      status: "participant-username-created",
      participantUsername: username
    });
  }

  function joinParticipantInMeeting(username) {
    const url = window.location.href;
    // const { user } = createUser();
    const data = {
      state: {
        meetingId: urlSearchParams.get("meetingId"),
        action: "join-meeting-after-meeting-creating",
        user: {
          username: username,
          info: "participant"
        }
      },
      url
    };

    windowHistoryApi(data);
    handleCreateMeeting('participant');
  }

  console.log(meetingInfo);

  const createMeetingDialogProps = {
    dialogContentText: "Join Meeting",
    dialogTitle: "",
    meetingDialogOpen,
    setMeetingDialogOpen,
    participantJoined,
    meetingInfo,
    setParticipantUserName,
    joinParticipantInMeeting
  };

  function popupAlertWhenUserReloadsPage() {
    window.addEventListener("beforeunload", handleRemoveUserFromMeeting);
  }

  function handleRemoveUserFromMeeting(e) {
    // e.preventDefault();
    // e.returnValue = '';
  }

  function renderComponentUsingTab() {
    return tabDrivenComponent[tab];
  }

  function updateTabs(value) {
    setTab(value);
  }

  return (
    <>
      <Box className="bg-dark">
        <Container maxWidth="xl">
          {meetingInfo.status === "open-modal-to-join-participant" ? (
            <ParticipantJoinMeetingDialog
              createMeetingDialogProps={createMeetingDialogProps}
            />
          ) : (
            <>
              <TabParticipantTab updateTabs={updateTabs} />
              <Grid container>
                <UserMediaProvider>
                  <VideoSectionMain>
                    <MeetingControlPanel />
                  </VideoSectionMain>
                </UserMediaProvider>
                {renderComponentUsingTab()}
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </>
  );
}
