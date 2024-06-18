import path from 'path';
import fse from 'fs-extra';
import { getWorkPath, getAppId, getTargetPath } from '../env';

export function publish(publishPath: string) {
  const workPath = getWorkPath();
  const absolutePath = path.resolve(workPath, publishPath);
  const appId = getAppId();
  const distPath = getTargetPath();
  
  fse.emptyDirSync(`${absolutePath}/${appId}`);
  fse.ensureDirSync(`${absolutePath}/${appId}`);
  fse.copySync(distPath, `${absolutePath}/${appId}/`);
}