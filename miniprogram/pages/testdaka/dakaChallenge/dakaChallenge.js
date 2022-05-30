// pages/testdaka/dakaChallenge/dakaChallenge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isupdate:false,
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    // 页面渲染数据
    // 说说表的数据
    postarr:[
      // {wxname:'Start from scratch',wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:"20034480214",text:'第一条个人动态',sendtime:'刚刚',mylike:true,likenum:1,likename:['名字1','名字2'],groupuuid:'小组id',comment:['跟数据库一样格式的评论'],challengename:'打卡挑战的名字',challengeid:'打卡挑战的id',_id:'数据库自动生成的id作为说说id使用',isleader:true}
    ],
    //打卡成员表的数据 
    challengeguide:'',//打卡规则
    challengename:'',//打卡标题
    pernum:'',//多少人参加
    totalday:'',//累计打卡天数
    isCompletePerNum:'',//完成打卡人数
    totaldegree:''//累计打卡次数
  },
  async getMyData(usernum,challengeid,thisChallenge){
    this.setData({
      challengename:thisChallenge.challengename,
      challengeguide:thisChallenge.challengeguide,
      pernum:thisChallenge.peoplenum,
    })
   wx.cloud.callFunction({
      name:"daka",
      data:{
        type:"getMyDakaChallenge",
        challengeuuid:challengeid,
        usernum:usernum
      }
    }).then(res=>{
      console.log(res);
      let data = res.result.data[0]
      this.setData({
        totalday:data.totalday,//成员累计打卡天数
        totaldegree:data.totaldegree,//成员累计打卡次数
      }) 
    })
   wx.cloud.callFunction({
      name:"daka",
      data:{
        type:"getMyCompleteDakaChallenge",
        challengeuuid:challengeid,
        usernum:usernum
      }
    }).then(options=>{
      let isCompletePerNum = options.result.data.length
      this.setData({
        isCompletePerNum:isCompletePerNum,//完成挑战人数
      })
    })

  },
  intoPost(e){
    console.log(e);
    let postData = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    var thisPostData= JSON.stringify(postData)
    wx.navigateTo({
      url: '../showPost/showPost?thisPostData=' + thisPostData + '&index=' + index,
    })
  },
  gotoDaka(){
    let groupData = JSON.stringify(this.data.groupData)
    let thisChallenge = JSON.stringify(this.data.thisChallenge)
    wx.navigateTo({
      url: '../addDaka/addDaka?groupData='+groupData+'&thisChallenge='+thisChallenge,
    })
  },
  back(){
    console.log(this.data.fromApply);
    if (this.data.fromApply) {
      console.log("进入了if");
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 3]
      console.log(prevPage);
      prevPage.setData({
        isupdate:true
      })
      wx.navigateBack({
        delta: 3,
      })
    } else {
      console.log("进入了else");
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var isupdate = options.isupdate
    var postarr = JSON.parse(options.challengePostarr)
    var thisChallenge = JSON.parse(options.thisChallenge)
    var groupData = JSON.parse(options.thisGroupData)
    let fromApply = options.fromApply
    let args = wx.getStorageSync('args');
    let usernum = args.username
    let challengeid = thisChallenge.challengeid
    this.setData({
      postarr,
      args,
      thisChallenge,
      groupData,
      fromApply,
      isupdate
    })
    this.getMyData(usernum,challengeid,thisChallenge);
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
    if (this.data.postindex != null) {
      let updatePost = this.data.updatePost
      let postindex = this.data.postindex
      let postarr = this.data.postarr
      postarr[postindex] = updatePost
      console.log(postarr);
      this.setData({
        postarr,
        postindex:null,
        isupdate:true
      })
    }
    if (this.data.newPost != null) {
      console.log(this.data.newPost);
      let newPost = this.data.newPost
      let postarr = this.data.postarr
      postarr.push(newPost)
      this.setData({
        postarr,
        newPost:null,
        isupdate:true
      })
    }
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
    console.log("监听页面卸载");
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      isupdate:this.data.isupdate
    })
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