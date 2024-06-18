export interface IMessage {
  type: string;
  body: any;
}

export interface AppModuleInfo {
  onLaunch?: (options) => void;
  onShow?: (options) => void;
  onHide?: () => void;
  globalData?: any;
  [key: string]: any;
}

export interface PageModuleInfo {
  data?: Record<string, any>;
  onLoad?: (options) => void;
  onShow?: (options) => void;
  onReady?: () => void;
  onHide?: () => void;
  onUnload?: () => void;
  [key: string]: any;
}

export interface PageModuleCompileInfo {
  path: string;
}

export interface AppOpenInfo {
  pagePath: string;
  scene?: number;
  query?: Record<string, any>;
}

export interface PageStackInfo {
  pagePath: string;
  query?: Record<string, any>;
  bridgeId: string;
}