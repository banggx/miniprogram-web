import { MiniAppSandbox } from "../miniAppSandbox/miniAppSandbox";
import mitt, { Emitter } from 'mitt';
import type { IMessage } from "@native/types/common";

/**
 * JSCore js逻辑执行的逻辑线程
 * 
 * id: string jscore唯一标识
 * worker: Worker 逻辑线程
 * 
 * + init(): void 初始化jscore
 * + postMessage(message: any): void 向逻辑线程发送消息
 * + addEventListener(type: string, listener: (event: any) => void): void 监听逻辑线程消息
 */
export class JSCore {
  /**
   * 父级小程序实例
   */
  parent: MiniAppSandbox | null = null;
  /**
   * jscore worker实例
   */
  worker: Worker | null = null;
  /**
   * jscore event emitter实例
   */
  event: Emitter<Record<string, any>>;
  constructor() {
    this.event = mitt();
  }

  async init() {
    const jsContent = await fetch('http://localhost:3100/logic/core.js');
    const codeString = await jsContent.text();
    const jsBlob = new Blob([codeString], { type: 'text/javascript' });
    const urlObj = URL.createObjectURL(jsBlob);
    this.worker = new Worker(urlObj);
    this.worker.addEventListener('message', (e) => {
      const msg = e.data;
      this.event.emit('message', msg)
    });
  }

  /**
   * 向逻辑线程发送消息
   */
  postMessage(msg: IMessage) {
    this.worker?.postMessage(msg);
  }

  /**
   * 监听逻辑线程消息
   */
  addEventListener<T = any>(type: string, listener: (event: T) => void) {
    this.event.on(type, listener);
  }
}
