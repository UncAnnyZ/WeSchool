let util = require("../../../../../../utils/util")
Page({

  data: {
    // 配置
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,

    Input_anhao: '',
    isAnimate: false,
    currentPage: 0,
    loadAll: false,
    noteList_search: [],
    popScroll:'',   // 动效
    colorArr: [
      '#EFF9F8',
      '#F8EBF2',
      '#E5F3FE',
      '#E7EAFB'
    ]
  },

  bindinput_anhao(e) {
    console.log(e.detail);
    this.setData({
      Input_anhao: e.detail.value
    })
  },
  formSubmit(e) {
    let that = this,
      data = this.data,
      args = wx.getStorageSync('args'),
      { signal } = e.detail.value,
      currentPage = data.currentPage;

    if (!signal.replace(/\s/g, '')) {
      wx.showToast({
        title: '要留下暗号噢',
        icon: 'none'
      })
    } else if (signal.replace(/\s/g, '').length > 10) {
      wx.showToast({
        title: '暗号太长啦',
        icon: 'none'
      })
    }
    else {
      wx.showLoading({
        title: '请稍等...',
      })
      wx.cloud.callFunction({
        name: "NewCampusCircle",
        data: {
          url: "Note_module",
          type: "search",
          signal,
          School: args.school,
          currentPage: currentPage
        },
        success(res) {
          wx.hideLoading();

          if (res.result && res.result.data.length > 0) {
            // 页数++
            let noteList_search = data.noteList_search;
            // 处理时间
            res.result.data.forEach(item => {
              item.Time = util.timeago(item.Time);
            })
            // 添加新数据到 noteList_search 里 
            noteList_search = noteList_search.concat(res.result.data);
            that.setData({
              isAnimate: true,
              noteList_search:noteList_search,
              currentPage: ++currentPage
            });
            that.seetingHandler();
            // 数据少于一页
            if (res.result.data.length < 10) {
              that.setData({
                loadAll: true,
              })
            }
          } else {
            wx.showToast({
              title: '抱歉,暂无留言',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  seetingHandler: function (e) {
    console.log("已点击设置按钮");
    // 封装动画
    const animationFunc = (windowHeight) => {
      var popScroll = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
        delay: 100,
      }).translateY(-windowHeight).step().export();
      
      this.setData({
        popScroll,
      })
    }

    let windowHeight = this.data.windowHeight;
    this.data.isAnimate ? animationFunc(windowHeight) : animationFunc(-windowHeight)
  },
  popDown() {
    this.init();
    this.seetingHandler();
  },
  onLoad: function (options) {
    this.seetingHandler();
  },
  init() {
    this.setData({
      currentPage: 0,
      noteList_search: [],
      loadAll: false,
      isAnimate: false
    })
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})