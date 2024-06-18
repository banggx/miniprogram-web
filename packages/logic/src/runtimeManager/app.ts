import { isFunction } from 'lodash';
import type { AppModuleInfo, AppOpenInfo } from "@/types/common";

const LifecycleMethods = ['onLaunch', 'onShow', 'onHide'];
export class App {
  /**
   * 应用注册信息
   */
  moduleInfo: AppModuleInfo;
  /**
   * 页面打开信息
   */
  openInfo: AppOpenInfo;
  constructor(moduleInfo: AppModuleInfo, openInfo: AppOpenInfo) {
    this.moduleInfo = moduleInfo;
    this.openInfo = openInfo;
    this.init();
  } 

  /**
   * 初始化App
   */
  init() {
    this.initLifecycle();
    (this as any).onLaunch?.(this.openInfo);
    (this as any).onShow?.(this.openInfo);
  }

  /**
   * 初始化app生命周期
   */
  initLifecycle() {
    LifecycleMethods.forEach(name => {
      const lifecycle = this.moduleInfo[name];
      if (!isFunction(lifecycle)) {
        return;
      }
      this[name] = lifecycle.bind(this);
    })
  }

  /**
   * 触发onShow生命周期
   */
  callShowLifecycle() {
    const { pagePath, query, scene } = this.openInfo;
    const options = {
      scene,
      query,
      path: pagePath,
    };
    (this as any).onShow?.(options); 
  }
}