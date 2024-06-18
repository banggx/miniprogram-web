import type { AppModuleInfo } from '@/types/common';


export class AppModule {
  type: string = 'app';
  /**
   * App 模块配置信息
   */
  moduleInfo: AppModuleInfo;

  constructor(moduleInfo: AppModuleInfo) {
    this.moduleInfo = moduleInfo;
  }
}