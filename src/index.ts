import '@native/less/app.less';
import { Device } from '@native/core/device/device';
import { Application } from '@native/core/application/application';
import { HomeView } from '@native/core/application/views/home/home';

window.onload = () => {
  const device = new Device();
  const wx = new Application();
  const homeView = new HomeView();
  wx.initRootView(homeView);
  
  device.open(wx);
}