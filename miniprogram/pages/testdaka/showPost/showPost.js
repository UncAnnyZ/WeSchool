// pages/testdaka/showPost/showPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zanArr:[1],
    mylike:false,
    // 渲染数据
    // 还要小组的信息
    // groupinfo:{},
    post:
      {wxname:'Start from scratch',wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:"20034480214",text:'第一条个人动态',sendtime:'刚刚',mylike:true,likenum:1,likename:['名字1','名字2'],groupuuid:'小组id',comment:[{name:'微信名',text:'评论内容',time:'刚刚',url:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:'20034480214',isleader:true}],challengename:'打卡挑战的名字',challengeid:'打卡挑战的id',_id:'数据库自动生成的id作为说说id使用',isleader:true},
    //上传personalDynamic这个数据库的表的对应说说的comment，数组push
    // addcomment:{name:'微信名',text:'评论内容',time:'刚刚',url:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:'20034480214',isleader:true},这个是数据模板
    text:'',//输入框获取
    isleader:false//onload进行判断
  },
  //发送说说的输入框忘了写了
  addcomment(){
    let name = this.data.args.nickName
    let text = this.data.text
    let time = new Date()
    let url = this.data.args.iconUrl
    let usernum = this.data.args.username
    let isleader = this.data.isleader
    //下面这个就是要上传数据库的数据
    //    //上传personalDynamic这个数据库的表的对应说说的comment，数组push
    let addcomment = {name:name,text:text,time:time,url:url,usernum:usernum,isleader:isleader}
  },
  trimPostData(postData){
    let post = {
      wxname:postData.wxname,
      wxurl:postData.wxurl,
      usernum:postData.usernum,
      text:postData.text,
      sendtime:postData.sendtime,
      mylike:postData.mylike,
      likenum:postData.likenum,
      groupuuid:postData.groupuuid,
      comment:postData.comment,
      challengename:postData.challengename,
      challengeid:postData.challengeid,
      _id:postData._id,
      isleader:postData.isleader,
      likename:postData.likename,
    }
    this.setData({
      post
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var post = JSON.parse(options.thisPostData)
    let args = wx.getStorageSync('args');
    this.trimPostData(post);
    this.setData({
        args,
        myname:args.nickName,
        myurl:args.iconUrl
    })
    // if (小组信息创建者学号 == args.username) {
    //   this.setData({
    //     isleader:true
    //   })
    // }
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