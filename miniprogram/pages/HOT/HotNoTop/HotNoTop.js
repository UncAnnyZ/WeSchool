// pages/dynamic/dynamic.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    html : [{type: 'view', text: '模版错误啦'}],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var args = wx.getStorageSync('args')
    if (args) {
      try {
        console.log(233)
        console.log(args.otherPageCode[options.content]);
        // console.log(app.jsRun(args,args.otherPageCode[options.content]))
        var onload1 = app.jsRun(args,args.otherPageCode[options.content].replace(/\\\\/g,"\\"))
   
        const onloadDict = onload1()

        for(let i in onloadDict){
          this[i] = onloadDict[i]
        }
        this.onLoad(this.options)
      } catch (e) {
        console.log(e)
      }
    }

  },

})