Page({
  data: {
    a: {
      b: {
        c: [
          {
            text: "首页"
          }
        ]
      }
    },
    number: 10,
  },
  onLoad: function(options) {
    // 页面创建时执行
    console.log('美团首页 page onLoad');
  },
  onShow: function() {
    // 页面出现在前台时执行
    console.log('美团首页 page onShow');
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
    console.log('美团首页 page onReady');
  },
  onHide: function() {
    // 页面从前台变为后台时执行
    console.log('美团首页onHide');
  },
  onUnload: function() {
    // 页面销毁时执行
    console.log('美团首页onUnload');
  },
  onPageScroll: function(params) {
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
});