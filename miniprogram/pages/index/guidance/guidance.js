const db = wx.cloud.database();
// pages/index/guidance/guidance.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        schoolArr:[
            // {school_name:"广东石油化工学院", school_status:true, school_ImgUrl:'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcVSbqQOOiiPu97WXvRV9QiIZBX1umL4FZZY5hDkMBOsWWiaOGBzThG76xs176TsOiBBWM50wNm7v1AfDmY5EuRg!/r'},
        ],
        show:true,
        text:[
            {title:'【征友】大二了，期待甜甜的校园恋爱！[亲亲]本人女，大二，计算机科学与技术',imageurl:'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWb532vMFM40Z1GLB1qy0PJerOEUFI*g*oZuZ35D1lhyDT.clH6YZMOs3.8EPCzGmVA!/r',people:'15839 人围观'},
            {title:'#怎么追十二星座[滑稽]',imageurl:'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWYzgI97WA4qJSXOKv*.4QFn3Eg2qYyEPp*FEqQ324LfbLGZlnl2rr4FS5hFO8u0ZTs!/r',people:'14165 人围观'}
        ]
    },
    goweschool:function(){
        this.setData({
            show:false
        })
    },

    async getSchoolInfo(){
        let res = await wx.cloud.callFunction({
            name:"guidePage",
            data: {
                type:"getSchoolInfo",
                openStatus:true,
            }
        })
        let data = res.result.data;
        console.log(data);

        let schoolInfo = [];
        for(let i = 0; i < data.length; i++){
            let obj = {
                school_name:data[i].schoolName,
                school_status:data[i].openStatus,
                school_ImgUrl:data[i].school_ImgUrl,
            }
            schoolInfo.push(obj);
        }

        this.setData({schoolArr:schoolInfo});
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSchoolInfo();
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