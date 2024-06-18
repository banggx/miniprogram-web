export interface IMessage {
  type: string;
  body: any;
}

export interface UIPageModuleInfo {
  path: string;
  render: () => void;
  usingComponents?: Record<string, string>;
  scopeId?: string;
}

export interface UIFirstRenderOpts {
  pagePath: string;
  bridgeId: string;
}