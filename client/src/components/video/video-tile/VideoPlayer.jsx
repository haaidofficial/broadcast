import { useEffect, useRef } from "react";
// import { useUserMediaContext } from "../../../contexts/user-media-context";
import "./index.css";
import { KeyOffTwoTone } from "@mui/icons-material";

export function VideoPlayer({ videoStream, key }) {
  const userVideoRef = useRef(null);

  useEffect(() => {
    userVideoRef.current.srcObject = videoStream;
  }, [videoStream]);

  return (
    <>
      <video ref={userVideoRef} autoPlay key={KeyOffTwoTone}>
        <source type="video/mp4" />
      </video>
    </>
  );
}
