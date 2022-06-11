var app = getApp()
const args = wx.getStorageSync('args'),
  util = require('../../utils/util')
Page({
  data: {
    // 配置
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
    pixelRatio: getApp().globalData.pixelRatio,     // rpx 与 px 的转换比例
    // 标签兜底
    tabitem: [
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
    // 列表兜底
    allList: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ],
    course: [],   // 当天课表
    currentWaterFlowHeight: 0,
    currentPageArr: [0, 0, 0, 0, 0, 0, 0, 0],
    currentTab: 0,  // 当前 swiper-item
    iconUrl: '',   // 头像地址
    school: '',    // 判断游客用
    scrollTop: 0,
    offsetTop: 0,
    TabScrollTop: 0,
    layerHeight: 60 + 350 / getApp().globalData.pixelRatio + 30,
    // 控制动画
    showLoading: false,   // 动画显隐
    showPopUps: false, // 弹窗显隐
    showModel: false,  // 快速发布显隐
  },
  TimeOut: 1,
  timeId: 0,

  onScroll(e) {

    let data = this.data,
      statusBarHeight = data.statusBarHeight,
      lineHeight = data.lineHeight,
      scrollTop = e.detail.scrollTop,
      TabScrollTop = data.TabScrollTop;

    wx.createSelectorQuery()
      .select('.container')
      .boundingClientRect((res) => {
        // 滑动高度 / 标签吸顶时的滑动高度 = 百分比 ∈ [0,1];;;;;   y = kx + b
        var x = Number(scrollTop / (TabScrollTop - 62)) > 1 ? 1 : Number(scrollTop / (TabScrollTop - 62)),
          // k = - (高度max - 高度min)
          k = - ((statusBarHeight + lineHeight + 350 / data.pixelRatio + 30) - (statusBarHeight + lineHeight + 62)),
          // b = 高度max
          b = (statusBarHeight + lineHeight + 350 / data.pixelRatio + 30),
          layerHeight = k * x + b;

        this.setData({
          scrollTop: scrollTop,
          offsetTop: res.top + statusBarHeight + lineHeight,
          layerHeight: layerHeight
        });
      })
      .exec();

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
    if (e.detail.id) {
      // 为兼容模块里二跳的写法
      url = e.detail.id
    } else {
      url = e.currentTarget.id
    }

    switch (url) {
      case 'myself':
        wx.switchTab({
          url: "../myself/myself",
        })
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
    let currentTab = e.detail.current,
      tabitem = this.data.tabitem.map((item, index) => {
        item.type = 0;
        if (index == currentTab) {
          item.type = 1;
        }
        return item;
      });
    this.setData({
      tabitem,
      currentTab
    })
    console.log(currentTab);
    this.switchTab(currentTab);
  },

  // 2. 操作数据库
  getData(e) { //分页加载数据
    let that = this,
      data = this.data,
      currentTab = data.currentTab,
      currentPage = data.currentPageArr[currentTab],
      ShowId = data.tabitem[currentTab].title, // 当前选择的标签名字
      School = args.schoolName ? ("游客登录" ? "广东石油化工学院" : args.schoolName) : "广东石油化工学院",     // 边界处理 - 用户没登录时
      currComponent = that.selectComponent(`#waterFlowCards${currentTab}`);
    if (currComponent.data.loadAll) {
      console.log("已经拉到底了");
      return;
    }
    // 拉取数据
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
        let allList = data.allList,
          currentPageArr = data.currentPageArr;
        // 数据存在时
        if (res.result && res.result.data.length > 0) {
          // 页数++
          currentPageArr[currentTab] = ++currentPage;
          // 添加新数据到 allList[currentTab] 里, 并更新全局变量
          allList[currentTab] = allList[currentTab].concat(res.result.data);
          app.globalData.allList = allList;
          that.setData({
            [`allList[${currentTab}]`]: allList[currentTab]
          });
          // 数据少于一页时
          if (res.result.data.length < 10) {
            currComponent.setData({
              loadAll: true
            });
          }
          // 新数据进行左右处理
          currComponent.RightLeftSolution();

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
        wx.createSelectorQuery()
          .select(`#waterFlowCards${currentTab}`)
          .boundingClientRect(res => {
            // 避免高度过小
            res.height < 100 ? res.height = 100 : '';
            that.setData({
              currentWaterFlowHeight: res.height
            })
          })
          .exec();
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
        if (!res.result) return;
        let dmList = res.result.data;
        that.setData({
          dmList
        })
      }
    })
  },
  // 3. 搜索框逻辑 
  search_Input: function (e) {
    let that = this,
      { value } = e.detail,
      waterComponent = that.selectComponent(`#waterFlowCards0`);
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

  // 滑动选择标签  
  switchTab: function (e) {
    var currentTab = e;

    if (this.data.allList[currentTab].length) {
      wx.createSelectorQuery()
        .select(`#waterFlowCards${currentTab}`)
        .boundingClientRect(res => {
          // 避免高度过小
          res.height < 100 ? res.height = 100 : '';
          that.setData({
            currentWaterFlowHeight: res.height
          })
        })
        .exec();
      console.log("页面已经有数据了，不请求数据库");
      return;
    } else {
      this.getData();
    }
  },
  // 点击标签时，修改currentTab
  setCurrentTab: function (e) {
    var currentTab = {
      detail: {
        current: e.detail.currentTarget.dataset.index
      }
    };
    this.waterChange(currentTab)
  },

  // 初始化函数
  init() {
    // 判断登录
    app.loginState();
    // 初始化标签
    let data = this.data,
      tabitem = args.tabitem ? args.tabitem.map((e, index) => {
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
      }) : data.tabitem,
      // 初始化 currentPageArr 和 currentWaterFlowHeight
      currentPageArr = tabitem.map(item => { return 0; }),

      currentWaterFlowHeight = data.windowHeight - data.statusBarHeight - data.lineHeight - 28,
      // 初始化封号
      campus_account = args.campus_account ? args.campus_account : false,
      describe = args.describe ? args.describe : false,
      // 初始化 allList
      allList = tabitem.map((item, index) => {
        let allList = [];
        return allList[index] = []
      });
    console.log(allList)
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

    wx.createSelectorQuery()
      .select('#TabScroll')
      .boundingClientRect((res) => {
        console.log(res);
        this.setData({
          TabScrollTop: res.top
        });
      })
      .exec();

    this.setData({
      layerHeight: data.statusBarHeight + data.lineHeight + 350 / data.pixelRatio + 30,   // 180是弹幕高度，30是渐变层偏移量
      currentWaterFlowHeight,
      currentPageArr,
      currentTab: 0,            // 返回到第一个标签
      showPopUps: false,        // 关闭弹窗
      tabitem,                  // 初始化标签
      campus_account,           // 初始化封号
      allList,                  // 初始化allList
      iconUrl: args.iconUrl,     // 获取头像
      school: args.school,       // 获取学校
    })
    console.log(this.data.allList)
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
    this.handleCourse();

    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  handleCourse() {
    var that = this,
      course = [],
      msg = "",
      zc = 0,
      personalInformation = wx.getStorageSync('personalInformation'),
      configData = wx.getStorageSync('configData'),
      curriculum = personalInformation.curriculum;

    var handleCourseTime = (course) => {
      if (!course) return;

      const args = wx.getStorageSync('args'),
        courseTime_school = args.courseTime,
        // 遍历 course ，返回形式 {start: 课程开始时间, end: 课程结束时间}
        courseTime_today = course.map(item => {
          const index = Number(item.time.replace(/[^\d.]/g, ''));
          return {
            start: Number(courseTime_school[index - 1].split(':').join('.')),
            end: Number(courseTime_school[index].split(':').join('.'))
          }
        }),
        nowTime = Number(`${new Date().getHours()}.${new Date().getMinutes()}`);

      // 在课程时间内时高亮、超出课程时间且小于下个课程开始时间时，则下个课程高亮
      for (let i = 0; i < course.length; i++) {
        let item = courseTime_today[i],
          nextItem = courseTime_today[i + 1];

        if (nowTime < courseTime_today[0].start) {
          course[0].isHighlight = true;
          console.log(233);
          break
        }

        if (item.start <= nowTime && nowTime <= item.end) {
          course[i].isHighlight = true;
          break;
        } else if (nextItem && item.end < nowTime && nowTime < nextItem.start) {
          course[i + 1].isHighlight = true;
          break;
        } else {
          course[course.length - 1].isHighlight = true;
          break;
        }
      }
      console.log(courseTime_today, nowTime, course);

    }

    if (!curriculum) {
      that.setData(Object.assign({ msg: '可能学校服务器关闭', }, configData))
      return;
    }

    var xq = new Date().getDay();
    if (xq == 0) { xq = 7; };

    for (var y = 0; y < curriculum.length; y++) {
      zc = curriculum[y].zc
      if (curriculum[y].xq == "7" || curriculum[y].xq == 7) {
        zc = String(Number(curriculum[y].zc) - 1)
        curriculum[y].zc = zc
      }

      if (zc == util.getweekString() && curriculum[y].xq == xq) {
        course.push({ day: '今天', time: '第' + curriculum[y].jcdm[1] + '节', name: curriculum[y].kcmc, site: curriculum[y].jxcdmc, isHighlight: false })
      } course.sort(function (b, a) { return b.time.localeCompare(a.time, 'zh') })
    }

    personalInformation.curriculum = curriculum;
    wx.setStorageSync('personalInformation', personalInformation);
    if (course.length == 0) { msg = "今天没有课哟～" }

    handleCourseTime(course);
    that.setData(Object.assign({ course: course, show: '', msg: msg, }, configData))
  },
  // 下拉刷新
  onPullDownRefresh() {
    let currentTab = this.data.currentTab;
    // 初始化定时器
    clearTimeout(this.TimeOut);
    // 开启动画，并初始化 currentPage
    this.setData({
      showLoading: true,
      [`currentPageArr[${currentTab}]`]: 0
    })
    // 定时器防抖
    this.TimeOut = setTimeout(() => {
      console.log("下拉刷新")
      // 清空瀑布流内容，并再次请求数 据库
      this.selectComponent(`#waterFlowCards${currentTab}`).RightLeftSolution(true);
      this.getData();
      // 获取小纸条
      this.getNoteData();
      // 停止动画
      this.setData({
        showLoading: false
      })
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    }, 1000)
  },
  // 上拉触底
  onReachBottom() {
    console.log(222)
    wx.showLoading({
      title: '加载更多中',
      mask: true
    })
    // 请求数据库
    this.getData();
    wx.hideLoading();
  },

  onShareAppMessage: function (res) {
    return {
      title: 'WE校园',
    }
  },
})