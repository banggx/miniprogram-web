function sum(a, b) {
	return a + b;
}

function uuid(len = 10) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const userInfo = {
  zhuzhu: {
    bg: '//miniapp.ai-matrix.vip/lib/zhuzhu_bg.jpg',
    user_photo: '//miniapp.ai-matrix.vip/lib/user-zhu.jpg',
    user_name: '好端端的猪',
    dy_number: '7386837930',
    like: '2401.9万',
    sub: '2',
    fans: '271.6万',
  },

  dancer: {
    bg: '//miniapp.ai-matrix.vip/lib/dancer_bg.jpg',
    user_photo: '//miniapp.ai-matrix.vip/lib/dancer.jpg',
    user_name: 'FERNWANG',
    dy_number: '5383937930',
    like: '1.3亿',
    sub: '311',
    fans: '765.2万',
  },

  bll: {
    bg: '//miniapp.ai-matrix.vip/lib/shop_bg.jpg',
    user_photo: '//miniapp.ai-matrix.vip/lib/y.jpg',
    user_name: '不理理-',
    dy_number: '5583937930',
    like: '166.4万',
    sub: '237',
    fans: '94.1万',
  },

  xie: {
    bg: '//miniapp.ai-matrix.vip/lib/x_bg.jpg',
    user_photo: '//miniapp.ai-matrix.vip/lib/xie.jpg',
    user_name: '锋味',
    dy_number: '2283937930',
    like: '5973.6万',
    sub: '20',
    fans: '948.8万',
  }
};

function getUserData(userId) {
  return userInfo[userId];
}

module.exports = {
	sum,
	uuid,
  getUserData
};