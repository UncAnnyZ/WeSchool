// pages/association/freshmanData/freshmanData.js
const db = wx.cloud.database()
let count = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freshData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    count = wx.getStorageSync('args').username
    count=String(count)
    this.getDate(count)
  },
  // 查询招新数据
  getDate(count) {
    wx.showLoading({
      title: '加载中',
    }).then(res => {
      db.collection("assoFreshApply").where({ index: count }).get().then(res => {
        wx.hideLoading()
        this.setData({
          freshData: res.data
        })
      })
    })
  },
  // 触底加载
  getMore() {
    let dataLen = this.data.freshData.length
    if (dataLen < 20) {
      wx.showToast({
        title: '没有更多啦~',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
      });
    }
    else {
      db.collection("assoFreshApply").where({ index: count }).skip(dataLen).get().then(res => {
        if (res.data.length == 0) {
          wx.showToast({
            title: '没有更多啦~',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result) => {

            },
          });
        }
        else {
          this.data.freshData.push(...res.data)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 详情页
  godetail(e) {
    let content = e.currentTarget.dataset.item
    content = JSON.stringify(content)
    wx.navigateTo({
      url: `/pages/association/freshmanDetail/freshmanDetail?content=${content}`,
    })
    // console.log(e.currentTarget.dataset.item);
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
    this.getMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})