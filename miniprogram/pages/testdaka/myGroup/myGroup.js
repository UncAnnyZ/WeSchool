// pages/testdaka/myGroup/myGroup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    //要渲染的数据
    groupname:'我的吃喝记录',
    groupData:{},
    postarr:[
      {wxname:'Start from scratch',wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:"20034480214",text:'第一条个人动态',sendtime:'刚刚',mylike:true,likenum:1,likename:['名字1','名字2'],groupuuid:'小组id',comment:['跟数据库一样格式的评论'],challengename:'打卡挑战的名字',challengeid:'打卡挑战的id',_id:'数据库自动生成的id作为说说id使用',isleader:true}
    ],
    myname:'',//名字
    myurl:'',//头像
  },

  getAllPost(){
    let groupData = this.data.groupData
    wx.cloud.callFunction({
      name:"daka",
      data:{
        type:"getPostByGroupId",
        groupId:groupData.uuid,
        // groupId:"JkSJEChwYs2bNGjRIkSJEiRo06dOHDB",
      }
    }).then(res=>{
      console.log(res);
      let data = res.result.data;
    })
  },
  
  intoPost(){
    wx.navigateTo({
      url: '../showPost/showPost',
    })
  },
  abc(){
    wx.navigateTo({
      url: 'pages/testdaka/myGroup/myGroup',
    })
  },
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  
  addPost(){
    wx.navigateTo({
      url: '../addPost/addPost',
    })
  },
  intoChallenge(){
    wx.navigateTo({
      url: '../allchallenge/allchallenge',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    let args = wx.getStorageSync('args');
    var groupData = JSON.parse(options.thisGroupData)
    console.log(groupData);
    this.setData({
        args,
        myname:args.nickName,
        myurl:args.iconUrl,
        groupData
    })
    this.getAllPost();
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