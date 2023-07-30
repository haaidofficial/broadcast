import { useEffect, useRef } from "react";
import { useUserMediaContext } from "../../../contexts/user-media-context";
import "./index.css";

export function VideoTile() {
  const {
    streamRef,
    mediaStream,
    startMediaCapture,
    videoStreamState,
    handleVideoTrack,
    handleAudioTrack
  } = useUserMediaContext();
  const userVideoRef = useRef(null);

  useEffect(() => {
    if (videoStreamState.action === "video") {
      if (videoStreamState.video) {
        startMediaCapture(userVideoRef.current);
      } else {
        handleVideoTrack();
      }
    } else if (videoStreamState.action === "audio") {
      handleAudioTrack();
    }
  }, [videoStreamState]);

  return (
    <>
      <div className="user-video-container">
        <div className="user-video">
          <video ref={userVideoRef} autoPlay>
            <source type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}
