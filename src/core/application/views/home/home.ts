import './home.less';
import tpl from './home.html';
import { View } from '@native/core/application/view';
import { MiniAppListView } from '../miniAppList/miniAppList';

export class HomeView extends View {
  el: HTMLElement;
  constructor() {
    super();
    this.el = document.createElement('div');
    this.el.classList.add('wx-native-view');
  }

  viewDidLoad() { 
    this.el.innerHTML = tpl;
    this.bindEvent();
  }

  bindEvent() {
    const btn = this.el.querySelector('.weixin-app__miniprogram-entry') as HTMLElement;
    btn.onclick = () => {
      this.jumpToMiniProgram();
    }
  }

  jumpToMiniProgram() {
    const appListPage = new MiniAppListView();
    this.parent?.pushView(appListPage);
  }
}