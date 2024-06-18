import type { UIPageModuleInfo } from '@/types/common';


export class PageModule {
  type: string = 'page';
  /**
   * Page 模块配置信息
   */
  moduleInfo: UIPageModuleInfo;
  /**
   * 初始化data
   */
  data: Record<string, any> = {};

  constructor(moduleInfo: UIPageModuleInfo) {
    this.moduleInfo = moduleInfo;
  }

  setInitialData(data: Record<string, any>) {
    this.data = data;
  }
}