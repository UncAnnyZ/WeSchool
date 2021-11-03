// index.js
// 获取应用实例

const db = wx.cloud.database()
const schoolLoading = db.collection('schoolLoading')
const app = getApp()

var util = require("../../utils/util.js")
Page({
  data: {
    time: {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
    },
  },
  async onLoad() {
    var that = this;
    var schoolName = wx.getStorageSync("schoolName")
    await schoolLoading.where({
      schoolName: schoolName ? schoolName : '空'
    }).get().then(res => {
      var schoolInitData = res.data[0]
      function runCode(that,args) {
        console.log(args)
        wx.setStorageSync('configData', Object.assign({
          "timeYear": args.StartTime,
          "msg": "暂未登录哟"
        }, args.SchoolIndex))
        that.onShow = function () {
          that.setData(wx.getStorageSync('configData'))
        }
        that.onShow()
      }
      module.exports = runCode;
      runCode(that, schoolInitData);

   
      // var onLoad = app.jsRun(schoolInitData, schoolInitData.jsCode)
      // onLoad(that)
      //加载
    })

  },
})