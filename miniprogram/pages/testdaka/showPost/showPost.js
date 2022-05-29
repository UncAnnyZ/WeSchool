// pages/testdaka/showPost/showPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isupdate:false,
    zanArr:[1],
    mylike:false,
    // 渲染数据
    value:'',
    toolbarHight:110,
    keyboardHight:0,
    // 还要小组的信息
    // groupinfo:{},
    post:
      {wxname:'Start from scratch',wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:"20034480214",text:'第一条个人动态',sendtime:'刚刚',mylike:true,likenum:1,likename:['名字1','名字2'],groupuuid:'小组id',comment:[{name:'微信名',text:'评论内容',time:'刚刚',url:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:'20034480214',isleader:true}],challengename:'打卡挑战的名字',challengeid:'打卡挑战的id',_id:'数据库自动生成的id作为说说id使用',isleader:true},
    text:'',//输入框获取
  },
    //发布评论
  addcomment(){
    if (this.data.text == '') {
      wx.showToast({
        title: '请输入评论',
        icon:'error'
      })
    } else {
      let name = this.data.args.nickName
      let text = this.data.text
      let time = new Date()
      let url = this.data.args.iconUrl
      let usernum = this.data.args.username
      let _id = this.data.post._id//数据库索引
      let addcomment = {name:name,text:text,time:time,url:url,usernum:usernum}
      let comment = this.data.post.comment
      wx.showLoading({
        title: '发送中',
      })
      comment.push(addcomment)
      this.setData({
        'post.comment':comment,
        text:'',
        isupdate:true
      })
      const _=wx.cloud.database().command
      wx.cloud.database().collection('personalDynamic').where({_id:_id}).update({
        data:{
          comment:_.push(addcomment),
        }
      }).then(res=>{
        wx.hideLoading()
      })
    }
  },

  input(e){
    // console.log(e);
    let text = e.detail.value
    console.log(text);
    this.setData({
      text,
    })
  },
  //点赞
  clickLike(){
    console.log("点赞");
    let myname = this.data.args.nickName
    let likenameArr = this.data.post.likename
    let mylike = this.data.post.mylike
    let _id = this.data.post._id
    const _=wx.cloud.database().command
    if (mylike) {
      // 已经点赞
      likenameArr.splice(likenameArr.length - 1,1)
      this.setData({
        'post.mylike':false,
        'post.likename':likenameArr,
        'post.likenum':this.data.post.likenum - 1,
        isupdate:true
      })
      wx.cloud.database().collection('personalDynamic').where({_id:_id}).update({
        data:{
          mylike:false,
          likename:_.pop(myname),
          likenum:_.inc(-1)
        }
      })
    } else {
      //未点赞
      likenameArr.push(myname)
      this.setData({
        'post.mylike':true,
        'post.likename':likenameArr,
        'post.likenum':this.data.post.likenum + 1,
        isupdate:true
      })
      wx.cloud.database().collection('personalDynamic').where({_id:_id}).update({
        data:{
          mylike:true,
          likename:_.push(myname),
          likenum:_.inc(+1)
        }
      })
    }
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