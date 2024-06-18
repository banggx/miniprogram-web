import './device.less';
import tpl from './device.html';
import { type Application } from '../application/application';

export class Device {
  /**
   * 设备挂载节点
   */
  root: HTMLElement | null = null;
  /**
   * 设备内部应用容器
   */
  appContainer: HTMLElement | null = null;

  constructor() {
    this.root = document.querySelector('#root');
    this.init();
  }

  init() {
    if (this.root) {
      this.root.innerHTML = tpl;
      this.appContainer = this.root.querySelector('.iphone__apps');
      this.updateDeviceBarColor('black');
    }
  }

  updateDeviceBarColor(color: 'black' | 'white') {
    if (!this.root) return;
    const statusBar = this.root.querySelector('.iphone__status-bar');
    const homeBar = this.root.querySelector('.iphone__home-touch-bar');
    if (color === 'black') {
      statusBar?.classList.remove('iphone__status-bar--white');
      statusBar?.classList.add('iphone__status-bar--black');

      homeBar?.classList.remove('iphone__home-touch-bar--white');
      homeBar?.classList.add('iphone__home-touch-bar--black');
    }
    if (color === 'white') {
      statusBar?.classList.remove('iphone__status-bar--black');
      statusBar?.classList.add('iphone__status-bar--white');

      homeBar?.classList.remove('iphone__home-touch-bar--black');
      homeBar?.classList.add('iphone__home-touch-bar--white');
    }  
  }

  open(app: Application) {
    app.parent = this;
    this.appContainer?.appendChild(app.el!);
  }
}