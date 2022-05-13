// pages/testdaka/timer/timer.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Group_Name: '发际线与我作队',
        time: '00:00:00',
        state: 'ready',
        hour: 0,
        minutes: 0,
        seconds: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    // 开始计时
    begin() {
        this.timer = setInterval(this.startTimer, 1000);
        this.setData({
            state: 'started'
        })
    },
    startTimer() {
        var _seconds = this.data.seconds
        var _minute = this.data.minutes
        var _hour = this.data.hour

        _seconds += 1;
        if (_seconds >= 60) {
            _seconds = 0;
            _minute = _minute + 1;
        }

        if (_minute >= 60) {
            _minute = 0;
            _hour = _hour + 1;
        }
        var ti = (_hour < 10 ? '0' + _hour : _hour) + ':' + (_minute < 10 ? '0' + _minute : _minute) + ':' + (_seconds < 10 ? '0' + _seconds : _seconds);

        this.setData({
            time: ti,
            seconds:_seconds,
            minutes:_minute,
            hour:_hour,
        })
    },

    // 暂停倒计时
    pause() {
        if (this.timer) {
            clearInterval(this.timer);
            // this.timer = null
        }

        this.setData({
            state: 'ready'
        })
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