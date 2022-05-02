// components/inform.js
var app = getApp()
var moreUtil = require(".././../utils/utils")
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
    outIndex:{
      type: Number,
      value: -1
    },
    inIndex:{
      type: Number,
      value: -1
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

    callFunction: function (type,be_character,Input) {
      const args = wx.getStorageSync('args')
      var that=this
      let character = { // 处理得到点赞者信息
        userName: args.username,
        iconUrl: args.iconUrl,
        nickName: args.nickName
      }
      wx.cloud.callFunction({
        name: "CampusCircle",
        data: {
          type: type,
          character: character,
          be_character: be_character,
          username: args.username,
          be_username: that.properties.content.username,
          content: Input,
          createTime: new Date().getTime(),
          arcticle: that.properties.content,
          arcticle_id: that.properties.content._id,
          _id: that.properties.content._id,
        },
        success(res) {
          console.log(res, "调用评论云函数成功");
        },
        fail(e) {
          if(type === "ReplyCommentControlLogs"){
            wx.showToast({
              title: '回复评论失败',
              icon: 'none'
            })
          }
          if(type === "CommentControlLogs"){
            wx.showToast({
              title: '评论失败',
              icon: 'none'
            })
          }
        }
      })
    },

    isNull(str) {
      if (str == "") return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },

    replySubmit: function (e) {
      var that = this;
      let res = that.isNull(e.detail.value);
      var outIndex = that.properties.outIndex
      var inIndex = that.properties.inIndex
      var type='replyComment'
      const args = wx.getStorageSync('args')
      if (res) {
        wx.showToast({
          title: '内容不能为空',
          icon: 'none'
        })
      } else {
        var add = {
          "InputReply": e.detail.value,
          "ReplyTime": new Date().getTime(),
          "iconUser": args.iconUrl,
          "nickName": args.nickName,
          "username": args.username,
          "Replied": "",
          "Star_User":[]
        }
        if(outIndex===-1 && inIndex===-1) {
          add = {
            "InputComment": e.detail.value,
            "CommentTime": new Date().getTime(),
            "iconUser": args.iconUrl,
            "nickName": args.nickName,
            "username": args.username,
            "Reply": [],
            "Star_User":[]
          }
          var be_character = {
            userName: that.properties.content.username,
            iconUrl: that.properties.content.iconUrl,
            nickName: that.properties.content.nickName
          }
          type='writeComment'
        } else if (inIndex === -1 || inIndex === undefined) {
          var be_character = {
            userName: that.properties.CommentList[outIndex].username,
            iconUrl: that.properties.CommentList[outIndex].iconUrl,
            nickName: that.properties.CommentList[outIndex].nickName
          }
          add.Replied = be_character.nickName
        } else {
          var be_character = {
            userName: that.properties.CommentList[outIndex].Reply[inIndex].username,
            iconUrl: that.properties.CommentList[outIndex].Reply[inIndex].iconUrl,
            nickName: that.properties.CommentList[outIndex].Reply[inIndex].nickName
          }
          add.Replied = be_character.nickName
        }
        wx.cloud.callFunction({
          name: 'NewCampusCircle',
          data: {
            url: 'CommentControl',
            addData: add,
            index: outIndex,
            _id: that.properties.content._id,
            Time: that.properties.content.Time,
            username: args.username,
            type: type
          },
          success: res => {
            if(outIndex===-1 && inIndex===-1) {
              that.properties.CommentList.push(add);
              app.globalData.allList.forEach(item => {
                item.forEach(e => {
                  if (e._id === that.properties.content._id) {
                    e["CommentList"] = that.properties.CommentList;
                  }
                })
              })
              // 内外渲染一致
              moreUtil.setAllList(app.globalData.allList,"评论")
            }else{
              that.properties.CommentList[outIndex].Reply.push(add)
            }
            wx.hideLoading()
            this.triggerEvent(
              "sendCom", {
                CommentList: that.properties.CommentList
              }
            )
          },
          fail: err => {
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            })
            console.error
          }
        })
        that.setData({
          Input: ""
        })
        if(outIndex===-1 && inIndex===-1) {
          that.callFunction('CommentControlLogs',be_character,e.detail.value)
        }else{
          that.callFunction('ReplyCommentControlLogs', be_character, e.detail.value)
        }
        that.ReplyComment()
      }
      that.properties.outIndex=-1
      that.properties.inIndex = -1

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