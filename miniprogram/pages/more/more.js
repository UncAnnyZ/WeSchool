let args = wx.getStorageSync('args')
var app = getApp()

Page({
  data: {
    // 配置
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,

    tabitem: [ // 标签兜底
      {
        title: "全部",
        type: 0,
      }, {
        title: "日常",
        type: 0,
      }, {
        title: "晒出课表🤣",
        type: 0,
      }, {
        title: "树洞👂",
        type: 0,
      }, {
        title: "2022新年Flag🚩",
        type: 0,
      }, {
        title: "2021回顾◀",
        type: 0,
      }, {
        title: "三行情书❤️",
        type: 0,
      }, {
        title: "故事屋⭐️",
        type: 0,
      }
    ],
    allList: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ], // 列表兜底
    currentTab: 0, // 当前 swiper-item
    iconUrl: '',    // 头像地址
    school: '',    // 判断游客用

    // 控制动画
    showLoading: 0, // 动画显隐
    animation: '',
    scrollTop: 0,   // 校园圈滑动高度

    // 发布
    showPopUps: false, // 弹窗显隐
    showModel: false,  // 快速发布显隐
  },
  TimeOut: 1,
  
  canWaterScroll() {
    console.log(123);
    let allList = this.data.allList;
    for (let i in allList) {
      this.selectComponent(`#waterFlowCards${i}`).setData({ ifScroll: true })
    }
  },
  cannotWaterScroll() {
    console.log(123);
    let allList = this.data.allList;
    for (let i in allList) {
      this.selectComponent(`#waterFlowCards${i}`).setData({ ifScroll: false })
    }
  },
  // 卡片内外部渲染一致
  setAllList(e, type) {
    const allList = e.detail;
    this.setData({ allList });
    // 点赞和评论不刷新瀑布流
    console.log(type);
    if (type == "点赞和评论") {
      for (let i in allList) {
        this.selectComponent(`#waterFlowCards${i}`).RightLeftSolution();
      }
    } else {
      // 新增和删除卡片要刷新瀑布流
      for (let i in allList) {
        this.selectComponent(`#waterFlowCards${i}`).RightLeftSolution(true);
        this.selectComponent(`#waterFlowCards${i}`).RightLeftSolution();
      }
    }

  },
  timeId: 0,
  showPopUps() {
    let showPopUps = !this.data.showPopUps;
    this.setData({ showPopUps });
  },
  // 
  show_PublishContent(e) {
    // 控制快速发布显隐
    this.selectComponent('#QuickPublish').add();
    // 隐藏弹窗
    this.showPopUps()
  },

  // 获取新消息通知数量
  getNewInfo() {
    var that = this;
    let args = wx.getStorageSync('args');
    // 边界处理 - 未登录时
    if (!args.username) {
      return;
    }
    wx.cloud.database().collection('New-Information').where({
      'be_character.userName': args.username,
      status: 0
    }).count().then(res => {
      that.setData({
        NewInfo: res.total
      })
    })
  },
  // 1. 跳转页面
  navigate(e) {
    let url;
    if(e.detail.id) {
      // 为兼容模块里二跳的写法
      url = e.detail.id
    }else {
      url = e.currentTarget.id
    }
    
    switch (url) {
      case 'myself':
        wx.switchTab({
          url: "../myself/myself",
        });
        break;
      default:
        wx.navigateTo({
          url: `pages/${url}/${url}`
        })
        break;
    }
  },
  // 滑动切换标签时
  waterChange(e) {
    let currentTab = e.detail.current;
    this.switchTab(currentTab);
  },

  // 下面是未来修左右滑动动效用到的代码

  // waterTransition(e) {
  //   // dx 表示左右滑动 : dx < 0 表示滑到上一个标签
  //   const dx = e.detail.dx;
  //   // console.log(e.detail);
  //   const currentTab = this.data.currentTab;
  //   const underLine_left = this.selectComponent("#TabScroll").data.underLine_left;
  //   const underLine_width = this.selectComponent("#TabScroll").data.underLine_width;
  //   // 公式计算：滑动屏幕百分比 * 下一段偏移度
  //   console.log(dx/this.data.windowWidth);
  //   let offset,offset_width;
  //   if(dx/this.data.windowWidth > 0) {
  //     offset = (dx/this.data.windowWidth) * (underLine_left[currentTab+1] - underLine_left[currentTab]) + underLine_left[currentTab];

  //     offset_width = (dx/this.data.windowWidth) * (underLine_width[currentTab+1] - underLine_width[currentTab]) + underLine_width[currentTab];
  //   }else if( dx/this.data.windowWidth < 0) {
  //     offset = (dx/this.data.windowWidth) * (underLine_left[currentTab] - underLine_left[currentTab-1]) + underLine_left[currentTab];

  //     offset_width = (dx/this.data.windowWidth) * (underLine_width[currentTab] - underLine_width[currentTab-1]) + underLine_width[currentTab];
  //   }
  //   this.selectComponent("#TabScroll").setData({offset,offset_width})
  // },
  // waterAnimationFinish(e) {
  //   const {current:currentTab,source} = e.detail;
  //   console.log(e.detail,23333);
  //   this.setTab(currentTab);
  //   console.log(currentTab);
  //   // 更新标签组件里的下划线参数
  //   this.selectComponent("#TabScroll").setData({currentTab,offset:null,offset_width:null})
  // },

  // 2. 操作数据库
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
        type: "read",
        url: "Card",
        currentPage,
        ShowId,
        School
      },
      success(res) {
        const currComponent = that.selectComponent(`#waterFlowCards${currentTab}`);
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
  getNoteData() {
    let that = this;
    wx.cloud.callFunction({
      name: "NewCampusCircle",
      data: {
        url: "Note_module",
        type: "read",
        username: args.username,
        School: args.schoolName == "游客登录" ? "广东石油化工学院" : args.schoolName,
      },
      success(res) {
        if(!res.result) return;
        let dmList = res.result.data;
        that.setData({
          dmList
        })
      }
    })
  },
  // 3. 搜索框逻辑 
  search_Input: function (e) {
    const { value } = e.detail  //拿到输入框中的值
    var that = this;
    let waterComponent = that.selectComponent(`#waterFlowCards0`);
    const args = wx.getStorageSync('args');
    // 初始化定时器
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      search(value) //发送请求，间隔时间为1s
    }, 500)
    const search = (value) => {
      if (value) {
        wx.hideNavigationBarLoading();
        wx.cloud.callFunction({
          name: "NewCampusCircle",
          data: {
            url: "Card",
            username: args.username,
            type: "search",
            School: args.schoolName == "游客登录" ? "广东石油化工学院" : args.schoolName,
            searchKey: value
          },
          success: res => {
            // 回到第一个标签
            that.switchTab(0);
            // 搜索有结果时
            if (res.result.data.length != 0) {
              // 清空瀑布流数据
              waterComponent.RightLeftSolution(true);
              // 处理搜索结果
              let allList = that.data.allList;
              allList[0] = res.result.data;
              that.setData({
                allList,
                tabitem: that.data.tabitem,
              });
              waterComponent.RightLeftSolution()
            } else {
              wx.showToast({
                icon: "none",
                title: "什么都找不到哟"
              })
              waterComponent.RightLeftSolution(true)
              // 显示“暂无数据”，不显示“玩命加载数据”
              waterComponent.setData({
                loadAll: true,
                list: [1]
              })
            }
          },
          fail: err => {
            console.error
          },
          complete: e => {
            wx.hideNavigationBarLoading();
          }
        })
      } else {
        // 清空瀑布流内容
        waterComponent.RightLeftSolution(true);
        // 重新加载数据
        that.onPullDownRefresh();
      }
    }

  },

  // 滑动选择标签   (与下方 setTab 不可合并，选择标签同时会滑动屏幕，导致连续两次请求数据库)
  switchTab: function (e) {
    // 获取索引值
    var currentTab = e;
    // 初始化 - 全部置零
    this.data.tabitem.forEach((item, index) => {
      item.type = 0;
      if (index == currentTab) {
        item.type = 1;
      }
    });
    this.setData({
      tabitem: this.data.tabitem,
      currentTab
    })
    this.selectComponent(`#TabScroll`).setData({ currentTab });
    // 新页面获取数据 - 没有东西时才获取数据
    if (app.globalData.allList[currentTab].length) {
      console.log("页面已经有数据了，不请求数据库");
      return;
    } else {
      this.selectComponent(`#waterFlowCards${currentTab}`).getData();
    }
  },
  // 点击选择标签
  setCurrentTab: function (e) {
    var currentTab = e.detail.currentTarget.dataset.index;
    // 初始化标签
    this.data.tabitem.forEach((item, index) => {
      item.type = 0;
      if (index == currentTab) {
        item.type = 1;
      }
    });
    // 赋值currentTab后，就会触发switchTab函数。这样避免了连续两次请求
    this.setData({
      tabitem: this.data.tabitem,
      currentTab
    })
  },

  // 初始化函数
  init() {
    let args = wx.getStorageSync('args');
    // 判断登录
    app.loginState();
    // 初始化标签
    let tabitem = args.tabitem ? args.tabitem.map((e, index) => {
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
    }) : this.data.tabitem; // 兜底数据   
    // 初始化封号
    var campus_account = args.campus_account ? args.campus_account : false
    var describe = args.describe ? args.describe : false
    if (campus_account === true) {
      wx.showModal({
        title: "提示",
        content: describe,
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        }
      })
    }
    // 初始化 allList
    let allList = this.data.tabitem.map((item, index) => {
      let allList = [];
      return allList[index] = []
    });

    this.setData({
      currentTab: 0,            // 返回到第一个标签
      showPopUps: false,        // 关闭弹窗
      ifScroll: false,          // 初始化瀑布流滑动
      tabitem,                  // 初始化标签
      campus_account,           // 初始化封号
      allList,                  // 初始化allList
      iconUrl: args.iconUrl,     // 获取头像
      school: args.school        // 获取学校
    })
  },
  onLoad: function () {
    this.init()
    this.onPullDownRefresh()
  },
  onShow: function () {
    let currentTab = this.data.currentTab;
    this.selectComponent(`#waterFlowCards${currentTab}`).RightLeftSolution();
    //  获取新消息提醒   ------ - 不应每次show该页面时都请求，应每隔一段时间请求一次。
    this.getNewInfo();
  },

  // 下拉刷新
  onPullDownRefresh() {
    // 在标题栏中显示加载
    wx.showNavigationBarLoading();
    // 初始化定时器
    clearTimeout(this.TimeOut);
    // 开启动画
    this.setData({
      showLoading: 0,
    })
    // 重置组件内的 currentPage 和 loadAll
    let currentTab = this.data.currentTab;
    this.selectComponent(`#waterFlowCards${currentTab}`).setData({ currentPage: 0 });
    this.selectComponent(`#waterFlowCards${currentTab}`).setData({ loadAll: false });
    // 定时器防抖
    this.TimeOut = setTimeout(() => {
      console.log("下拉刷新")
      // 清空瀑布流内容，并再次请求数据库
      this.selectComponent(`#waterFlowCards${currentTab}`).RightLeftSolution(true);
      this.selectComponent(`#waterFlowCards${currentTab}`).getData();
      // 获取小纸条
      this.getNoteData();
      // 在标题栏中停止加载
      wx.hideNavigationBarLoading()
      // 停止动画
      this.setData({
        showLoading: 1
      })
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    }, 1000)
  },
  // 上拉触底
  onReachBottom() {
    wx.showLoading({
      title: '加载更多中',
      mask: true
    })
    // 得到当前组件索引
    let currentTab = this.data.currentTab;
    // 请求数据库
    this.selectComponent(`#waterFlowCards${currentTab}`).getData();
    wx.hideLoading();
  },

  onShareAppMessage: function (res) {
    return {
      title: 'WE校园',
    }
  },
})