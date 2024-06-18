import loader from '@/loader';
import type { UIPageModuleInfo } from '@/types/common';

class GlobalApi {
  constructor() {}

  init() {
    window.Page = (moduleInfo: UIPageModuleInfo) => {
      loader.createPageModule(moduleInfo);
    }
  }
}

export default new GlobalApi(); 