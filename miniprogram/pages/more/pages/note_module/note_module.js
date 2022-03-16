const args = wx.getStorageSync('args');
let util = require("../../../../utils/util")
Page({

    data: {
        // 需要渲染的小纸条数组
        noteList: [],
        currentPage: 0,
        loadAll: false,
        showLoading: 0,
    },
    TimeOut: 1,
    init() {
        this.setData({
            currentPage: 0,
            loadAll: false
        })
    },
    getData() {
        let that = this;
        let currentPage = this.data.currentPage;
        wx.cloud.callFunction({
            name: "NewCampusCircle",
            data: {
                url: "Note_module",
                type: "read",
                currentPage,
                School: args.schoolName == "游客登录" ? "广东石油化工学院" : args.schoolName,
            },
            success(res) {
                // 数据存在时
                if (res.result && res.result.data.length > 0) {
                    // 页数++
                    that.setData({ currentPage: ++currentPage });
                    let noteList = that.data.noteList;
                    // 处理时间
                    res.result.data.forEach(item => {
                        item._createTime = util.timeago(item._createTime)
                    })
                    // 添加新数据到 noteList 里 
                    noteList = noteList.concat(res.result.data);
                    that.setData({
                        noteList
                    });
                    // 若数据少于一页
                    if (res.result.data.length < 30) {
                        that.setData({
                            loadAll: true
                        });
                    }
                } else {
                    // 不存在数据时
                    that.setData({
                        loadAll: true
                    });
                }
            }
        })
    },
    onLoad: function (options) {
        this.init()
        this.onPullDownRefresh();
    },

    // 下拉刷新函数
    onPullDownRefresh: function () {
        // 在标题栏中显示加载
        wx.showNavigationBarLoading();
        // 初始化定时器
        clearTimeout(this.TimeOut);
        // 开启动画
        this.setData({
            showLoading: 0,
        })
        // 定时器防抖
        this.TimeOut = setTimeout(() => {
            console.log("下拉刷新")
            // 初始化页面，并再次请求数据库
            this.init()
            this.getData();
            // 在标题栏中停止加载
            wx.hideNavigationBarLoading()
            // 停止动画
            this.setData({
                showLoading: 1
            })
            // 停止下拉刷新
            wx.stopPullDownRefresh()
        }, 1000)
    },
    // 上拉触底函数
    onReachBottom: function () {
        wx.showLoading({
            title: '加载更多中',
            mask: true
        })
        // 请求数据库
        this.getData();
        wx.hideLoading();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})