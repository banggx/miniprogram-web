import type { PageModuleInfo, PageModuleCompileInfo } from '@/types/common';


export class PageModule {
  type: string = 'page';
  /**
   * Page 模块配置信息
   */
  moduleInfo: PageModuleInfo;
  /**
   * page 模块编译信息
   */
  compileInfo: PageModuleCompileInfo;

  constructor(moduleInfo: PageModuleInfo, compileInfo: PageModuleCompileInfo) {
    this.moduleInfo = moduleInfo;
    this.compileInfo = compileInfo;
  }

  getInitialData() {
    const moduleData = this.moduleInfo.data || {};
    
    return {
      ...moduleData,
    }
  }
}