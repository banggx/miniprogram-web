import './style.less';
import template from './template.html';
import { componentProxy } from '@/proxy';
import videojs from 'video.js';
import '../../lib/video.less';

componentProxy('ui-video', {
	template,
  props: {
    id: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    muted: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    poster: {
      type: String,
      default: '',
    }
  },
  methods: {
    createVideo() {
      const video = (this as any).$el.querySelector('video');
      (this as any).video = videojs(video, {
        autoplay: (this as any).autoplay,
        controls: (this as any).controls,
        muted: (this as any).muted,
        loop: (this as any).loop,
        poster: (this as any).poster,
      });
    },
    msgHandler() {
      (window as any).message.receive('pauseVideo', (msg) => {
        console.log('receive pauseVideo message', msg);
        const { videoId } = msg;
        if (videoId !== (this as any).id) {
          return;
        }
        (this as any).video.pause();
      });
      (window as any).message.receive('playVideo', (msg) => {
        const { videoId } = msg;
        if (videoId !== (this as any).id) {
          return;
        }
        (this as any).video.play();
      });
    }
  },
  mounted() {
    this.createVideo(); 
    this.msgHandler();
  }
});