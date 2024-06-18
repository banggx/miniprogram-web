import { cloneDeep, isFunction, set } from 'lodash';
import { PageModule } from "@/loader/pageModule";
import message from '@/message';

const LifecycleMethods = ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload', 'onPageScroll'];
export class Page {
  /**
   * 页面模块
   */
  pageModule: PageModule;
  // 扩展参数
  extraOption: Record<string, any>;
  // 对应ui线程的页面id
  id: string;
  /**
   * 页面数据
   */
  data: Record<string, any>;

  constructor(pageModule: PageModule, extraOption: Record<string, any>) {
    this.pageModule = pageModule;
    this.extraOption = extraOption;
    this.id = extraOption.id;
    this.data = cloneDeep(pageModule.moduleInfo.data || {});
    this.initLifecycle();
    this.initMethods();
    // 触发onload生命周期
    (this as any).onLoad?.(this.extraOption.query || {});
    (this as any).onShow?.();
  }

  /**
   * 初始化page生命周期
   */
  initLifecycle() {
    LifecycleMethods.forEach(name => {
      const lifecycle = this.pageModule.moduleInfo[name];
      if (!isFunction(lifecycle)) {
        return; 
      }
      this[name] = lifecycle.bind(this);
    })
  }

  /**
   * 初始化用户的自定义函数
   */
  initMethods() {
    const moduleInfo = this.pageModule.moduleInfo;
    for (let attr in moduleInfo) {
      if (isFunction(moduleInfo[attr]) && !LifecycleMethods.includes(attr)) {
        this[attr] = moduleInfo[attr].bind(this);
      }
    }
  }

  /**
   * 页面响应式数据更新
   */
  setData(data: Record<string, any>) {
    for (let key in data) {
      set(this.data, key, data[key]);
    }
    // 发送最新的数据到渲染线程
    message.send({
      type: 'updateModule',
      body: {
        id: this.id,
        data: this.data,
        bridgeId: this.id,
      }
    })
  }
}