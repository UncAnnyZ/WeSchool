// pages/myself/fansAndfocus/fansAndfocus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fansNum:[],
    focusNum:[],
  },
  focus:function(){
    console.log(this.data.focusNum);
    this.setData({
      focus:false,
      fans:true,
      arry:this.data.focusNum
    })
  },
  fans:function(){
    this.setData({
      focus:true,
      fans:false,
      arry:this.data.fansNum
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    var that=this
    wx.getStorage({
      key: 'fansAndfocus',
      success (res) {
        if(res.data.focusNum.length!=0){
          that.data.focusNum=res.data.focusNum
        }
        if(res.data.fansNum.length!=0){
          that.data.fansNum=res.data.fansNum
        }
        options.type==="focusNum" ? that.focus() : that.fans()
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