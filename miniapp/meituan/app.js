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