// pages/association/admin/admin.js\
let count = ''
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  onLoad() {
    count = wx.getStorageSync('args').username
    this.getAdmin(count)
  },
  handleCount(e) {
    this.setData({
      adminCount: e.detail.value
    })
  },
  getAdmin(count) {
    db.collection('associationApply').where({ count }).get().then(res => {
      if (res.data[0].adminArr) {
        this.setData({
          list: res.data[0].adminArr
        })
      }
    })
  },
  certain() {
    if (!this.data.adminCount) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
      });
    }
    else if (!Number(this.data.adminCount)) {
      wx.showToast({
        title: '学号有误',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
      });
    }
    else if (count == String(this.data.adminCount)) {
      wx.showToast({
        title: '不能添加自己为管理员',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
      });
    }
    else {
      wx.showLoading({
        title: '查询中',
        mask: true,
        success: (result) => {
          db.collection('user').where(_.or([
            {
              username: Number(this.data.adminCount),
            },
            {
              username: String(this.data.adminCount)
            }
          ])).get().then(res => {
            if (res.data.length == 0) {
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '未查询到该用户信息，请先注册We校园',
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
              let adminCount = String(this.data.adminCount)
              db.collection('associationApply').where({ count }).update({
                data: {
                  adminArr: _.addToSet(adminCount)
                }
              }).then(res => {
                wx.hideLoading();
                wx.showToast({
                  title: '添加成功',
                  icon: 'none',
                  image: '',
                  duration: 1500,
                  mask: false,
                  success: (result) => {
                    this.hideModal()
                    this.getAdmin(count)
                  },
                });
              })
            }
          })
        },
      });
    }
  },
  delete(e) {
    let tar = e.currentTarget.dataset.count
    wx.showModal({
      title: '警告',
      content: '确认移除管理员权限',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '移除',
      confirmColor: 'red',
      success: (result) => {
        if (result.confirm) {
          wx.showLoading({
            title: '删除中',
            mask: true,
            success: (result) => {
              db.collection('associationApply').where({ count }).update({
                data: {
                  adminArr: _.pullAll([tar])
                }
              }).then(res => {
                wx.hideLoading();
                wx.showToast({
                  title: '移除成功',
                  icon: 'none',
                  image: '',
                  duration: 1500,
                  mask: false,
                  success: (result) => {
                    this.getAdmin(count)
                  },
                });
              })
            },
          });
        }
      },
    });
  },
})