const { getUserData } = require('../../utils/util.js');

Page({
  data: {
    userData: null
  },
  onLoad: function (options) {
    // 页面创建时执行
    console.log('详情页 page onLoad: ', options);
    const { user_id } = options;

    this.fetchUserDetailInfo(user_id);
  },
  onShow: function () {
    // 页面出现在前台时执行
    console.log('详情页 page onShow');
  },
  onReady: function () {
    // 页面首次渲染完毕时执行
    console.log('详情页 page onReady');
  },
  onHide: function () {
    // 页面从前台变为后台时执行
    console.log('详情页 onHide');
  },
  onUnload: function () {
    // 页面销毁时执行
    console.log('详情页 onUnload');
  },
  onPageScroll: function (opts) {
    // 页面滚动时执行
    console.log(opts);
  },

  goBack() {
    wx.navigateBack({});
  },

  fetchUserDetailInfo(userId) {
    const userData = getUserData(userId);

    this.setData({
      userData
    });
  }
});