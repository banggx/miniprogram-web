import fse from 'fs-extra';
import { getTargetPath, getAppConfigInfo, getModuleConfigInfo } from '../../env';

export function compileJSON() {
  const distPath = getTargetPath();
  const compileResultInfo = {
    app: getAppConfigInfo(),
    modules: getModuleConfigInfo()
  };

  const jsonStr = JSON.stringify(compileResultInfo, null, 2);
  fse.writeFileSync(`${distPath}/config.json`, jsonStr);
}