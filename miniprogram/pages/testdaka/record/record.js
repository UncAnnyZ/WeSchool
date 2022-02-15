// pages/testdaka/record/record.js
const _=wx.cloud.database().command
const db = wx.cloud.database()
//数据还没做接口
//热度榜标签有bug，待修复
//sumit按钮还没绑定函数 form标签上我没写sumit的函数
//选择标签用picker组件弹窗选择，只能选一个
Page({

    /**
     * 页面的初始数据
     */
    data: {
        starttime:'输入开始时间',//这个用户输入的开始时间，下面那个是结束时间
        endtime:'输入结束时间',
        cycleitems:[
            { name: '每天', value: 'Everyday' },
            { name: '周一', value: 'Monday' },
            { name: '周二', value: 'Tuesday' },
            { name: '周三', value: 'Wednesday' },
            { name: '周四', value: 'Thursday' },
            { name: '周五', value: 'Friday' },
            { name: '周六', value: 'Saturday' },
            { name: '周日', value: 'Sunday' },
        ],
        items:[
            {'value': 'SAT'},
            {'value': 'SSAT'},
            {'value': 'TOEFL'},
            {'value': '雅思'},
          ],
      
    },
    userCheck:function(e){//热榜标签复选框
        let index = e.currentTarget.dataset.id;//获取用户当前选中的索引值
        let checkBox = this.data.items;
        if (checkBox[index].checked){
          this.data.items[index].checked = false;
        }else{
          this.data.items[index].checked = true;
        }
        this.setData({ items: this.data.items})
     
        //返回用户选中的值
        let value = checkBox.filter((item,index)=>{
          return item.checked == true;
        })
        console.log(value)
    },
    bindstattimeChange: function (e) {//用户输入开始时间传参
        console.log('用户输入开始时间，携带值为', e.detail.value)
        this.setData({
          starttime: e.detail.value
        })
      },
    bindendtimeChange: function (e) {//用户结束开始时间传参
        console.log('用户输入结束时间，携带值为', e.detail.value)
        this.setData({
          endtime: e.detail.value
        })
    },
    existDaka(res){
        // 获取学号
        let username = wx.getStorageSync('args').username 

        var data = res.detail.value
        // console.log(data);
        var task = data.task
        // 避免设置相同的任务
        db.collection('daka_record').where({
            task:task,
            username:username
        }).get()
        .then(res=>{
            if(res.data.length != 0){
                console.log(res);
                //问题1：回调提示信息
                //语法问题2：自动调用重置按钮
                //问题：异步问题
                console.log('该任务已经存在，请重新设置');
            }else{
                this.saveRecord(username, data)
            }
        })
    },

    saveRecord(username, data){
        //1.存入打卡任务记录表
        db.collection('daka_record').add({
            data: {
                task:data.task,
                // 标签可以为空 
                lable1:data.table1,
                lable2:data.table2,
                lable3:data.lable3,
                cycle: data.cycle,
                startTime: data.startTime,
                endTime: data.endTime,
                username:username
            }
        }).then(res=>{
            console.log(res);
        })

        //2.存入打卡状态表
        db.collection('daka_status').add({
            data: {
                task:data.task,
                //设置任务后初始化为false未打卡
                isDaka:false,
                username:username,
                count:0
            }
        }).then(res=>{
            console.log(res);
        })
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