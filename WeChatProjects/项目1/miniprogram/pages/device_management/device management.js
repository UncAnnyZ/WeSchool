// pages/device_management/device management.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    input_text:"",
    devics_list:[
      {
        name:"加载中",
        deviceType:"加载中"
      }
    ],
    devics_list_all:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(!wx.getStorageSync('token')){
      wx.reLaunch({
        url: '/pages/login/login',
      })
      return -1
    }
    wx.showLoading({
      title: '加载中',
      mask:true

    })
    console.log(app.globalData.url[1])
    wx.request({
      // url: app.globalData.url.device_managemnet_onload,
      url:app.globalData.url[1],
      method:"POST",
      header:{
        Authorization:wx.getStorageSync('token').token
      },
      success(res){
        console.log(res)
        if(res.data.content){
          console.log(res.data.content.devics)
          that.setData({
            devics_list:res.data.content.devics,
            devics_list_all:res.data.content.devics
          })
          // console.log(res)
          wx.hideLoading()
        }
        else{
          wx.hideLoading()
          wx.showModal({
            title:"提示",
            content:"您还未登录",
            showCancel:false,
            success(res){
              if(res.confirm){
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              }
            }
          })
        }
      },
      fail(){
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }
    })
  },
  detail(e){
    //携带参数
    console.log("点击成功")
    let index = e.currentTarget.id
    let name = this.data.devics_list[index].name
    let device_type_name = this.data.devics_list[index].deviceType
    let id = this.data.devics_list[index].id
    let deviceid = this.data.devics_list[index].deviceId

    
    wx.navigateTo({
      url: '/pages/device_detail/device_detail?name='+name+"&deviceType="+device_type_name+"&id="+id+"&deviceid="+deviceid,
    })
  },
  //搜索请求参数
  search(){
    var that = this
    if(that.data.input_text){
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.url[2],
        header:{
          Authorization:wx.getStorageSync('token').token
        },
        data:{
          name:that.data.input_text
        },
        method:"GET",
        success(res){
          console.log(res)
          if(res.data.code===10000){
            console.log(res.data.content.devics)
            if(res.data.content.devics.length!=[]){
              that.setData({devics_list:res.data.content.devics})
            }
            else{
              wx.showToast({
                title: '暂无该设备哦~',
                icon:"none"
              })
            }
            wx.hideLoading()
          }
          else{
            wx.showToast({
              title: '错误',
              icon:"none"
            })
          }
          console.log(res)
        },
        fail(){
          wx.showToast({
            title: '服务器错误',
            icon:"none"
          })
        }
      })
    }
    else{
      wx.showToast({
        title: '搜索框内不能为空~',
        icon:"none"
      })
    }
   
    //等数据接口
  },

  input(e){
    this.setData({input_text:e.detail.value})
    //删除操作后对数据重新渲染
    this.setData({devics_list:this.data.devics_list_all})
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