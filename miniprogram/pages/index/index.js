// index.js

const util = require("../../utils/util")

// 获取应用实例
const app = getApp()



Page({
  data: {
    theme: true,
    dark : wx.getSystemInfoSync().theme,
    time: {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
    },
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    windowHeight: getApp().globalData.windowHeight,
    ad: true,
    adSrc: '',
    adHeight: '280'
  },
  onPullDownRefresh(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log("下拉刷新")
    var that = this
    setTimeout( function() {
      var args = wx.getStorageSync('args')
      if (args) {
        try {
          var onload = app.jsRun(args, args.jsCode)
          onload(that)
        } catch (e) {
          console.log(e)
        }
      }
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
    console.log("over")
  },
  async onLoad(options) {
    
    // 判断登录
    app.loginState();
    var that = this;
    wx.onThemeChange(function (e) {
      that.setData({ dark:  e.theme  });
    })
    if(wx.getStorageSync('theme') !== undefined){
      that.setData({ theme:  wx.getStorageSync('theme') });
    }

    var args = wx.getStorageSync('args')
    this.setData({
      ad: args.ad,
      otherAd: args.otherAd
    })
    if (args && options?.goin !== 'login') {
      try {
        console.log("进入主页兜底")
        var onload = app.jsRun(args, args.jsCode)
        onload(that, options)
      } catch (e) {
        console.log(e)
      }
    }
    wx.cloud.callFunction({
      name: 'api',
      data: {
        url: 'indexLoading',
        jsVersion: args.jsVersion
      },
      success: res => {
        var new_args = res.result
        console.log("获取到数据")
        if ((options?.goin == 'login') || (!(JSON.stringify(new_args) === JSON.stringify(wx.getStorageSync('args'))))) {
          console.log("进入函数更新")
          new_args = {
            ...args,
            ...new_args
          }
          wx.setStorageSync('args', new_args)
          var onload = app.jsRun(new_args, new_args.jsCode)

          try {
            onload(that, options)
          } catch(e) {
            console.log(e)
            that.setData({
              msg: '有超级bug，请联系开发查看函数'
            })
          }
        }

      },
      fail: res => {
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: "模版请求错误",
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: 'WE校园',
    }
  },
  switch1Change: function(res){
    wx.setStorageSync('theme', res.detail.value)
    this.setData({
      theme: res.detail.value
    })
  },

  adClose(){
    console.log("adClose")
    this.setData({ad: false})
  },
  adGo(){
    var that = this
    wx.navigateTo({
      url: that.data.otherAd.adUrl,
    })
  },
  onShareTimeline: function(res) {
    return {
      title: 'WE校园'
    }
  },
  
})