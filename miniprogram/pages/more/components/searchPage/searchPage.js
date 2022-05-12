Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    isHidden: true,
    localSearchKey: wx.getStorageSync('searchKey') || [],
    hotSearchKey: ['官渡','西城','羽毛球','表白','自拍','闲置物品','谈恋爱']
  },

  onLoad: function (options) {
    if(this.data.localSearchKey.length != 0) {
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
    // 初始化定时器
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      this.search(value) //发送请求，间隔时间为1s
    }, 500)
    this.search(value)

  },
  search: function(value){
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
          //历史记录关键词
          this.setData({
            searchInfo: res.result.data
          })
          let localSearchKey = wx.getStorageSync('searchKey') || []
          const index = localSearchKey.indexOf(value)
          console.log(index);
          if(index !== -1) {
            localSearchKey.splice(index, 1)
          }
          localSearchKey.unshift(value)
          wx.setStorage({
            key: 'searchKey',
            data: localSearchKey
          }) 
          //定向到搜索的内容页面
          wx.navigateTo({
            url: `/pages/more/components/searchContent/searchContent?query=${value}`
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
    wx.setStorageSync('searchKey',[])
    this.setData({
      localSearchKey: [],
      isHidden: true
    })
  },
  searchRedirect: function (e) {
    this.search(e.target.dataset.name)
  }
})