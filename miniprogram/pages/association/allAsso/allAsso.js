// pages/association/allAsso/allAsso.js
const db = wx.cloud.database()
let school = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let args = wx.getStorageSync('args');
    school = args.schoolName
    this.getMess(school)
  },

  getMess(school) {
    db.collection("associationApply").where({ school }).get().then(res => {
      this.setData({
        content: res.data
      })
    })
  },
  // 触底加载
  getMore() {
    if (this.data.content.length < 20) {
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
      db.collection("associationApply").where({ school }).skip(this.data.content.length).get().then(res => {
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
          this.data.content.push(...res.data)
          this.setData({
            content: this.data.content
          })
        }
      })
    }
  },
  onReachBottom: function () {
    this.getMore()
  },
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})