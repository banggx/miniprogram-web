/**
 * messageManager class
 * ui层消息处理
 * 
 * - message: Message 通信对象
 * - init(): void 消息监听注册
 */
import message, { type Messgae } from '@/message';
import loader from '@/loader';
import runtimeManager from '@/runtimeManager';

class messageManager {
  message: Messgae;

  constructor() {
    (window as any).message = message;
    this.message = message;
  }

  init() {
    this.message.receive('loadResource', (msg) => {
      const { appId, pagePath } = msg;
      loader.loadResources({ appId, pagePath }).then(() => {
        this.message.send({
          type: 'uiResourceLoaded',
          body: {}
        })
      });
    });

    this.message.receive('setInitialData', (msg) => {
      const { bridgeId, pagePath, initialData } = msg;
      loader.setInitialData(initialData)
      runtimeManager.firstRender({
        pagePath,
        bridgeId
      });
    });

    this.message.receive('updateModule', (msg) => {
      runtimeManager.updateModule(msg);
    });

    this.message.receive('showToast', (msg) => {
      window.wxComponentsApi.showToast(msg);
    });
  }
}

export default new messageManager(); 