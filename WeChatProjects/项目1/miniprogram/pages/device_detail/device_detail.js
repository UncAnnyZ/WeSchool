// pages/device_detail/device_detail.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_name:"设备1",
    device_type_name:"设备1",
    device_list:[{
      name:"加载中",
    }],
    divice_id:"",
    send_value:"",
    token:wx.getStorageSync('token').token,
  },


  visual(e){
    console.log(e.target.id)
    let index = Number(e.target.id)
    console.log(this.data.device_list)
    console.log(this.data.device_list[index])
    let id = this.data.device_list[index].id
    let unit = this.data.device_list[index].unit
    console.log(id)

    // var device_unit = this.data.device_list[index].unit
    wx.navigateTo({
      url: '/pages/data_show/data_show?parameterDefineId='+id+"&device_id="+this.data.device_id,
    })
  },


 
  checkout(){
    //跳转验真
    wx.navigateTo({
      url: '/pages/checkout/checkout?deviceid='+this.data.device_id+"&devicename="+this.data.device_name, //后面数据来了的话要携带参数
    })
  },


    //跳转更新固件

  update(){
    wx.navigateTo({
      url: '/pages/update/update?deviceid='+this.data.device_id+"&devicename="+this.data.device_name,
    })
  },
  input(e){
    this.setData({
    [e.target.id]:e.detail.value

    })
  },
  //右边的提交发送
  submit(e){

    let res = this.data.device_list[e.currentTarget.id].deviceAddr
    console.log(res)
    let val = this.data["input"+e.currentTarget.id]
    if(!val){
      wx.showToast({
        title: '您还未输入相关信息',
        icon:"none"
      })
    }
    else{
      wx.showLoading({
        title: '发送中',
      })
      wx.sendSocketMessage({
        data:  '{"type":"WriteRegister","content":\n' +
        "{\n" +
      '"deviceId":"' +
      this.data.device_id +
      '",\n' +
      '"userId":"' +
      this.data.token +
      '",\n' +
        '"packetType":"",\n' +
        '"content":"' +
        (Array(2).join("0") + res).slice(-2) +  val//http请求过来的数据
         +
        '"\n' +
        "}\n" +
        "}",
        success(res){
  
          console.log(res)
        },
      })
    }

    console.log('{"type":"WriteRegister","content":\n' +
    "{\n" +
  '"deviceId":"' +
  this.data.device_id +
  '",\n' +
  '"userId":"' +
  this.data.token +
  '",\n' +
    '"packetType":"",\n' +
    '"content":"' +
    (Array(2).join("0") + res.toString(16)).slice(-2) +  //http请求过来的数据
    val +
    '"\n' +
    "}\n" +
    "}")
  },
  //大输入框输入的要发数据
  input_send(e){
    this.setData({input_send_value:e.detail.value})
  },
  onLoad: function (e) {
    if(!wx.getStorageSync('token')){
      wx.reLaunch({
        url: '/pages/login/login',
      })
      return -1
    }
    wx.onSocketOpen(function(){
      
   console.log('websocket opened.');

});

wx.onSocketMessage(data=>{
  console.log(data)
  if(data.data=="ok"){
    return -1
  }
  if(data.data.substr(0,1)!="{"){
    var time = new Date();
    var mytime=time.toLocaleTimeString(); //获取当前时间
    let res = data.data+mytime
    this.setData({send_value:this.data.send_value+res+"\n"})
  }

  else{
    console.log(1111,JSON.parse(data.data))
    if(JSON.parse(data.data).message=="发送成功"){
      wx.showToast({
        title: '发送成功',
        icon:"none"
      })
    }
    else if(JSON.parse(data.data).code==40000){
      wx.showToast({
        title: '发送失败',
        icon:"error"
      })
    }
    else{
      //查找

      for(var i =0;i<this.data.device_list.length;i++){
        if(JSON.parse(data.data).paramName===this.data.device_list[i].name){
          console.log(this.data.device_list[i])
          this.data.device_list[i].state = JSON.parse(data.data).values
          this.data.device_list[i].date = JSON.parse(data.data).date
        }
      }
      this.setData({device_list:this.data.device_list})
      // console.log()
    }
  }


})
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that = this
    this.setData({device_name:e.name,device_type_name:e.deviceType,device_id:e.deviceid})
    console.log(e.deviceid)
    wx.request({
      url: app.globalData.url[3],
      header:{
        Authorization:wx.getStorageSync('token').token
      },
      method:"GET",
      data:{
        device:e.deviceid
      },
      success(res){
        
        console.log(res)
        that.setData({device_list:res.data.content.parameterDefines})
        wx.hideLoading()

      }
    })

  },

  send(){
    console.log('{"type":"send","content":\n' +
    "{\n" +
    '"deviceId":"' +
    this.data.device_id +
    '",\n' +
  '"userId":"' +
  this.data.token +
  '",\n' +
    '"packetType":"",\n' +
    '"content":"' +
    this.data.input_send_value +  //?
    '"\n' +
    "}\n" +
    "}")
    if(!this.data.input_send_value){
        wx.showToast({
          title: '发送的数据不能为空',
          icon:"none"
        })
    }
    else{
      wx.sendSocketMessage({
        data:'{"type":"send","content":\n' +
        "{\n" +
        '"deviceId":"' +
        this.data.device_id +
        '",\n' +
      '"userId":"' +
      this.data.token +
      '",\n' +
        '"packetType":"",\n' +
        '"content":"' +
        this.data.input_send_value +  //?
        '"\n' +
        "}\n" +
        "}",
        // success(res){
        //   wx.showToast({
        //     title: '发送成功',
        //   })
        // }
      }
      )
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
