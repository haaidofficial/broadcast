import { createContext, useContext, useState, useRef, useEffect } from "react";
import { localMediaStream } from "../services/localMediaStream";
import { initPeerConnection, initRemotePeerConnection, streamMediaUsingCall, listenAndAnswerIncomingCall, connectToNewUserUsingPeer } from "../services/RTCPeerConnection";
import { useSocketContext } from "./socket-context";

const UserMediaContext = createContext();

export function UserMediaProvider({ children }) {
    const streamRef = useRef(null);
    const [videoStreamState, setVideoStreamState] = useState({ audio: false, video: false, action: '' });
    const [videoVolume, setVideoVolume] = useState(true);
    const { meetingIdRef, socket, participantList, peerConnectionRef,newJoineePeerId } = useSocketContext();


    // useEffect(async () => {
    //     try {
    //         streamRef.current = await localMediaStream({ video: true, audio: true });
    //         if (streamRef.current) {

    //             //console.log(participantList, 'participantList');
    //             //streamMediaUsingCall();
    //         }
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }, []);

    // useEffect(() => {
    //     if (participantList.length) {
    //         const remoteParticipants = participantList.filter(participant => participant.userType !== 'organiser');
    //         console.log();
    //         streamMediaUsingCall(streamRef.current, peerConnectionRef.current.peer, remoteParticipants);
    //         console.log(remoteParticipants, 'participantList');
    //     }
    // }, [participantList.length]);


    useEffect(() => {
        startMediaCapture('');
    });

    useEffect(() => {
            if(newJoineePeerId){
                connectToNewUserUsingPeer(streamRef.current, peerConnectionRef.current.peer, newJoineePeerId)
            }
    }, [newJoineePeerId]);


    async function startMediaCapture(videoElement='') {
        try {
            streamRef.current = await localMediaStream({ video: true, audio: !true });
            if (streamRef.current) {
                const _video = document.getElementById('main-video');
                _video.style.margin = '10px'
                _video.srcObject = streamRef.current
                listenAndAnswerIncomingCall(streamRef.current, peerConnectionRef.current.peer) 
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