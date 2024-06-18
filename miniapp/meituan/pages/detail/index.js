Page({
  data: {
    text: "退出detail页面"
  },
  onLoad: function(options) {
    // 页面创建时执行
    console.log('美团详情页 page onLoad: ', options);
  },
  onShow: function() {
    // 页面出现在前台时执行
    console.log('美团详情页 page onShow');
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
    console.log('美团详情页 page onReady');
  },
  onHide: function() {
    // 页面从前台变为后台时执行
    console.log('美团详情页 onHide');
  },
  onUnload: function() {
    // 页面销毁时执行
    console.log('美团详情页 onUnload');
  },
  onPageScroll: function() {
    // 页面滚动时执行
    console.log('美团详情页 onPageScroll');
  },
  exit() {
    wx.navigateBack({
      delta: 1
    })
  }
});