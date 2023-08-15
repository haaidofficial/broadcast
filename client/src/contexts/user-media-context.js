import { createContext, useContext, useState, useRef, useEffect } from "react";
import { localMediaStream } from "../services/localMediaStream";
import {
  initPeerConnection,
  initRemotePeerConnection,
  streamMediaUsingCall,
  listenAndAnswerIncomingCall,
  connectToNewUserUsingPeer
} from "../services/RTCPeerConnection";
import { useSocketContext } from "./socket-context";

const UserMediaContext = createContext();

export function UserMediaProvider({ children }) {
  const streamRef = useRef(null);
  const [videoStreamState, setVideoStreamState] = useState({
    audio: false,
    video: false,
    action: ""
  });
  const [videoVolume, setVideoVolume] = useState(true);
  const {
    meetingIdRef,
    socket,
    participantList,
    peerConnectionRef,
    newJoineePeerDetail,
    peerState,
    userRef,
    addVideoStreamDetailsToUser,
    meetingVideoStreamsRef
  } = useSocketContext();
  const [meetingLiveStreams, setMeetingLiveStreams] = useState([]);

  // useEffect(() => {
  //   if (peerConnectionRef.current.peerId) {
  //     startMediaCapture("");
  //   }

  // }, [peerConnectionRef.current.peerId]);



  useEffect(() => {
    startMediaCapture("");
  }, []);


  useEffect(() => {
    debugger;
    if (peerState && streamRef.current && peerConnectionRef.current.peer) {
      listenAndAnswerIncomingCall(
        streamRef.current,
        peerConnectionRef.current.peer,
        addLiveVideosToState
      );
    }
    //
  }, [peerState]);

  useEffect(() => {
    console.log(newJoineePeerDetail);
    debugger;
    if (
      newJoineePeerDetail.peerId &&
      userRef.current.userType === 'organiser' &&
      peerConnectionRef.current.peer
    ) {
      connectToNewUserUsingPeer(
        streamRef.current,
        peerConnectionRef.current.peer,
        newJoineePeerDetail.peerId,
        // newJoineePeerDetail.userId,
        // meetingIdRef.current,
        addLiveVideosToState
      );
    }
  }, [newJoineePeerDetail.peerId]);

  async function startMediaCapture(videoElement = "") {
    debugger;
    try {
      streamRef.current = await localMediaStream({ video: true, audio: !true });
      if (streamRef.current) {
        // const _video = document.getElementById("main-video");
        // _video.style.margin = "10px";
        // _video.srcObject = streamRef.current;
        addVideoStreamDetailsToUser(streamRef.current.id, userRef.current.userId, meetingIdRef.current);
        addLiveVideosToState({ stream: streamRef.current });

        // if (participantList.length) {
        //     const remoteParticipants = participantList.filter(participant => participant.userType !== 'organiser');
        //     console.log();
        //     streamMediaUsingCall(streamRef.current, peerConnectionRef.current.peer, remoteParticipants);
        //     console.log(remoteParticipants, 'participantList');
        // }

        // listenAndAnswerIncomingCall(streamRef.current, peerConnectionRef.current.peer);
        //console.log(participantList, 'participantList');
        //streamMediaUsingCall();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function toggleVideo() {
    setVideoStreamState((prevstate) => ({
      ...prevstate,
      video: !prevstate.video,
      action: "video"
    }));
  }

  function toggleAudio() {
    setVideoStreamState((prevstate) => ({
      ...prevstate,
      audio: !prevstate.audio,
      action: "audio"
    }));
  }

  function handleVideoTrack() {
    if (streamRef.current) {
      streamRef.current
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    }
  }

  function handleAudioTrack() {
    if (streamRef.current) {
      streamRef.current
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    }
  }

  function handleVideoVolume() {
    setVideoVolume((prevstate) => !prevstate);
  }

  function addLiveVideosToState(data) {
    // const { userId, peerId, meetingId, stream } = data;
    // const liveStreams = [...meetingLiveStreams];
    // const index = liveStreams.findIndex(
    //     (stream) => stream.userId === userId && stream.meetingId === meetingId
    // );

    // if (index !== -1) {
    //     liveStreams[index] = { userId, peerId, meetingId, stream };
    // } else {
    //     liveStreams.push({ userId, peerId, meetingId, stream });
    // }
    // setMeetingLiveStreams(liveStreams);


    console.log(meetingVideoStreamsRef.current, 'meetingVideoStreamsRef');






    setMeetingLiveStreams((prevstate) => [...prevstate, data.stream]);

    const finalVideoStreams = [];
    const tempVideoStreams = [...meetingLiveStreams, data.stream];

   meetingVideoStreamsRef.current.forEach(participant => {
      
   });
  }

  const UserMediaContextProps = {
    startMediaCapture,
    streamRef,
    toggleVideo,
    toggleAudio,
    videoStreamState,
    handleVideoTrack,
    handleAudioTrack,
    handleVideoVolume,
    videoVolume,
    meetingLiveStreams
  };

  console.log(meetingLiveStreams, "meetingLiveStreams");

  return (
    <UserMediaContext.Provider value={UserMediaContextProps}>
      {children}
    </UserMediaContext.Provider>
  );
}

export function useUserMediaContext() {
  return useContext(UserMediaContext);
}
