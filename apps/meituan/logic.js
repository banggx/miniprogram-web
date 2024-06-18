
      modDefine('pages/home/index', function (require, module, exports) {
        Page({
  data: {
    a: {
      b: {
        c: [{
          text: "首页"
        }]
      }
    },
    number: 10
  },
  onLoad: function (options) {
    // 页面创建时执行
    console.log('美团首页 page onLoad');
  },
  onShow: function () {
    // 页面出现在前台时执行
    console.log('美团首页 page onShow');
  },
  onReady: function () {
    // 页面首次渲染完毕时执行
    console.log('美团首页 page onReady');
  },
  onHide: function () {
    // 页面从前台变为后台时执行
    console.log('美团首页onHide');
  },
  onUnload: function () {
    // 页面销毁时执行
    console.log('美团首页onUnload');
  },
  onPageScroll: function (params) {
    // 页面滚动时执行
    console.log('美团首页onPageScroll: ', params);
  },
  tapHandler(a, b, c, d) {
    console.log(a, b, c, d);
    this.setData({
      'a.b.c[0].text': this.data.a.b.c[0].text + '!',
      str: '我是动态添加的字符'
    });
    console.log(this.data);
  },
  goDetail() {
    wx.navigateTo({
      url: 'pages/detail/index?a=1&b=2'
    });
  },
  openJingdong() {
    wx.navigateToMiniProgram({
      appId: 'jingdong',
      path: 'pages/home/index?params1=美团参数1&params2=美团参数2'
    });
  }
}, {
  path: 'pages/home/index'
});
      });
    
      modDefine('pages/detail/index', function (require, module, exports) {
        Page({
  data: {
    text: "退出detail页面"
  },
  onLoad: function (options) {
    // 页面创建时执行
    console.log('美团详情页 page onLoad: ', options);
  },
  onShow: function () {
    // 页面出现在前台时执行
    console.log('美团详情页 page onShow');
  },
  onReady: function () {
    // 页面首次渲染完毕时执行
    console.log('美团详情页 page onReady');
  },
  onHide: function () {
    // 页面从前台变为后台时执行
    console.log('美团详情页 onHide');
  },
  onUnload: function () {
    // 页面销毁时执行
    console.log('美团详情页 onUnload');
  },
  onPageScroll: function () {
    // 页面滚动时执行
    console.log('美团详情页 onPageScroll');
  },
  exit() {
    wx.navigateBack({
      delta: 1
    });
  }
}, {
  path: 'pages/detail/index'
});
      });
    
      modDefine('app', function (require, module, exports) {
        App({
  onLaunch(options) {
    console.log('美团 onLaunch: ', options);
  },
  onShow(options) {
    console.log('美团 onShow: ', options);
  },
  onHide() {
    console.log('美团 onHide');
  },
  globalData: 'I am global data'
});
      });
    