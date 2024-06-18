/**
 * 处理线程间函数无法传递的问题，把函数包装成一个对象，通过一个id标识，回调时通过id匹配执行
 */
import { uuid } from '@/utils/util';

type AnyFunc = (...args: any[]) => any;
class Callback {
  callback: Record<string, AnyFunc> = {};

  saveCallback(callback: AnyFunc) {
    const functionId = `function_id:${uuid()}`;
    this.callback[functionId] = callback;
    return functionId;
  }

  triggerCallback(callbackId, args) {
    const callbackFucntion = this.callback[callbackId];
    if (callbackFucntion) {
      callbackFucntion(...args);
      delete this.callback[callbackId];
    }
  }
}

export default new Callback();