// pages/more/pages/Freshman/Freshman.js
const db = wx.cloud.database()
let username = ''
var time = require("../../../../utils/time.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apply: false,//是否已经报名,
    timeOut: false,//是否截止
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var date = new Date(Date.parse(new Date()));
    var Y = date.getFullYear();//年
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);//月
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();//日
    let nowTime = Y.toString() + '-' + M.toString() + '-' + D.toString()
    var content = JSON.parse(options.content)
    // console.log('后',content);
    // console.log('333',content);
    if (content.endTime > nowTime) {
      this.setData({
        timeOut: true
      })
    }
    let _id = content._id
    let args = wx.getStorageSync('args');
    username = args.username
    this.setData({
      content,
    })
    wx.cloud.callFunction({
      name: "associationSend",
      data: {
        _id,
        username,
        type: 4
      }
    }).then(res => {
      // console.log(res);
      this.getApplyStatus()
    })
  },
  // 查询用户是否报名
  getApplyStatus() {
    let index = this.data.content.association[0].detail
    db.collection("assoFreshApply").where({ index, username }).get().then(res => {
      // console.log(res);
      if (res.data.length >= 1) {
        this.setData({
          apply: true
        })
      }
    })
  },
  // 提交报名表单
  submit(e) {
    let formData = e.detail.value;
    let index = this.data.content.association[3].detail
    wx.showLoading({
      title: "报名中",
      mask: true,
      success: (result) => {
        db.collection("assoFreshApply").add({
          data: {
            username,
            formData,
            index,
            read: false
          }
        }).then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '报名成功',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result) => {
              this.setData({
                apply: true
              })
            },
          });
        })
      },
    });
  },
  // timeOut
  timeOut() {
    wx.showToast({
      title: '报名已截止',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  // nosubm
  nosubmit() {
    wx.showToast({
      title: '你已报名',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {

      },
    });
  },
  ShowImg: function (e) {
    var Photo = this.data.content.AllPhoto
    var index = e.target.dataset.index
    wx.previewImage({
      current: Photo[index],
      urls: Photo,
    })
  },
  // 查询是否已参与并操作
  // getPerson(){

  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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