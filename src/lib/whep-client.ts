export default class WHEPClient {
  private peerConnection: RTCPeerConnection | null = null;
  private videoElement: HTMLVideoElement;
  private whepUrl: string;

  constructor({ video, whepUrl }: { video: HTMLVideoElement; whepUrl: string }) {
    this.videoElement = video;
    this.whepUrl = whepUrl;
  }

  async load() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: ['stun:stun.l.google.com:19302'] },
      ],
    });

    // Set remote stream to video element
    this.peerConnection.ontrack = (event) => {
      if (this.videoElement.srcObject !== event.streams[0]) {
        this.videoElement.srcObject = event.streams[0];
      }
    };

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);

    // WHEP: POST offer to the server and get back answer
    const res = await fetch(this.whepUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sdp',
      },
      body: offer.sdp,
    });

    const answerSDP = await res.text();
    const answer = new RTCSessionDescription({
      type: 'answer',
      sdp: answerSDP,
    });

    await this.peerConnection.setRemoteDescription(answer);
  }

  destroy() {
    if (this.peerConnection) {
      this.peerConnection.getSenders().forEach((sender) => {
        if (sender.track) sender.track.stop();
      });
      this.peerConnection.close();
      this.peerConnection = null;
    }

    if (this.videoElement.srcObject) {
      (this.videoElement.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      this.videoElement.srcObject = null;
    }
  }
}
