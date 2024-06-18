import './style.less';
import tpl from './tpl.html';
import { AppManager } from '@native/core/appManager/appManager';
import { View } from '@native/core/application/view';
import { Bridge } from '@native/core/bridge';
import { JSCore } from '@native/core/jscore';
import { readFile, mergePageConfig } from './util';
import { sleep, queryPath } from '@native/utils/util';
import { type Application } from '../application/application';
import type { OpenMiniAppOpts, BridgeParams, IMessage, NavigateToParams, OpenPageParams, OpenMiniProgram } from '@native/types/common';

export class MiniAppSandbox extends View {
  /**
   * 小程序appId
   */
  appId: string;
  /**
   * 小程序App信息
   */
  app: OpenMiniAppOpts;
  /**
   * 父级application实例
   */
  parent: Application | null = null;
  /**
   * 小程序根节点
   */
  el: HTMLElement;
  /**
   * 小程序 app 配置
   */
  appConfig: Record<string, any> | null = null;
  /**
   * bridge列表
   */
  bridgeList: Bridge[] = [];
  /**
   * bridge ID -> bridge 实例的映射 
   */
  bridges: Record<string, Bridge> = {};
  /**
   * 当前小程序的 jscore 实例
   * 
   * 一个小程序公用一个唯一的 jscore 实例，用于执行小程序的 js 代码
   */
  jscore: JSCore;
  /**
   * 小程序webview的挂载节点
   */
  webviewContainer: HTMLElement | null = null;
  /**
   * webview 页面切换动画是否结束
   */
  webviewAnimaEnd: boolean = true;

  constructor(opts: OpenMiniAppOpts) {
    super();
    this.app = opts;
    this.appId = opts.appId;
    this.jscore = new JSCore();
    this.jscore.parent = this;
    this.el = document.createElement('div');
    this.el.classList.add('wx-native-view');
    // 注册jscore事件
    this.jscore.addEventListener('message', this.jscoreMessageHandler.bind(this))
  }

  /**
   * 小程序页面初始化
   */
  viewDidLoad() {
    this.initPageFrame();
    this.webviewContainer = this.el.querySelector('.wx-mini-app__webviews');
    this.showLaunchScreen();
    this.bindCloseEvent();
    /**
     * 小程序初始化
     */
    this.initApp();
  }

  async initApp() {
    this.jscore?.init();
    // 1. 拉去小程序资源
    await sleep(1000);

    // 2. 读取配置文件
    const configPath = `${this.app.appId}/config.json`;
    const configContent = await readFile(configPath);
    this.appConfig = JSON.parse(configContent);

    // 3. 设置状态栏的颜色模式
    const entryPagePath = this.app.path || this.appConfig!.entryPagePath;
    this.updateTargetPageColorStyle(entryPagePath)

    // 4. 创建通信桥 bridge
    const pageConfig = this.appConfig!.modules?.[entryPagePath];
    const entryPageBridge = await this.createBridge({
      jscore: this.jscore!,
      isRoot: true,
      appId: this.app.appId,
      pagePath: entryPagePath,
      pages: this.appConfig!.app.pages,
      query: this.app.query,
      scene: this.app.scene,
      configInfo: mergePageConfig(this.appConfig!.app, pageConfig),
    });
    this.bridgeList.push(entryPageBridge);

    // 5. 触发应用的初始化逻辑
    entryPageBridge.start();

    // 6. 隐藏启动动画
    this.hideLaunchScreen();
  }

  // 创建一个通信 bridge 对象
  async createBridge(opts: BridgeParams) {
    const bridge = new Bridge(opts);
    bridge.parent = this;
    // 初始化 bridge
    await bridge.init();

    return bridge;
  }

  onPresentIn() {
    console.log('onPresentIn');

    // 触发当前页面的onShow
    const currentBridge = this.bridgeList[this.bridgeList.length - 1];
    currentBridge && currentBridge.appShow();
    currentBridge && currentBridge.pageShow();
  }

  onPresentOut() {
    console.log('onPresentOut'); 

    // 触发当前页面的onHide
    const currentBridge = this.bridgeList[this.bridgeList.length - 1];
    currentBridge && currentBridge.appHide();
    currentBridge && currentBridge.pageHide();
  }
 
  initPageFrame() {
    this.el.innerHTML = tpl;
  }

  /**
   * 设置指定页面的状态栏颜色模式
   */
  updateTargetPageColorStyle(pagePath: string) {
    if (!pagePath) {
      this.updateActionColorStyle('black');
      return;
    }

    const pageConfig = this.appConfig!.modules?.[pagePath];
    const mergeConfig = mergePageConfig(this.appConfig!.app, pageConfig);
    const { navigationBarTextStyle } = mergeConfig;
    this.updateActionColorStyle(navigationBarTextStyle);
  }

  /**
   * 显示小程序加载状态
   */
	showLaunchScreen() {
		const launchScreen = this.el.querySelector('.wx-mini-app__launch-screen') as HTMLElement;
		const name = this.el.querySelector('.wx-mini-app__name') as HTMLElement;
		const logo = this.el.querySelector('.wx-mini-app__logo-img-url') as HTMLImageElement;

		this.updateActionColorStyle('black');
		name.innerHTML = this.app.name;
		logo.src = this.app.logo;
		launchScreen.style.display = 'block';
	}

  hideLaunchScreen() {
    const startPage = this.el.querySelector('.wx-mini-app__launch-screen') as HTMLElement;
    startPage.style.display = 'none';
  }

  updateActionColorStyle(color: string) {
		const action = this.el.querySelector('.wx-mini-app-navigation__actions') as HTMLElement;

		if (color === 'white') {
			action.classList.remove('wx-mini-app-navigation__actions--black');
			action.classList.add('wx-mini-app-navigation__actions--white');
		}

		if (color === 'black') {
			action.classList.remove('wx-mini-app-navigation__actions--white');
			action.classList.add('wx-mini-app-navigation__actions--black');
		}

		this.parent?.updateStatusBarColor(color);
	}

  bindCloseEvent() {
		const closeBtn = this.el.querySelector('.wx-mini-app-navigation__actions-close') as HTMLElement;

		closeBtn.onclick = () => {
			AppManager.closeApp(this);
		};
	}

  jscoreMessageHandler(msg: IMessage) {
    const { type, body } = msg;
    if (type !== 'triggerWXApi') {
      return;
    }
    const { apiName, params } = body;
    this[apiName]?.(params);
  }

  createCallback(callbackId: string) {
    const self = this;
    return function(...args: any) {
      self.jscore.postMessage({
        type: 'triggerCallback',
        body: {
          callbackId,
          args
        }
      })
    }
  }

  navigateTo(params: NavigateToParams) {
    const { url, success } = params;
    const { pagePath, query } = queryPath(url);
    const successCallback = success ? this.createCallback(success) : undefined;
    
    this.openPage({
      pagePath: pagePath.replace(/^\//, ''),
      query,
      onSuccess: successCallback
    });
  }

  async navigateBack() {
    if (this.bridgeList.length < 2) {
      return;
    }
    
    if (!this.webviewAnimaEnd) {
      return;
    }

    this.webviewAnimaEnd = false;
    const currentBridge = this.bridgeList.pop()!;
    const preBridge = this.bridgeList[this.bridgeList.length - 1];

    // 更新状态栏颜色
    this.updateTargetPageColorStyle(preBridge.opts.pagePath);
    // 当前页面推出
    currentBridge.webview!.el.classList.add('wx-native-view--before-enter');
		currentBridge.webview!.el.classList.add('wx-native-view--enter-anima');
    // 触发当前页面生命周期
    currentBridge.destroy();

    // 上一个页面推入
    preBridge.webview!.el.classList.remove('wx-native-view--slide-out');
		preBridge.webview!.el.classList.add('wx-native-view--instage');
		preBridge.webview!.el.classList.add('wx-native-view--enter-anima');

    // 触发上一个页面的生命周期函数
		preBridge.pageShow && preBridge.pageShow();
    await sleep(540); 
		this.webviewAnimaEnd = true;

    // 页面进入后移出动画相关class
		preBridge.webview!.el.classList.remove('wx-native-view--enter-anima');
		preBridge.webview!.el.classList.remove('wx-native-view--instage');
		currentBridge.webview!.el.parentNode?.removeChild(currentBridge.webview!.el);
  }

  async openPage(opts: OpenPageParams) {
    if (!this.webviewAnimaEnd) {
      return;
    }
    this.webviewAnimaEnd = false;
    
    const { pagePath, query, onSuccess } = opts;
    
    // 更新状态栏颜色
    this.updateTargetPageColorStyle(pagePath);

    // 创建新的bridge
    const pageConfig = this.appConfig!.modules[pagePath];
    const bridge = await this.createBridge({
      pagePath,
      query,
      scene: this.app.scene,
      jscore: this.jscore,
      isRoot: false,
      appId: this.app.appId,
      pages: this.appConfig!.app.pages,
      configInfo: mergePageConfig(this.appConfig!.app, pageConfig),
    });
    
    // 获取前一个bridge，以及其webview
    const preBridge = this.bridgeList[this.bridgeList.length - 1];
    const preWebview = preBridge.webview!;

    this.bridgeList.push(bridge);
    this.bridges[bridge.id] = bridge;

    // 触发新页面的初始化逻辑
    bridge.start(false);

    // 上一个页面推出
    preWebview.el.classList.remove('wx-native-view--instage');
		preWebview.el.classList.add('wx-native-view--slide-out');
		preWebview.el.classList.add('wx-native-view--linear-anima');
    preBridge.pageHide?.();

    // 新页面推入
    bridge.webview!.el.style.zIndex = `${this.bridgeList.length + 1}`;
		bridge.webview!.el.classList.add('wx-native-view--enter-anima');
		bridge.webview!.el.classList.add('wx-native-view--instage');
    await sleep(540);

    // 移除相关动画
    this.webviewAnimaEnd = true;
    preWebview.el.classList.remove('wx-native-view--linear-anima');
		bridge.webview!.el.classList.remove('wx-native-view--before-enter');
		bridge.webview!.el.classList.remove('wx-native-view--enter-anima');
		bridge.webview!.el.classList.remove('wx-native-view--instage');
    onSuccess && onSuccess();
  }

  navigateToMiniProgram(opts: OpenMiniProgram) {
    const { appId, path } = opts;
    AppManager.openApp({
      appId,
      path,
      scene: 1037,
    }, this.parent!)
    console.log('navigateToMiniProgram', appId, path);
  }
}