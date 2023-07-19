import { createContext, useContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { v4 as UUIDV4 } from "uuid";
import { serverConstants } from "../constants/server-constants";
import { socketEventsConstants } from "../constants/socket-event-constants";

const SocketContext = createContext();
const socket = io(serverConstants.SERVER_BASE_URL);

export function SocketContextProvider({ children }) {
  const [meetingAlert, setMeetingAlert] = useState({
    action: "",
    isVisible: false,
    severity: ""
  });

  const [newMessage, setNewMessage] = useState({ message: "" });

  const meetingIdRef = useRef("");

  useEffect(() => {
    listToNewMessageInMeeting();
  }, []);

  function createMeeting(existingMeetingId) {
    return new Promise((resolve, reject) => {
      let meetingId = "";
      if (existingMeetingId) {
        meetingId = existingMeetingId;
      } else {
        meetingId = UUIDV4();
      }

      socket.emit(socketEventsConstants.CREATE_MEETING, { meetingId });

      socket.on(socketEventsConstants.MEETING_CREATED, () => {
        resolve({
          action: socketEventsConstants.MEETING_CREATED,
          isVisible: true,
          message: "Meeting created successfully",
          severity: "success",
          meetingId
        });
        // setMeetingAlert(prevState => ({ action: socketEventsConstants.MEETING_CREATED, isVisible: true, message: 'Meeting created successfully', severity: 'success' }));
        // console.log('Meeting created');
      });
    });
  }

  function sendMessageInsideMeeting({ meetingId, event, message }) {
    console.log(meetingId, event, message);
    socket.emit(event, { meetingId, message });
  }

  function insertMessageInChatState(data) {
    const { message } = data;
    setNewMessage({ message });
  }

  function listToNewMessageInMeeting() {
    socket.on("new_message_in_meeting", insertMessageInChatState);
  }

  const contextProviderValues = {
    createMeeting,
    meetingAlert,
    sendMessageInsideMeeting,
    listToNewMessageInMeeting,
    newMessage,
    meetingIdRef
  };

  return (
    <SocketContext.Provider value={contextProviderValues}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  return useContext(SocketContext);
}
