export async function localMediaStream(mediaStreamConstraints) {
  try {
    return await window.navigator.mediaDevices.getUserMedia(
      mediaStreamConstraints
    );
  } catch (err) {
    console.log(err);
  }
}
