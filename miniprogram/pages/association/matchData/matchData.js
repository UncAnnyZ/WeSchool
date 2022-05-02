// pages/association/matchData/matchData.js
let count = ''
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['1', '2'],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let args = wx.getStorageSync('args')
    count = String(args.username)
    this.getMatch(count, 0)
  },
  // 跳转
  godetail(e) {
    let content = e.currentTarget.dataset.item
    content = JSON.stringify(content)
    wx.navigateTo({
      url: `/pages/association/matchDataDetail/matchDataDetail?content=${content}`,
    })
  },
  // 获取赛事信息
  getMatch(count, index) {
    wx.showLoading({
      title: "查询中",
      mask: true,
      success: (result) => {
        db.collection("associtaionMath").where({ count }).get().then(res => {
          console.log(res);
          if (res.data.length == 0) {
            wx.showToast({
              title: '暂无数据',
              icon: "none"
            })
          }
          else {
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
              arr.push(res.data[i].senderMess.title)
            }
            let match_id = res.data[index]._id
            this.setData({
              array: arr,
              match_id: match_id
            })
            db.collection("assoMatchPush").where({ match_id }).get().then(res => {
              this.setData({
                contetn: res.data
              })
              wx.hideLoading();
            })
          }
        })
      },
    });
  },
  bindPickerChange(e) {
    let index = e.detail.value
    this.setData({
      index
    })
    this.getMatch(count, index)
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
    this.getMore()
  },
  // 触底加载更多数据
  getMore() {
    let len = this.data.content.length
    // let content=this.data.content
    if (len < 20) {
      wx.showToast({
        title: '没有更多啦~',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
      });
    }
    else {
      db.collection("assoMatchPush").where({ count, match_id: this.data.match_id }).skip(len).get().then(res => {
        if (!res.data) {
          wx.showToast({
            title: '没有更多啦~',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result) => {
              wx.showToast({
                title: '加载完成',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {

                },
              });
            },
          });
        }
        else {
          this.data.content.push(...res.data)
          this.setData({
            content: this.data.content
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})