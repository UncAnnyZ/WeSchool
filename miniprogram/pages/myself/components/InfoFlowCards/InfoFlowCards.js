var app = getApp()
var utils = require("../../utils/time.js")
let args = wx.getStorageSync('args')
Component({
  properties: {
    list: {
      type: Array
    },
    currentTab: {
      type: Number
    }
  },
  data: {
    windowHeight: getApp().globalData.windowHeight,
    currentPage: 0, // 当前第几页,0代表第一页 
    loadAll: false, // 状态标志 - 是否加载完所有内容
    Label: '全部', // 当前标签  
    comReply: false, //控制评论组件的出现
    focus: false, //评论

  },
  observers: {
    'list': function (e) {
      console.log(e, "ssssssssssssss")
    }
  },
  lifetimes: {
    ready() {
      let character = {
        username: args.username,
        iconUrl: args.iconUrl,
        nickName: args.nickName
      };
      this.setData({
        character
      })
    },
    attached: function () {
      //为什么这个list是空
      // 在组件实例进入页面节点树时执行
      let currentTab = this.properties.currentTab;
      let list_ = this.properties.list
      this.setData({
        list_,
        currentTab
      })
    },

  },

  methods: {

    init() {
      this.setData({
        currentPage: 0,
        list: [null]
      })

    },
    //点赞
    star_tap(e) {
      let index = e.currentTarget.dataset.index
      console.log(e)
      let content = this.data.list[index]
      //  // 边界处理 - 初始化数组 不懂
      content.Star_User ? '' : content.Star_User = [];
      // 标志用户点赞状态   false:未点赞；true：已点赞
      var Starif = false;
      // 判断该用户是否已点过赞
      content.Star_User.forEach((item) => {
        console.log(111)
        //some和any也可以解决
        if (item.username == args.username) {
          Starif = true;
          content.Star_User.splice(content.Star_User.indexOf(this.data.character), 1);

        }
        return -1
      })
      if (!Starif) {
        content.Star_User.push(this.data.character);
        wx.showToast({
          title: '点赞成功',
          icon: "none"
        })
      }
      var that = this;
      let starTime = new Date().getTime(); // 点赞时间
      console.log(content)
      // 对数据库数据进行更新
      wx.cloud.callFunction({ // 云函数更改点赞状态
        name: "CampusCircle",
        data: {
          type: "StarControlLogs",
          Star_User: content.Star_User,
          character: that.data.character,
          be_character: that.data.be_character,
          createTime: starTime,
          arcticle: content,
        }
      }).then()
      //渲染本地
      this.setData({
        list: this.data.list
      })
      // 变更全局数据 - 在当前页面中渲染出来
      let allList = app.globalData.allList;
      allList.forEach(item => {
        item.forEach(e => {
          if (e._id === content._id) {
            e.Star_User = content.Star_User;
          }
        })
      })
    },
    //拉数据
    getData() {
      let e = {
        currentPage: this.data.currentPage, // 本组件当前第几页
        currentTab: this.properties.currentTab // 本组件索引 - 方便标签选择
      }
      // 边界处理，拉到最底部时不允许再请求数据库
      if (this.data.loadAll) return;
      this.triggerEvent("getData", e);
      console.log("getData");
    },
    onReachBottom() {
      // if(!this.data.loadAll){
      //   console.log(222)
      // }
      wx.showLoading({
        title: '加载更多中',
        mask: true
      })
      setTimeout(() => {
      // 请求数据库
      this.getData();
      console.log(22222222222)
      wx.hideLoading()
      }, 3000);
       
    },
    //跳转详情页
    navigate(e) {
      //分情况中转跳转

      let index = e.currentTarget.dataset.index
      let content = this.data.list[index]
      // 先对数据进行 JSON
      let jsonStr = JSON.stringify(content);
      // 对数据进行URI编码，防止数据被截断。少量数据没问题，如果对象较大则容易被截断，获取不到完整数据
      let data = encodeURIComponent(jsonStr);
      if (content.Label == '寻物发布') {
        console.log(222)
        wx.navigateTo({
          url: `/pages/more/pages/LoseDetailContent/LoseDetailContent?content=${data}`,
        })
      } else {
        wx.navigateTo({
          url: `/pages/more/pages/DetailContent/DetailContent?content=${data}`,
        })
      }

    },
    //点击评论
    Reply(e) {
      console.log(e)
      let that = this
      let index = e.currentTarget.dataset.index
      let content = this.data.list[index]

      setTimeout(() => {
        this.setData({
          comReply: !that.data.comReply,
          content,
          CommentList: content.CommentList
        })
      }, 200);
    },
    xx: function (e) { //接受从replyComment组件传递过来的值，控制评论组件出现
      setTimeout(() => {
        this.setData({
          comReply: !e.detail.comReply,
        })
      }, 200);
    },
    hh: function (e) { //接收从replyComment组件传递来的数组，用于渲染
      if (e.detail.CommentList) {
        this.data.sendCom = e.detail.CommentList
      }
    },
    onReachBottom() {

    }
  }
})