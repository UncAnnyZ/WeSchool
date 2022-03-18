// pages/more/pages/note_module/sendNote/sendNote.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Input_anhao: '',
        radioChecked: true,
        Input_liuyan: '',
    },

    bindinput_anhao(e) {
        console.log(e.detail);
        this.setData({
            Input_anhao: e.detail.value
        })
    },
    changeRadio(e) {
        this.setData({
            radioChecked: !this.data.radioChecked
        })
    },
    formSubmit(e) {
        let { signal, content, niming } = e.detail.value;
        if (niming == '') {
            niming = false
        } else {
            niming = true
        }

        const args = wx.getStorageSync('args');
        if (!signal.replace(/\s/g, '')) {
            wx.showToast({
                title: '要留下暗号噢',
                icon: 'none'
            })
        } else if (!content.replace(/\s/g, '')) {
            wx.showToast({
                title: '文字不能为空',
                icon: 'none'
            })
        } else if (signal.replace(/\s/g, '').length > 10) {
            wx.showToast({
                title: '暗号太长啦',
                icon: 'none'
            })
        } else if (content.replace(/\s/g, '').length >= 200) {
            wx.showToast({
                title: '留言太长啦',
                icon: 'none'
            })
        }
        else {
            wx.showLoading({
                title: '执笔写流年中',
            })
            wx.cloud.callFunction({
                name: "NewCampusCircle",
                data: {
                    url: "Note_module",
                    type: "write",
                    signal,
                    content,
                    niming,
                    username: args.username,
                    School: args.school,
                    iconUrl: args.iconUrl,
                    nickName: args.nickName,
                    Time: new Date().getTime()
                },
                success(res) {
                    wx.hideLoading();
                    wx.navigateBack({
                        delta: 1,
                    })
                    // 获取小程序页面栈
                    let pages = getCurrentPages();
                    // 进入上个页面的onload函数
                    pages[pages.length - 2].onLoad();
                    wx.showToast({
                        title: '留言成功',
                        mask: true,
                        icon: 'none'
                    })
                }
            })
        }
    },
    init() {
        this.setData({
            Input_anhao: '',
            Input_liuyan: '',
            radioChecked: true
        })
    },
    onLoad: function (options) {
        this.init()
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