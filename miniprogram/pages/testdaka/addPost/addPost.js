// pages/testdaka/addPost/addPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    keyboardHight:0,
    showOther:true,
    toolbarHight:120,
    numberShow:true,
    functionShow:false,
    cursor:0,
    maxlength:500,
    showgroup:false
  },
  //添加打卡挑战的跳转
  addDaka(){
    wx.navigateTo({
      url: '../addDakaChallenge/addDakaChallenge',
    })
  },
  //显示打卡弹窗
  showPunch(){
    this.setData({
      showgroup:true
    })
  },
  //隐藏弹窗
  closePunch(){
    this.setData({
      showgroup:false
    })
  },
  //输入框不聚焦
  inputblur(){
      this.setData({
        toolbarHight:120,
        functionShow:false,
        numberShow:true
      })
  },
  //输入框聚焦
  inputfocus(){
      this.setData({
        showOther:true,
        functionShow:true,
        numberShow:false
      })
  },
  inputText(e){
    console.log(e.detail.value);
    console.log(e);
    this.setData({
        cursor:e.detail.cursor
    })
  },
  cancel(){
    wx.navigateBack({
      delta: 1,
    })
  },
  tap(){
      this.setData({
        showOther:!this.data.showOther
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.onKeyboardHeightChange((res) => {
        console.log('wx.onKeyboardHeightChange的res',res);
        this.setData({
            keyboardHight:res.height
        })
        if (res.height > 0) {
            this.setData({
                toolbarHight:90
            })
        }
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