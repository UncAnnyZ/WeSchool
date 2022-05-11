// pages/association/match/match.js
const db = wx.cloud.database()
var count = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mathObj: ""
  },
  // 详情页
  goDetail() {
    wx.navigateTo({
      url: '/pages/association/match_detail/match_detail?',
      success: (result) => {

      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    count = String(options.count)
    wx.showLoading({
      title: "查询中",
      mask: true,
      success: (result) => {
        db.collection("associtaionMath").where({ count }).get().then(res => {
          this.setData({
            mathObj: res.data
          })
          wx.hideLoading();
        })
      },
    });
  },
  changDetail(e) {
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '/pages/association/match_detail/match_detail?id=' + id,
      success: (result) => {
      },
    });
  },
  // 修改状态
  changeStatus(e) {
    let item = e.currentTarget.dataset.item
    let id = item._id
    let index = e.currentTarget.dataset.index
    if (item.sendStatus == true) {
      wx.showModal({
        title: '提示',
        content: '确认取消发布',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.cloud.callFunction({
              name: "associationSend",
              data: {
                type: 3,
                index: item.count + "比赛"
              }
            }).then(res => {
              db.collection("associtaionMath").where({ _id: id }).update({
                data: {
                  sendStatus: false
                }
              }).then(res => {
                this.data.mathObj[index].sendStatus = false
                this.setData({
                  mathObj: this.data.mathObj
                })
              })
            })
          }
        },
      });
    }
    else {
      wx.showModal({
        title: '提示',
        content: '确认发布',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.cloud.callFunction({
              name: "associationSend",
              data: {
                type: 2,
                AllPhoto: [item.imgUrl],
                Cover: item.imgUrl,
                CoverHeight: item.CoverHeight,
                CoverWidth: item.CoverWidth,
                School: item.schoolName,
                ShowHeight: item.ShowHeight,
                Text: item.senderMess.contentDetail,
                Title: item.senderMess.title,
                index: item.count + "比赛",
                question: item.question,
                assoMess: item.assoMess,
                borderArr: item.borderArr,
                date: item.date,
                match_id: id
              }
            }).then(res => {
              db.collection("associtaionMath").where({ _id: id }).update({
                data: {
                  sendStatus: true
                }
              }).then(res => {
                this.data.mathObj[index].sendStatus = true
                this.setData({
                  mathObj: this.data.mathObj
                })
              })
            })
          }
        },
      });
    }
  },
  // 删除
  delete(e) {
    let item = e.currentTarget.dataset.item
    let id = item._id
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '警告',
      content: '删除后无法恢复',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          db.collection("associtaionMath").where({ _id: id }).remove().then(res => {
            this.data.mathObj.splice(index, 1)
            this.setData({
              mathObj: this.data.mathObj
            })
          })
        }
      },
    });
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