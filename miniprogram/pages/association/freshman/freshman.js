let db = wx.cloud.database()
let count = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freshman: [],
    showModalStatus: false,
    add_content: "",
    sendStatus: false,//发布状态
    date: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let assoMess = JSON.parse(options.assoMess)
    let res = wx.getStorageSync("args");
    let school = res.school
    let nickName = res.nickName
    count = String(res.username)
    wx.showLoading({
      title: "加载中",
      mask: true,
      success: (result) => {
        db.collection("associationMess").where({ count: count }).get().then(res => {
          if (res.data.length == 0) {
            db.collection("associationMess").add({
              data: {
                count: count,
                school: school,
                nickName: nickName,
                freshman: [],
                sendStatus: false,
                assoMess: assoMess,
                personArr: []
              }
            }).then(res => {
              wx.hideLoading();
              this.setData({
                freshman: [],
                sendStatus: false,
                school: school,
                assoMess: assoMess,
              })
            })
          }
          else {
            db.collection("associationMess").where({ count: count }).get().then(res => {
              wx.hideLoading();
              this.setData({
                freshman: res.data[0].freshman,
                sendStatus: res.data[0].sendStatus,
                imgUrl: res.data[0].imgUrl,
                CoverHeight: res.data[0].CoverHeight,
                CoverWidth: res.data[0].CoverWidth,
                ShowHeight: res.data[0].ShowHeight,
                school: school,
                assoMess: assoMess,
                date: res.data[0].date,
                add_title: res.data[0].title,
              })
            })
          }
        })
      },
    });
  },
  // 弹窗
  clickme() {
    if (this.data.sendStatus == true) {
      wx.showModal({
        title: '提示',
        content: '已发布不可修改',
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
      this.showModal();
    }
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
  // 输入内容
  content(e) {
    this.setData({
      add_content: e.detail.value
    })
  },
  // 提交
  add_content() {
    let content = this.data.add_content
    let id = Date.parse(new Date())
    if (content == "") {
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
    else {
      let freshman = this.data.freshman
      freshman.push({
        content: content,
        id: id
      })
      db.collection("associationMess").where({ count: count }).update({
        data: {
          freshman: freshman
        }
      }).then(res => {
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            this.setData({
              content: "",
              freshman: freshman
            })
            this.hideModal()
          },
        });
      })
    }
  },
  // 删除内容
  delete(e) {
    let id = e.currentTarget.dataset.item.id
    let freshman = this.data.freshman
    let newFreshman = []
    for (let i = 0; i < freshman.length; i++) {
      if (freshman[i].id != id) {
        newFreshman.push(freshman[i])
      }
    }
    this.setData({
      freshman: newFreshman
    })
    wx.showToast({
      title: '删除成功',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        db.collection("associationMess").where({ count: count }).update({
          data: {
            freshman: newFreshman
          }
        })
      },
    });
  },
  // 发布状态选择
  send() {
    let sendStatus = this.data.sendStatus
    if (sendStatus == false) {
      if (this.data.date == null) {
        wx.showModal({
          title: '提示',
          content: '设置截至时间',
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
        wx.showModal({
          title: '提示',
          content: '确定发布',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (result) => {
            if (result.confirm) {
              wx.showLoading({
                title: "发布中...",
                mask: true,
                success: (result) => {
                  wx.cloud.callFunction({
                    name: "associationSend",
                    data: {
                      type: 0,
                      AllPhoto: [this.data.imgUrl],
                      Cover: this.data.imgUrl,
                      CoverHeight: this.data.CoverHeight,
                      CoverWidth: this.data.CoverWidth,
                      School: this.data.school,
                      ShowHeight: this.data.ShowHeight,
                      Title: this.data.add_title,
                      index: count + '社团',
                      endTime: this.data.date,
                      question: this.data.freshman,
                      association: this.data.assoMess
                    }
                  }).then(res => {
                    db.collection("associationMess").where({ count: count }).update({
                      data: {
                        sendStatus: true
                      }
                    }).then(res => {
                      wx.hideLoading();
                      wx.showToast({
                        title: '发布成功',
                        icon: 'none',
                        image: '',
                        duration: 1500,
                        mask: false,
                        success: (result) => {

                        },
                      });
                      this.setData({
                        sendStatus: true
                      })
                    })
                  })
                },
              });
            }
          },
        });
      }
    }
    else {
      wx.showModal({
        title: '提示',
        content: '撤回招新问卷',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.showLoading({
              title: "撤回中...",
              mask: true,
              success: (result) => {
                wx.cloud.callFunction({
                  name: "associationSend",
                  data: {
                    type: 1,
                    count: count
                  }
                }).then(res => {
                  wx.showToast({
                    title: '已撤回',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {
                      this.setData({
                        sendStatus: false
                      })
                    },
                  });
                })
              },
            });
          }
        },
      });
    }
  },
  // 招新海报
  uploadImg() {
    let id = Date.parse(new Date())
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.cloud.uploadFile({
          cloudPath: id + '.png',
          filePath: res.tempFilePaths[0]
        }).then(res => {
          let imgUrl = res.fileID
          // 计算图片
          wx.getImageInfo({
            src: imgUrl,
            success: (res) => {
              let height = res.height > 500 ? 500 : res.height
              let width = res.width < 370 ? 370 : res.width
              let CoverHeight = height + 'rpx'
              let CoverWidth = width
              let ShowHeight = height
              db.collection("associationMess").where({ count: count }).update({
                data: {
                  imgUrl: imgUrl,
                  CoverHeight,
                  CoverWidth,
                  ShowHeight
                }
              }).then(res => {
                wx.showToast({
                  title: '上传成功',
                  icon: 'none',
                  image: '',
                  duration: 1500,
                  mask: false,
                  success: (result) => {
                    console.log('成功');
                    this.setData({
                      imgUrl: imgUrl
                    })
                  },
                });
              })
            },
          });

        })
      },
    });
  },
  // 加载图片
  previewImage(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: [e.currentTarget.dataset.src],
      success: (result) => {

      },
    });
  },
  // 删除海报
  changeImg() {
    if (this.data.sendStatus == true) {
      wx.showModal({
        title: '提示',
        content: '已发布不可修改',
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
      this.uploadImg()
    }
  },
  // 选择时间
  changeDate(e) {
    if (this.data.sendStatus == true) {
      wx.showModal({
        title: '提示',
        content: '招新信息已发布,不可修改',
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
      db.collection("associationMess").where({ count: count }).update({
        data: {
          date: e.detail.value
        }
      }).then(res => {
        this.setData({
          date: e.detail.value
        })
      })
    }
  },
  // 招新标题
  getTitle(e) {
    this.setData({
      add_title: e.detail.value
    })
  },
  // 确认修改标题
  add_title() {
    if (this.data.add_title == "") {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
      });
    }
    else if (this.data.sendStatus == true) {
      wx.showModal({
        title: '提示',
        content: '发布后不可修改',
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
      wx.showLoading({
        title: "修改中",
        mask: true,
        success: (result) => {
          db.collection("associationMess").where({ count: count }).update({
            data: {
              title: this.data.add_title
            }
          }).then(res => {
            wx.showToast({
              title: '修改成功',
              icon: 'none',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {
                wx.hideLoading();
              },
            });
          })
        },
      });
    }
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