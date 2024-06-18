import fse from 'fs-extra';
import { saveEnvInfo, getTargetPath } from '../env';
import { compileJSON } from '../compile/json';
import { getModuleDeps } from '../toolkit/getModuleDeps';
import { compileWxml } from '../compile/wxml';
import { compileJS } from '../compile/js';
import { compileWxss } from '../compile/wxss';
import { publish } from '../publish';

export async function build(publishPath) {
  // 保存编译环境信息
  saveEnvInfo();
  // 创建dist文件夹，保存输出文件
  if (fse.pathExistsSync(getTargetPath())) {
    fse.emptyDirSync(getTargetPath());
  }
  fse.ensureDirSync(getTargetPath());
  // 编译配置文件
  compileJSON();
  // 编译wxml模版文件
  const moduleDeps = getModuleDeps();
  compileWxml(moduleDeps);
  // 编译js文件
  compileJS();
  // 编译wxss文件
  await compileWxss(moduleDeps);

  // 发布到消费目录
  publish(publishPath);
}