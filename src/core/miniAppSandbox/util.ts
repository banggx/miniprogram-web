import axios from 'axios';

export function readFile(filePath: string) {
  return new Promise<string>((resolve) => {
    axios.get('/mini_resource/' + filePath, { responseType: 'text' }).then(res => {
      resolve(res.data);
    })
  })
}

export function mergePageConfig(appConfig: Record<string, any>, pageConfig: Record<string, any>) {
  const result: Record<string, any> = {};
  const appWindowConfig = appConfig.window || {};
  const pagePrivateConfig = pageConfig || {};

  result.navigationBarTitleText = pagePrivateConfig.navigationBarTitleText || appWindowConfig.navigationBarTitleText || '';
	result.navigationBarBackgroundColor = pagePrivateConfig.navigationBarBackgroundColor || appWindowConfig.navigationBarBackgroundColor || '#000';
	result.navigationBarTextStyle = pagePrivateConfig.navigationBarTextStyle || appWindowConfig.navigationBarTextStyle || 'white';
	result.backgroundColor = pagePrivateConfig.backgroundColor || appWindowConfig.backgroundColor || '#fff';
	result.navigationStyle = pagePrivateConfig.navigationStyle || appWindowConfig.navigationStyle || 'default';

  return result;
}