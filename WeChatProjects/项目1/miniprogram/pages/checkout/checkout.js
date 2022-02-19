// pages/checkout/checkout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:wx.getStorageSync('token').token,
    state:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this 
    if(!wx.getStorageSync('token')){
      wx.reLaunch({
        url: '/pages/login/login',
      })
      return -1
    }
    this.setData({device_id:e.deviceid,device_name:e.devicename})
    console.log(this.data.device_id)
    wx.onSocketMessage(data=>{
      // console.log(data)
      // if(data.data.substr(0,1)=="{"){
      //   that.setData({state:JSON.parse(data.data).message})
      //   wx.showToast({
      //     title:JSON.parse(data.data).message,
      //     icon:"none"
      //   })
      // }
      // if(data.data=="ok"||1){
      //   return -1
      // }
      // else{
      //   wx.showToast({
      //     title: '失败',
      //   })
      // }
      // if(JSON.parse(data.data).code===10000){
      //   wx.showToast({
      //     title: '验真成功',
      //   })
      // }
      // else{
      //   wx.showToast({
      //     title: '验真失败',
      //   })
      // }
    })
  },
  //点击事件
 async btn(){
    wx.showLoading({
      title: '设备端正在生成二维码中',
    })

    await wx.sendSocketMessage({
      data: '{"type":"verification","content":\n' +
      "{\n" +
    '"deviceId":"' +
    this.data.device_id +
    '",\n' +
    '"userId":"' +
    this.data.token +
    '",\n' +
      '"version":"1.0.1",\n' +
      '"packetType":"",\n' +
      '"content":"hellasdfcjvsnkdsnvkjsnv kljzcnvkjszznvkljo"\n' +
      "}\n" +
      "}"},
  
    );
    var that = this;
    console.log(this.data.state)
    if(this.data.state=="设备连接异常"){
      wx.hideLoading()
    }
    else{
      wx.scanCode({ //扫描API
        success(res) { //扫描成功
          console.log(res.result) //输出回调信息
          that.setData({
            scanCodeMsg: res.result
          });
          console.log( '{"type":"codeStr","content":\n' +
          "{\n" +
        '"deviceId":"' +
        that.data.device_id +
        '",\n' +
        '"userId":"' +
        that.data.token +
        '",\n' +
          '"packetType":"",\n' +
          '"content":"' +
          that.data.scanCodeMsg + //?
          '"\n' +
          "}\n" +
          "}")
          wx.sendSocketMessage({
            data:        '{"type":"codeStr","content":\n' +
            "{\n" +
          '"deviceId":"' +
          that.data.device_id +
          '",\n' +
          '"userId":"' +
          that.data.token +
          '",\n' +
            '"packetType":"",\n' +
            '"content":"' +
            that.data.scanCodeMsg + //?
            '"\n' +
            "}\n" +
            "}"
            }
          );
        }
      })
    }
   
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