/**
 * ui线程资源加载器
 * 
 * staticModules: 存储小程序App和页面模块配置数据
 * 
 * - loadResources(opts): void 加载小程序资源
 * - createAppModule(moduleInfo: AppModuleInfo): void 创建小程序App模块
 * - createPageModule(moduleInfo: PageModuleInfo, compileInfo: PageModuleCompileInfo): void 创建小程序页面模块
 * - getInitialDataByPagePath(path: string): any 根据页面路径获取对应页面初始数据
 */
import { AppModule } from './appModule';
import { PageModule } from './pageModule';
import type { AppModuleInfo, PageModuleInfo, PageModuleCompileInfo } from '@/types/common';

interface LoaderResourceOpts {
  appId: string;
  pages: string[];
}
class Loader {
  staticModules: Record<string, AppModule | PageModule>;
  constructor() {
    this.staticModules = {};
  }

  loadResources(opts: LoaderResourceOpts) {
    const { appId, pages } = opts;
    // 拼接模版资源loader路径
    const logicResourcePath = `http://localhost:3077/mini_resource/${appId}/logic.js`;
    globalThis.importScripts(logicResourcePath);
    globalThis.modRequire('app'); // 加载小程序App模块
    pages.forEach(pathPath => {
      globalThis.modRequire(pathPath); // 加载小程序页面模块
    });
  }

  createAppModule(moduleInfo: AppModuleInfo) {
    const appModule = new AppModule(moduleInfo);
    this.staticModules['app'] = appModule;
  }

  createPageModule(moduleInfo: PageModuleInfo, compileInfo: PageModuleCompileInfo) {
    const pageModule = new PageModule(moduleInfo, compileInfo);
    const { path } = compileInfo;
    this.staticModules[path] = pageModule;
  }

  getInitialDataByPagePath(path: string) {
    const pageModule = this.staticModules[path] as PageModule;
    return {
      [path]: pageModule.getInitialData(),
    };
  }

  getModuleByPath(path: string) {
    return this.staticModules[path];
  }
} 

export default new Loader(); 

