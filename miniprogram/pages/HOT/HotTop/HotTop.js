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
        console.log(options.content)
        console.log( args.otherPageCode)
        // console.log(str);\
        
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