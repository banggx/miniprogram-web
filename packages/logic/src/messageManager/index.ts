/**
 * messageManager class
 * 原生层消息处理
 * 
 * - message: Message 通信对象
 * - init(): void 消息监听注册
 */
import message, { type Messgae } from '@/message';
import loader from '@/loader';
import runtimeManager from '@/runtimeManager';
import callback from '@/callback';

class messageManager {
  message: Messgae;

  constructor() {
    this.message = message;
  }

  init() {
    this.message.receive('loadResource', (msg) => {
      const { appId, bridgeId, pages } = msg;
      loader.loadResources({ appId, pages });
      this.message.send({
        type: 'logicResourceLoaded',
        body: {
          bridgeId
        }
      })
    });

    this.message.receive('createApp', (msg) => {
      const { bridgeId, scene, pagePath, query } = msg;
      runtimeManager.createApp({
        scene,
        pagePath,
        query,
      });
      // 发送消息给原生层，告知app创建完毕
      this.message.send({
        type: 'appIsCreated',
        body: {
          bridgeId
        }
      })
    });

    this.message.receive('appShow', () => {
      runtimeManager.appShow();
    });

    this.message.receive('pageShow', (msg) => {
      const { bridgeId } = msg;
      runtimeManager.pageShow({ id: bridgeId });
    });

    this.message.receive('appHide', () => {
      runtimeManager.appHide();
    });

    this.message.receive('pageHide', (msg) => {
      const { bridgeId } = msg;
      runtimeManager.pageHide({ id: bridgeId });
    })

    this.message.receive('makePageInitialData', (msg) => {
      const { bridgeId, pagePath } = msg;
      const initialData = loader.getInitialDataByPagePath(pagePath);
      this.message.send({
        type: 'initialDataReady',
        body: {
          bridgeId,
          initialData,
        }
      })
    });

    this.message.receive('createInstance', (msg) => {
      runtimeManager.createPage(msg);
    });

    this.message.receive('moduleMounted', (msg) => {
      runtimeManager.pageReady(msg);
    });

    this.message.receive('pageScroll', (msg) => {
      runtimeManager.pageScroll(msg);
    });

    this.message.receive('pageUnload', (msg) => {
      const { bridgeId } = msg;
      runtimeManager.pageUnload({ id: bridgeId });
    })

    this.message.receive('triggerEvent', (msg) => {
      runtimeManager.triggerEvent(msg);
    });

    this.message.receive('triggerCallback', (msg) => {
      const { callbackId, args } = msg;
      callback.triggerCallback(callbackId, args);
    });
  }
} 

export default new messageManager();