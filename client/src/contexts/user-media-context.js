import { createContext, useContext, useState, useRef, useEffect } from "react";
import { localMediaStream } from "../services/localMediaStream";
import { initPeerConnection, initRemotePeerConnection } from "../services/RTCPeerConnection";
import { useSocketContext } from "./socket-context";

const UserMediaContext = createContext();

export function UserMediaProvider({ children }) {
    const streamRef = useRef(null);
    const [videoStreamState, setVideoStreamState] = useState({ audio: false, video: false, action: '' });
    const [videoVolume, setVideoVolume] = useState(true);
    const { meetingIdRef, socket } = useSocketContext();


    async function startMediaCapture(videoElement) {
        try {
            streamRef.current = await localMediaStream({ video: true, audio: true });
            if (streamRef.current) {
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    function toggleVideo() {
        setVideoStreamState(prevstate => ({ ...prevstate, video: !prevstate.video, action: 'video' }));
    }

    function toggleAudio() {
        setVideoStreamState(prevstate => ({ ...prevstate, audio: !prevstate.audio, action: 'audio' }));
    }


    function handleVideoTrack() {
        if (streamRef.current) {
            streamRef.current.getVideoTracks().forEach(track => track.enabled = !track.enabled);
        }

    }

    function handleAudioTrack() {
        if (streamRef.current) {
            streamRef.current.getAudioTracks().forEach(track => track.enabled = !track.enabled);
        }
    }


    function handleVideoVolume() {
        setVideoVolume(prevstate => !prevstate);
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
        videoVolume
    };


    return <UserMediaContext.Provider value={UserMediaContextProps}>
        {children}
    </UserMediaContext.Provider>
}


export function useUserMediaContext() {
    return useContext(UserMediaContext);
}