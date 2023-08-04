import { createContext, useContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { v4 as UUIDV4 } from "uuid";
import { serverConstants } from "../constants/server-constants";
import { socketEventsConstants } from "../constants/socket-event-constants";
import { initPeerConnection } from "../services/RTCPeerConnection";

const SocketContext = createContext();
const socket = io(serverConstants.SERVER_BASE_URL);

export function SocketContextProvider({ children }) {
  const [isMeetingCreated, setIsMeetingCreated] = useState("idle");
  const [meetingAlert, setMeetingAlert] = useState({
    action: "",
    isVisible: false,
    severity: ""
  });

  const [newMessage, setNewMessage] = useState({
    message: "",
    user: { userId: "", username: "" }
  });

  const [messageList, setMessageList] = useState([]);
  const [participantList, setParticipantList] = useState([]);
  const [newJoineePeerDetail, setNewJoineePeerDetail] = useState({
    userId: "",
    peerId: ""
  });

  const meetingIdRef = useRef("");
  const userRef = useRef({ userId: "", username: "" });
  const peerConnectionRef = useRef({
    peer: "",
    peerId: "",
    userType: ""
  });
  const [peerState, setPeerState] = useState(null);

  useEffect(() => {
    listToNewMessageInMeeting();

    // socket.on('new_offer', (data) => {
    //   console.log(data);

    //   const connection = new RTCPeerConnection();

    //   connection.addTrack()

    //   connection.setRemoteDescription()

    // });
  }, []);

  // useEffect(() => {
  //   if (isMeetingCreated === "meeting-created") {
  //     console.log("dafhjkfagffgk");
  //     handlePeerConnection();
  //   }
  // }, [isMeetingCreated]);

  useEffect(() => {
    if (newMessage.message) {
      addMessagesInsideChatList(newMessage);
    }
  }, [newMessage]);

  function createMeeting(existingMeetingId, username, userType) {
    // debugger
    return new Promise((resolve, reject) => {
      let meetingId = "";
      if (existingMeetingId) {
        meetingId = existingMeetingId;
      } else {
        meetingId = UUIDV4();
      }
      console.log(userRef.current, "userRef.current");

      userRef.current = createUser(username, userType);
      socket.emit(socketEventsConstants.CREATE_MEETING, {
        meetingId,
        userId: userRef.current.userId,
        username: userRef.current.username,
        userType
      });

      socket.on(socketEventsConstants.MEETING_CREATED, (data) => {
        if (data.status === "meeting-created") {
          // debugger
          handlePeerConnection();
          resolve({
            action: socketEventsConstants.MEETING_CREATED,
            isVisible: true,
            message: "Meeting created successfully",
            severity: "success",
            meetingId
          });
        }
        console.log(data, "meeting");
        //setIsMeetingCreated
        // handlePeerConnection();

        // setMeetingAlert(prevState => ({ action: socketEventsConstants.MEETING_CREATED, isVisible: true, message: 'Meeting created successfully', severity: 'success' }));
        // console.log('Meeting created');
      });
    });
  }

  function sendMessageInsideMeeting({ meetingId, event, message, user }) {
    console.log(meetingId, event, message);
    socket.emit(event, { meetingId, user, message });
  }

  function insertMessageInChatState(data) {
    const { message, user, dateTime } = data;
    console.log(data);
    let isRemoteUser = true;
    if (userRef.current.userId === user.userId) {
      isRemoteUser = false;
    }
    setNewMessage({ message, user, isRemoteUser, dateTime });
  }

  function listToNewMessageInMeeting() {
    socket.on("new_message_in_meeting", insertMessageInChatState);
  }

  function createUser(username, userType) {
    const user = {
      userId: "",
      username: "",
      userType: ""
    };

    const userFromLocalStorage = window.localStorage.getItem("MEETING_USER_ID");

    if (window.localStorage.getItem("MEETING_USER_ID") === null) {
      user.userId = UUIDV4();
      user.username = username;
      user.userType = userType;
      window.localStorage.setItem("MEETING_USER_ID", JSON.stringify(user));
    } else {
      const { userId, username } = JSON.parse(userFromLocalStorage);
      user.userId = userId;
      user.username = username;
      user.userType = userType;
    }

    return user;
  }

  function removeUserFromLocalStorage(userId) {
    const userFromLocalStorage = window.localStorage.getItem("MEETING_USER_ID");

    if (userFromLocalStorage !== null) {
      if (JSON.parse(userFromLocalStorage).userId === userId) {
        window.localStorage.removeItem("MEETING_USER_ID");
      }
    }
  }

  function removeUserFromMeeting({ userId, meetingId }) {
    removeUserFromLocalStorage(userId);

    return new Promise((resolve, reject) => {
      socket.emit("remove_user_from_meeting", { userId, meetingId });
      socket.on("user-removed-from-meeting", (data) => {
        const { status, userId, meetingId } = data;
        resolve({
          status,
          userId,
          meetingId
        });
      });
    });
  }

  function addMessagesInsideChatList(data) {
    setMessageList((prevstate) => [...prevstate, data]);
  }

  async function handlePeerConnection() {
    // debugger
    try {
      const { peer, peerId } = await initPeerConnection();
      peerConnectionRef.current = { peer, peerId };
      setPeerState(peer);
      insertPeerIdInsideMeeting();
    } catch (err) {
      console.log(err);
    }
  }

  function insertPeerIdInsideMeeting() {
    // debugger
    const { peerId } = peerConnectionRef.current;
    socket.emit("insert_peer_connection_new_user", {
      peerId,
      meetingId: meetingIdRef.current,
      user: userRef.current
    });

    function addConnectedParticipantList(newJoineePeer) {
      console.log(newJoineePeer, "newJoineePeer");
      // setParticipantList(list);
      setNewJoineePeerDetail({
        userId: newJoineePeer.userId,
        peerId: newJoineePeer.newJoineePeerId
      });
    }

    socket.on("new_participant_joined", (data) => {
      console.log("new_participant_joined", data);
      addConnectedParticipantList(data);
    });
  }

  const contextProviderValues = {
    createMeeting,
    meetingAlert,
    sendMessageInsideMeeting,
    listToNewMessageInMeeting,
    newMessage,
    meetingIdRef,
    userRef,
    createUser,
    removeUserFromMeeting,
    isMeetingCreated,
    setIsMeetingCreated,
    messageList,
    participantList,
    newJoineePeerDetail,
    socket,
    peerConnectionRef,
    peerState
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
