/**
 * 小程序wx相关api
 */
import message from '@/message';
import callback from '@/callback';
import navigation from '@/navigation';
import { VideoContext } from './videoContext';

class Weixin {
  constructor() {}
  
  navigateTo(opts) {
    const { url, success } = opts;
    const successId = callback.saveCallback(success);
    message.send({
      type: 'triggerWXApi',
      body: {
        apiName: 'navigateTo',
        params: {
          url,
          success: successId,
        },
      },
    });
  }

  navigateBack(opts) {
    message.send({
      type: 'triggerWXApi',
      body: {
        apiName: 'navigateBack',
        params: {},
      },
    });
  }

  // 跳转到其他小程序
  navigateToMiniProgram(opts) {
    const { appId, path } = opts;
    message.send({
      type: 'triggerWXApi',
      body: {
        apiName: 'navigateToMiniProgram',
        params: {
          appId,
          path,
        },
      },
    });
  }

  showToast(opts) {
    const currentPageInfo = navigation.getCurrentPageInfo();
    message.send({
      type: 'showToast',
      body: {
        bridgeId: currentPageInfo.bridgeId,
        params: opts,
      }
    })
  }

  createVideoContext(videoId) {
    return new VideoContext({
      videoId
    });
  }
}

export default new Weixin();