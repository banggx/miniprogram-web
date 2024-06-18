import './application.less';
import { uuid, sleep } from '@native/utils/util';
import { type Device } from '../device/device';
import { type View } from './view';
import { type MiniAppSandbox } from '@native/core/miniAppSandbox/miniAppSandbox';

export class Application {
  /**
   * 组件节点
   */
  el: HTMLElement | null = null;
  /**
   * 应用页面挂载节点
   */
  window: HTMLElement | null = null;
  /**
   * 存储应用的视图
   */
  views: View[] = [];
  /**
   * 根视图
   */
  rootView: View | null = null;
  /**
   * 父级设备
   */
  parent: Device | null = null;
  /**
   * 页面加载状态
   */
  done: boolean = true;

  constructor() {
    this.init();
  }

  init() {
    this.el = document.createElement('div');
    this.el.classList.add('wx-application');
    this.window = document.createElement('div');
    this.window.classList.add('wx-native-window');
    this.el.appendChild(this.window);
  }

  initRootView(view: View) {
    this.rootView = view;
    view.parent = this;
    view.el.classList.add('wx-native-view--instage');
    view.el.style.zIndex = '1';
    this.views.push(view);
    this.window?.appendChild(view.el);
    view.viewDidLoad();
  }

  async pushView(view: View) {
    if (!this.done) {
			return;
		}
		this.done = false;

    // 在页面栈里找到上一个视图
    const preView = this.views[this.views.length - 1];
    
    // 当前页面入栈
    view.parent = this;
    this.views.push(view);
    view.el.style.zIndex = `${this.views.length}`;
    this.window?.appendChild(view.el);
    view.viewDidLoad();
    await sleep(1);

    // 上一个页面向左推出
    preView.el.classList.remove('wx-native-view--instage');
    preView.el.classList.add('wx-native-view--slide-out');
		preView.el.classList.add('wx-native-view--linear-anima');

    // 当前页面向左推入
    view.el.classList.add('wx-native-view--enter-anima');
		view.el.classList.add('wx-native-view--instage');
    await sleep(540);
    this.done = true;
    
    // 移除动画类
    preView.el.classList.remove('wx-native-view--linear-anima');
		view.el.classList.remove('wx-native-view--before-enter');
		view.el.classList.remove('wx-native-view--enter-anima');
		view.el.classList.remove('wx-native-view--instage');
  }

  async popView() {
    if (this.views.length < 2) {
      return;
    }

    if (!this.done) {
      return;
    }

    this.done = false;
    const preView = this.views[this.views.length - 2];
    const currentView = this.views[this.views.length - 1];

    // 前一个页面向右推入
    preView.el.classList.remove('wx-native-view--slide-out');
		preView.el.classList.add('wx-native-view--instage');
		preView.el.classList.add('wx-native-view--enter-anima');

    // 当前页面向右推出
    currentView.el.classList.remove('wx-native-view--instage');
		currentView.el.classList.add('wx-native-view--before-enter');
		currentView.el.classList.add('wx-native-view--enter-anima');

    await sleep(540);
		this.done = true;
		this.views.pop();
		this.window?.removeChild(currentView.el);
		preView.el.classList.remove('wx-native-view--enter-anima');
  }

  /**
   * 拉起小程序页面
   * @param view 
   * @param useCache 
   * @returns 
   */
  async presentView(view: MiniAppSandbox, useCache: boolean = false) {
    if (!this.done) {
			return;
		}
		this.done = false;

    const preView = this.views[this.views.length - 1];
    view.parent = this;
		view.el.style.zIndex = `${this.views.length + 1}`;
		view.el.classList.add('wx-native-view--before-present');
		view.el.classList.add('wx-native-view--enter-anima');
		preView.el.classList.add('wx-native-view--before-presenting');
		preView.el.classList.remove('wx-native-view--instage');
		preView.el.classList.add('wx-native-view--enter-anima');
		preView.onPresentOut();
		view.onPresentIn();
		!useCache && this.el?.appendChild(view.el);
		this.views.push(view);
		!useCache && view.viewDidLoad();
		await sleep(20);
		preView.el.classList.add('wx-native-view--presenting');
		view.el.classList.add('wx-native-view--instage');
		await sleep(540);
		this.done = true;
		view.el.classList.remove('wx-native-view--before-present');
		view.el.classList.remove('wx-native-view--enter-anima');
		preView.el.classList.remove('wx-native-view--enter-anima');
		preView.el.classList.remove('wx-native-view--before-presenting');
  }

  /**
   * 退出小程序
   * @returns 
   */
  async dismissView(opts: any = {}) {
    if (!this.done) {
			return;
		}
		this.done = false;

		const preView = this.views[this.views.length - 2];
		const currentView = this.views[this.views.length - 1];
		const { destroy = true } = opts;

		currentView.el.classList.add('wx-native-view--enter-anima');
		preView.el.classList.add('wx-native-view--enter-anima');
		preView.el.classList.add('wx-native-view--before-presenting');
		await sleep(0);
		currentView.el.classList.add('wx-native-view--before-present');
		currentView.el.classList.remove('wx-native-view--instage');
		preView.el.classList.remove('wx-native-view--presenting');

		preView.onPresentIn();
		currentView.onPresentOut(); 
		
		await sleep(540);
		this.done = true;
		destroy && this.el!.removeChild(currentView.el);
		this.views.pop();
		preView.el.classList.remove('wx-native-view--enter-anima');
		preView.el.classList.remove('wx-native-view--before-presenting');
  }

  updateStatusBarColor(color) {
		this.parent?.updateDeviceBarColor(color);
	}
}