// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:1,
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this
    let time = new Date().getTime()
   
    // todolist 
    // 内容缓存 点击形式 样式优化
    if(!wx.getStorageSync('mathed_time')&&e.content){
      let content =JSON.parse(e.content)
      let condition = {
        content:content,
        time:time
      }
      wx.setStorageSync('mathed_time',condition)
    }
    if(!wx.getStorageSync('mathed_time')&&!e.content){
      wx.navigateTo({
        url: '/pages/more/pages/Love/Love',
      })
      return -1
    }
    else{
      console.log(time - wx.getStorageSync('mathed_time').time)
      if(time - wx.getStorageSync('mathed_time').time>=0.001*60*60*1000){
      console.log(wx.getStorageSync('mathed_time').content)
        wx.showLoading({
          title: '匹配中'
        })
        wx.request({
          url: 'http://124.220.186.143:86/romantic_match',
          method:"POST",
          data:wx.getStorageSync('mathed_time').content,
          success(res){
            if(res.data.code=="200"){
              console.log(res)
              that.setData({state:3,content:res.data.result})
              wx.hideLoading()
            } 
            else if(res.data.code=="204"){
              that.setData({state:2})
                wx.showToast({
                title: '并未匹配到适宜对象,请重新匹配',
                icon:"none",
                duration:2000,
                success(res){
                  wx.removeStorageSync('mathed_time')
                  wx.navigateTo({
                    url: '/pages/more/Love/pages/detail/detail',
                  })
                }
              })
           
              // wx.navigateTo({
              //   url: '/pages/qus/qus',
              // })
            }
            else{
              console.log(res)
              wx.removeStorageSync('mathed_time')
              wx.navigateTo({
                url: '/pages/more/pages/Love/Love',
              })
              wx.showToast({
                title: '匹配有问题，请联系客服',
                icon:"none"
              })
            }
          }
        })
      }
    }
  
  },
  return(){
  
    wx.switchTab({
      url: '/pages/more/more',
    })
  },
  copy(){
    wx.setClipboardData({
      data: this.data.content.weixin_id,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '已复制微信号'+res.data,
              icon:"none"
            })
          }
        })
      }
    })

  },
  rewrite(){
    wx.removeStorageSync('mathed_time')
    wx.navigateTo({
      url: '/pages/more/pages/Love/Love',
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