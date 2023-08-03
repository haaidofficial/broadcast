import { Peer } from "peerjs";
import { v4 as UUIDV4 } from "uuid";

export function initPeerConnection() {
    const peerId = UUIDV4();

    const peer = new Peer(peerId);

    // return peer;
    return new Promise((resolve, reject) => {
        peer.on("open", (peerId) => {
            resolve({
                peer,
                peerId
            });
        });
    });

    // return {
    //     peerConnection: connection,
    //     peerId,
    // }

    // peer.on('open', () => {
    //     console.log('open');
    // });

    // peer.on('connection', (connection) => {

    //     peerIdRef.current = peerId;

    //     // peer.on('data', (data) => {
    //     //     console.log(data);
    //     // });

    // })

    // console.log(peer, connection);
}

export function connectToNewUserUsingPeer(stream, peer, peerId, userId, meetingId, stateUpdaterCB) {
    debugger;
    const call = peer.call(peerId, stream);

    call.on("stream", (remoteStream) => {
        stateUpdaterCB({
            // meetingId,
            // peerId,
            stream: remoteStream,
            // userId
        });
        // console.log("remoteStream", remoteStream);
        // const video = document.createElement("video");
        // video.srcObject = remoteStream;
        // video.addEventListener("loadedmetadata", () => {
        //     video.play();
        // });
        // video.style.position = "absolute";
        // video.style.width = "200px";
        // video.style.height = "200px";
        // video.style.background = "green";
        // video.style.margin = "20px";

        // document.body.append(video);
    });
}

export function listenAndAnswerIncomingCall(stream, peer, stateUpdaterCB) {
    debugger;
    peer.on("call", (call) => {

        call.answer(stream);

        debugger;
        call.on("stream", (remoteStream) => {
            console.log(call.peer);
            stateUpdaterCB({
                stream: remoteStream,
            });
            // console.log("remoteStream", remoteStream);
            // const video = document.createElement("video");
            // video.srcObject = remoteStream;
            // video.addEventListener("loadedmetadata", () => {
            //     video.play();
            // });
            // video.style.position = "absolute";
            // video.style.width = "200px";
            // video.style.height = "200px";
            // video.style.background = "green";
            // video.style.margin = "20px";

            // document.body.append(video);
        });
    });
}

export function streamMediaUsingCall(stream, peer, peerIdArray) {
    peerIdArray.forEach((user) => {
        // debugger
        const call = peer.call(user.peerId, stream);
        console.log(call, "remote video");

        call.on("stream", (_stream) => {
            // console.log(_stream, '_stream');
        });
    });

    console.log(stream, peer, peerIdArray);
}

export function initRemotePeerConnection(
    stream,
    socket,
    meetingId,
    remoteVideo,
    description
) {
    console.log(description, "description");
    const remoteConnection = new RTCPeerConnection();
    remoteConnection.ondatachannel = (event) => {
        const channel = event.channel;
        channel.onopen = (event) => {
            channel.send("Hi back!");
        };
        channel.onmessage = (event) => {
            console.log(event.data);
        };
    };

    const remoteDescription = remoteConnection.setRemoteDescription(description);

    remoteDescription
        .then((res) => {
            remoteConnection.createAnswer();
        })
        .then((sdp) => {
            remoteConnection.setLocalDescription(sdp);
        })
        .then(() => {
            // debugger;
            socket.emit("answer", {
                rc: remoteConnection.localDescription,
                meetingId
            });
        });

    remoteDescription.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };

    stream.getTracks().forEach((track) => {
        remoteConnection.addTrack(track, stream);
        console.log(track, remoteConnection);
    });
}
