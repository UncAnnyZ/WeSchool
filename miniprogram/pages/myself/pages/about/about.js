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