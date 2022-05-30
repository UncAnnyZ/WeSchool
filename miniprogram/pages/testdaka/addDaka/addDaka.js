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
    groupname:'',
    //选择的打卡挑战
    challenge:{},
    // 下面数据是提交到数据库的
    challengeid:'',
    challengename:'',
    groupuuid:'',
    value:'',
  },
  judge(){
    if (this.data.value == '') {
      wx.showToast({
        title: '不能发送空内容',
        icon:'error'
      })
    }else{
      this.send();
    }
  },
  abc(){
    const _=wx.cloud.database().command
    let challengeid = this.data.thisChallenge.challengeid//选择的打卡挑战的id
    let usernum = this.data.args.username
    let sendtime = String(new Date())
    wx.cloud.database().collection('dakaChallenge_information').where({
      challengeid:challengeid,
      'challengeMemberArr.memberUsernum':usernum
    }).update({
      data:{
        'challengeMemberArr.$.dakalog':_.push(sendtime),
      }
    })
  },
  send(){
    wx.showLoading({
      title: '发送中',
      mask:true
    })
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
    let groupuuid = this.data.groupData.uuid
    let comment = []
    let challengeid = this.data.thisChallenge.challengeid//选择的打卡挑战的id
    let challengename = this.data.thisChallenge.challengename//选择的打卡挑战的名字
    let uid = this.guid()
    let postid = this.hash(challengeid + uid)//说说的id
    const _=wx.cloud.database().command
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
        postid
      }
    }).then(res=>{
      let myUsernum = this.data.args.username
      let groupUsernum = this.data.groupData.groupUsername
      let isleader = groupUsernum==myUsernum?true:false
      let newPost = {
        challengeid,
        challengename,
        comment,
        groupuuid,
        isleader:isleader,
        likename,
        likenum,
        mylike,
        sendtime:'刚刚',
        text,
        usernum,
        wxname,
        wxurl,
        postid
      }
      // console.log(newPost);
      this.setData({
        newPost,
        isupdate:true
      })
      wx.cloud.database().collection('dakaChallenge_information').where({
        challengeid:challengeid,
        'challengeMemberArr.memberUsernum':usernum
      }).update({
        data:{
          'challengeMemberArr.$.dakalog':_.push(sendtime),
        }
      })
      if (this.data.thisChallenge.isdaka == true) {
        wx.cloud.database().collection('dakaChallenge_member').where({challengeuuid:challengeid,usernum:usernum}).update({
          data:{
            dakalog:_.push(sendtime),
            totaldegree:_.inc(+1),
          }
        })
      } else {
        wx.cloud.database().collection('dakaChallenge_member').where({challengeuuid:challengeid,usernum:usernum}).update({
          data:{
            dakalog:_.push(sendtime),
            totaldegree:_.inc(+1),
            totalday:_.inc(+1)
          }
        })
      }

    }).then(res=>{
      wx.hideLoading({
        success: (res) => {
          wx.navigateBack({
            delta: 1,
          })
        },
      })
    })
  },
  guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  },
  hash(input) {
        var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');

        var hash = 5389;
        var i = input.length - 1;

        if (typeof input == 'string') {
            for (; i > -1; i--)
                hash += (hash << 5) + input.charCodeAt(i);
        }
        else {
            for (; i > -1; i--)
                hash += (hash << 5) + input[i];
        }
        var value = hash & 0x7FFFFFFF;

        var retValue = '';
        do {
            retValue += I64BIT_TABLE[value & 0x3F];
        }
        while (value >>= 1);

        return retValue;
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var groupData = JSON.parse(options.groupData)
    var thisChallenge = JSON.parse(options.thisChallenge)
    let args = wx.getStorageSync('args');
    this.setData({
        args,
        groupData,
        thisChallenge,
        groupname:groupData.groupName,
        value:'#'+thisChallenge.challengename+'  '
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
    console.log("监听页面卸载")
    console.log(this.data.newPost);
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      newPost:this.data.newPost,
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