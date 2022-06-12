// pages/features/about.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '100%',
    height: '',
    coder: [{
      avatar: '/images/about/zw.jpg',
      nickName: 'u.'
    },
    {
      avatar: '/images/about/xld.jpg',
      nickName: '细粒丁'
    },
      {
        avatar: '/images/about/yq.jpg',
        nickName: 'Grace'
      },
      {
        avatar: '/images/about/zt.jpg',
        nickName: '騰丶'
      },
      {
        avatar: '/images/about/sx.jpg',
        nickName: 'Minf'
      },
      {
        avatar: '/images/about/yue.jpg',
        nickName: '恩佐'
      },
      {
        avatar: '/images/about/juan.jpg',
        nickName: '自然卷'
      },
      {
        avatar: '/images/about/long.jpg',
        nickName: '智阝章龙'
      },
      {
        avatar: '/images/about/bing.jpg',
        nickName: '.'
      },
      {
        avatar: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/myself/8b34d92d8019d67d22389292ee5f90e.jpg?sign=683df075428b8b24107494e669dff62a&t=1655038622',
        nickName: 'siuuuu'
      },
      {
        avatar: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/myself/5fb8f14b41ee2249af2bac48646b797.jpg?sign=bfc4aabf03798cc5d1cdf37e2263c039&t=1655038724',
        nickName: 'Start from*'
      },
      {
        avatar: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/myself/3ff75e82904b707292a97f2e3a83545.jpg?sign=3d49f6149d6321e6b8a4e4ef032b9485&t=1655038972',
        nickName: 'yiiiiii'
      },
      {
        avatar: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/myself/cd5a29079d6a31064f9c5ce1f2d6ea5.jpg?sign=d19ac72167e0fce52cf3b9dcbbea4e6c&t=1655039295',
        nickName: 'Aquiles'
      },
      {
        avatar: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/myself/d2bf43c94ae96084dee4c17e3ec1087.jpg?sign=67e194eac0b5d493895211d102c1714c&t=1655039416',
        nickName: '好丑的屁股'
      },
      {
        avatar: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/myself/532b2e8796d4db9c8bf8f759ec94c17.jpg?sign=934b6b6f5b29a99da436b34ec035137f&t=1655039541',
        nickName: 'mikey'
      }
    ],
    // servicer: [{
    //   avatar: '/images/about/zw.jpg',
    //   nickName: 'u.'
    // },
    // {
    //   avatar: '/images/about/yq.jpg',
    //   nickName: 'Grace'
    // },
    // {
    //   avatar: '/images/about/zt.jpg',
    //   nickName: '騰丶'
    // },
    // {
    //   avatar: '/images/about/lin.jpg',
    //   nickName: '小排骨'
    // },
    // {
    //   avatar: '/images/about/yan.jpg',
    //   nickName: '云崖呀呀'
    // }
    // ],
  },
  
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.verse)
    
    that.setData({
      width: wx.getSystemInfoSync().windowWidth * 0.9 + 'px',
      height: wx.getSystemInfoSync().windowWidth * 0.9 * 0.5625 + 'px',
      version:app.globalData.verse
    })

  },

  copyID: function () {
    wx.setClipboardData({
      data: 'wxd1eacf33b4ed0195'
    })
    wx.showToast({
      title: '已复制到粘贴版',
      duration: 1000
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})