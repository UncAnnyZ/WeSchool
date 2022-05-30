// pages/testdaka/applyChallenge/app;yChallenge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    // 需要渲染的数据页面携带值传参获得
    dayRequire:"",
    title:"",
    guide:"", 
    //缓存
    args:'',
    //上传数据库需要的数据
    //数据需要页面携带值传参获得
    total:0,
    dayrequire:0,
    challengeuuid:'',
    challengename:'',
  },
  send(){
    let wxurl = this.data.args.iconUrl
    let wxname = this.data.args.nickName
    let usernum = this.data.args.username
    let total = this.data.total
    let iscomplete = false
    let dayrequire = this.data.dayrequire
    let dakalog = []
    let challengeuuid = this.data.challengeuuid
    let challengename = this.data.challengename
    //这些就是报名一个挑战需要上传到dakaChallenge_member的数据
  },
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  apply(){ 
    wx.showLoading({
      title: '报名中',
      mask:true
    })
    let challenge = this.data.thisChallenge
    let groupData = this.data.groupData
    let challengeid = this.data.thisChallenge.challengeid
    let challengeMemberArr = {
      dakalog:[],
      memberName:this.data.args.nickName,
      memberUrl:this.data.args.iconUrl,
      memberUsernum:this.data.args.username
    }
    const _ = wx.cloud.database().command
    wx.cloud.database().collection('dakaChallenge_information').where({challengeid:challengeid}).update({
      data:{
        challengeMemberArr:_.push(challengeMemberArr)
      }
    }).then(res=>{
      wx.cloud.database().collection('dakaChallenge_member').add({
        data:{
          challengename:challenge.challengename,
          challengeuuid:challenge.challengeid,
          dakalog:[],
          dayrequire:challenge.totalday,
          iscomplete:false,
          totalday:0,//累计打卡天数
          totaldegree:0,//累计打卡次数
          usernum:this.data.args.username,
          wxname:this.data.args.nickName,
          wxurl:this.data.args.iconUrl,
          name:"测试报名"
        }
      })
    }).then(res=>{
      wx.hideLoading({
        success: (res) => {
          let groupData = this.data.groupData
          let thisPostarr = this.data.postarr
          let challenge = this.data.thisChallenge
          var challengePostarr = JSON.stringify(thisPostarr)
          var thisChallenge = JSON.stringify(challenge)
          var thisGroupData= JSON.stringify(groupData)
          let fromApply = true
          wx.navigateTo({
            url: '../dakaChallenge/dakaChallenge?challengePostarr='+challengePostarr+'&thisChallenge='+thisChallenge+'&thisGroupData='+thisGroupData+'&fromApply='+fromApply,
          })
        },
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var postarr = JSON.parse(options.challengePostarr)
    var thisChallenge = JSON.parse(options.thisChallenge)
    var groupData = JSON.parse(options.thisGroupData)
    let args = wx.getStorageSync('args');
    let usernum = args.username
    let challengeid = thisChallenge.challengeid
    this.setData({
      postarr,
      args,
      thisChallenge,
      groupData,
      title:thisChallenge.challengename,
      guide:thisChallenge.challengeguide,
      dayRequire:thisChallenge.totalday,
    })
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