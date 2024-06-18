import { uuid } from '@native/utils/util';
import { type Application } from './application';

export abstract class View {
  /**
   * 页面ID
   */
  id: string;
  /**
   * 页面存在的应用父级
   */
  parent: Application | null = null;
  /**
   * 页面根节点
   */
  abstract el: HTMLElement;
  constructor() {
    this.id = `ui_view_${uuid()}`;
  }

  abstract viewDidLoad();

  /**
   * 页面退出生命周期
   */
  onPresentOut() {};

  /**
   * 页面进入生命周期
   */
	onPresentIn() {};
}