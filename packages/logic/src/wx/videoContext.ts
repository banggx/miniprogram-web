import message from "@/message";
import navigation from "@/navigation";

interface VideoContextOptions {
  videoId: string;
}

export class VideoContext {
  opts: VideoContextOptions;
  constructor(opts: VideoContextOptions) {
    this.opts = opts;
  }

  pause() {
    const currentPageInfo = navigation.getCurrentPageInfo();
    message.send({
      type: 'pauseVideo',
      body: {
        videoId: this.opts.videoId,
        bridgeId: currentPageInfo.bridgeId
      }
    });
  }

  play() {
    const currentPageInfo = navigation.getCurrentPageInfo();
    message.send({
      type: 'playVideo',
      body: {
        videoId: this.opts.videoId,
        bridgeId: currentPageInfo.bridgeId
      }
    });
  }
}