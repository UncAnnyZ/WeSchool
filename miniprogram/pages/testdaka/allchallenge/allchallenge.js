// pages/testdaka/allchallenge/allchallenge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isupdate:false,
    navState: 0,//导航状态
    challengeArr:[
      // {totalday:21,challengename:"打卡挑战标题",deadlinetime:'长期有效',peoplenum:10,wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',isexist:true,isdaka:false,ispastdue:false}
    ],
    isdeadchallengeArr:[
      {totalday:21,challengename:"打卡挑战标题",deadlinetime:'长期有效',peoplenum:10,wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',isexist:true,isdaka:false,ispastdue:true}
    ],
  },
  //判断小组过期
  judgePastdue(deadline,deadlinetime,challengeid){
    if (deadline == "longtime") { 
      console.log("长期有效");
      return false
    } else if(deadline == "shorttime") { 
      let nowTime = new Date();
      let deadTime = new Date(deadlinetime);
      let [nowYear,nowMonth,nowDate] = [nowTime.getFullYear(),nowTime.getMonth()+1,nowTime.getDate()]
      let [deadYear,deadMonth,deadDate] = [deadTime.getFullYear(),deadTime.getMonth()+1,deadTime.getDate()]
      if (nowYear == deadYear) {
        //年份判断
        if (nowMonth == deadMonth) {
          if (nowDate == deadDate) {
            console.log("没过期");
            return false
          }else if(nowDate > deadDate) {
            this.upPastdue(challengeid);
            console.log("过期");
            return true
          }else if(nowDate < deadDate) { 
            console.log("没过期");
            return false
          }
        }else if (nowMonth < deadMonth) {
          console.log("没有过期");
          return false
        }else if (nowMonth > deadMonth) {
          console.log("过期了");
          this.upPastdue(challengeid);
          return true
        }
      }else if (nowYear > deadYear ) { 
        console.log("过期了");
        this.upPastdue(challengeid);
        return true
      }else if (nowYear < deadYear) {
        console.log("没有过期"); 
        return false
      }
    }
  },
  //获取打卡挑战
  getChallenge(groupid,usernum){ 
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.cloud.callFunction({
      name:"daka",
      data:{
        type:"getAllChallenge",
        groupId:groupid,
      }
    }).then(res =>{
      console.log(res);
      let resData = res.result.data   
      let DATA = this.judegeChallengePastDue(resData);
      console.log(DATA); 
      let data = DATA.nowChallenge
      let psData = DATA.pastDueChallenge
      let challengeArr = []
      let isdeadchallengeArr = []
      for (let i = 0; i < data.length; i++) {
          let arr = data[i].challengeMemberArr
          let isdaka = false
          let isexist = false 
          let ispastdue = this.judgePastdue(data[i].deadline,data[i].deadlinetime,data[i].challengeid);
          console.log(ispastdue);
          if (ispastdue == false) {
            for (let k = 0; k < arr.length; k++) {
              if (arr[k].memberUsernum == usernum) {
                isdaka = arr[k].isDaka
                isexist = true 
              } 
            } 
            let myDakaLog = this.judgeIsdaka(data[i].challengeMemberArr);
            let date = data[i].deadlinetime
            let deadlinetime = this.timeDue(date);
            let obj = {
              totalday:data[i].totalday,
              challengename:data[i].challengename,
              deadlinetime:deadlinetime,
              peoplenum:data[i].challengeMemberArr.length,
              wxurl:data[i].wxurl,
              isexist:isexist,  
              isdaka:myDakaLog.isdaka,
              challengeid:data[i].challengeid,
              challengeguide:data[i].challengeguide,
              dakalog:myDakaLog.myDakaLog
            }
            challengeArr.push(obj)
          }
      }
      for (let j = 0; j < psData.length; j++) {
        let arr = psData[j].challengeMemberArr
        let isdaka = false
        let isexist = false 
        // for (let k = 0; k < arr.length; k++) {
        //   if (arr[k].memberUsernum == usernum) {
        //     isdaka = arr[k].isDaka
        //     isexist = true 
        //   } 
        // } 
        // let myDakaLog = this.judgeIsdaka(psData[i].challengeMemberArr);
        let date = psData[j].deadlinetime
        let deadlinetime = this.timeDue(date);
        let obj = {
          totalday:psData[j].totalday,
          challengename:psData[j].challengename,
          deadlinetime:deadlinetime,
          peoplenum:psData[j].challengeMemberArr.length,
          wxurl:psData[j].wxurl,
          isexist:isexist,  
          isdaka:false,
          challengeid:psData[j].challengeid,
          challengeguide:psData[j].challengeguide,
          dakalog:''
        }
        isdeadchallengeArr.push(obj)
      }
      this.setData({
        challengeArr,
        isdeadchallengeArr
      })
    }).then(res=>{
      wx.hideLoading()
    })
  },
  // 分出进行中和已结束的打卡挑战
  judegeChallengePastDue(data){
    let nowChallenge = []
    let pastDueChallenge = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].ispastdue==true) {
        pastDueChallenge.push(data[i])
      } else if (data[i].ispastdue==false) {
        nowChallenge.push(data[i])
      }
    }
    let DATA = {
      nowChallenge:nowChallenge,
      pastDueChallenge:pastDueChallenge
    }
    return DATA
  },
  //判断我今天是否打卡
  judgeIsdaka(challengeMemberArr){
    let usernum = this.data.args.username
    let nowTime = new Date()
    let [nowYear,nowMonth,nowDate] = [nowTime.getFullYear(),nowTime.getMonth()+1,nowTime.getDate()]
    let isdaka = false
    let myDakaLog = []
    for (let i = 0; i < challengeMemberArr.length; i++) {
      if (usernum == challengeMemberArr[i].memberUsernum) {
        myDakaLog = challengeMemberArr[i].dakalog
        // console.log(challengeMemberArr[k]);  
        for (let k = 0; k < challengeMemberArr[i].dakalog.length; k++) {
          let dakaTime = new Date(challengeMemberArr[i].dakalog[k])
          let [dakaYear,dakaMonth,dakaDate] = [dakaTime.getFullYear(),dakaTime.getMonth()+1,dakaTime.getDate()]
          if (nowYear==dakaYear&&nowMonth==dakaMonth&&nowDate==dakaDate) {
            isdaka = true
          }
        } 
      }
    }
    let mydaka = {
      myDakaLog:myDakaLog,
      isdaka:isdaka
    }
    // console.log(mydaka);
    return mydaka
  },
  //显示时间处理
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
  //处理过期的打卡挑战
  upPastdue(challengeid){
    wx.cloud.database().collection('dakaChallenge_information').where({challengeid:challengeid}).update({
      data:{
        ispastdue:true 
      }
    })
  },
  //ispastdue是用来拉数据之后for循环分类出两个数组
  //1、一个ispastdue为false的放在challengeArr
  //2、一个ispastdue为true的放在isdeadchallengeArr
  addDaka(){
    let groupData = this.data.groupData
    var thisGroupData= JSON.stringify(groupData)
    wx.navigateTo({
      url: '../addDakaChallenge/addDakaChallenge?thisGroupData=' + thisGroupData,
    })
  },
  applyChallenge(e){
    console.log(e);
    let challengeid = e.currentTarget.dataset.item.challengeid
    let challenge = e.currentTarget.dataset.item
    let postarr = this.data.postarr
    let thisPostarr = []
    for (let i = 0; i < postarr.length; i++) {
      if (challengeid == postarr[i].challengeid) {
        thisPostarr.push(postarr[i])
      }
    }
    var challengePostarr = JSON.stringify(thisPostarr)
    var thisChallenge = JSON.stringify(challenge)
    let groupData = this.data.groupData
    var thisGroupData= JSON.stringify(groupData)
    wx.navigateTo({
      url: '../applyChallenge/applyChallenge?challengePostarr='+challengePostarr+'&thisChallenge='+thisChallenge+'&thisGroupData='+thisGroupData, 
    })
  },
  dakaChallenge(e){
    console.log(e);
    let challengeid = e.currentTarget.dataset.item.challengeid
    let challenge = e.currentTarget.dataset.item
    let postarr = this.data.postarr
    let thisPostarr = []
    for (let i = 0; i < postarr.length; i++) {
      if (challengeid == postarr[i].challengeid) {
        thisPostarr.push(postarr[i])
      }
    }
    var challengePostarr = JSON.stringify(thisPostarr)
    var thisChallenge = JSON.stringify(challenge)
    let groupData = this.data.groupData
    var thisGroupData= JSON.stringify(groupData)
    let isupdate = this.data.isupdate
    wx.navigateTo({
      url: '../dakaChallenge/dakaChallenge?challengePostarr='+challengePostarr+'&thisChallenge='+thisChallenge+'&thisGroupData='+thisGroupData+'&isupdate='+isupdate,
    })
  },
  // 顶部导航栏
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
    var groupData = JSON.parse(options.thisGroupData)
    var postarr = JSON.parse(options.thispostarr)
    // console.log(postarr); 
    // console.log(groupData);
    let args = wx.getStorageSync('args');
    this.setData({
        args,
        groupData,
        groupname:groupData.groupName,
        postarr
    })
    let groupid = groupData.uuid
    let usernum = args.username
    this.getChallenge(groupid,usernum);
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
    console.log(this.data.isupdate);
    console.log(this.data.newChallenge);
    if (this.data.newChallenge != null) {
      console.log(this.data.newChallenge);
      let newChallenge = this.data.newChallenge
      let challengeArr = this.data.challengeArr
      challengeArr.push(newChallenge)
      this.setData({
        challengeArr,
        newChallenge:null,
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
    // console.log("监听页面卸载");
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