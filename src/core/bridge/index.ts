import { uuid } from '@native/utils/util';
import { MiniAppSandbox } from '@native/core/miniAppSandbox/miniAppSandbox';
import { Webview } from '@native/core/webview/webview';
import type { BridgeParams, IMessage } from '@native/types/common';
import { type JSCore } from '@native/core/jscore';

export class Bridge {
  /**
   * bridge id
   */
  id: string;
  /**
   * bridge 关联的 webview 渲染线程
   */
  webview: Webview | null = null;
  /**
   * bridge 关联的 jscore 逻辑线程
   */
  jscore: JSCore;
  /**
   * 小程序应用 app 实例
   */
  parent: MiniAppSandbox | null = null;
  /**
   * bridge 加载资源状态
   */
  status: number = 0;

  opts: BridgeParams;

  constructor(opts: BridgeParams) {
    this.id = `bridge_${uuid()}`;
    this.opts = opts;
    this.jscore = opts.jscore;
    this.jscore.addEventListener('message', this.jscoreMessageHandler.bind(this));
  }

  jscoreMessageHandler(message: IMessage) {
    const { type, body } = message;
    if (body.bridgeId !== this.id) {
      return;
    }
    switch (type) {
      case 'logicResourceLoaded':
        this.status++;
        this.createApp();
        break;
      case 'appIsCreated':
        this.status++;
        this.notifyMakeInitialData();
        break;
      case 'initialDataReady':
        this.status++;
        this.setInitialData(body);
        break;
      case 'updateModule':
        this.updateModule(body);
        break;
      case 'showToast':
        this.showToast(body);
        break;
      case 'pauseVideo':
        this.pauseVideo(body);
        break;
      case 'playVideo':
        this.playVideo(body);
        break;
    }
  }

  uiMessageHandler(message: IMessage) {
    const { type, body } = message;
    switch (type) {
      case 'uiResourceLoaded':
        this.status++;
        this.createApp();
        break;
      case 'moduleCreated':
        this.uiInstanceCreated(body);
        break;
      case 'moduleMounted':
        this.uiInstanceMounted(body);
        break;
      case 'pageScroll':
        this.pageScroll(body);
        break;
      case 'triggerEvent':
        this.triggerEvent(body);
        break;
    }
  }

  async init() {
    this.webview = await this.createWebView();
    this.webview.addEventListener('message', this.uiMessageHandler.bind(this));
  }

  /**
   * 创建当前bridge关联的webview渲染线程
   */
  createWebView() {
    return new Promise<Webview>((resolve) => {
      const webview = new Webview({
        configInfo: this.opts.configInfo,
        isRoot: this.opts.isRoot,
      });
      webview.parent = this;
      webview.init(() => {
        resolve(webview);
      });
      this.parent?.webviewContainer?.appendChild(webview.el);
    });
  }

  /**
   * bridge 通知逻辑线程和渲染线程加载小程序资源
   */
  start(loadLogicSource = true) {
    // 通知渲染线程加载资源
    this.webview?.postMessage({
      type: 'loadResource',
      body: {
        appId: this.opts.appId,
        pagePath: this.opts.pagePath,
      }
    });

    if (loadLogicSource) {
      // 通知逻辑线程加载资源
      this.jscore.postMessage({
        type: 'loadResource',
        body: {
          appId: this.opts.appId,
          bridgeId: this.id,
          pages: this.opts.pages,
        }
      });
    } else {
      this.status++;
    }
  }

  // 通知逻辑线程创建小程序 App 实例
  createApp() {
    if (this.status !== 2) {
      return;
    }

    console.log('create app');
    // 向逻辑线程发送创建app的消息
    this.jscore.postMessage({
      type: 'createApp',
      body: {
        bridgeId: this.id,
        scene: this.opts.scene,
        pagePath: this.opts.pagePath,
        query: this.opts.query,
      }
    })
  }

  notifyMakeInitialData() {
    this.jscore.postMessage({
      type: 'makePageInitialData',
      body: {
        bridgeId: this.id,
        pagePath: this.opts.pagePath,
      }
    })
  }

  setInitialData(payload) {
    const { initialData } = payload;

    this.webview?.postMessage({
      type: 'setInitialData',
      body: {
        initialData,
        bridgeId: this.id,
        pagePath: this.opts.pagePath,
      }
    })
  }

  uiInstanceCreated(payload) {
    const { path, id } = payload;
    
    this.jscore.postMessage({
      type: 'createInstance',
      body: {
        id,
        path,
        bridgeId: this.id,
        query: this.opts.query,
      }
    })
  }

  uiInstanceMounted(payload) {
    const { id } = payload;

    this.jscore.postMessage({
      type: 'moduleMounted',
      body: { id }
    });
  }

  pageScroll(payload) {
    const { id, scrollTop } = payload;
    this.jscore.postMessage({
      type: 'pageScroll',
      body: {
        id,
        scrollTop,
      }
    });
  }

  destroy() {
    this.jscore.postMessage({
      type: 'pageUnload',
      body: {
        bridgeId: this.id,
      }
    })
  }
 
  appShow() {
    if (this.status < 2) {
      return;
    }
    // 向逻辑线程发送app显示的消息
    this.jscore.postMessage({
      type: 'appShow',
      body: {}
    });
  }

  appHide() {
    if (this.status < 2) {
      return;
    }
    // 向逻辑线程发送app显示的消息
    this.jscore.postMessage({
      type: 'appHide',
      body: {}
    });
  }

  pageShow() {
    if (this.status < 2) {
      return;
    }
    // 向逻辑线程发送app显示的消息
    this.jscore.postMessage({
      type: 'pageShow',
      body: {
        bridgeId: this.id,
      }
    });
  }

  pageHide() {
    if (this.status < 2) {
      return;
    }
    // 向逻辑线程发送app显示的消息
    this.jscore.postMessage({
      type: 'pageHide',
      body: {
        bridgeId: this.id,
      } 
    });
  }

  triggerEvent(payload) {
    const { id, methodName, paramsList } = payload;

    this.jscore.postMessage({
      type: 'triggerEvent',
      body: {
        id,
        methodName,
        paramsList
      }
    })
  }

  updateModule(payload) {
    const { id, data } = payload;
    this.webview?.postMessage({
      type: 'updateModule',
      body: {
        id,
        data,
      }
    });
  }

  showToast(payload) {
    const { params } = payload;
    this.webview?.postMessage({
      type: 'showToast',
      body: {
        ...params,
      }
    })
  }

  pauseVideo(payload) {
    this.webview?.postMessage({
      type: 'pauseVideo',
      body: {
        ...payload,
      }
    })
  }

  playVideo(payload) {
    this.webview?.postMessage({
      type: 'playVideo',
      body: {
        ...payload,
      }
    })
  }
}