// pages/association/add_question/add_question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    content: {
      title: "",
      arr: [],
      id: "",
      arrLen: 1,
      type: "",
    },
    mustChange: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.fiexed == "true") {
      let content = JSON.parse(options.content);
      this.setData({
        content: content
      })
    }
    this.data.content.type = options.type
    this.setData({
      content: this.data.content,
      type: options.type
    })
  },
  caption(e) {
    this.data.content.title = e.detail.value
    this.setData({
      content: this.data.content
    })
  },
  // 增加选项
  addChange() {
    this.data.content.arrLen++
    this.setData({
      content: this.data.content
    })
  },
  // 保存
  certain() {
    if (this.data.content.title == "" || this.data.content.arr.length != this.data.content.arrLen || this.data.content.arr.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入标题或删除多余选项',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {

          }
        },
      });
    }
    else {
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]
      var data = this.data.content
      this.data.content.id = Date.parse(new Date())
      this.data.content.must = this.data.mustChange
      this.setData({
        content: this.data.content
      })
      prevPage.setData({
        content: data
      })
      wx.navigateBack({//返回
        delta: 1
      })
    }
  },
  // 内容
  inpContent(e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index
    let content = e.detail.value
    this.data.content.arr[index] = content
    // this.data.content.id=Date.parse(new Date())
    this.setData({
      content: this.data.content
    })
  },
  // 删除选项
  delete(e) {
    let index = e.currentTarget.dataset.index
    console.log(index);
    // let arr=this.data.content.arr
    this.data.content.arr.splice(index, 1)
    this.data.content.arrLen--
    this.setData({
      content: this.data.content
    })
  },
  // 填空确定
  tian_certain() {
    if (this.data.content.title == "") {
      wx.showModal({
        title: '提示',
        content: '请输入题目',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {

          }
        },
      });
    }
    else {
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]
      var data = this.data.content
      this.data.content.id = Date.parse(new Date())
      this.data.content.must=this.data.mustChange
      this.setData({
        content: this.data.content
      })
      prevPage.setData({
        content: data
      })
      wx.navigateBack({//返回
        delta: 1
      })
    }
  },
  // 必选
  mustChange(e) {
    this.setData({
      mustChange: e.detail.value
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
  onShareAppMessage: function () {

  }
})