// pages/functionPage/functionPage.js
Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,

    cardList: ["校园生活"],
    funcList:[{

    }],


    iconList: [],
  },
  onLoad(options) {

  },
  init() {
    let configData = wx.getStorageSync('configData'),
      iconList = configData.iconList;

    this.setData({
      iconList:iconList
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
  onReachBottom() {

  },

  onShareAppMessage() {

  }
})