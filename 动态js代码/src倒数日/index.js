// pages/calendar/calendar.js
function formatDay(day) {
  switch (day) {
    case 1: day = "一"; break;
    case 2: day = "二"; break;
    case 3: day = "三"; break;
    case 4: day = "四"; break;
    case 5: day = "五"; break;
    case 6: day = "六"; break;
    case 7: day = "日"; break;
    case 0: day = "日"; break;

    case "一": day = 1; break;
    case "二": day = 2; break;
    case "三": day = 3; break;
    case "四": day = 4; break;
    case "五": day = 5; break;
    case "六": day = 6; break;
    case "七": day = 7; break;
    case "日": day = 7; break;
  }

  return day
}

Page({
  /**
   * 页面的初始数据
   */
  data : {
    html: "",
    jsonContent: {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      dayOfWeek: "星期" + formatDay(new Date().getDay()),
    },
    startX: 0, //开始坐标
    startY: 0,
    showModel: false,
    dates: "",
    list: [],
    dayName: "",
    changeDay: ""
  },

  feedbackHandler() { //跳转到子页
    var that = this;
    var showModel = that.data.showModel
    that.data.animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease'
    });
    console.log("in")
    if (showModel) {
      that.data.changeDay = ""
      that.data.dayName = ""
      that.data.dates = ""
      that.data.add_style = "add_hide"
      that.data.animation.opacity(0).translateY('100%').step();
      that.setData({});
      setTimeout(function () {
        that.data.showModel = !showModel;
        that.setData({});
      }, 700);
    } else {
      that.data.showModel = !showModel;
      that.data.animation.opacity(0).translateY('100%').step();
      that.setData({});
      that.data.animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease'
      });
      that.data.animation.opacity(1).translateY(0).step();
      that.setData({})
    }

    /*wx.navigateTo({
      url: 'addition/addition'
    })*/
  },




  num_data: function (start_date1, end_date1) { //计算倒数日
    var start_date = new Date(start_date1.replace(/-/g, "/"));
    var end_date = new Date(end_date1.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day * -1;
  },

  terms: function () { //学年显示
    var year = '';
    if (new Date().getMonth() > 4) {
      year = new Date().getFullYear() + '-' + (new Date().getFullYear() + 1) + '学年' + ' ' + '第' + 1 + '学期'
    } else {
      year = new Date().getFullYear() - 1 + '-' + new Date().getFullYear() + '学年' + ' ' + '第' + 2 + '学期'
    }
    this.setData({
      term: year
    })
  },

  compare: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  },


  setDataCalendar: function () { //页面渲染全部倒数日
    var addday = app.globalData._adday || [];
    var xlist = [];
    var xlist1 = [];
    var nowdate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    for (let i = 0; i < addday.length; i++) {
      var gapDays2 = this.num_data(addday[i].holidayDate, nowdate);
      if (gapDays2 > 0) {
        xlist.push({
          holidayName: addday[i].holidayName,
          holidayDate: addday[i].holidayDate,
          gapDays: gapDays2,
          holidayRestInfo: addday[i].holidayDate,
          isTouchMove: false
        })
      } else {
        xlist1.push({
          holidayName: addday[i].holidayName,
          holidayDate: addday[i].holidayDate,
          gapDays: gapDays2,
          holidayRestInfo: addday[i].holidayDate,
          isTouchMove: false
        })
      }
    }

    var list = xlist.sort(this.compare("gapDays")).concat(xlist1.sort(this.compare("gapDays")).reverse())
    app.globalData._adday = list
    this.setData({
      show: "",
      list: list
    })
  },

  showdates(e) {    //跳转到倒数日的详情页面
    var that = this
    var index1 = e.currentTarget.id
    var dates = that.data.list[index1]
    var holidayName = dates.holidayName
    var gapDays = dates.gapDays
    var holidayDate = dates.holidayDate
    wx.navigateTo({
      url: "/pages/HOT/HotNoTop/HotNoTop?content=倒数日二跳页&Name=" + holidayName + "&gapDays=" + gapDays + "&Date=" + holidayDate,
    })
  },

  touchstart: function (e) { //开始触摸时 重置所有删除
    this.data.list.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: this.data.list
    })
  },

  touchmove: function (e) {
    var that = this,
    index = e.currentTarget.id, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.list.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      list: that.data.list
    })
  },

  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  del: function (e) { //删除倒数日  
    var that=this
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    this.data.list.splice(e.currentTarget.id, 1)
    app.globalData._adday = this.data.list
    wx.cloud.callFunction({
      name: 'readday',
      data: {
        _adday: JSON.stringify(this.data.list),
        username: wx.getStorageSync('args').username,
        type: 'write'
      },
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
        })
        that.onShow()
      },
      fail: err => {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
        })
      }
    })
  },

  bindInputChange : function (e) { //获取倒数日日期
    console.log(e.detail.value)
    this.setData({
      dayName: e.detail.value
    })
},

  bindDateChange: function (e) { //获取倒数日日期
    this.setData({
      dates: e.detail.value
    })
  },
  addSubmit: function (e) {
    //判断是否修改状态

    var that = this //提交倒数日
    wx.showLoading({
      title: '处理中',
      mask: true
    })

    if (this.data.dayName == null || this.data.dayName == "" || this.data.dayName == undefined) { //判断填写是否为空
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.dates == null || this.data.dates == "" || this.data.dates == undefined) {
      wx.showToast({
        title: '日期不能为空',
        icon: 'none',
        duration: 1000
      })
    } else {
      var add = {
        'holidayName': this.data.dayName,
        'holidayDate': this.data.dates,
      }
      if (this.data.changeDay !== "") {
        app.globalData._adday[this.data.changeDay].holidayName = this.data.dayName
        app.globalData._adday[this.data.changeDay].holidayDate = this.data.dates
      } else {

        app.globalData._adday.push(add)
      }

      wx.cloud.callFunction({ //访问云函数
        name: 'readday',
        data: {
          _adday: JSON.stringify(app.globalData._adday),
          username: wx.getStorageSync('args').username,
          type: 'write'
        },
        success: res => {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
          })
          that.onShow()
        },
        fail: err => {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
          })
        },
        complete() {
          that.setData({
            changeDay:"",
            dayName: "",
            dates: "",
            showModel: !that.data.showModel,
          })
        }
      })
    }
  },

  edit: function (e) {
    //保存到changeDay来调用状态
    this.data.changeDay = e.currentTarget.id
    this.setData({
      dayName: app.globalData._adday[this.data.changeDay].holidayName,
      dates: app.globalData._adday[this.data.changeDay].holidayDate
    })
    this.feedbackHandler()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //读取数据库
    var that = this
    wx.setNavigationBarTitle({ title: 'We校园-倒数日' });
    app.loginState();
    that.terms();
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'readday',
      data: {
        username: wx.getStorageSync('args').username,
        type: 'read'
      },
      success: res => {
        res.result ? res.result : []
        app.globalData._adday = JSON.parse(res.result)
        that.setDataCalendar();
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail: err => {
        console.log(err)
      }
    })
    that.data.animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease'
    });
    that.data.animation.opacity(0).translateY('100%').step();
    that.setData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function (options) {
    this.setDataCalendar();
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
  },


  onReady: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '广东石油化工学院校历',
    }
  },
  showPic: function () {
    wx.previewImage({
      // cloud://un1-d62c68.756e-un1-d62c68-1258307938/xl.png
      current: 'https://s1.ax1x.com/2022/05/09/OJRwF0.jpg', // 当前显示图片的http链接
      urls: ['https://s1.ax1x.com/2022/05/09/OJRwF0.jpg'] // 需要预览的图片http链接列表
    })
  },
})