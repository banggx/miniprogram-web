import { queryPath } from '@native/utils/util';
import { getMiniAppInfo } from '@native/service';
import { MiniAppSandbox } from '@native/core/miniAppSandbox/miniAppSandbox';
import type{ AppInfo } from "@native/types/common";
import { type Application } from "../application/application";

export class AppManager {
  static appStack: MiniAppSandbox[] = [];

  static async openApp(opts: AppInfo, wx: Application) {
    const { appId, path, scene } = opts;
    const { pagePath, query } = queryPath(path);
    const { appName, logo } = await getMiniAppInfo(appId);

    const cacheApp = this.getAppById(appId);
    if (cacheApp) {
      wx.presentView(cacheApp, true);
    } else {
      const miniApp = new MiniAppSandbox({
        appId,
        scene,
        logo,
        query,
        path: pagePath,
        name: appName,
      });
      this.appStack.push(miniApp);
      wx.presentView(miniApp, false);
    }
  }

  static getAppById(appId: string) {
    for (let idx = 0; idx < this.appStack.length; idx++) {
      if (this.appStack[idx].appId === appId) {
        return this.appStack[idx];
      }
    }
    return null;
  }

  static closeApp(miniApp: MiniAppSandbox) {
    miniApp.parent?.dismissView({
      destroy: false,
    });
  }
}