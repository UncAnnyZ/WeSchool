// pages/login/login.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:"",
    pwd:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
  },
 login(e){
    var that = this
    // if(this.data.pwd&this.data.user){
      if(this.data.pwd==""|this.data.user==""){
        wx.showToast({
          title: '账号密码为空',
          icon:"none"
        })
      
      }
      else{
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: app.globalData.url[0],
          method:"post",
          data:{
            username:that.data.user,
            password:that.data.pwd
          },
          success(res){
            console.log(res)
          
             if(res.data.code===10000){
              wx.setStorageSync('token', res.data.content)
              wx.reLaunch({
                url: '/pages/device_management/device management',
              })
              wx.hideLoading()
            }
                      
           else{
              wx.showToast({
                title: '账号和密码错误',
                icon:"none"
              })
            }
          },
          fail(){
            wx.showToast({
              title: '请求服务器失败',
              icon:"none"
            })
          }
        })
      }
     
    // }

  },
  input(e){
    if(e.target.id=="user"){
      this.setData({user:e.detail.value})
    }
    else{
      this.setData({pwd:e.detail.value})
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