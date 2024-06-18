/**
 * 小程序导航相关api
 */
import { PageStackInfo } from '@/types/common';

class Navigation {
  stack: PageStackInfo[] = [];
  constructor() {
    
  }

  pushState(pageInfo: PageStackInfo) {
    this.stack.push(pageInfo);
  }

  popState() {
    return this.stack.pop();
  }

  getCurrentPageInfo() {
    return this.stack[this.stack.length - 1] || null;
  }
}

export default new Navigation();