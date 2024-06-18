/**
 * RuntimeManager class
 * 渲染线程运行管理器
 * 
 * page: Vue页面实例
 * pageId: 页面实例ID
 * firstRender(): void; 首次渲染
 */
import { set } from 'lodash';
import loader from '@/loader';
import message from '@/message';
import type { UIFirstRenderOpts } from '@/types/common';

class RuntimeManager {
  page: any;
  pageId: string = '';
  /**
   * ui线程的实例映射
   */
  uiInstance: Record<string, any> = {};
  constructor() {
    this.page = null;
  }

  firstRender(opts: UIFirstRenderOpts) {
    const { pagePath, bridgeId } = opts;
    const options = this.makeVueOptions({
      path: pagePath,
      bridgeId,
    });
    // 因为渲染线程和bridge是一一对应的，所以可以直接用bridgeId作为页面实例ID
    this.pageId = bridgeId;
    const root = document.querySelector('#root') as HTMLElement;
    this.page = new window.Vue(options).$mount();
    root.appendChild(this.page.$el);
    const self = this;
    root.addEventListener('scroll', function() {
      message.send({
        type: 'pageScroll',
        body: {
          id: self.pageId,
          scrollTop: root.scrollTop,
        }
      })
    }, false)
  }

  makeVueOptions(opts) {
    const { path, bridgeId } = opts;
    const pageModule = loader.getModuleByPath(path);
    const self = this;
    const { scopeId } = pageModule.moduleInfo;

    return {
      _scopeId: scopeId,
      data() {
        return {
          ...pageModule.data,
        };
      },
      beforeCreate() {
        (this as any)._bridgeInfo = {
          id: self.pageId,
        };
      },
      created() {
        self.uiInstance[self.pageId] = this;
        message.send({
          type: 'moduleCreated',
          body: {
            path,
            id: self.pageId,
          }
        });
      },
      mounted() {
        message.send({
          type: 'moduleMounted',
          body: {
            id: self.pageId,
          }
        });
      },
      render: pageModule.moduleInfo.render,
    }
  }

  updateModule(opts) {
    const { id, data } = opts;
    const viewModule = this.uiInstance[id];
    for (const key in data) {
      set(viewModule,  key, data[key]);
    }
  }
}

export default new RuntimeManager();