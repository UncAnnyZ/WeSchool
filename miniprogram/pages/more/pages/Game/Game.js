const app = getApp();

Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,

    tabItem: [{
      title: '全部',
      type: 0,
    }, {
      title: '王者荣耀',
      type: 0
    }, {
      title: '和平精英',
      type: 0
    }],
    imageList: ['./images/LOL1.jpg', './images/LOL2.jpg'],
    // 渲染总数据
    allList_Game: [],
    // 当前选中标签
    currentTab: 0,

    allList_Game: [
      [{
      AllPhoto: ["cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/1648080142699104.png","cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/1648080142699104.png",],
      Cover: "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/1648080142699104.png",
      Label: "日常",
      Other: "",
      School: "广东石油化工学院",
      ShowHeight: 180,
      SortTime: 1648088729000,
      Star_User: [],
      Text: "六区可以往校外跑，赢麻了，跟女朋友出去逛街",
      Time: 1648080142506,
      Title: "",
      campus: "",
      iconUrl: "/pages/myself/images/logo.jpg",
      nickName: "匿名账号",
      username: "20034530122",
      _id: "d2fe6f20623bb51001bd55f7209260bd"
    },{
      AllPhoto: ["cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/1648080142699104.png"],
      Cover: "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/1648080142699104.png",
      Label: "日常",
      Other: "",
      School: "广东石油化工学院",
      ShowHeight: 180,
      SortTime: 1648088729000,
      Star_User: [],
      Text: "六区可以往校外跑，赢麻了，跟女朋友出去逛街",
      Time: 1648080142506,
      Title: "",
      campus: "",
      iconUrl: "/pages/myself/images/logo.jpg",
      nickName: "匿名账号",
      username: "20034530122",
      _id: "d2fe6f20623bb51001bd55f7209260bd"
    }],
    [{
      AllPhoto: ["cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/1648080142699104.png"],
      Cover: "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/1648080142699104.png",
      Label: "日常",
      Other: "",
      School: "广东石油化工学院",
      ShowHeight: 180,
      SortTime: 1648088729000,
      Star_User: [],
      Text: "六区可以往校外跑，赢麻了，跟女朋友出去逛街",
      Time: 1648080142506,
      Title: "",
      campus: "",
      iconUrl: "/pages/myself/images/logo.jpg",
      nickName: "匿名账号",
      username: "20034530122",
      _id: "d2fe6f20623bb51001bd55f7209260bd"
    }]
  ]
  },
  getData(e) { //分页加载数据
    let args = wx.getStorageSync('args');
    let { currentPage, currentTab } = e.detail;
    // 当前选择的标签名字
    let ShowId = this.data.tabitem[currentTab].title;
    // 边界处理 - 用户没登录时
    let School = args.schoolName ? (args.schoolName == "游客登录" ? "广东石油化工学院" : args.schoolName) : "广东石油化工学院";
    // 拉取数据
    let that = this;
    wx.cloud.callFunction({
      name: "NewCampusCircle",
      data: {
        type: "read_Game",
        url: "Card",
        currentPage,
        ShowId,
        School
      },
      success(res) {
        const currComponent = that.selectComponent(`#InfoFlowCards${currentTab}`);
        // 数据存在时
        if (res.result && res.result.data.length > 0) {
          // 页数++
          currComponent.setData({ currentPage: ++currentPage });
          let allList = that.data.allList;
          // 添加新数据到 allList[currentTab] 里 
          allList[currentTab] = allList[currentTab].concat(res.result.data);
          // 赋值全局变量
          app.globalData.allList = allList;
          console.log(allList);
          that.setData({
            allList
          });
          // 数据少于一页时
          if (res.result.data.length < 10) {
            currComponent.setData({
              loadAll: true
            });
          }
          // 新数据进行左右处理
          currComponent.RightLeftSolution()
        } else { // 不存在数据时
          if (currComponent.data.leftH == 0 && currComponent.data.rightH == 0) {
            currComponent.setData({
              leftList: [],
              rightList: [],
              list: [null],         // 避免显示“玩命加载数据”
              loadAll: true         // 显示“暂无数据”
            })
          }
        }
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },
  // 初始化函数
  init() {
    const args = wx.getStorageSync('args');
    // 判断登录
    app.loginState();
    // 初始化标签
    let tabItem = args.Game_Module ? args.Game_Module.map((e, index) => {
      if (index == 0) {
        return {
          title: e,
          type: 1
        }
      }
      return {
        title: e,
        type: 0
      }
    }) : this.data.tabItem;

    // 初始化 allList
    // let allList_Game = tabItem.map((item, index) => {
    //   let allList_Game = [];
    //   return allList_Game[index] = []
    // });
    this.setData({
      tabItem,
      // allList_Game,
      currentTab: 0,  // 初始化选中第一个标签
    })
  },
  onLoad: function (options) {
    this.init()
  },

  onShow: function () {

  },

  // 下拉刷新
  onPullDownRefresh() {
    // 在标题栏中显示加载
    wx.showNavigationBarLoading();
    // 重置组件内的 currentPage 和 loadAll
    let currentTab = this.data.currentTab;
    this.selectComponent(`#InfoFlowCards${currentTab}`).setData({ currentPage: 0 });
    this.selectComponent(`#InfoFlowCards${currentTab}`).setData({ loadAll: false });
    // 定时器防抖
    this.TimeOut = setTimeout(() => {
      console.log("下拉刷新")
      // 清空信息流内容，并再次请求数据库
      this.selectComponent(`#InfoFlowCards${currentTab}`).init();
      this.selectComponent(`#InfoFlowCards${currentTab}`).getData();
      // 在标题栏中停止加载
      wx.hideNavigationBarLoading()
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    }, 1000)
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})