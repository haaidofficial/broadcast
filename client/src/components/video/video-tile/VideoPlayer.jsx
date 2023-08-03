import { useEffect, useRef } from "react";
// import { useUserMediaContext } from "../../../contexts/user-media-context";
import "./index.css";

export function VideoPlayer({ videoStream }) {

    const userVideoRef = useRef(null);

    useEffect(() => {
        debugger
        userVideoRef.current.srcObject = videoStream;
    }, []);

    return (
        <>
            <video id="main-video" ref={userVideoRef} autoPlay>
                <source type="video/mp4" />
            </video>
        </>
    );
}


