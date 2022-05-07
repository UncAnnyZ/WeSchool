// components/inform.js
var app = getApp()
const args = wx.getStorageSync('args')
// var moreUtil = require(".././../utils/utils")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    edit_style: {
      type: String,
      value: "edit_hide"
    },
    comReply: {
      type: String,
      value: "False"
    },
    CommentList:{
      type: Array,
      value: []
    },
    content:{
      type: Object,
      value: {}
    }

  },

  /**
   * 组件的初始数据
   */
  
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.popUp()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //看看是隐藏还是显示
    popUp: function () {
      var edit_style = this.properties.edit_style;
      // picker动画样式
      if (edit_style == undefined || edit_style == 'edit_hide') {
        edit_style = 'edit_show'
      } else {
        edit_style = 'edit_hide'
      }
      this.setData({
        edit_style
      })
    },
    
    //点击事件控制显影
    ReplyComment: function () {
      setTimeout(() => {
        this.setData({
          comReply: !this.properties.comReply,
        })
      }, 200);
      this.triggerEvent(
        "sendEvent", {
          comReply: this.properties.comReply
        }
      )
    },

    // callFunction: function (type,be_character,Input) {
    //   const args = wx.getStorageSync('args')
    //   var that=this
    //   let character = { // 处理得到点赞者信息
    //     userName: args.username,
    //     iconUrl: args.iconUrl,
    //     nickName: args.nickName
    //   }
    //   wx.cloud.callFunction({
    //     name: "CampusCircle",
    //     data: {
    //       type: type,
    //       character: character,
    //       be_character: be_character,
    //       username: args.username,
    //       be_username: that.properties.content.username,
    //       content: Input,
    //       createTime: new Date().getTime(),
    //       arcticle: that.properties.content,
    //       arcticle_id: that.properties.content._id,
    //       _id: that.properties.content._id,
    //     },
    //     success(res) {
    //       console.log(res, "调用评论云函数成功");
    //     },
    //     fail(e) {
    //       if(type === "ReplyCommentControlLogs"){
    //         wx.showToast({
    //           title: '回复评论失败',
    //           icon: 'none'
    //         })
    //       }
    //       if(type === "CommentControlLogs"){
    //         wx.showToast({
    //           title: '评论失败',
    //           icon: 'none'
    //         })
    //       }
    //     }
    //   })
    // },
    //正则判断格式
    isNull(str) {
      if (str == "") return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },
    //提交事件
    replySubmit: function (e) {
      let type = "writeComment"
      var that = this
      let res = this.isNull(e.detail.value);
      console.log(e.detail.value)
      if (res) {
        wx.showToast({
          title: '内容不能为空',
          icon: 'none'
        })
      } else{
        var add = {
          "InputComment": e.detail.value,
          "CommentTime": new Date().getTime(),
          "iconUser": args.iconUrl,
          "nickName": args.nickName,
          "username": args.username,
          "Reply": [],
          "Star_User":[]
        }
      }
      wx.cloud.callFunction({
        name: 'NewCampusCircle',
        data:{
          url:"CommentControl",
          addData: add,
          _id: that.properties.content._id,
          username: args.username,
          type: type
        },
        success(res){
          console.log(res)
          wx.showToast({
            title: '评论成功',
            icon:"none"
          })
        }
    
      })
    },
    async ctFocus(e) {
      // 获取键盘高度
      let keyboard_h = e.detail.height;
      this.setData({
        keyboard_h
      })
    },
  }
})