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

export function streamMediaUsingCall(stream, peer, peerIdArray) {

    peerIdArray.forEach(user => {
        debugger
        const call = peer.call(user.peerId, stream);
        console.log(call, '_stream');

        call.on('stream', (_stream) => {
            console.log(_stream, '_stream');
        });


    });

    console.log(stream, peer, peerIdArray);


}



export function listenAndAnswerIncomingCall(stream, peer) {
    peer.on('call', (call) => {
        call.answer(stream);

        call.on('stream', (stream) => {
            console.log(stream);
        });
    });
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
            debugger;
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
