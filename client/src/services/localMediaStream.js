export async function localMediaStream(mediaStreamConstraints) {
  const userMedia = window.navigator.mediaDevices.getUserMedia || window.navigator.mediaDevices.webkitGetUserMedia || window.navigator.mediaDevices.mozGetUserMedia
  try {
    return await userMedia(
      mediaStreamConstraints
    );
  } catch (err) {
    console.log(err);
  }
}

