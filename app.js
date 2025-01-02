import updateManager from './common/updateManager';

App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'libdev-8gj7poe1015514dc'
    })

  },
  onShow: function () {
    updateManager();
  },
});