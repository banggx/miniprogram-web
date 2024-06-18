import { type JSCore } from "@native/core/jscore";

export interface AppInfo {
  appId: string;
  path: string;
  name?: string;
  logo?: string;
  scene?: number;
  [key: string]: any;
}

export type OpenMiniAppOpts = Required<Omit<AppInfo, 'scene'>> & {
  scene?: number;
}

export interface BridgeParams {
  jscore: JSCore;
  configInfo: Record<string, any>;
  appId: string;
  pagePath: string;
  pages: string[];
  query?: Record<string, any>;
  scene?: number;
  isRoot?: boolean;
}

export interface WebviewParams {
  configInfo: Record<string, any>;
  isRoot?: boolean;
}

export interface IMessage {
  type: string;
  body: any;
}

export interface NavigateToParams {
  url: string;
  success?: string;
}

export interface OpenPageParams {
  pagePath: string;
  query?: Record<string, any>;
  onSuccess?: (...args: any[]) => void;
}

export interface OpenMiniProgram {
  appId: string;
  path: string;
}