// pages/more/pages/saveBureau/bureauContent/bureauContent.js
var app = getApp()
var util = require("../../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
    commentList:[],
    comEdit: false,       // 评论区复制/删除弹窗
    charBox:false,
    delCard:false
  },
  back(){
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
    })
  },

  popUp: function () {          //控制卡片/评论弹窗
    var edit_style = 'edit_hide';
    // picker动画样式
    if (edit_style == undefined || edit_style == 'edit_hide') {
      edit_style = 'edit_show'
    } else {
      edit_style = 'edit_hide'
    }
    this.setData({ edit_style })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  joinIn(e){        //-----这代码写得太垃圾了，全是if else嵌套
    if(this.endTime  - this.startTime < 350){     //----解决因长按事件与短按事件同时绑定而引发的冲突
      var result=true
      var sex = e.currentTarget.dataset.sex
      const args = wx.getStorageSync('args')
      console.log(args.sex);
      console.log(sex);
      if(e.currentTarget.id){
        var index = parseInt(e.currentTarget.id)      //----直接获取的e.currentTarget.id类型为string，不能直接使用。需要转为number类型
      }
      var add={
        userName:args.username,
        iconUrl:args.iconUrl,
        nickName:args.nickName,
      }
      if((sex==="manNum" && args.sex==="woman") || (sex==="womanNum" && args.sex==="man")){     //-----若点击事件的性别与绑定的性别不一致
        wx.showToast({
          title: '请正确选择性别',
          icon: 'none'
        })
        return
      }else if(this.data.userName===args.username){
        wx.showToast({
          title: '您已经是局长',
          icon: 'none'
        })
        return
      }else if((sex==="manNum" && !!this.data.manNum[index].userName) || (sex==="womanNum" && !!this.data.womanNum[index].userName)){
        wx.showToast({
          title: '这里已经有人了',
          icon: 'none'
        })
      }else if(this.data.userName!=args.username){       //-----判断“我”是不是局长
        this.data.manNum.forEach(item => {
          if(item.userName===args.username){
            wx.showToast({
              title: '切勿重复加入',
              icon: 'none'
            })
            result=false
          }
        });
        this.data.womanNum.forEach(item => {
          if(item.userName===args.username){
            wx.showToast({
              title: '切勿重复加入',
              icon: 'none'
            })
            result=false
          }
        });
        if(result===true){     //-----通过判断用户args.sex，决定用户进男组还是女组
          if(args.sex==="man"){
            index!=undefined ? this.data.manNum[index] = add : this.data.manNum[this.data.manNum.length-1] = add
          }else{
            index!=undefined ? this.data.womanNum[index] = add : this.data.womanNum[this.data.womanNum.length-1] = add
          }
          wx.cloud.callFunction({
            name: 'saveBureau',
            data: {
              manNum:this.data.manNum,
              womanNum:this.data.womanNum,
              _id:this.data._id,
              type: "bureauMember"
            },
            success: res => {
              wx.showToast({
                title: '入局成功',
                icon: 'none'
              })
            },
            fail: err => {
              console.error
            }
          })
        }
      }
      this.setData({
        manNum:this.data.manNum,
        womanNum:this.data.womanNum
      })
    }
  },
  charBoxdel(){
    this.setData({
      charBox:false
    })
  },
  showReport(){
    this.setData({
      charBox:!this.data.charBox
    })
    this.animate('.charBox', [
      {opacity: 0.3, ease:"linear"},
      {opacity: 1,ease:"linear"},
    ], 1500)
  },
  report(){
    // wx.navigateTo({
    //   url: '../saveBureau/publishBureau/publishBureau',
    // })
    wx.showToast({
      title: '局长太牛逼了，举报不了',
      icon: 'none'
    })
  },

  delCard(){
    var that=this
    wx.showModal({
      title: '确定删除？',
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'saveBureau',
            data: {
              _id:that.data._id,
              type: "delBureau"
            },
            success: res => {
              wx.showToast({
                title: '删除成功!',
                icon: 'none'
              })
              that.setData({
                delCard:true
              })
              that.back()
            },
            fail: err => {
              console.error
              wx.showToast({
                title: '删除失败!',
                icon: 'none'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  bindTouchStart: function(e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function(e) {
    this.endTime = e.timeStamp;
  },

  delNum(e){    //----删除入局成员
    const args = wx.getStorageSync('args')
    var index = parseInt(e.currentTarget.id)
    var sex = e.currentTarget.dataset.sex
    var show=0
    var that=this
    if(sex==="manNum"){
      if(that.data.manNum[index].userName===args.username){
        show=1
      }
    }else{
      if(that.data.womanNum[index].userName===args.username){
        show=1
      }
    }
    if(show===1){
    wx.showModal({
      title: '确定删除？',
      success (res) {
        if (res.confirm) {
          sex === "manNum" ? that.data.manNum[index] = 1 : that.data.womanNum[index] = 1
          wx.cloud.callFunction({
            name: 'saveBureau',
            data: {
              manNum:that.data.manNum,
              womanNum:that.data.womanNum,
              _id:that.data._id,
              type: "bureauMember"
            },
            success: res => {
              wx.showToast({
                title: '出局成功!',
                icon: 'none'
              })
              that.setData({
                manNum:that.data.manNum,
                womanNum:that.data.womanNum,
                out:true
              })
            },
            fail: err => {
              console.error
              wx.showToast({
                title: '出局失败!',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  }
  },

  transformTime(){
    var showComment=[]
    if(this.data.commentList.length!=0){
      showComment=JSON.parse(JSON.stringify(this.data.commentList))
      showComment.map(item => {
        item.time = util.timeago(item.time, 'Y年M月D日')
        if(item.reply){
          item.reply.map(item => {
            item.time = util.timeago(item.time, 'Y年M月D日')
          })
        }
      })
      this.setData({
        showComment,
        none:false
      })
    }else{
      this.setData({
        showComment,
        none:true
      })
    }
  },
  showInput(){
    this.setData({
      showInput:true
    })
  },
  
  obatinComment(e){
    const args = wx.getStorageSync('args')
    var outIndex=this.data.outIndex
    var inIndex=this.data.inIndex
    var index=this.data.index
    var type=""
    var indexTemp = -1
    if(e.detail.value.textarea!="" && e.detail.value!=""){
      this.setData({
        inputComment:e.detail.value
      })
      if(e.detail.value.textarea){
        this.setData({
          inputComment:e.detail.value.textarea
        })
      }
    }else{
      wx.showToast({
        title: '请填写内容！',
        icon: 'none',
      })
      return
    }
    var addData={
      input:this.data.inputComment,
      userName: args.username,
      time:new Date().getTime(),
      iconUrl:args.iconUrl,
      nickName:args.nickName,
    }
    if(outIndex>=0 || index>=0){
      if(inIndex>=0){
        addData.replyName=this.data.commentList[outIndex].reply[inIndex].nickName
      }else{
        outIndex>=0 ? addData.replyName=this.data.commentList[outIndex].nickName : addData.replyName=this.data.commentList[index].nickName
      }
      outIndex>=0 ? this.data.commentList[outIndex].reply.push(addData) : this.data.commentList[index].reply.push(addData)
      outIndex>=0 ? indexTemp=outIndex : indexTemp=index
      type="replyComment"
    }else{
      addData.reply=[]
      this.data.commentList.push(addData)
      type="writeComment"
    }
    wx.cloud.callFunction({
      name: 'saveBureau',
      data: {
        addData:addData,
        index:indexTemp,
        _id:this.data._id,
        type: type
      },
      success: res => {
        wx.showToast({
          title: '评论成功',
          icon: 'none'
        })

        this.transformTime()
        this.setData({
          input:"",
          index:-1,
        })
      },
      fail: err => {
        console.error
      }
    })
  },
  editComment(e){
    const args = wx.getStorageSync('args')
    var index = parseInt(e.currentTarget.id)
    var inIndex = e.currentTarget.dataset.in
    var outIndex = e.currentTarget.dataset.out
    var ShowDelCom=false
    var CommentName=""
    var CommentContent=""
    this.popUp()
    if(!!this.data.commentList[index]){
      if(this.data.commentList[index].userName===args.username){
        ShowDelCom=true
      }
      CommentName=this.data.commentList[index].nickName
      CommentContent=this.data.commentList[index].input
    }
    if(!!this.data.commentList[outIndex]){
      if(this.data.commentList[outIndex].reply[inIndex].userName===args.username){
        ShowDelCom=true
      }
      CommentName=this.data.commentList[outIndex].reply[inIndex].nickName
      CommentContent=this.data.commentList[outIndex].reply[inIndex].input
    }
    this.setData({ 
      comEdit:!this.data.comEdit,
      ShowDelCom,
      CommentName,
      CommentContent,
      index,
      inIndex,
      outIndex
    })
  },

  replyComment(){
    this.popUp()
    this.setData({
      showInput:true,
      comEdit: !this.data.comEdit
    })
    // this.obatinComment()
  },

  copyComment() {
    var index=this.data.index
    wx.setClipboardData({
      //准备复制的数据
      data: this.data.commentList[index].input,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
    // 改变 edit_style
    this.popUp()
    // 改变 comEdit
    this.setData({
      comEdit: !this.data.comEdit
    })
  },

  delComment(){
    var inIndex=this.data.inIndex
    var outIndex=this.data.outIndex
    var index=this.data.index
    var delData=""
    var type=""
    var that=this
    if(outIndex>=0){
      type="delReply"
      delData=that.data.commentList[outIndex].reply[inIndex]
    }else{
      type="delComment"
      delData=that.data.commentList[index]
    }
    wx.showModal({
      title: '确定删除？',
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'saveBureau',
            data: {
              delData:delData,
              _id:that.data._id,
              outIndex:outIndex,
              type: type
            },
            success: res => {
              outIndex>=0 ? that.data.commentList[outIndex].reply.splice(inIndex,1) : that.data.commentList.splice(index,1)
              that.transformTime()
              wx.showToast({
                title: '删除成功!',
                icon: 'none'
              })
              that.popUp()
              that.setData({
                comEdit:!that.data.comEdit,
                com:true
              })
            },
            fail: err => {
              console.error
              wx.showToast({
                title: '删除失败!',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },

  readContent(_id){
    wx.cloud.callFunction({
      name: 'saveBureau',
      data: {
        _id:_id,
        type: "readContent"
      },
      success: res => {
        this.data.commentList=res.result.data[0].commentList
        this.transformTime()
        this.setData({
          manNum:res.result.data[0].manNum,
          womanNum:res.result.data[0].womanNum,
        })
      },
      fail: err => {
        console.error
        wx.showToast({
          title: '未找到这张卡片，请刷新！',
          icon: 'none',
        })
      }
    })
  },
  
  onLoad: function (options) {
    var content=wx.getStorageSync('content')
    const args = wx.getStorageSync('args')
    content.time = util.timeago(content.time, 'Y年M月D日')
    this.readContent(content._id)
    this.setData({
      iconUrl:content.iconUrl,
      sex:content.sex,
      locationName:content.locationName,
      nickName:content.nickName,
      userName:content.userName,
      photo:content.photo,
      text:content.text,
      time:content.time,
      _id:content._id,
      args
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({ 
      out:this.data.out,
      manNum:this.data.manNum,
      womanNum:this.data.womanNum,
      commentList:this.data.commentList,
      delCard:this.data.delCard,
      my_id:this.data._id,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    var text=that.data.text;//获取产品标题
    if (res.from === 'button') {
    }
        // 来自页面内转发按钮
        return {
          title: text,
          path: '/miniprogram/pages/more/pages//saveBureau/bureauContent/bureauContent',
        }
      
  }
})