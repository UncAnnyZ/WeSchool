// pages/association/association.js
let school = ''
let db = wx.cloud.database()
let card = ""//学号
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        title: "联系人",
        placeholder: "负责人姓名",
        type: "text",
        value: "",
        id: "name",
      },
      {
        title: "联系方式",
        placeholder: "电话号码",
        type: "number",
        value: "",
        id: "phone"
      },
      {
        title: "社团/机构",
        placeholder: "输入名称",
        type: "text",
        value: "",
        id: "association"
      },
      {
        title: "学号",
        placeholder: "输入学号",
        type: "number",
        value: "",
        id: "card"
      },
    ],
    index_list: [
      {
        img: "img/freshman.png",
        name: "招新报名",
        tapName: "freshman"
      },
      {
        img: "img/match.png",
        name: "赛事发布",
        tapName: "match"
      },
      {
        img: "img/change.png",
        name: "编辑资料",
        tapName: "edit"
      },
      {
        img: "img/delete.png",
        name: "注销身份",
        tapName: "delete"
      },
    ],
    data_list: [
      {
        img: "img/freshman_data.png",
        name: "招新数据",
        tap: "goFreshmanData"
      },
      {
        img: "img/match_data.png",
        name: "赛事反馈",
        tap: "goMatchData"
      },
      {
        img: "img/more.png",
        name: "推广数据",
        tap: "loading"
      },
      {
        img: "img/more.png",
        name: "创作中心",
        tap: "loading"
      },
    ],
    HtmlStatus: 0,//0为申请 1审核中 2审核通过  3注销中
    assoMess: "",
    photoStatus: false,
    img: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = wx.getStorageSync('args');
    let list = this.data.list
    card = String(res.username)
    school = res.school
    list[3].value = card
    this.setData({
      list: list
    })
    this.search(card)
    this.updateCount(card)
  },
  // 赛事反馈
  goMatchData() {
    wx.navigateTo({
      url: '/pages/association/matchData/matchData',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 查询用户状态
  search(card) {
    // if (card != 'guest') {
    //   card = Number(card)
    // }
    card = String(card)
    db.collection("associationApply").where({ count: card }).get().then(res => {
      console.log(res);
      if (res.data.length == 0) {
        this.setData({
          HtmlStatus: 0
        })
      }
      else {
        // console.log(res.data[0].status);
        // console.log(res.data[0].status===false);
        if (res.data[0].status === false) {
          this.setData({
            HtmlStatus: 1
          })
        }
        else if (res.data[0].status == 0) {
          this.setData({
            HtmlStatus: 3
          })
        }
        else {
          // 社团操作，发布
          let assoMess = [
            {
              name: "社团/机构",
              detail: res.data[0].hostMess.association
            },
            {
              name: "联系方式",
              detail: res.data[0].hostMess.phone
            },
            {
              name: "联系人",
              detail: res.data[0].hostMess.name
            },
            {
              name: "学号",
              detail: res.data[0].hostMess.card
            },
          ]
          this.setData({
            HtmlStatus: 2,
            assoMess: assoMess
          })
        }
      }
    })
  },
  // 招新数据
  goFreshmanData() {
    wx.navigateTo({
      url: '/pages/association/freshmanData/freshmanData',
      success: (result) => {

      },
    });
  },
  // 开发中
  loading() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  formSubmit(e) {
    console.log(e);
    let data = e.detail.value
    if (data.association == "" || data.card == "" || data.name == "" || data.phone == "" || !this.data.imgUrl) {
      wx.showModal({
        title: '提示',
        content: '请输入完整信息',
        showCancel: false,
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
      wx.showModal({
        title: '提示',
        content: '确认提交',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.showLoading({
              title: "提交中",
              mask: true,
              success: (result) => {
                db.collection("associationApply").add({
                  data: {
                    status: false,
                    hostMess: data,
                    count: String(data.card),
                    logoUrl: this.data.imgUrl,
                    activityCount: 1,
                    personCount: 1,
                    school: school
                  }
                }).then(res => {
                  this.setData({
                    HtmlStatus: 1
                  })
                  wx.hideLoading();
                })
              },
            });
          }
        },
      });
    }
  },
  // 赛事
  match() {
    wx.navigateTo({
      url: '/pages/association/match/match?count=' + card,
      success: (result) => {

      },
    });
  },
  // 注销社团
  delete() {
    wx.showModal({
      title: '警告',
      content: '注销负责人身份',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.showLoading({
            title: "注销中",
            mask: true,
            success: (res) => {
              db.collection("associationApply").where({ count: card }).update({
                data: {
                  status: 0
                }
              }).then(res => {
                wx.hideLoading();
                this.setData({
                  HtmlStatus: 3
                })
              })
            },
          });
        }
      },
    });
  },
  // 编辑资料
  edit() {
    wx.navigateTo({
      url: '/pages/association/edit/edit?count=' + card,
    })
  },
  // 跳转
  freshman() {
    let assoMess = this.data.assoMess
    assoMess = JSON.stringify(assoMess)
    wx.navigateTo({
      url: '/pages/association/freshman/freshman?assoMess=' + assoMess,
      success: (result) => {

      },
    });
  },
  // 上传logo
  add_logo() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let tempUel = res.tempFilePaths[0]
        wx.cloud.uploadFile({
          cloudPath: 'association/' + Date.now() + 'jpg',
          filePath: tempUel
        }).then(res => {
          let imgUrl = res.fileID
          wx.showToast({
            title: '上传成功',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (res) => {
              this.setData({
                img: true,
                imgUrl: imgUrl
              })
            },
          });
        })
      },
    });
  },
  showTip() {
    wx.showToast({
      title: '审核后可修改',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 更新人数活动数量
  updateCount(count) {
    wx.cloud.callFunction({
      name: "associationSend",
      data: {
        type: 6,
        count,
      }
    }).then(res => {
      console.log(res);
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