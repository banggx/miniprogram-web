/**
 * 模拟调用开放平台接口，获取app信息
 */
interface MiniAppInfo {
	appName: string;
	logo: string;
}
const appInfo = {
	douyin: {
		appName: '抖音',
		logo: 'https://img.zcool.cn/community/0173a75b29b349a80121bbec24c9fd.jpg@1280w_1l_2o_100sh.jpg'
	},

	meituan: {
		appName: '美团',
		logo: 'https://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9528bfdf/20201023%E7%94%A8%E6%88%B7%E6%9C%8D%E5%8A%A1logo/%E7%BE%8E%E5%9B%A2app.png'
	},

	jingdong: {
		appName: '京东',
		logo: 'https://ts1.cn.mm.bing.net/th/id/R-C.8e130498abf4685d15ecb977869a5a39?rik=%2f%2bLRdQM48y8y0A&riu=http%3a%2f%2fwww.xiue.cc%2fwp-content%2fuploads%2f2017%2f09%2fjd.jpg&ehk=hUzDTV9xjw%2flaGD5eZcKGl%2fN7UkzBSHRjo73I%2bMeVvo%3d&risl=&pid=ImgRaw&r=0'
	}
};

export function getMiniAppInfo(appId: string) {
  return new Promise<MiniAppInfo>((resolve) => {
    resolve(appInfo[appId]);
  })
}