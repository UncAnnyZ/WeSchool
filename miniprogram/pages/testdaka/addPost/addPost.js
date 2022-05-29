// pages/testdaka/addPost/addPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isupdate:false,
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
    groupData:{},
    //缓存
    args:{},
    //需要渲染的数据
    abc:false,
    checkboxarr:[
      { name: '标签一', value: 'uuid' },
      { name: '标签二', value: 'uuid' },
      { name: '标签三', value: 'uuid' },
      { name: '标签四', value: 'uuid' },
      { name: '标签五', value: 'uuid' },
      { name: '标签六', value: 'uuid' },
    ],// '',空字符串的时候显示暂无标签
    challengeArr:[
      {totalday:21,challengename:"打卡挑战标题",deadlinetime:'长期有效',peoplenum:10,wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',isexist:true,isdaka:false}
    ],
    groupname:'小组名字',
    value:'',
    //选择的打卡挑战
    challenge:{},
    // 下面数据是提交到数据库的
    challengeid:'',
    challengename:''
  },
  //还有小组过期逻辑
  //获取未过期打卡挑战
  getChallenge(groupid,usernum){ 
    wx.cloud.callFunction({
      name:"daka",
      data:{
        type:"getChallenge",
        groupId:groupid,
        ispastdue:false
      }
    }).then(res =>{
      console.log(res); 
      let data = res.result.data
      let challengeArr = []
      for (let i = 0; i < data.length; i++) {
          let arr = data[i].challengeMemberArr
          let isdaka = false
          let isexist = false 
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].memberUsernum == usernum) {
              isdaka = arr[k].isDaka
              isexist = true 
            } 
          } 
          let date = data[i].deadlinetime
          let deadlinetime = this.timeDue(date);
          let obj = {
            totalday:data[i].totalday,
            challengename:data[i].challengename,
            deadlinetime:deadlinetime,
            peoplenum:data[i].challengeMemberArr.length,
            wxurl:data[i].wxurl,
            isexist:isexist,
            isdaka:isdaka,
          }
          challengeArr.push(obj)
      }
      this.setData({
        challengeArr,
      })
    })
  },
  timeDue(date){
    if (date == '长期有效') {
      let time = '长期有效'
      return time
    } else {
      let time = new Date(date);
      let deadline ='至' + String(time.getFullYear())+'年'+String(time.getMonth()+1)+'月'+String(time.getDate())+'日'
      return deadline
    }
  },
  judge(){
    if (this.data.value == '') {
      wx.showToast({
        title: '请输入内容',
        icon:'error'
      })
    } else {
      wx.showLoading({
        title: '发送中',
      })
      this.send();
    }
  },
  send(){
    console.log(this.data.args);
    let args = this.data.args
    let wxurl = args.iconUrl
    let wxname = args.nickName
    let usernum = args.username
    let text = this.data.value
    let sendtime = String(new Date())//要这个发送时间
    let mylike = false
    let likenum = 0
    let likename = []
    let groupuuid = this.data.groupData.uuid//要改
    let comment = []
    let challengeid = this.data.challengeid//选择的打卡挑战的id
    let challengename = this.data.challengename//选择的打卡挑战的名字
    //上传数据库
    let challengeuuid = this.data.challengeid//选择的打卡挑战的id
    let userNum = args.username//学号
    let timelog = new Date()
    //这三个是更新打卡数据的
    wx.cloud.database().collection('personalDynamic').add({
      data:{
        challengeid,
        challengename,
        comment,
        groupuuid,
        likename,
        likenum,
        mylike,
        sendtime,
        text,
        usernum,
        wxname,
        wxurl,
      }
    }).then(res =>{
      this.setData({
        isupdate:true
      })
      console.log(res);
      wx.hideLoading({
        success: (res) => {
          wx.navigateBack({
            delta: 1,
          })
        },
      })
    })
    //这个时间要push到打卡成员表的dakalog
    //打卡成员表里面的打卡总次数加一
    //打卡成员表里面的打卡总天数根据isdaka状态来判断能不能加一
    // let isdaka = 选择的打卡挑战的打卡状态
    //学号加打卡挑战的id寻找对应的打卡挑战成员表，
  },
  //添加标签
  checkboxValue(e){
    console.log(e.detail.value);
    console.log();
    this.setData({
      challengeid_excessive:e.detail.value,
    })
  },
  radio(e){
    console.log(e.currentTarget.dataset.name);
    this.setData({
      bqname:e.currentTarget.dataset.name
    })
  },
  checkboxconfirm(){
    let bqname = this.data.bqname
    let challengeid = this.data.challengeid
    let challengeid_excessive = this.data.challengeid_excessive
    if (challengeid_excessive == '') {
      wx.showToast({
        title: '请选择标签',
        icon:'none'
      })
    }else{
      if (challengeid == '') {
        this.setData({
          value:this.data.value + "#" + bqname,
          challengeid:this.data.challengeid_excessive
        })
      } else {
        wx.showToast({
          title: '标签选择后不能更改噢',
          icon:'none'
        }) 
      }
    }
  },
  checkboxcancel(){
    this.setData({
      checked:false,
      challengeid_excessive:'',
      showOther:true
    })
  },
  //添加打卡挑战的跳转
  addDaka(){
    let groupData = this.data.groupData
    var thisGroupData= JSON.stringify(groupData)
    wx.navigateTo({
      url: '../addDakaChallenge/addDakaChallenge?thisGroupData=' + thisGroupData,
    })
  },
  //显示打卡弹窗
  showPunch(){
    this.setData({
      showgroup:true
    })
  },
  //隐藏弹窗
  closePunch(){
    this.setData({
      showgroup:false
    })
  },
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
    var groupData = JSON.parse(options.thisGroupData)
    console.log(groupData);
    let args = wx.getStorageSync('args');
    this.setData({
        args,
        groupData,
        groupname:groupData.groupName
    })
    let groupid = groupData.uuid
    let usernum = args.username
    this.getChallenge(groupid,usernum);
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