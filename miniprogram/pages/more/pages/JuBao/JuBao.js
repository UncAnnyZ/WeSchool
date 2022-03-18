// pages/more/pages/JuBao/JuBao.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        from_page: '',
        content_id:'',
        Input_reason:'',
    },

    formSubmit(e) {
        const { content } = e.detail.value;
        const args = wx.getStorageSync('args');
        let that = this;
        if (!content.replace(/\s/g, '')) {
            wx.showToast({
                title: '举报原因不能为空',
                icon: 'none'
            })
        }
        else {
            wx.showLoading({
                title: '正在提交',
            })
            wx.cloud.callFunction({
                name: "NewCampusCircle",
                data: {
                    url: "JuBao",
                    type: "write",
                    content,
                    username: args.username,
                    School: args.school,
                    Time: new Date().getTime(),
                    content_id: that.data.content_id,
                    from_page: that.data.from_page
                },
                success(res) {
                    wx.hideLoading();
                    wx.navigateBack({
                        delta: 1,
                    })
                    wx.showToast({
                        title: '举报成功',
                        mask: true,
                        icon: 'none'
                    })
                }
            })
        }
    },
    init(){
        this.setData({
            Input_reason:''
        })
    },
    onLoad: function (options) {
        console.log(options);
        this.init();
        this.setData({
            content_id: options._id,
            from_page: options.from_page
        })
    },

    onShow: function () {

    },

    onShareAppMessage: function () {

    }
})