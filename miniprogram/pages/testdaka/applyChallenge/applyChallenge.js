// pages/testdaka/applyChallenge/app;yChallenge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    // 需要渲染的数据页面携带值传参获得
    dayRequire:"21",
    title:"标题",
    guide:"123",
    //缓存
    args:'',
    //上传数据库需要的数据
    //数据需要页面携带值传参获得
    total:0,
    dayrequire:0,
    challengeuuid:'',
    challengename:'',
  },
  send(){
    let wxurl = this.data.args.iconUrl
    let wxname = this.data.args.nickName
    let usernum = this.data.args.username
    let total = this.data.total
    let iscomplete = false
    let dayrequire = this.data.dayrequire
    let dakalog = []
    let challengeuuid = this.data.challengeuuid
    let challengename = this.data.challengename
    //这些就是报名一个挑战需要上传到dakaChallenge_member的数据
  },
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  cancel(){
    
  },
  confirm(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let args = wx.getStorageSync('args');
    this.setData({
        args,
    })
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
  onShareAppMessage() {

  }
})