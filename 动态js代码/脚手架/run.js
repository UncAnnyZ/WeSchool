const fs = require('fs')

fs.readFile('dist/index.js', (err, buffer) => {
  let str1= buffer.toString()
  let str = `
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
      var args = {
        xxx: 'xxx',
        code: \`${str1}\`
      }
      if (args) {
        try {
          var onload1 = app.jsRun(args, args.code)
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
`
  // str = str.replaceAll('class1', 'class')
  fs.writeFile('../../miniprogram/pages/HOT/HotTest/HotTest.js', str, {
    encoding: 'utf8'
  }, err => {})
  fs.writeFile('../../miniprogram/pages/HOT/HotTest/HotTest.wxss', `/* pages/HotNoTop/HotNoTop.wxss */
  @import "../colorui/main.wxss";
  @import "../colorui/icon.wxss";`, {
    encoding: 'utf8'
  }, err => {})
  fs.writeFile('../../miniprogram/pages/HOT/HotTest/HotTest.wxml', `<import src="../../../template/template"></import>

  <template is="hotUpdate" data="{{html}}"></template>
  `, {
    encoding: 'utf8'
  }, err => {})
})