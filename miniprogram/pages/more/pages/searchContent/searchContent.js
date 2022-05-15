// pages/more/components/searchContent/searchContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    windowHeight: getApp().globalData.windowHeight,
    placeHolder: '官渡',
    currentWaterFlowHeight: 0,
    searchInfo: [],
    currentTab: 0,  // 当前 swiper-item
    currentPageArr: [0, 0, 0, 0, 0, 0, 0, 0],
    showLoading: false,   // 动画显隐
    showPopUps: false, // 弹窗显隐
    showModel: false,  // 快速发布显隐
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
  },
  searchBlur: function (e) {
    let that = this,
      {
        value
      } = e.detail
      console.log(value);
    this.search(value)
    // waterComponent = that.selectComponent(`#waterFlowCards0`);
    
  },
  search: function (value) {
    var that = this
    if (value) {
      wx.hideNavigationBarLoading();
      wx.cloud.callFunction({
        name: "NewCampusCircle",
        data: {
          url: "Card",
          type: "search",
          searchKey: value
        },
        success: res => {
          //定向到搜索的内容页面
          wx.redirectTo({
            url: `/pages/more/components/searchContent/searchContent?query=${value}`
          })
          console.log(res);
          //历史记录关键词
          that.setData({
            searchInfo: res.result.data
          })
          let localSearchKey = wx.getStorageSync('searchKey') || []
          const index = localSearchKey.indexOf(value)
          console.log(index);
          if(index !== -1) {
            localSearchKey.splice(index, 1)
          }
          localSearchKey.unshift(value)
          wx.setStorage('searchKey', localSearchKey) 
          console.log('111');
          
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
      // that.onPullDownRefresh();
    }
  },
  onLoad: function (options) {
    // console.log(options.query);
    let that = this,
    waterComponent = this.selectComponent(`#waterFlowCards0`);
    this.setData({
      placeHolder: options.query
    })
    wx.cloud.callFunction({
      name: "NewCampusCircle",
      data: {
        url: "Card",
        type: "search",
        searchKey: options.query
      },
      success: res => {
        if (res.result.data.length != 0) {
          // 清空瀑布流数据
          waterComponent.RightLeftSolution(true);
          // 处理搜索结果
          let allList = that.data.allList;
          allList[0] = res.result.data;
          that.setData({
            allList,
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
  },
  onShow: function () {
    this.onLoad()
  },
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
  getData(e) { //分页加载数据
    console.log(this.data.tabitem);
    let that = this,
      data = this.data,
      currentTab = data.currentTab,
      currentPage = data.currentPageArr[currentTab],
      // ShowId = data.tabitem[currentTab].title, // 当前选择的标签名字
      // School = args.schoolName ? ("游客登录" ? "广东石油化工学院" : args.schoolName) : "广东石油化工学院",     // 边界处理 - 用户没登录时
      currComponent = that.selectComponent(`#waterFlowCards${currentTab}`);
      console.log(currComponent);
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
        // ShowId,
        // School
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
            console.log('11');
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

  onReachBottom() {
    wx.showLoading({
      title: '加载更多中',
      mask: true
    })
    // 请求数据库
    this.getData();
    wx.hideLoading();
  },
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


})