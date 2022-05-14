Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    isHidden: true,
    localSearchKey: [],
    hotSearchKey: ['官渡', '西城']
  },
  openHistorySearch: function () {
    this.setData({
      localSearchKey: wx.getStorageSync('searchKey') || [], //若无储存则为空
    })
  },

  onLoad: function (options) {
    this.openHistorySearch()
    if (this.data.localSearchKey.length != 0) {
      this.setData({
        isHidden: false
      })
    }

  },
  searchBlur: function (e) {
    let that = this,
      {
        value
      } = e.detail
    // waterComponent = that.selectComponent(`#waterFlowCards0`);
    this.search(value)

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
          wx.navigateTo({
            url: `/pages/more/components/searchContent/searchContent?query=${value}`
          })
          //历史记录关键词
          let localSearchKey = this.data.localSearchKey
          const index = localSearchKey.indexOf(value)
          if (index !== -1) {
            localSearchKey.splice(index, 1)
          }
          localSearchKey.unshift(value)
          wx.setStorageSync('searchKey', localSearchKey);
          that.setData({
            localSearchKey: localSearchKey,
            isHidden: false
          })
          
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
      // waterComponent.RightLeftSolution(true);
      // 重新加载数据
      // that.onPullDownRefresh();
    }
  },
  deleteHistory: function () {
    wx.setStorageSync('searchKey', [])
    this.setData({
      localSearchKey: [],
      isHidden: true
    })
  },
  searchRedirect: function (e) {
    this.setData({
      isHidden: false
    })
    this.search(e.target.dataset.name)
  }
})