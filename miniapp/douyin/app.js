App({
  onLaunch(options) {
    console.log('抖音 onLaunch: ', options);
  },
  onShow(options) {
    console.log('抖音 onShow: ', options);
  },
  onHide() {
    console.log('抖音 onHide');
  },
  globalData: 'I am global data'
});