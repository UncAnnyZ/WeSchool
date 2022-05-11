// pages/grade/show/show.js

Array.prototype.remove = function (val) {
  for (let i = 0; i < this.length; i++) {
    if(!this[i]){
      continue
    }
    if (this[i].kcmc == val.kcmc && this[i].zc == val.zc && this[i].xq == val.xq && this[i].jcdm == val.jcdm) {
      this.splice(i, 1);
    }
  }
};

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    template:{
      type: "picker",
      text: ['注意！', '（可以选择自增课程和学校课程）']
    },
    array: ['学校课程', '自增课程'],
    index: "0",

    decurriculum: [], //二维数组，长度是多少是几列
    wlist: [],
    block_show: false,
    addSubmitStyle: false
  },


  bindPickerChange(e) {
    if (e.detail.value == '1') {
      this.setData({
        index: e.detail.value
      })
      this.add();
    } else {
      this.setData({
        index: e.detail.value
      })
      this.de();
    }

  },

  
  set1: function (e) {
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    // 更新缓存
    let args = wx.getStorageSync('args');
    let wlist = this.data.wlist;      
    
    args.addCurriculumLogs.splice(e.currentTarget.dataset.bean, 1);
    wlist.splice(e.currentTarget.dataset.bean, 1);
    
    let that = this;
    // 更新数据库并重渲染页面
    wx.cloud.callFunction({
      name: 'curriculum',
      data: {
        addCurriculumLogs: args.addCurriculumLogs,
        username: args.username,
        type: 'addCurriculumLogs'
      },
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
        })
        this.add();
        wx.setStorageSync('args', args);
        that.setData({ wlist })
      },
      fail: err => {
        wx.showToast({
          title: '删除失败(校园网关闭或者服务器异常)',
          icon: 'none',
        })
      }
    })
  },

  changeCurriculum: function (addCurriculum, deCurriculum) {
    // console.log("进入函数");
    let allCurriculum = wx.getStorageSync('personalInformation').curriculum;

    for (var i = 0; i < addCurriculum.length; i++) {
      allCurriculum.push(addCurriculum[i]);
    }
    for (var i = 0; i < deCurriculum.length; i++) {
      for (var g = 0; g < allCurriculum.length; g++) {
        if(!deCurriculum[i]){
          continue
        }
        if (deCurriculum[i].zc == "全部") {
          if (allCurriculum[g].kcmc == deCurriculum[i].kcmc) {
            allCurriculum.splice(g, 1);
            g--;
          }
        } else {
          if (allCurriculum[g].kcmc == deCurriculum[i].kcmc && allCurriculum[g].jcdm == deCurriculum[i].jcdm && allCurriculum[g].zc == deCurriculum[i].zc && allCurriculum[g].xq == deCurriculum[i].xq) {
            allCurriculum.splice(g, 1);
            g--;
          }
        }
      }
    }
    
    return allCurriculum;
  },
  // 得到用户已添加课程，并赋值给 wlist
  add: function () {
    let args = wx.getStorageSync('args');
    let wlist = [];
    let pd1 = /(.*?),/g;

    for (let i = 0; i < args.addCurriculumLogs.length; i++) {
      wlist.push({
        zs: '第' + args.addCurriculumLogs[i].zc + '周',
        xqj: '星期' + args.addCurriculumLogs[i].xq,
        skjc: '第' + args.addCurriculumLogs[i].jcdm + '节',
        kcmc: args.addCurriculumLogs[i].kcmc,
      })
    }
    console.log("add函数内" ,wlist);
    this.setData({
      wlist
    })
  },

  // 得到用户删除课程 并赋值给 wlist
  de: function () {
    let args = wx.getStorageSync('args')
    let wlist = [];
    let pd1 = /(.*?),/g;

    if(args.ConcealCurriculumLogs) {
      for (let i in args.ConcealCurriculumLogs) {
        let zs = ""
        let xqj = ""
        let skjc = ""
        if (args.ConcealCurriculumLogs[i].zc != "全部") {
          zs = '第' + args.ConcealCurriculumLogs[i].zc + '周';
          xqj = '星期' + args.ConcealCurriculumLogs[i].xq;
          skjc = '第' + args.ConcealCurriculumLogs[i].jcdm + '节';
        } else {
          zs = args.ConcealCurriculumLogs[i].zc;
          xqj = args.ConcealCurriculumLogs[i].zc;
          skjc = args.ConcealCurriculumLogs[i].zc;
        }
        wlist.push({
          zs: zs,
          xqj: xqj,
          skjc: skjc,
          kcmc: args.ConcealCurriculumLogs[i].kcmc,
        })
      }
    }
    console.log("de函数内", wlist);
    this.setData({
      wlist
    })
  },
  // 兼容茂职
  jianRongMaoZhi() {
    console.log("eee");
    var lesson = wx.getStorageSync("personalInformation").curriculum;
    // 按上课时间排序先
    if(!lesson){
      return
    }
    lesson.sort((a, b) => {
      return new Date(a.pkrq).getTime() - new Date(b.pkrq).getTime()
    })

    var ll = {}
    var kcmc = []

    // 处理数据=>以'课程名称'为字段 的对象数组
    for (let i = 0; i < lesson.length; i++) {
      let index = kcmc.indexOf(lesson[i].kcmc)
      if (index == -1) {
        kcmc.push(lesson[i].kcmc)
        ll[lesson[i].kcmc] = []
        ll[lesson[i].kcmc].push(lesson[i])
      } else {
        ll[lesson[i].kcmc].push(lesson[i])
      }
    }

    // 处理数据，将已经上过的剔除 区分已经屏蔽过的
    var _de = wx.getStorageSync('args').ConcealCurriculumLogs

    for (let i = 0; i < kcmc.length; i++) {
      var arr = ll[kcmc[i]]
      var obj = {}
      obj['data'] = [];
      obj['zcxq'] = []; // 列出该课程所有的 周次-星期-节次
      obj['jxcd'] = []; // 教学场地，这门课上课的地点
      for (let k = 0; k < arr.length; k++) {
        obj['data'].push(arr[k])
        console.log(obj['data']);
        // 在这里要判断是否已经屏蔽过了，屏蔽了的塞false进去
        let flag = true;
        if(_de) {
          for (let p = 0; p < _de.length; p++) {
            if(!_de[p]){
              continue
            }
            if (_de[p].kcmc == kcmc[i] && _de[p].zc == arr[k].zc && _de[p].xq == arr[k].xq && _de[p].jcdm == arr[k].jcdm) {
              flag = false
            }
          }
        }
        
        obj['zcxq'].push([arr[k].zc + "-" + arr[k].xq + "-" + arr[k].jcdm, flag]);
        // 找出该门课的上课场地
        if (!obj['jxcd'].includes(arr[k].jxcdmc)) {
          obj['jxcd'].push(arr[k].jxcdmc)
        }
    }
    ll[kcmc[i]] = obj
    }

    this.setData({
      ll,
      kcmc
    })
  },
  onLoad: function () {
    this.add();
    this.init();
  },
  // 显示详情 初始化
  init() {
    var args = wx.getStorageSync('args');
    this.setData({school: args.school == '游客登录' ? '广东石油化工学院' : args.school});
    if(args.school != '广东石油化工学院') {
      this.jianRongMaoZhi()
      return;
    } 
    var lesson = wx.getStorageSync("personalInformation").curriculum;
    // 按上课时间排序先
    if(!lesson){
      return
    }
    lesson.sort((a, b) => {
      return new Date(a.pkrq).getTime() - new Date(b.pkrq).getTime()
    })

    var ll = {}
    var kcmc = []

    // 处理数据=>以'课程名称'为字段 的对象数组
    for (let i = 0; i < lesson.length; i++) {
      let index = kcmc.indexOf(lesson[i].kcmc)
      if (index == -1) {
        kcmc.push(lesson[i].kcmc)
        ll[lesson[i].kcmc] = []
        ll[lesson[i].kcmc].push(lesson[i])
      } else {
        ll[lesson[i].kcmc].push(lesson[i])
      }
    }

    // 处理数据，将已经上过的剔除 区分已经屏蔽过的
    var nowtime = new Date().getTime();
    var _de = wx.getStorageSync('args').ConcealCurriculumLogs

    for (let i = 0; i < kcmc.length; i++) {
      var arr = ll[kcmc[i]]
      var obj = {}
      obj['data'] = [];
      obj['zcxq'] = []; // 列出该课程所有的 周次-星期-节次
      obj['jxcd'] = []; // 教学场地，这门课上课的地点
      for (let k = 0; k < arr.length; k++) {
        console.log(arr[k]);
        
        // 除了广油，很多学校没有 pkrq 字段
        if (nowtime < new Date(arr[k].pkrq).getTime()) {
          obj['data'].push(arr[k])
          console.log(obj['data']);
          // 在这里要判断是否已经屏蔽过了，屏蔽了的塞false进去
          let flag = true;
          if(_de) {
            for (let p = 0; p < _de.length; p++) {
              if(!_de[p]){
                continue
              }
              if (_de[p].kcmc == kcmc[i] && _de[p].zc == arr[k].zc && _de[p].xq == arr[k].xq && _de[p].jcdm == arr[k].jcdm) {
                flag = false
              }
            }
          }
          
          obj['zcxq'].push([arr[k].zc + "-" + arr[k].xq + "-" + arr[k].jcdm, flag]);
          // 找出该门课的上课场地
          if (!obj['jxcd'].includes(arr[k].jxcdmc)) {
            obj['jxcd'].push(arr[k].jxcdmc)
          }

        }
      }
      ll[kcmc[i]] = obj
    }

    this.setData({
      ll,
      kcmc
    })

  },
  // 设置'课程详情'显示的课程
  change(e) {
    this.block_show()

    var id = e.currentTarget.id
    let ll = JSON.parse(JSON.stringify(this.data.ll[this.data.kcmc[id]])) // 深拷贝
    var showDetail = {
      course: this.data.kcmc[id],
      place: ll.jxcd,
      teacher: ll.data[0].teaxms,
      week: ll.zcxq
    }
    this.setData({
      showDetail
    })
    this.flushbtn()
  },

  // 改变按钮选择
  changeWB(e) {
    var id = e.currentTarget.id
    var ll = this.data.ll
    var showDetail = this.data.showDetail
    showDetail.week[id][1] = !showDetail.week[id][1]
    console.log(showDetail);
    this.setData({
      showDetail
    })
    this.flushbtn()

  },
  // 刷新'保存'按钮
  flushbtn() {
    var ll = this.data.ll
    var showDetail = this.data.showDetail
    if (JSON.stringify(showDetail.week) == JSON.stringify(ll[showDetail.course].zcxq))
      this.setData({
        addSubmitStyle: false
      })
    else
      this.setData({
        addSubmitStyle: true
      })

  },

  // 用来控制'课程详情'显示
  block_show() {
    var block_show = this.data.block_show
    var that = this
    if (block_show) {
      this.setData({
        add_style: "add_hide"
      })
      setTimeout(() => {
        that.setData({
          block_show: !block_show
        })
      }, 200);
    } else {
      this.setData({
        add_style: "add_show",
        block_show: !block_show
      })
    }
  },

  // 点击保存
  addSubmit() {
    console.log('点击保存')

    var kcmc = this.data.showDetail.course
    var oldweek = this.data.ll[kcmc].zcxq   
    var newweek = this.data.showDetail.week
    // console.log(oldweek,newweek)

    var add = [] // 存放'取消屏蔽'的
    var del = [] // 存放'屏蔽'的
    // 筛选出'屏蔽'和'取消屏蔽'的
    for (let i = 0; i < newweek.length; i++) {

      if (oldweek[i][1] ^ newweek[i][1]) {
        var str = newweek[i][0].split("-") // 0：周    1：星期     2：节次
        var de = {
          'kcmc': kcmc,
          'zc': str[0],
          'xq': str[1],
          'jcdm': str[2]
        }
        // 旧的true 新的false （屏蔽）
        if (oldweek[i][1] > newweek[i][1]) {
          del.push(de)
        }
        // 旧的false 新的true （取消屏蔽）
        else if (oldweek[i][1] < newweek[i][1]) {
          add.push(de)
        }
      }
    }

    var addstr = ""
    var delstr = ""
    // 格式化showModal
    if (add.length != 0) {
      addstr += "确认恢复(" + kcmc + ")"
      for (let i = 0; i < add.length; i++) {
        addstr += "\n第" + add[i].zc + "周 周" + this.zhuanxq(add[i].xq) + " " + this.zhuanjc(add[i].jcdm);
      }
      addstr += "\n"
    }
    if (del.length != 0) {
      delstr += "确认屏蔽(" + kcmc + ")"
      for (let i = 0; i < del.length; i++) {
        delstr += "\n第" + del[i].zc + "周 周" + this.zhuanxq(del[i].xq) + " " + this.zhuanjc(del[i].jcdm);
      }
    }

    var that = this
    wx.showModal({
      title: "温馨提示",
      content: addstr + delstr,
      confirmText: "确认",
      cancelText: "再想想",
      success(res) {
        if (res.confirm) {

          wx.showLoading({
            title: '更新中...'
          })
          var global_de = wx.getStorageSync('args').ConcealCurriculumLogs;

          // 处理屏蔽的课程
          for (let i in del)
            global_de.push(del[i])

          // 处理恢复的课程
          for (let i in add)
            global_de.remove(add[i])

          that.update2Cloud(global_de)

          var ll = that.data.ll
          ll[kcmc].zcxq = newweek
          that.setData({
            ll
          })
          // 关闭详情
          that.block_show()
        }
      },
    })

  },

  update2Cloud(global_de) {
    let args = wx.getStorageSync('args')
    var that = this

    // 更新数据库
    wx.cloud.callFunction({
      name: 'curriculum',
      data: {
        ConcealCurriculumLogs: global_de,
        username: args.username,
        type: 'ConcealCurriculumLogs'
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: '更新成功',
          icon: 'none',
        })

        // 更新缓存 ConcealCurriculumLogs
        args.ConcealCurriculumLogs = global_de;
        wx.setStorageSync('args', args)

        that.onLoad()
      },
      fail: err => {
        wx.showToast({
          title: '保存失败(校园网关闭或者服务器异常)',
          icon: 'none',
        })
      }
    })
  },

  zhuanxq(e) {
    switch (e) {
      case "1":
        return "一";
      case "2":
        return "二";
      case "3":
        return "三";
      case "4":
        return "四";
      case "5":
        return "五";
      case "6":
        return "六";
      case "7":
        return "日";
    }
  },
  zhuanjc(e) {
    switch (e) {
      case "0102":
        return "1-2节";
      case "0304":
        return "3-4节";
      case "0506":
        return "5-6节";
      case "0708":
        return "7-8节";
      case "0910":
        return "9-10节";
      case "1112":
        return "11-12节";
    }
  }


})