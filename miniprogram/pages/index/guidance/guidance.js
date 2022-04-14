// pages/index/guidance/guidance.js
const db=wx.cloud.database();
const _ = db.command;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: getApp().globalData.statusBarHeight,
        lineHeight: getApp().globalData.lineHeight,
        show:true,
        text:[
            {title:'【征友】大二了，期待甜甜的校园恋爱！[亲亲]本人女，大二，计算机科学与技术',imageurl:'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWb532vMFM40Z1GLB1qy0PJerOEUFI*g*oZuZ35D1lhyDT.clH6YZMOs3.8EPCzGmVA!/r',people:'15839 人围观',color:"#ee838d"},
            {title:'#怎么追十二星座[滑稽]888888888888888888888888888888',imageurl:'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWYzgI97WA4qJSXOKv*.4QFn3Eg2qYyEPp*FEqQ324LfbLGZlnl2rr4FS5hFO8u0ZTs!/r',people:'14165 人围观',color:"#f7a576"},
            {title:'#转专业',imageurl:'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWYzgI97WA4qJSXOKv*.4QFn3Eg2qYyEPp*FEqQ324LfbLGZlnl2rr4FS5hFO8u0ZTs!/r',people:'10165 人围观',color:"#f3bb66"},
            {title:'#表白墙',imageurl:'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWYzgI97WA4qJSXOKv*.4QFn3Eg2qYyEPp*FEqQ324LfbLGZlnl2rr4FS5hFO8u0ZTs!/r',people:'9165 人围观',color:"#bbbdba"},
        ]
    },
    goweschool:function(){
        this.setData({
            show:false
        })
    },    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        let _id="82afc00a6252a95904193c3a23083c2e"
        db.collection('guidepage').where({_id: _id}).get().then(res=>{
            console.log(res);
            this.setData({
                text:res.data[0].top_post
            })
        })
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