var util = require("../../../utils/util.js")
Page({
  
  /**
   * 页面的初始数据
   */
  ShowImg:function(e){
    var Photo=this.data.Photo
    var index=e.target.dataset.index
    wx.previewImage({
      current: Photo[index],
      urls:Photo,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var content=JSON.parse(options.content)
    this.setData({
      ImgSrc:content.Cover,
      Title:content.Title,
      Text:content.Text,
      Label:content.Label,
      Photo:content.AllPhoto
    })
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