import { getAppConfigInfo } from '../env';
import { uuid } from '../utils/util';

export function getModuleDeps() {
  const result: Record<string, any> = {};
  const { pages } = getAppConfigInfo();

  pages.forEach(pagePath => {
    result[pagePath] = {
      path: pagePath,
      moduleId: uuid(), 
    }
  });

  return result;
}