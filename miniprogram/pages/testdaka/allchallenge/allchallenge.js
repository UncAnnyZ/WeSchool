// pages/testdaka/allchallenge/allchallenge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navState: 0,//导航状态
    challengeArr:[
      {totalday:21,challengename:"打卡挑战标题",deadlinetime:'长期有效',peoplenum:10,wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',isexist:true,isdaka:false,ispastdue:false}
    ],
    isdeadchallengeArr:[
      {totalday:21,challengename:"打卡挑战标题",deadlinetime:'长期有效',peoplenum:10,wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',isexist:true,isdaka:false,ispastdue:true}
    ],
  },
  //ispastdue是用来拉数据之后for循环分类出两个数组
  //1、一个ispastdue为false的放在challengeArr
  //2、一个ispastdue为true的放在isdeadchallengeArr
  addDaka(){
    wx.navigateTo({
      url: '../addDakaChallenge/addDakaChallenge',
    })
  },
  applyChallenge(){
    wx.navigateTo({
      url: '../applyChallenge/applyChallenge',
    })
  },
  dakaChallenge(){
    wx.navigateTo({
      url: '../dakaChallenge/dakaChallenge',
    })
  },
    //监听滑块
    bindchange(e) {
      console.log(e.detail.current)
      let index = e.detail.current;
      this.setData({
        navState:index
      })
    },
    //点击导航
    navSwitch: function(e) {
      //console.log(e.currentTarget.dataset)
      let index = e.currentTarget.dataset.index;
      this.setData({
        navState:index
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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