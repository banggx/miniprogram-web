import { getAppConfigInfo, getWorkPath } from '../../env';
import { buildByPagePath, buildByFullPath } from './buildByPagePath';
import { writeFile } from './writeFile';

export function compileJS() {
  const { pages } = getAppConfigInfo();
  const workPath = getWorkPath();
  const appjsPath = `${workPath}/app.js`;
  const compileResult = [];
  
  // 编译页面的js文件
  pages.forEach(pagePath => {
    buildByPagePath(pagePath, compileResult);
  });

  // 编译app.js文件
  buildByFullPath(appjsPath, compileResult);
  writeFile(compileResult);
}