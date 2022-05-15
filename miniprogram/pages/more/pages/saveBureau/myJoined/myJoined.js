// pages/more/pages/saveBureau/myJoined/myJoined.js
var app = getApp()
var util = require("../../../../../utils/util.js")
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
      name:"全部",
      type:0
    },{
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
    currentPage:0,
    cardList:[],
    my_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  back(){
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
    })
  },

  chooseLabel(e){
    var index = e.currentTarget.id
    this.data.currentPage=0     //----切换标签对页面进行初始化
    this.data.cardList=[]       //----切换标签对页面进行初始化
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
    this.readData()
  },

  toLookcontent(e){
    var index=e.currentTarget.id
    wx.setStorage({
      key:"content",
      data:this.data.cardList[index],
      success:res => {
        this.setData({
          contentIndex:index
        })
        wx.navigateTo({
          url: '../../saveBureau/bureauContent/bureauContent',
        })
      }
    })
  },

  transformTime(){
    var copyList = JSON.parse(JSON.stringify(this.data.cardList))
    copyList.forEach(item => {
      if (!!item) {
        item.time = util.timeago(item.time, 'Y年M月D日')
        var length=item.manNum.length+item.womanNum.length
        console.log(length);
        console.log(item.manNum);
        var man2 = item.manNum.filter((num) => {
          return num!=1;
        });
        var woman2 = item.womanNum.filter((num) => {
          return num!=1;
        });
        var process = (man2.length+woman2.length)*100/length
        item.process=process
      }
    })
    copyList.map(item => {
      var hh=item.label
      item.showLabel = encodeURI(hh).replace(/%/g, "")
    })
    this.setData({
      copyList,
      length:copyList.length,
    })
  },

  readData(){
    const args = wx.getStorageSync('args')
    wx.cloud.callFunction({
      name: 'saveBureau',
      data: {
        type: "readMe",
        currentPage:this.data.currentPage,
        userName:args.username,
        sex:args.sex,
        label:this.data.label
      },
      success: res => {
        if(res.result){
          this.data.cardList=this.data.cardList.concat(res.result.data)
          this.data.currentPage++
          this.transformTime()
        }
        if(!res.result || res.result.data.length<10){
          this.setData({
            none:true,
            loading:false
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
        })
        console.error
      }
    })
  },

  onLoad: function (options) {
    this.setData({
      arry:this.data.arry,
      label:"全部"
    })
    this.readData()
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
    var index=this.data.contentIndex
    console.log("index",index);
    if(this.data.manNum || this.data.womanNum){
      this.data.cardList[index].manNum=this.data.manNum
      this.data.cardList[index].womanNum=this.data.womanNum
      this.data.cardList[index].commentList=this.data.commentList
    }
    if(this.data.delCard===true || this.data.out===true){
      this.data.my_id=this.data.cardList[index]._id
      this.data.cardList.splice(index,1)
    }
    if(this.data.addData){
      this.data.addData._id=this.data.res
      this.data.cardList.push(this.data.addData)
    }
    this.data.addData=null
    this.transformTime()
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
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({ 
      enterMe:true
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.cardList=[]
    this.data.currentPage=0
    this.readData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loading:true,
      none:false,
    })
    this.readData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})