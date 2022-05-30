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
    post:'',
      // {wxname:'Start from scratch',wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:"20034480214",text:'第一条个人动态',sendtime:'刚刚',mylike:true,likenum:1,likename:['名字1','名字2'],groupuuid:'小组id',comment:[{name:'微信名',text:'评论内容',time:'刚刚',url:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:'20034480214',isleader:true}],challengename:'打卡挑战的名字',challengeid:'打卡挑战的id',_id:'数据库自动生成的id作为说说id使用',isleader:true},
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
      let postid = this.data.post.postid//数据库索引
      let addcomment = {name:name,text:text,time:time,url:url,usernum:usernum}
      //下面是setdata的
      let comment = this.data.post.comment
      let timeStamp = time.getTime();
      let whenSend = this.timeShow(timeStamp);
      let addComment = {name:name,text:text,time:time,url:url,usernum:usernum};
      addComment.time =whenSend
      wx.showLoading({
        title: '发送中',
        mask:true
      })
      comment.push(addComment)
      this.setData({
        'post.comment':comment,
        text:'',
        isupdate:true
      })
      const _=wx.cloud.database().command
      wx.cloud.database().collection('personalDynamic').where({postid:postid}).update({
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
    wx.showLoading({
      title: '点赞中',
      mask:true
    })
    console.log("点赞");
    let myname = this.data.args.nickName
    let likenameArr = this.data.post.likename
    let mylike = this.data.post.mylike
    let postid = this.data.post.postid
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
      wx.cloud.database().collection('personalDynamic').where({postid:postid}).update({
        data:{
          mylike:false,
          likename:_.pop(myname),
          likenum:_.inc(-1)
        }
      }).then(res=>{
        wx.hideLoading()
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
      wx.cloud.database().collection('personalDynamic').where({postid:postid}).update({
        data:{
          mylike:true,
          likename:_.push(myname),
          likenum:_.inc(+1)
        }
      }).then(res=>{
        wx.hideLoading()
      })
    }
  },
  trimPostData(postData){
    let comment = postData.comment
    console.log(comment);
    for (let i = 0; i < comment.length; i++) {
      //评论发送时间判断
        let sendtime = comment[i].time
        let timestamp = new Date(sendtime).getTime();
        console.log(timestamp);
        let whenSend = this.timeShow(timestamp);
        comment[i].time=whenSend
        console.log(comment[i].time);
    }
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
      postid:postData.postid
    }
    this.setData({
      post
    })
  },
  //获取评论/帖子时间 参数：时间戳
  timeShow(timestamp) {
    // 保留原始的时间
    let result = "";
    
    //把分，时，天，周，半个月，一个月用毫秒表示
    let minute = 1000 * 60; 
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let halfamonth = day * 15;
    let month = day * 30;
    
    //获取当前时间毫秒
    let now = new Date().getTime(); 
          
    //时间差
    let diffValue = now - timestamp; 

    // 超过当前时间,直接return
    if (diffValue < 0) {
      return result;
    }
    
    //计算时间差的分，时，天，周，月
    let minC = diffValue / minute; 
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    
    if (monthC >= 1 && monthC <= 3) {
      result = parseInt(monthC) + "月前"
    } else if (weekC >= 1 && weekC <= 3) {
      result = parseInt(weekC) + "周前"
    } else if (dayC >= 1 && dayC <= 6) {
      result = parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC <= 23) {
      result = parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC <= 59) {
      result = parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = "刚刚"
    } else {
      // 时间太久
      result = timestamp;
    }
    
    // 最后return出来
    return result;

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var post = JSON.parse(options.thisPostData)
    let args = wx.getStorageSync('args');
    var index = options.index
    this.trimPostData(post);
    this.setData({
        args,
        myname:args.nickName,
        myurl:args.iconUrl,
        index
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
    let updatePost = this.data.post
    // console.log("监听页面卸载");
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      isupdate:this.data.isupdate,
      updatePost,
      postindex:this.data.index
    })
    //注意主页post和打卡挑战post是否会相互影响
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