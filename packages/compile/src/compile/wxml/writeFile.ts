import fse from 'fs-extra';
import { getTargetPath } from '../../env';

export function writeFile(list: any) {
  let codeMere = '';
  const distPath = getTargetPath();
  list.forEach((compileInfo) => {
    const { code } = compileInfo;

    codeMere += code;
  });

  fse.writeFileSync(`${distPath}/view.js`, codeMere);
}