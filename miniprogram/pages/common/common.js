//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    htmlText: "",
    foodList: [],
    htmlSrc: "",
    isHidden: false,
    maskDetail: [],
    currentPage: false
  },
  getMessage: function (res) {

    var that = this
    var args = wx.getStorageSync('args')
    // console.log(res)
    var run = app.jsRun(args, res.detail.data)
    var returnUrl = run(that)

    if (returnUrl) {
      that.setData({
        htmlSrc: returnUrl
      })
    }

  },
  //事件处理函数
  onLoad: function (options) {
    var that = this;
    console.log(options)
    var args = wx.getStorageSync('args')
    // console.log(args);
    var Info = wx.getStorageSync('personalInformation')
    // console.log(Info);
    if (options.type === "web") {
      that.setData({
        htmlSrc: options.url + '?argsData=' + options.argsData + '&username' + args.username + '&password' + args.password
      })
    } else if (options.type === "small") {
      wx.navigateToMiniProgram({
        appId: options.id,
        path: 'pages/index/index',
        extraData: {
          xuehao: getApp().globalData.xuehao
        },
        envVersion: 'release',
        success(res) {
          wx.navigateBack({
            delta: 1,
          })
          console.log('跳转成功');
        },
        fail: function (err) {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    } else if (options.type === "commonPage") {
      if (args) {
        // console.log(args.otherPageCode[options.content]);
        try {
          var onload = app.jsRun(args, args.otherPageCode[options.content])
          onload(that)
        } catch (e) {
          console.log(e)
        }
      }
      if(options.content == "素拓"){
        this.setData({
          currentPage: true
        })
      }
    } else {
      wx.showToast({
        title: '内容出错',
        icon: 'none',
      })
    }
  },
  getScoreInfo: function () {

  },
  onShareAppMessage: function (res) {
    return {
      title: 'We广油',
    }
  },
  //处理蒙层
  hideMask: function (event) {
    let timer = null

    const show = event.currentTarget.dataset.info
    // console.log(event.currentTarget.dataset.info);
    // console.log(this.data.isHidden);
    var maskDetail = [{
        field: '活动名称：',
        text: show.ktmc
      },
      {
        field: '获得学分：',
        text: show.hdxf + '(' + show.ckxf + ')'
      },
      {
        field: '状态：',
        text: show.shztmc,
        color: show.shztmc == '审核通过' ? 'rgb(0,230,0)' : 'red'
      },
      {
        field: '时间：',
        text: show.kzsj
      }
    ]
    this.setData({
      maskDetail: maskDetail,
      isHidden: !this.data.isHidden
    })
    // if(this.data.isHidden === true) {
    //   console.log('11');
    //   setTimeout(() => {
    //     this.setData({
    //       isHidden: !this.setData.isHidden
    //     })
    //   }, 2000);
    // }
    // console.log(this.data.isHidden);

  }
})