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
  async onLoad(options) {
    var args = wx.getStorageSync('args')
    args.otherPageCode[options.content] = null
    if(!args.otherPageCode[options.content]){
      wx.showLoading({
        title: '加载动态页面中',
      })
      await wx.cloud.callFunction({
        name: 'api',
        data: {
          url: 'dynamicJs',
          content: options.content,
          school: args.schoolName
        },
        success: res => {
          wx.hideLoading({
            success: (res) => {},
          })
          args.otherPageCode = {
            ...args.otherPageCode,
            ...res.result.otherPageCode
          }
          wx.setStorageSync('args', args)

          this.onLoadJs(args, options)
        }})
    }else{
      this.onLoadJs(args, options)
    }



  },

  onLoadJs(args, options){
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
  }
})