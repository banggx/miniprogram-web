import { getTargetPath } from '../../env';
import fse from 'fs-extra';

export function writeFile(compileResult) {
  let mergeCode = '';
  compileResult.forEach(compileInfo => {
    const { code, moduleId } = compileInfo;

    const amdCode = `
      modDefine('${moduleId}', function (require, module, exports) {
        ${code}
      });
    `;
    mergeCode += amdCode;
  });

  fse.writeFileSync(`${getTargetPath()}/logic.js`, mergeCode);
}