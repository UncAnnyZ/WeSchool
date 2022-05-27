// pages/testdaka/addPost/addPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    keyboardHight:0,
    showOther:true,
    toolbarHight:120,
    numberShow:true,
    functionShow:false,
    cursor:0,
    maxlength:500,
    showgroup:false,
    checked:false,
    challengeid_excessive:'',
    //打卡挑战的数据
    dakachalleng:{},
    //该小组的全部数据
    groupdata:{},
    //缓存
    args:{},
    //需要渲染的数据
    groupname:'小组名字',
    //选择的打卡挑战
    challenge:{},
    // 下面数据是提交到数据库的
    challengeid:'',
    challengename:'',
    groupuuid:'',
    value:'',
  },
  send(){
    //上传说说表
    console.log(this.data.args);
    let args = this.data.args
    let wxurl = args.iconUrl
    let wxname = args.nickName
    let usernum = args.username
    let text = this.data.value
    let time = new Date()//获取现在时间
    let sendtime = String(time);//要这个发送时间
    let mylike = false
    let likenum = 0
    let likename = []
    let groupuuid = this.data.groupuuid//要改
    let comment = []
    let challengeid = this.data.challengeid//选择的打卡挑战的id
    let challengename = this.data.challengename//选择的打卡挑战的名字
    //上传打卡挑战个人表
    let challengeuuid = this.data.challengeid//选择的打卡挑战的id
    let userNum = args.username//学号
    let timelog = new Date()
    //这个时间要push到打卡成员表的dakalog
    //打卡成员表里面的打卡总次数加一
    //打卡成员表里面的打卡总天数根据isdaka状态来判断能不能加一
    // let isdaka = 选择的打卡挑战的打卡状态
    //学号加打卡挑战的id寻找对应的打卡挑战成员表，
  },
  //添加标签
  //输入框不聚焦
  inputblur(){
      this.setData({
        toolbarHight:120,
        functionShow:false,
        numberShow:true
      })
  },
  //输入框聚焦
  inputfocus(){
      this.setData({
        showOther:true,
        functionShow:true,
        numberShow:false
      })
  },
  inputText(e){
    console.log(e.detail.value);
    console.log(e);
    this.setData({
        cursor:e.detail.cursor,
        value:e.detail.value
    })
  },
  cancel(){
    wx.navigateBack({
      delta: 1,
    })
  },
  tap(){
      this.setData({
        showOther:!this.data.showOther
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let args = wx.getStorageSync('args');
    this.setData({
        args
    })
    wx.onKeyboardHeightChange((res) => {
        console.log('wx.onKeyboardHeightChange的res',res);
        this.setData({
            keyboardHight:res.height
        })
        if (res.height > 0) {
            this.setData({
                toolbarHight:90
            })
        }
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