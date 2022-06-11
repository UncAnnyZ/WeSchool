//index.js
//获取应用实例

const db = wx.cloud.database()
const schoolLoading = db.collection('schoolLoading')

const app = getApp()
Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    user: "",
    pwd: "",
    school: [],
    url: '',
    urls: []
  },

  back: function (params) {
      wx.navigateBack({
        delta: 1,
      })
    // wx.switchTab({
    //   url: '/pages/myself/myself',
    // });
  },

  bindPickerChange: function (e) {
    var that = this
    this.setData({
      index: e.detail.value,
      url: that.data.urls[e.detail.value]
    })
    console.log(this.data.school[this.data.index])
    if (this.data.school[this.data.index] == "游客登录") {
      that.setData({
        user: "guest",
        pwd: "test"
      })
    } else {
      that.setData({
        user: "",
        pwd: ""
      })
    }
  },

  async onLoad(option) {

    wx.showLoading({
      title: '加载基础信息中',
      mask: true
    })
    // 注意！这个只能拉100个学校，我也希望未来我们能超过100个
    var that = this;
    var res = (await schoolLoading.field({ //显示哪些字段
      schoolName: true, //默认显示_id，这个隐藏
      url: true,
      location: true,
    }).get()).data
    res.forEach(e => {
      if (e.schoolName !== '空' | "游客登录") {
        this.data.school.push(e.schoolName)
        this.data.urls.push(e.url)
      }
    })

    this.setData({
      res: res,
      school: that.data.school
    });
    wx.hideLoading();
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const Rad = (d) => { //根据经纬度判断距离
          return d * Math.PI / 180.0;
        }
        const getDistance = (lat1 = 0, lng1 = 0, lat2 = 0, lng2 = 0) => {
          var radLat1 = Rad(lat1);
          var radLat2 = Rad(lat2);
          var a = radLat1 - radLat2;
          var b = Rad(lng1) - Rad(lng2);
          var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
          s = s * 6378.137;
          s = Math.round(s * 10000) / 10000;
          s = s.toFixed(2) //保留两位小数
          // console.log('经纬度计算的距离:' + s)
          return s
        }
        that.data.res.forEach(e => {
          e.distance = Number(getDistance(res.latitude, res.longitude, e.location ? e.location.latitude : 0, e.location ? e.location.longitude : 0))
        })
        that.data.res.sort(function (a, b) {
          return a.distance - b.distance
        })
        // that.data.res.reverse()
        console.log(that.data.res)
        that.data.school = []
        that.data.urls = []
        that.data.res.forEach(e => {
          if (e.schoolName !== '空' | "游客登录") {
            that.data.school.push(e.schoolName)
            that.data.urls.push(e.url)
          }
        })
        that.setData({
          school: that.data.school
        });
        // that.setData({
        //     index:6
        // })
        if (option.schoolName != null) {
            console.log(option.schoolName);
            let school = that.data.school
            var index;
            for (let i = 0; i < school.length; i++) {
                if (option.schoolName == school[i]) {
                    console.log(option.schoolName+"的下标为"+i);
                    index = i;
                    console.log(index);
                }
            }
            that.setData({
                index:index
            })
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  },
//   onShow(){
//     this.setData({
//         index:3
//     })
//   },

  login: function (e) {
    var that = this;
    if (this.data.user.length == 0 || this.data.pwd.length == 0) {
      wx.showToast({
        title: '帐号及密码不能为空',
        icon: "none"
      })
      return -1;
    }
    wx.showLoading({
      title: '刷新中',
      mask: true
    })
    var that = this;
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    wx.getUserProfile({
      desc: '获取头像和信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        console.log(that.data.school[that.data.index])
        app.globalData.school = that.data.school[that.data.index]

        wx.cloud.callFunction({
          name: 'api',
          data: {
            url: 'login',
            username: that.data.user,
            password: that.data.pwd,
            nickName: res.userInfo.nickName,
            iconUrl: res.userInfo.avatarUrl,
            school: that.data.school[that.data.index]
          },
          success: res => {
            wx.clearStorageSync();        // 清除缓存
            wx.setStorageSync('time', null)
            if (res.result.msg == "welcome") {
              console.log(res.result)
              wx.reLaunch({
                url: '/pages/more/more?goin=login'
              })
            } else {
              console.log(res.result)
              wx.showToast({
                icon: 'none',
                title: res.result.msg,
              })
            }
          },
          fail: err => {
            wx.cloud.callFunction({
              name: 'api',
              data: {
                url: 'coverBottom',
                username: that.data.user,
                password: that.data.pwd,
                nickName: res.userInfo.nickName,
                iconUrl: res.userInfo.avatarUrl,
                school: that.data.school[that.data.index]
              },
              success: res => {
                if (res.result.msg == "welcome") {
                  console.log(res.result)
                  wx.reLaunch({
                    url: '/pages/index/index'
                  })
                } else {
                  console.log(res.result)
                  wx.showToast({
                    icon: 'none',
                    title: res.result.msg,
                  })
                }
              },
              fail: err => {

                wx.showToast({
                  icon: 'none',
                  title: '校园网关闭或者服务器异常',
                })
              }
            })

          }
        })

      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '授权失败',
        })
      }
    })

  },
  input: function (e) {
    this.setData({
      [e.target.id]: e.detail.value
    })
  },
  // 帮助弹窗
  tapHelp: function (e) {
    if (e.target.id == 'help_model') {
      this.hideHelp();
    }
  },

  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },
  copy() {
    wx.setClipboardData({
      data: this.data.url,
      success() {
        wx.showToast({
          title: '已成功复制地址，快用浏览器打开吧',
          icon: "none"
        })
      }
    })
  }

})