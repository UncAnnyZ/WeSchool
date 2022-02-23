// pages/testdaka/index/index.js
const db = wx.cloud.database();
const _ = db.command;
let movedistance = 0;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        showModel3:false,
        dakacount:'19',
        showModel2:false,
        currentIndex: 0, // 列表操作项的index
        taskdata:[
            // {
            //     task_name:'看电视',
            //     task_cycle:['周一','周二','周三','周四','周五'],
            //     task_start_time:'6:00',
            //     task_end_time:'8:00'
            //     task_isDaka:false
            // },
        ],
    },

    complete_share_close(){
        this.setData({showModel2:false});
    },

    attention(){
        let showModal3=this.data.showModel3
        if(!showModal3){
            this.setData({
                showModel3:true,
                })
        }else{
            this.setData({
                showModel3:false,
                })
        }
        
    },
       // 手指触摸动作开始
    touchstartX(e) {
        this.setData({
            currentIndex: e.currentTarget.dataset.index
          });
          console.log( e.currentTarget.dataset.index)
        //   console.log( e.touches[0].clientX)
        //   console.log(e)
          // 获取触摸X坐标
          this.recordX = e.touches[0].clientX;
    },
        // 点击操作
    resetX() {
        this.slideAnimation(0, 500);//（点击后距左边距离，到达点击后距左边距离的速度越小越快）
    },
    // 手指触摸后移动
    touchmoveX(e) {
        let currentX = e.touches[0].clientX;
        movedistance =  currentX-this.recordX; // 获取移动距离
        this.slideAnimation(movedistance, 500);//右边的数字是移动速度
    },
    // 手指触摸动作结束
    touchendX() {
        let recordX;
        if (movedistance <=-100) { // 移动达到距离就动画显示全部操作项
          recordX = -130;           //滑动后右边显示的范围
        } else if (movedistance >= 100) { 
          recordX = 130;            //滑动后左边显示的范围
        }else if (-100<movedistance<100){// 移动未达到距离即还原
          recordX=0
        }
        this.slideAnimation(recordX, 500);
    },
    // 滑动动画
    slideAnimation(recordX, time) {
        let animation = wx.createAnimation({
          duration: time,
          timingFunction: 'ease'
        });
        animation.translate(recordX + 'rpx', 0).step()
        this.setData({
          animation: animation.export()
        })
    },
    add_task(){
        wx.navigateTo({
          url: '../record/record',
        })
    },

    // 获取当天时间，看是否可以打卡
    // 注意：当滑动时执行：故不用进行判断是否重复打卡
    async allowDaka(res){
        console.log(res);
        //子腾兄秒法：获取index来获取到页面的数据
        var id = Number(res.currentTarget.id);
        console.log(id);
        var taskdata = this.data.taskdata;
        var data = taskdata[id];
        console.log(data);
        // console.log(taskdata[id]);

        var nowDate = new Date();
        var day = nowDate.getDay();
        console.log("今天星期"+day);
        //1.获取res的里面的关于打卡学号、周期、任务的信息
        let hashid = data.task_hashId;
        var cycle = data.task_cycle;
        
        //2.看今日day是否在cycle里面
        //由于页面渲染的数据来源于username，故不用判断
        // db.collection('daka_record').where()
        if(cycle.length == 1 && cycle[0] == '每天'){
            this.daka(hashid);
            console.log("真打卡好了");
            let tasktemp = this.data.taskdata
            tasktemp[id].task_isDaka=true
            this.setData({
                taskdata:tasktemp
            })
            return;
        }

        //细节：先判断周期能不能打再进行是否二次打卡判断
        for(var i = 0; i < cycle.length; i++){
            if(cycle[i] == '周一'){
                if(day == 1){
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    return;
                }
            }else if(cycle[i] == '周二'){
                if(day == 2){
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
            tasktemp[id].task_isDaka=true
            this.setData({
                taskdata:tasktemp
            })
                    return;
                }
            }else if(cycle[i] == '周三'){
                if(day == 3){
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
            tasktemp[id].task_isDaka=true
            this.setData({
                taskdata:tasktemp
            })
                    return;
                }
            }else if(cycle[i] == '周四'){
                if(day == 4){
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
            tasktemp[id].task_isDaka=true
            this.setData({
                taskdata:tasktemp
            })
                    return;
                }
            }else if(cycle[i] == '周五'){
                if(day == 5){
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                    taskdata:tasktemp
                    })
                    return;
                }
            }else if(cycle[i] == '周六'){
                if(day == 6){
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
            tasktemp[id].task_isDaka=true
            this.setData({
                taskdata:tasktemp
            })
                    return;
                }
            }else if(cycle[i] == '周日'){
                if(day == 0){
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
            tasktemp[id].task_isDaka=true
            this.setData({
                taskdata:tasktemp
            })
                    return;
                }
            }
        }
        
        await wx.showToast({
            title: '根据任务开放时间，今日不能打卡~',
            icon: 'none',
            duration: 2000
        })
        
        // console.log("根据任务周期，今日不可以打卡！");
    },


    async daka(hashid){
        let result = await db.collection("daka_status").where({
            hashId:hashid
        }).get()

        //细节坑：预防第一次打卡没有daka_lastTime的情况
        var daka_lastTime = result.data[0].daka_lastTime;
        if(daka_lastTime != null){
            console.log(daka_lastTime);
            //获取最后一次打卡的日期
            var lastTime_year = daka_lastTime.getFullYear();
            var lastTIme_month = daka_lastTime.getMonth()+1;
            var lastTime_day = daka_lastTime.getDate();
            // console.log("最后一次打卡时间是几号："+lastTime_day);
            //获取当天日期
            var nowDate = new Date();
            var nowYear = nowDate.getFullYear();
            var nowMonth = nowDate.getMonth()+1;
            var nowDay = nowDate.getDate();
            // console.log("今天是" + nowDay + "号");

            if(lastTime_year == nowYear && lastTIme_month == nowMonth && lastTime_day == nowDay){
                 wx.showToast({
                    title: '您今儿个打过卡了',
                    icon: 'none',
                    duration: 2000
                })
                // console.log("爷！您可不能一天打两次卡啊");
                return;
            }
        }
        
        await db.collection("daka_status").where({
            hashId:hashid
        }).update({
            data:{
                isDaka:true,
                //次数自增1
                count:_.inc(1),
                daka_lastTime:new Date(),
            }
        })

        //要是能成功打卡就打开弹窗可以选择分享
        this.setData({showModel2:true});
        // console.log('今日真打卡成功了！');
    },

    //打卡提示
    daka_prompt(res){
        let that = this;
        console.log(res);
        wx.showModal({
            title: '提示',
            content: '是否确定打卡？',
            success(abc) {
              if (abc.confirm) {
                that.allowDaka(res);
                that.slideAnimation(0, 500);
              } else if (abc.cancel) {
                console.log('用户点击取消')
              }
            }
        });
    },

    //打卡删除提示
    daka_delpromp(res){
        console.log(res);
        console.log(res.currentTarget.id);
        let that = this;
        wx.showModal({
            title: '提示',
            content: '是否删除该打卡任务？',
            success(abc) {
              if (abc.confirm) {
                that.delDaka(res);
                that.data.taskdata.splice(res.currentTarget.id, 1)
                console.log(that.data.taskdata);
                that.setData({
                    taskdata:that.data.taskdata
                })
                that.slideAnimation(0, 500);
              } else if (abc.cancel) {
                console.log('用户点击取消')
              }
            }
        });
    },

    //滑动删除
    delDaka(res){
        // let that=this;
        //子腾兄秒法：获取index来获取到页面的数据
        var id = Number(res.currentTarget.id);
        var taskdata = this.data.taskdata;
        var data = taskdata[id];
        var hashid = data.task_hashId;
        // console.log(data);
        
        //根据信息删除打卡记录表
        //不能删除打卡状态表，因为统计用
        //根据hashId来进行删除
        db.collection("daka_record").where({
            hashId:hashid
        }).remove().then(res=>{
            console.log(res);
            // that.onLoad();
        })

        console.log('删除：',id)
        //问题：刷新页面
    },

    //子腾兄总结：这个就是async await的一个比较好的应用 在写的函数前面写async进行异步声明 在异步函数前面写await进行同步声明，代码整洁度比较高，但是这样性能可能差点。
     //获取数据交与页面渲染
     async getDaka_record(){
        let username = wx.getStorageSync('args').username;
        //用username查找uuid
        var dakaArr = [];
        //根据username获取到该用户的所有打卡记录
        const res = await db.collection("daka_record").where({username:username}).get()
        let data = res.data
        for(var i = 0; i < res.data.length; i++){
            var hashid = data[i].hashId
            var obj = {
                task_name:data[i].task,
                task_cycle:data[i].cycle,
                task_start_time:data[i].startTime,
                task_end_time:data[i].endTime,
                task_hashId:hashid,
            }
            //粤神秒法：根据hashId来查找
            const result = await db.collection("daka_status").where({
                hashId:hashid
            }).get()
            obj.task_isDaka = result.data[0].isDaka;
            console.log(obj.task_isDaka);
            dakaArr.push(obj);
        }
        console.log(dakaArr);
        this.setData({
            taskdata:dakaArr
        })
        console.log(this.data.taskdata);
    },

    //渲染页面前判断各数据的打卡状态
     async jdugeDaka_status(){
        let username = wx.getStorageSync('args').username;
        //一次请求

        let result1 = await db.collection("daka_status").where({
            username:username
        }).get()
        let data = result1.data;
        // console.log(data);\
        console.log(data.length);
        //
        for(var i = 0; i < data.length; i++){
            var hashid = data[i].hashId;
            //for循环里面写请求单线程 异步 
         
            let result2 = await db.collection("daka_status").where({
                hashId:hashid
            }).get()
            console.log(result2.data[0].daka_lastTime);
            //防止刚建立好的任务没有进行第一次打卡，就会导致没有daka_lastTime字段
            if(result2.data[0].daka_lastTime != null){
                var daka_lastTime = result2.data[0].daka_lastTime;
                // console.log(daka_lastTime);

                //获取最后一次打卡的日期
                var lastTime_year = daka_lastTime.getFullYear();
                var lastTIme_month = daka_lastTime.getMonth()+1;
                var lastTime_day = daka_lastTime.getDate();
                // console.log("最后一次打卡时间是几号："+lastTime_day);
                //获取当天日期
                var nowDate = new Date();
                var nowYear = nowDate.getFullYear();
                var nowMonth = nowDate.getMonth()+1;
                var nowDay = nowDate.getDate();
                // console.log("今天是" + nowDay + "号");

                if(lastTime_year == nowYear && lastTIme_month == nowMonth && lastTime_day == nowDay){
                    db.collection("daka_status").where({
                        hashId:hashid
                    }).update({
                        data:{
                            isDaka:true
                        }
                    })
                    // console.log("今天已经打卡了~");
                }else{
                    db.collection("daka_status").where({
                        hashId:hashid
                    }).update({
                        data:{
                            isDaka:false
                        }
                    })
                    console.log("今天还没打卡咧~");
                }
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        wx.showLoading({
          title: '加载中',
          mask:true
        })
        await this.jdugeDaka_status();
        wx.setNavigationBarTitle({
            title: 'We打卡',
        });
        wx.hideLoading()
        movedistance = 0; // 解决切换到其它页面再返回该页面动画失效的问题
    },

    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
   async onShow() {
        await this.getDaka_record();
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