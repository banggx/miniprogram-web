/**
 * runtimeManager class
 * 运行管理器
 * 
 * - app: App 小程序实例
 * - pages: Pages页面实例
 * 
 * - createApp(): void 创建App实例
 * - appHide(): void 调用应用 onHide生命周期函数
 * - appShow(): void 调用应用 onShow生命周期函数
 * - getApp(): App 获取App实例
 */

import loader from '@/loader';
import { App } from './app';
import { Page } from './page';
import { PageModule } from '@/loader/pageModule';
import navigation from '@/navigation';

interface RuntimManagerCreateAppOpts {
  scene: number;
  pagePath: string;
  query?: Record<string, any>;
}
export interface CreatePageOpts {
  path: string;
  id: string;
  bridgeId: string;
  query?: Record<string, any>;
}
class RuntimManager {
  /**
   * App实例
   */
  app: App | null = null;
  /**
   * 对应渲染线程的页面实例
   */
  pages: Record<string, Page> = {}
  constructor() {}

  createApp(opts: RuntimManagerCreateAppOpts) {
    const { scene, pagePath, query } = opts;
    const appModuleInfo = loader.staticModules.app.moduleInfo;
    if (this.app) {
      return;
    }

    this.app = new App(appModuleInfo, {
      scene,
      pagePath,
      query,
    })
  }

  createPage(opts: CreatePageOpts) {
    const { id, path, query, bridgeId } = opts;
    const pageModule = loader.getModuleByPath(path) as PageModule;
    navigation.pushState({
      bridgeId,
      query,
      pagePath: path,
    });
    this.pages[id] = new Page(pageModule, opts);
  }

  appShow() {
    this.app?.callShowLifecycle();
  }

  pageShow(opts) {
    const { id } = opts;
    const page = this.pages[id];
    (page as any)?.onShow?.();
  }

  appHide() {
    this.app?.moduleInfo.onHide?.();
  }

  pageHide(opts) {
    const { id } = opts;
    const page = this.pages[id];
    (page as any)?.onHide?.();
  }

  pageReady(opts) {
    const { id } = opts;
    const page = this.pages[id];
    (page as any)?.onReady?.();
  }

  pageScroll(opts) {
    const { id, scrollTop } = opts;
    const page = this.pages[id];
    (page as any)?.onPageScroll?.({
      scrollTop,
    });
  }

  pageUnload(opts) {
    const { id } = opts;
    const page = this.pages[id];
    navigation.popState();
    (page as any)?.onUnload?.();
    // 销毁当前页面实例
    delete this.pages[id];
  }

  triggerEvent(opts) {
    const { id, methodName, paramsList } = opts;
    const page = this.pages[id];
    (page as any)?.[methodName]?.(...paramsList);
  }
}

export default new RuntimManager();