// pages/Barrage/Barrage.js
var page = undefined;
Page({
    onLoad: function () {
        page = this;
    },
    /**
     * 页面的初始数据
     */

    data: {
        // 需要渲染的弹幕数组
        click:false,
        zan: [true,false],
        cnt: ["50", "100", "150", "230", "260", "300", "360", "430", "460"],
        Data: ["sssd", "dsadfag", "弹幕需要设立审核机制", "sssd", "需要渲染的弹幕数组", "fasgasd", "fasgasd", "sssd", "dsadfag", "fasgasd", 
        "sssd", "页面的初始数据", "fasgasd", "sssd", "dsadfag", "fasgasd",
            "sssd", "页面的初始数据", "fasgasd", "sssd", "dsadfag", "fasgasd", "sssd", "dsadfag", "fasgasd", "页面的初始数据", "dsadfag", 
            "fasgasd", "sssd", "dsadfag", "fasgasd", "sssd", "dsadfag", "fasgasd",
            "sssd", "dsadfag", "fasgasd", "弹幕需要设立审核机制", "dsadfag", "fasgasd", "sssd", "dsadfag", "需要渲染的弹幕数组", "sssd", 
            "dsadfag", "需要渲染的弹幕数组", "sssd", "dsadfag", "fasgasd", "sssd", "dsadfag", "fasgasd",
            "sssd", "dsadfag", "页面的初始数据", "sssd", "dsadfag", "弹幕需要设立审核机制",
            "需要渲染的弹幕数组", "需要渲染的弹幕数组", "fasgasd", "sssd", "dsadfag", "fasgasd",
        ],
        danmuList: [],
        statusBarHeight: getApp().globalData.statusBarHeight,
        lineHeight: getApp().globalData.lineHeight,
        rectHeight: getApp().globalData.rectHeight,
        windowHeight: getApp().globalData.windowHeight,
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.begin();
    },

    want(e){
        this.setData({
            click:true
        })
    },

    apply(e){
        this.setData({
            click:false
        })
    },

    cancel(e){
        this.setData({
            click:false
        })
    },

    // 开始计时
    begin() {
        this.start();
        this.timer = setInterval(this.start, 1600);
        this.setData({
            state: 'started'
        })
    },

    // end() {
    //     this.timer = setInterval(this.Remove, 1000);
    //     this.setData({
    //         state: 'started'
    //     })
    // },

    getRandomZan() {
        
        let randomZan = this.data.zan[Math.ceil(Math.random() * 2 + -1)];

        return randomZan;
    },

    start() {
        var that = this
        var f = that.data.Data.length
        
        var i = Math.ceil(Math.random() * 60 + 2 ).toFixed(0)
        danmulist.push(new Room(that.data.Data[i], this.data.cnt[Math.ceil(Math.random() * 2 + -1).toFixed(0)], Math.ceil(Math.random() * 2 + 4),that.getRandomZan()))
         i = Math.ceil(Math.random() * 60 + 2 ).toFixed(0)
        danmulist.push(new Room(that.data.Data[i], this.data.cnt[Math.ceil(Math.random() * 2 + 1).toFixed(0)], Math.ceil(Math.random() * 3 + 4),that.getRandomZan()))
         i = Math.ceil(Math.random() * 60 + 2 ).toFixed(0)
        danmulist.push(new Room(that.data.Data[i], this.data.cnt[Math.ceil(Math.random() * 2 + 3).toFixed(0)], Math.ceil(Math.random() * 3 + 4),that.getRandomZan()))
         i = Math.ceil(Math.random() * 60 + 2 ).toFixed(0)
        danmulist.push(new Room(that.data.Data[i], this.data.cnt[Math.ceil(Math.random() * 2 + 5).toFixed(0)], Math.ceil(Math.random() * 3 + 4),that.getRandomZan()))
         i = Math.ceil(Math.random() * 60 + 2 ).toFixed(0)
        danmulist.push(new Room(that.data.Data[i], this.data.cnt[Math.ceil(Math.random() * 2 + 7).toFixed(0)], Math.ceil(Math.random() * 3 + 4),that.getRandomZan()))

        if(danmulist.length >= 500)
        {
            danmulist = []
        }

        this.setData({
            danmuList: danmulist
        })
    },
})
var danmulist = [];
var id = 0;
class Room {
    constructor(text, top, time,zan) {
        this.text = text;
        this.top = top;
        this.time = time;
        this.zan = zan;
    }
}