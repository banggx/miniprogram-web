/**
 * Messgae Class
 * 逻辑线程的通信模块
 * 
 * field: 消息类型
 * event: 事件对象
 * 
 * - init(): void; 初始化消息类
 * - receive(messageType, handler): void 接收原生层消息
 * - send(data): void 发送消息到原生层
 */
import mitt, { Emitter } from 'mitt';
import type { IMessage } from '@/types/common';

export class Messgae {
  event: Emitter<Record<string, any>>;
  constructor() {
    this.event = mitt<Record<string, any>>();
    this.init();
  }

  init() {
    globalThis.addEventListener('message', (e) => {
      /**
       * {
       *  type: string, 消息类型
       *  body: any, 消息体
       * }
       */
      const msg = e.data;
      const { type, body } = msg;
      this.event.emit(type, body);
    });
  }

  receive(type: string, callback: (data: any) => void) {
    this.event.on(type, callback);
  }

  send(message: IMessage) {
    globalThis.postMessage(message);
  }
}

export default new Messgae();