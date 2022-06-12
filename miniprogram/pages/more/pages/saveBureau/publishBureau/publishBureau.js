// pages/more/pages/saveBureau/publishBureau/publishBureau.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
    arry:[{
      name:"自习",
      type:0
    },{
      name:"电影",
      type:0
    },{
      name:"聚餐",
      type:0
    },{
      name:"拼车",
      type:0
    },{
      name:"拼单",
      type:0
    },{
      name:"运动",
      type:0
    },{
      name:"游戏",
      type:0
    },{
      name:"其他",
      type:0
    }],
    photo:[],
    womanNum:[1,1],
    manNum:[1,1],
    lastTime:0
  },
  back(){
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
    })
  },
  chooseLabel(e){
    var index = e.currentTarget.id
    var getIndex=this.data.arry.findIndex(item => item.type===1)    //---判断arry数组里面有没有标签已被选择，没有则getIndex=-1，有则返回已选择的标签索引
    if(getIndex===parseInt(index)){
      return
    }
    if(getIndex!=-1){     //----将前面已选择的标签取消“选择”样式
      this.animate('.circle'+getIndex, [{
        width: '100%',
      },{
        width: '52rpx',
      }], 200)
      this.data.arry[getIndex].type = 0
    }
    this.animate('.circle'+index, [{      //----给选定标签“选择”样式
      width: '52rpx',
    }, {
      width: '100%',
    }], 200)
    this.data.arry[index].type = 1
    this.setData({
      label:this.data.arry[index].name
    })
  },
  addImg(){
    var that = this;
    wx.chooseMedia({                                // 上传图片
      count: 9,
      mediaType:'image',
      sourceType:['album','camera'],
      sizeType: ['original', 'compressed'],       // 可选择原图、压缩图
      success: (res) => {
        var photo = that.data.photo.concat(res.tempFiles);
        that.setData({photo})
      }
    })
  },

  delImg(e){
    if(!!this.data.photo.length){
      this.data.photo.splice(e.currentTarget.id,1)
      this.setData({
        photo:this.data.photo
      })
    }
  },

  choosePosition(){
    var that = this
    var getPosition = ""
    wx.getLocation({
      isHighAccuracy: true, // 开启地图精准定位
      type: 'gcj02', // 地图类型写这个
      success: function (res) {
        getPosition = res
      }
    })
    wx.chooseLocation({
      latitude: getPosition.latitude,
      longitude: getPosition.longitude,
      success(res) {
        that.setData({
          locationName:res.name
        })
      },
      fail(res){
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
        })
      }
    })
  },
  addNum(e){
    var sex=e.currentTarget.dataset.sex
    if(sex === "man"){
      this.data.manNum.push(1)
      this.setData({
        manNum:this.data.manNum
      })
    }else{
      this.data.womanNum.push(1)
      this.setData({
        womanNum:this.data.womanNum
      })
    }
  },
  reduceNum(e){
    var sex=e.currentTarget.dataset.sex
    if(sex === "man" && this.data.manNum.length>=1){
      this.data.manNum.pop()
      this.setData({
        manNum:this.data.manNum
      })
    }else if(sex === "woman" && this.data.womanNum.length>=1){
      this.data.womanNum.pop()
      this.setData({
        womanNum:this.data.womanNum
      })
    }
  },
  submit(e){
    const args = wx.getStorageSync('args')
    var fileIDs=[]
    if(this.data.label===undefined){
      wx.showToast({
        title: '请选择主题！',
        icon: 'none',
      })
    }else if(e.detail.value.textarea===undefined){
      wx.showToast({
        title: '请填写内容！',
        icon: 'none',
      })
    }else{
      var addData={
        text:e.detail.value.textarea,
        label:this.data.label,
        locationName:this.data.locationName,
        womanNum:this.data.womanNum,
        manNum:this.data.manNum,
        time: new Date().getTime(),
        userName:args.username,
        iconUrl:args.iconUrl,
        nickName:args.nickName,
        school:args.school,
        commentList:[],
        sex:args.sex
      }
      const upLoaddata = (addData) => {
        console.log("enter");
        wx.cloud.callFunction({
          name: 'saveBureau',
          data: {
            addData: addData,
            type: "addCard"
          },
          success: res => {
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];
            prevPage.setData({ 
              addData,
              res:res.result._id
            })
            wx.navigateBack({
              delta: 1,  // 返回上一级页面。
            })
            
          },
          fail: err => {
            console.error
          }
        })
      }
      const antiShake = () => {
        if(new Date().getTime()-this.data.lastTime>3500){
          upLoaddata(addData)
        }
        this.data.lastTime = new Date().getTime();
      }
      if(this.data.photo.length!=0){
        this.data.photo.forEach(item => {
          wx.compressImage({
            src: item.tempFilePath,    // 图片路径
            quality: 50,                      // 压缩质量,
            success:(res) => {
              wx.cloud.uploadFile({
                  cloudPath: 'saveBureau_images/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png',
                  filePath: res.tempFilePath,
              }).then(res => {
                fileIDs.push(res.fileID);
                addData.photo=fileIDs
                antiShake()
              })
            }
          })
        });
      }else{
        antiShake()
      }
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      arry:this.data.arry
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