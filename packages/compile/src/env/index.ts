import fse from 'fs-extra';

interface IPathInfo {
  workPath?: string;
  targetPath?: string;
}

interface IConfigInfo {
  projectInfo?: Record<string, any>;
  appInfo?: Record<string, any>;
  moduleInfo?: Record<string, Record<string, any>>;
}

const pathInfo: IPathInfo = {};
const configInfo: IConfigInfo = {};

export function saveEnvInfo() {
  savePathInfo();
  saveProjectConfig();
  saveAppConfig();
  saveModuleConfig();
}

function savePathInfo() {
  pathInfo.workPath = process.cwd();
  pathInfo.targetPath = `${pathInfo.workPath}/dist`;
}

function saveProjectConfig() {
  const filePath = `${pathInfo.workPath}/project.config.json`;
  const projectInfo = fse.readJsonSync(filePath);
  configInfo.projectInfo = projectInfo;
}

function saveAppConfig() {
  const filePath = `${pathInfo.workPath}/app.json`;
  const appInfo = fse.readJsonSync(filePath);
  configInfo.appInfo = appInfo;
}

function saveModuleConfig() {
  const { pages } = configInfo.appInfo!;
  configInfo.moduleInfo = {};
  pages.forEach(pagePath => {
    const pageConfigFullPath = `${pathInfo.workPath}/${pagePath}.json`;
    const pageConfig = fse.readJsonSync(pageConfigFullPath);

    configInfo.moduleInfo![pagePath] = pageConfig;
  })
}

export function getTargetPath() {
  return pathInfo.targetPath!;
}

export function getWorkPath() {
  return pathInfo.workPath!;
}

export function getAppConfigInfo() {
  return configInfo.appInfo!;
}

export function getModuleConfigInfo() {
  return configInfo.moduleInfo!;
}

export function getAppId() {
  return configInfo.projectInfo!.appid;
}