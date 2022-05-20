// pages/myself/page/page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
  },
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  aboutUs(){
    wx.navigateTo({
      url: '../about/about', 
    })
  },
  log(){
    wx.navigateTo({
      url: '../journal/journal', 
    })
  },
  login(e) {
    // if (this.data.isLogin) {
      console.log("111");
      wx.showModal({
        title: '提示',
        content: '请确定是否注销/登录',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.redirectTo({
              url: '/pages/login/login' 
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    // }

  },
  exslt(){
    wx.navigateTo({
      url: '../rule/rule',
    })
  },
  help(){

  },
  connection(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log("111");
    return {
      title: 'WE校园',
    }
  },
})