import './style.less';
import tpl from './tpl.html';
import { uuid } from '@native/utils/util';
import mitt, { Emitter } from 'mitt';
import { type Bridge } from '@native/core/bridge';
import type { IMessage, WebviewParams } from '@native/types/common';

export class Webview {
  /**
   * webview 初始化参数
   */
  opts: WebviewParams;
  /**
   * webview id
   */
  id: string;
  /**
   * webview dom 元素
   */
  el: HTMLElement;
  /**
   * 当前webview 的父容器 Bridge
   */
  parent: Bridge | null = null;
  /**
   * 当前webview 对应的iframe
   */
  iframe: HTMLIFrameElement;
  /**
   * 渲染线程消息事件
   */
  event: Emitter<Record<string, any>>;

  constructor(opts: WebviewParams) {
    this.opts = opts;
    this.id = `webview-${uuid()}`;
    this.el = document.createElement('div');
    this.el.classList.add('wx-native-view');
    this.el.innerHTML = tpl;
    this.setInitialStyle();
    this.iframe = this.el.querySelector('.wx-native-webview__window') as HTMLIFrameElement;
    this.iframe.name = this.id;
    this.event = mitt();
    this.bindBackEvent();
  }

  /**
   * webview 初始化
   */
  async init(callback: () => void) {
    await this.frameLoaded();
    const iframeWindow = window.frames[this.iframe.name];
    // 挂载原生层接收UI层消息的方法
    iframeWindow.JSBridge.onReceiveUIMessage = (message: IMessage) => {
      this.event.emit('message', message);
    }
    callback && callback();
  }

  postMessage(message: IMessage) {
    const iframeWindow = window.frames[this.iframe.name];
    if (iframeWindow) {
      iframeWindow.JSBridge.onReceiveNativeMessage(message);
    }
  }

  bindBackEvent() {
    const backBtn = this.el.querySelector('.wx-native-webview__navigation-left-btn') as HTMLElement;
    backBtn.onclick = () => {
      this.parent!.parent?.navigateBack();
    };
  }

  /**
   * 监听渲染线程消息
   */
  addEventListener<T = any>(type: string, listener: (event: T) => void) {
    this.event.on(type, listener);
  }

  frameLoaded() {
    return new Promise<void>((resolve) => {
      this.iframe.onload = () => {
        resolve();
      }
    });
  }

  /**  
   * 设置初始化webview样式
  */
  setInitialStyle() {
    const config = this.opts.configInfo;
		const webview = this.el.querySelector('.wx-native-webview') as HTMLElement;
		const pageName = this.el.querySelector('.wx-native-webview__navigation-title') as HTMLElement;
		const navigationBar = this.el.querySelector('.wx-native-webview__navigation') as HTMLElement;
		const leftBtn = this.el.querySelector('.wx-native-webview__navigation-left-btn') as HTMLElement;
		const root = this.el.querySelector('.wx-native-webview__root') as HTMLElement;

    if (this.opts.isRoot) {
      leftBtn.style.display = 'none';
    } else {
      leftBtn.style.display = 'block';
    }

		if (config.navigationBarTextStyle === 'white') {
			navigationBar.classList.add('wx-native-webview__navigation--white');
		} else {
			navigationBar.classList.add('wx-native-webview__navigation--black');
		}

		if (config.navigationStyle === 'custom') {
			webview.classList.add('wx-native-webview--custom-nav');
		}

		root.style.backgroundColor = config.backgroundColor;
		navigationBar.style.backgroundColor = config.navigationBarBackgroundColor;
		pageName.innerText = config.navigationBarTitleText;
  }
}