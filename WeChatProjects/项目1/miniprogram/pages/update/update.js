// pages/update/update.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
   timeFommater(value) {
    var dateee = new Date(value).toJSON();
    var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return date;
  },
  onLoad: function (e) {
    var that = this
    console.log(e)
    this.setData({device_name:e.devicename})
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://8.141.66.105:10102/api/getVersion',
      method:"GET",
      data:{
        device :e.deviceid
      },
      header:{    Authorization:wx.getStorageSync('token').token},
      success(res){
        console.log(res)
        if(res.data.code==10000){
          var value = res.data.content.files[0].createTime;
			     var createTime = that.timeFommater(value);
			    console.log(createTime);
        that.setData({version:res.data.content.files[0].version,
          createTime })
        }
        wx.hideLoading()
      }
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