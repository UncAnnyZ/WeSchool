const db = wx.cloud.database();
const _ = db.command;
let movedistance = 0;
var app = getApp();
var util = require('../../../utils/util')
Page({
    data: {
        //打卡data
        statusBarHeight: getApp().globalData.statusBarHeight,
        lineHeight: getApp().globalData.lineHeight,
        navState:0,
        click_a:true,
        today:"",
        dateString: "",
        spot: "",
        week:"",
        isPopping: false,//是否已经弹出
        animPlus: {},//旋转动画
        animCollect: {},//item位移,透明度
        animTranspond: {},//item位移,透明度
        animInput: {},//item位移,透明度       
        sysW: wx.getSystemInfoSync().windowWidth,
        xAxial: 0,
        x: 0,
        w: (wx.getSystemInfoSync().windowWidth * 0.8) - 30,//滑块可移动的X轴范围
        cssAnimation: 'translate3d(0, 0, 0)',
        succeedMsg: '',
        pullStatus: true,//是否允许验证成功后继续滑动
        task_name:'测试测试测试',
        showModel3:false,
        dakacount:'19',
        dakatime:'12:00',
        showModel2:false,
        currentid:0,
        currentIndex: 0, // 列表操作项的index
        taskdata:[
            {
                task_name:'示例：看电视',
                task_cycle:['周一','周二','周三','周四','周五'],
                task_start_time:'6:00',
                task_end_time:'8:00',
                task_isDaka:false,
                count:0
            },
        ],
        daytext:[
        {Eng_daytext:"Above all,try something.",Ch_daytext:"最重要的是尝试新的可能。"},
        {Eng_daytext:"If you want it,work for it.",Ch_daytext:"想要的东西就去争取。"},
        {Eng_daytext:"A good laugh recharges your battery.",Ch_daytext:"笑是最好的充电方式。"},{Eng_daytext:"Putting yourself first is not selfish.",Ch_daytext:"把自己放第一位不是自私。"},{Eng_daytext:"Work on yourself for yourself.",Ch_daytext:"为了自己变得更好。"},
        {Eng_daytext:"One day,has not been able again to come.",Ch_daytext:"一天过完，不会再来"},
        {Eng_daytext:"Ldleness is the factory of poverty.",Ch_daytext:"怠惰是贫穷的制造厂"},
        {Eng_daytext:"Hang in there!Come on!",Ch_daytext:"坚持下来！加油！"},
        {Eng_daytext:"Don't worry about things you can't control.",Ch_daytext:"不要担心你控制不了的东西。"}
      ],
      
      arr :["http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWb532vMFM40Z1GLB1qy0PJerOEUFI*g*oZuZ35D1lhyDT.clH6YZMOs3.8EPCzGmVA!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWYzgI97WA4qJSXOKv*.4QFn3Eg2qYyEPp*FEqQ324LfbLGZlnl2rr4FS5hFO8u0ZTs!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL02oENRjq4FgVYfJRGAQkUFIHqSHOgKJN7PwN8eneBAJ3Xuao69KnlIiWFTLek*xbA!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL0U9WK413d9yuItDSS6iVc8eijth7NxjoSIIegtYx1e5ge50x9TYGSoI1tspf4Eo4Y!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL3iIKgpjMwyrYqipU5hEly9ayItSyv33FzZ4ib5F9ve2AlY40CT8VGvo4aYHsf4PaI!/r","http://m.qpic.cn/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL1gQqPp*29X8poNeV1JgSwuGeLqduMlr1RfAksUAUYIEPN37EwlqtdvxQ8SPnTaRYw!/b&bo=OAQFBTgEBQUBKQ4!&rf=viewer_4","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8Mn1xgktufw23sOXfGiwfYDceE0Sm9dtSOJoxNd6a7mGPCV7NonZqctFYy6dWw2wn8!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8OEqMkdr*5dA3.jQ3lK3l3d1xwMgnjGXM*Y9JKOWn5MTRAO1dRfUGwgWxQMZXcIruI!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8OSyjf8imUzh5VQeto*9CH6YmXSw9chNfjsZZaZbpwP1*tcOKZUfgBNpQu6qOdbkn8!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8MmLdH4z*DD*NoKPNIx.71uvCzHA4Lbvag7wPzA.B9B1LLHvxmZlw5RV9ozcVBUx1w!/r"],
      // 计时的data
      statusBarHeight: getApp().globalData.statusBarHeight,
      lineHeight: getApp().globalData.lineHeight,
      logsa:{},//放云端的logs
      clockshow: false,
      clockHeight: 0,
      time: '5',
      mTime: 300000,
      timeStr: '05:00',
      timer: null,
      rate: '',
      taskshow:'番茄时钟',
      task:[{name:'工作'},{name:'学习'},{name:'休息'},{name:'睡觉'},{name:'写bug'},{name:'修bug'}],
      cateActive: '0',
      okShow: false,
      pauseShow: false,
      continueCancelShow: false,
      userInfo: {},
      hasUserInfo: false,
      isRuning:false,
      pickershow:false,
      // 自习室的data
      studynavState:5,
      room:[
        {roomlable:'学习',roomlist:[
          {roomname:'六级',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334166.jpg?sign=2c62d981969547d39dd8963604d4d644&t=1649941917'},
          {roomname:'四级',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334163.jpg?sign=adec39668f0b66b92ecc449344dcba12&t=1649941978'},
          {roomname:'读书',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},
        ]},
        {roomlable:'运动',roomlist:[{roomname:'跑步',roomintroduce:'每天两公里',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},{roomname:'俯卧撑',roomintroduce:'每天50个',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334166.jpg?sign=2c62d981969547d39dd8963604d4d644&t=1649941917'},]
        },
        {roomlable:'娱乐',roomlist:[{roomname:'六级',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334168.jpg?sign=e827576c04b49178377da50924629615&t=1649942001'},{roomname:'读书',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},]
        },
        {roomlable:'日常',roomlist:[{roomname:'六级',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},{roomname:'读书',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},]
        },
        {roomlable:'游戏',roomlist:[{roomname:'六级',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},{roomname:'读书',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},]
        },
        {roomlable:'其他',roomlist:[{roomname:'六级',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},{roomname:'读书',roomintroduce:'每天50个单词',roomper:'99',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},]
        }
      ],
      cardlist:[
        {cardname:'卡片一'},{cardname:'卡片二'},{cardname:'卡片三'}
      ],
      myroomlist:[
        {roomname:'四级必过',roomintroduce:'每天打卡一小时单词',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},
        {roomname:'六级必过',roomintroduce:'每天打卡两篇阅读和50个单词',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334167.jpg?sign=78a5c6809e599ef778b87539c67a6ec6&t=1649941340'},
        {roomname:'考研必上岸',roomintroduce:'必上岸，冲冲',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334167.jpg?sign=78a5c6809e599ef778b87539c67a6ec6&t=1649941340'}
      ],
      animationData: {},
      showgroup:false
    },
    //自习室小组的js
    //获取小组信息数据
    getgroupdata:function(){
      wx.cloud.database().collection('data_group_information').get().then(res =>{
        console.log(res);
        let a = res.data;
        this.abc(a);
      })
    },
    abc(a){
       var sum = []
      //  let a =[]
       let c= []
       let res=[]
      //  {id:1,time:1}
    //   a=[
    //     {cate: "番茄时钟", date: "2022/03/31 00:39:43", time: 1},
    //     {cate: "工作", date: "2022/03/31 01:07:16", time: 1},
    //     {cate: "休息", date: "2022/03/31 01:09:12", time: 1},
    //     {cate: "休息", date: "2022/03/31 01:13:26", time: 1},
    //     {cate: "睡觉", date: "2022/03/31 02:53:35", time: 1},
    //     {cate: "写bug", date: "2022/03/31 02:54:46", time: 1},
    //     {cate: "修bug", date: "2022/03/31 02:55:59", time: 1},
    //     {cate: "修bug", date: "2022/03/31 02:57:10", time: 1},
    // ]
     console.log(a);
     for (var i = 0 ;i<a.length;i++){
          if(res[a[i]["qxbq"]]==undefined){
              let re = []
              re.push(a[i])
               console.log(i+1)
              console.log(a[i]["qxbq"])
              res[a[i]["qxbq"]]=re
              console.log(res)
          }
          else{
              console.log(i+1)
              console.log(a[i]["qxbq"])
              c= res[a[i]["qxbq"]]
              var sum = 0
              c.push(a[i])
              console.log(c);
              res[a[i]["qxbq"]]=c
          }
     }  
        console.log(res);//哈希表
        console.log(res['休息'][0]);
    },
    intoshowgroup(){
      this.setData({
        showgroup:true
      })
    },
    tuishowgroup(){
      this.setData({
        showgroup:false
      })
    },
    // 卡片动画
    cardtouchstart(e) {
      console.log(e);
        // 获取触摸Y坐标
        this.recordY = e.touches[0].clientY;
        console.log(e.touches[0].clientY);
    },
     // 手指触摸后移动
     cardtouchmove(e) {
      let currentY = e.touches[0].clientY;
      console.log(currentY);
      movedistance =  currentY-this.recordY; // 获取移动距离
      console.log(movedistance);
      this.cardslideAnimation(movedistance, 300);//右边的数字是移动速度
    },
    //手指触摸结束
    cardtouchend() {
      var self = this;
      var animation = wx.createAnimation({
          duration: 300,
          timingFunction: 'liner',
        });
      this.animation= animation;
      let recordY;
      if (movedistance >=200) { // 移动达到距离就动画显示全部操作项
        this.animation.translateY(-220).rotate(-5).translateX(0).step(); //第一次动画 离开
        this.animation.translateY(0).translateX(0).rotate(0).step();//第二次动画 复位
        this.setData({
          animationData: this.animation.export()//.export清除动画
        });
        setTimeout(function() {
          var cardlist = self.data.cardlist;
          var slidethis = self.data.cardlist.shift();//删掉第一个卡片
          self.data.cardlist.push(slidethis);//把删掉的卡片加到最后
          self.setData({
            cardlist: self.data.cardlist,
            animationData: {}
          });
        }, 400);
        movedistance=0;
        //滑动后右边显示的范围
      } else if (200>movedistance){// 移动未达到距离即还原
        recordY=0;
        this.cardslideAnimation(recordY, 500);
      }
    },
    // 滑动动画
    cardslideAnimation(recordY, time) {
      console.log("触发cardslideAnimation");
      console.log(recordY);
      var animation = wx.createAnimation({
          duration: time,
          timingFunction: 'liner',
        });
      this.setData({
          translateY:recordY
      })
      this.animation= animation;
      this.animation.translateY(recordY).step();
      // translate(0, recordY + 'rpx').step()
      this.setData({
          animationData: this.animation.export()
      })
     },
    navclick(e){
      let studynavState = e.currentTarget.dataset.index
      this.setData({
        studynavState
      })
    },
    more(){
      wx.navigateTo({
        url: '../allgroup/allgroup',
      })
    },
    // 计时的js
     clickpicker(){
        console.log("clickpicker");
        let pickershow = this.data.pickershow
        this.setData({
            pickershow:!pickershow
        })
    },
    pickerdata(e){
        console.log(e);
        this.setData({
            taskshow:e.currentTarget.dataset.task,
            pickershow:false
        })
    },
    init_canvas(){
          let wpx = wx.getSystemInfoSync().windowWidth/375
          let iconurl = wx.getStorageSync('args').iconUrl;
          const query = wx.createSelectorQuery()
          query.select('#bottombox_clock_bg')
          .fields({ node: true, size: true })
          .exec((res) => {
            console.log(res);
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')
            const dpr = wx.getSystemInfoSync().pixelRatio
            canvas.width = res[0].width * dpr
            canvas.height = res[0].height * dpr
            ctx.scale( dpr,dpr)
            this.setData({
              ctx,canvas,wpx
            })
            this.new_drawbg(ctx);
          })
        
      },
      init_canvas2(){
          let wpx = wx.getSystemInfoSync().windowWidth/375
          const query = wx.createSelectorQuery()
          query.select('#bottombox_clock_active')
          .fields({ node: true, size: true })
          .exec((res) => {
            const canvas2 = res[0].node
            const ctx2 = canvas2.getContext('2d')
            const dpr = wx.getSystemInfoSync().pixelRatio
            canvas2.width = res[0].width * dpr
            canvas2.height = res[0].height * dpr
            ctx2.scale( dpr,dpr)
            this.setData({
              ctx2,canvas2
            })
          })
      },
        //更新开始键点击事件
    start: function() {
        console.log('start');
        let ctx2 = this.data.ctx2
        let isRuning = this.data.isRuning
        if (!isRuning) {
            //开始计时
            this.setData({
                pauseShow:true,
                isRuning:true,
                mTime: this.data.time * 60 * 1000,
                timeStr: parseInt(this.data.time) >= 10 ? this.data.time + ':00' : '0' + this.data.time + ':00',
            })
            this.drawActive();
          } else {
            //放弃
            ctx2.clearRect(0,0,600,600)
            clearInterval(this.data.timer);
            this.setData({
                isRuning:false,
                pauseShow: false,
                continueCancelShow: false,
                okShow: false,
                mTime: this.data.time * 60 * 1000,
                timeStr: parseInt(this.data.time) >= 10 ? this.data.time + ':00' : '0' + this.data.time + ':00',
            })
          }
    },
    //动态画圆
    drawActive: function() {
        let ctx2 = this.data.ctx2;
        var _this = this; //此this指向该页的page
        var timer = setInterval(function() {
            var angle = 1.5 + 2 * (_this.data.time * 60 * 1000 - _this.data.mTime) / (_this.data.time * 60 * 1000);
            var currentTime = _this.data.mTime - 100;
            _this.setData({
                mTime: currentTime
            });
            if (angle < 3.5) {
                if (currentTime % 1000 == 0) {
                    var timeStr1 = currentTime / 1000; //s
                    var timeStr2 = parseInt(timeStr1 / 60); //得到一个整的分钟数
                    var timeStr3 = (timeStr1 - timeStr2 * 60) >= 10 ? (timeStr1 - timeStr2 * 60) : '0' + (timeStr1 - timeStr2 * 60);
                    var timeStr2 = timeStr2 >= 10 ? timeStr2 : '0' + timeStr2;
                    _this.setData({
                        timeStr: timeStr2 + ':' + timeStr3
                    })
                }
                var lineWidth = 13 / _this.data.rate;
                ctx2.lineWidth=Number(lineWidth);
                ctx2.strokeStyle='#5879fa';
                ctx2.lineCap='round'; //形状
                ctx2.beginPath(); //开新路径
                ctx2.arc(600 / _this.data.rate / 2, 600 / _this.data.rate / 2, 600 / _this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false);
                //(圆心x，y，度数0，到2*math.PI,逆时针false)  一点一点得画
                ctx2.stroke();
            } else {
                wx.showLoading({
                  title: '上传数据中',
                })
                let logs = [
                    {date:util.formatTime(new Date),
                    cate:_this.data.taskshow,
                    // Number(_this.data.cateActive),  
                    time:parseInt(_this.data.time),}
                ]
                console.log(logs);
                let date=util.formatTime(new Date)
                let cate=_this.data.taskshow
                // _this.data.cateActive
                
                let storageInfo=_this.data.storageInfo
                let username = String(storageInfo.username)
                wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
                    let name = storageInfo.nickName
                    let touxiangurl = storageInfo.iconUrl
                    let len = res.data.length
                    let totaltime = wx.cloud.database().collection("totaltime")
                    let totalTime = 0
                    // let logs=_this.data.logsa
                    const _=wx.cloud.database().command
                    if (len == 0) { //用学号username判断用户在数据库有没有数据
                        console.log('123')
                        totaltime.add({
                            data: {
                                totalTime,
                                logs:logs,
                                name,
                                touxiangurl,
                                username:String(username)
                            }
                        }).then(res => {
                            console.log(res);
                            wx.hideLoading();
                        })
                    }else {
                        totaltime.where({username:username}).update({
                            data: {
                                logs: _.push({
                                    date:date,
                                    cate:cate,
                                    time:parseInt(_this.data.time)
                                })
                            }
                        }).then(res=>{
                            console.log('添加成功')
                        })
                    }
                })
                _this.setData({
                    timeStr: '00:00',
                    okShow: true,
                    pauseShow: false,
                    continueCancelShow: false,
                })
                clearInterval(timer);
                wx.hideLoading();
            }
        }, 100);
        _this.setData({
            timer: timer
        })
    },
    new_drawbg(ctx){
        var lineWidth = 13 / this.data.rate;
        ctx.lineWidth=Number(lineWidth);
        ctx.strokeStyle='#d0dafd';
        ctx.lineCap='round'; //形状
        ctx.beginPath(); //开新路径
        ctx.arc(600 / this.data.rate / 2, 600 / this.data.rate / 2, 600 / this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false);
        //(圆心x，y，度数0，到2*math.PI,逆时针false)
        ctx.stroke();
    },
    //更新滑动条时间
    slideChange: function(e) {
        this.setData({
            time: e.detail.value,
        })
        this.setData({
            mTime: this.data.time * 60 * 1000,
            timeStr: parseInt(this.data.time) >= 10 ? this.data.time + ':00' : '0' + this.data.time + ':00',
        })
    },
    //更新点击选择做的事件获取index
    clickCate: function(e) {
        this.setData({
            cateActive: e.currentTarget.dataset.index
        })
        console.log(e)
    },
    //暂停
    pause: function() {
        clearInterval(this.data.timer);
        this.setData({
            pauseShow: false, //暂停框
            continueCancelShow: true, //继续放弃框
            okShow: false, //返回框
        })

    },
    continue: function() {
        this.drawActive();
        this.setData({
            pauseShow: true,
            continueCancelShow: false,
            okShow: false,
        })
    },
    ok: function() {
        let ctx2 =this.data.ctx2
        ctx2.clearRect(0,0,600,600);
        clearInterval(this.data.timer);
        this.setData({
            isRuning:false,
            pauseShow: false,
            continueCancelShow: false,
            okShow: false,
            clockshow: false,
        })
    },
    // 事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    statistics: function(){ 
        wx.navigateTo({
          url: '../../tomato/logs/logs',
        })
    },
    rank: function() {
        wx.navigateTo({
          url: '../../tomato/rank/rank',
        })
    },
    text(){
        wx.navigateTo({
          url: '../text/text',
        })
    },
    changeType: function(e) {
            let username = wx.getStorageSync('args').username
            wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
                let logs = res.data[0].logs
                //console.log(this.data.list)
            })
    },
    res(res){
        console.log(res)
    },
    backto(){
        wx.navigateBack({
            delta: 1
          })
    },
    // tabbar js
    click_a:function(e){
      
      let navState = e.currentTarget.dataset.index
      console.log("主页",navState);
      console.log(navState);
      this.setData({
        click_a:true,
        click_b:false,
        click_c:false,
        click_d:false,
        navState
      })
    },
    click_b:function(e){
      wx.showToast({
        title: '开发中，敬请期待',
        icon: 'none',
      })
      let navState = e.currentTarget.dataset.index
      console.log("打卡页",navState);
      this.setData({
        click_a:false,
        click_b:true,
        click_c:false,
        click_d:false,
        // navState
      })
    },
    click_c:function(e){
      wx.showToast({
        title: '开发中，敬请期待',
        icon: 'none',
      })
      let navState = e.currentTarget.dataset.index
      console.log("云留言页",navState);
      this.setData({
        click_a:false,
        click_b:false,
        click_c:true,
        click_d:false,
        // navState
      })
    },
    click_d:function(e){
      // wx.showToast({
      //   title: '开发中，敬请期待',
      //   icon: 'none',
      // })
      let navState = e.currentTarget.dataset.index
      console.log("小组页",navState);
      this.setData({
        click_a:false,
        click_b:false,
        click_c:false,
        click_d:true,
        navState
      })
      this.getgroupdata();
    },
    //日历初始化
    zero: function (i) {
      return i >= 10 ? i : '0' + i;
    },
    today: function () {
      let DATE = this.data.defaultValue ? new Date(this.data.defaultValue) : new Date(), 
          year = DATE.getFullYear(),
          month = DATE.getMonth() + 1,
          date = DATE.getDate(),
          today = year + '/' + this.zero(month) + '/' + this.zero(date),
          dayarr = [today];
      var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
      var week = weekArray[new Date(today).getDay()];
      console.log(week)
      console.log("今天周",week); 
      console.log(today);  
      this.setData({
        today,
        spot:dayarr,
        week
      })
    },
    dateChange(e) {
      console.log("选中日期变了,现在日期是", e.detail.dateString)
      this.setData({
        dateString: e.detail.dateString
      })
    },
    //下面是打卡js
    //计时入口动画
    plus: function (e) {
      let navState = e.currentTarget.dataset.index
      console.log("计时页",navState);
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ff0000',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
      this.setData({
        click_a:false,
        click_b:false,
        click_c:false,
        click_d:false,
        navState
      })
      if (this.data.isPopping) {
          //缩回动画
          this.popp();
          this.setData({
              isPopping: false
          })
      } else if (!this.data.isPopping) {
          //弹出动画
          this.takeback();
          this.setData({
              isPopping: true
          })
      }
      this.init_canvas();
      this.init_canvas2();
    },
    input: function () {
      wx.navigateTo({
        url: '../../tomato/logs/logs',
      })
    },

    transpond: function () {
       wx.navigateTo({
         url: '../../tomato/index/index',
       })
    },

    collect: function () {
      wx.navigateTo({
        url: '../../tomato/rank/rank',
      })
    },

    //弹出动画
    popp: function () {
      //plus顺时针旋转
      var animationPlus = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease-out'
      })
      var animationcollect = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease-out'
      })
      var animationTranspond = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease-out'
      })
      var animationInput = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease-out'
      })
      animationPlus.rotateZ(135).step();
      animationcollect.translate(-100, -100).rotateZ(180).opacity(1).step();
      animationTranspond.translate(-140, 0).rotateZ(180).opacity(1).step();
      animationInput.translate(-100, 100).rotateZ(180).opacity(1).step();
      this.setData({
          animPlus: animationPlus.export(),
          animCollect: animationcollect.export(),
          animTranspond: animationTranspond.export(),
          animInput: animationInput.export(),
      })
    },
  //收回动画
  takeback: function () {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(-45).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
        animPlus: animationPlus.export(),
        animCollect: animationcollect.export(),
        animTranspond: animationTranspond.export(),
        animInput: animationInput.export(),
    })
  },
    //一键分享校园圈
    savecanvas:function(){
        let that = this;
        let w = wx.getSystemInfoSync().windowWidth/375
        let args = wx.getStorageSync('args');
        wx.canvasToTempFilePath({
          canvas:that.data.canvas,
          width:that.data.canvasWidth,
          height:that.data.canvasHeight,
          destHeight:that.data.canvasHeight*4,
          destWidth:that.data.canvasWidth*4,
          quality:1,
            success:function(res){
                // wx.saveImageToPhotosAlbum({
                //     filePath: res.tempFilePath,
                //     success(result){
                //       wx.showToast({
                //         title: '图片保存成功',
                //         icon: 'success',
                //         duration: 2000
                //       })
                //     }
                //   })
                wx.getImageInfo({
                  src:res.tempFilePath,
                }).then(res=>{
                    console.log(res);
                    let photo={
                        tempFiles:res.path,
                        imageHeight:res.height,
                        imageWidth:res.width
                    }
                if(app.globalData.allList){
                   wx.navigateTo({
                  
                    url: '/pages/more/pages/PublishContent/PublishContent?tempFiles='+photo.tempFiles+'&imageHeight='+photo.imageHeight+'&imageWidth='+photo.imageWidth,
  
                  })
                }else{
                  // 标签兜底
                  args.tabitem ? args.tabitem : args["tabitem"] = ["全部","日常","开学季","打卡"];
                  // 初始化allList
                  let allList = args.tabitem.map( (item,index) => {
                    let allList = [];
                    return allList[index] = []
                  } )
                  app.globalData.allList = allList;
                  wx.navigateTo({
                
                      url: '/pages/more/pages/PublishContent/PublishContent?tempFiles='+photo.tempFiles+'&imageHeight='+photo.imageHeight+'&imageWidth='+photo.imageWidth,
    
                    })
                }
                })
            }
        })

    },
    //canvas初始化
    sharecanvas_new(){
      wx.showLoading({
        title: '生成中',
        mask:true,
      })
        let that =this;
        let wpx = wx.getSystemInfoSync().windowWidth/375
        let iconurl = wx.getStorageSync('args').iconUrl;
        const query = wx.createSelectorQuery()
        query.select('#shareCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node
          const ctx = canvas.getContext('2d')
          const dpr = wx.getSystemInfoSync().pixelRatio
          console.log(canvas);
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          ctx.scale( dpr,dpr)
          this.setData({
            ctx,canvas,wpx
          })
          this.draw_new_bg(ctx,canvas,wpx)//开始画图
        })
    },

    draw_new_bg(ctx,canvas,wpx){
        let num=Math.floor(Math.random() * 9);
        let inum=Math.floor(Math.random() * 7);
        let Wetext="—— We校园每日分享"
        let nickName= wx.getStorageSync('args').nickName;
        let bgurl = this.data.arr[num]
        const bgimg = canvas.createImage();
          bgimg.src = bgurl;
          bgimg.onload = () => {
              //底层背景色块
              ctx.save();
              ctx.beginPath()//开始创建一个路径
              this.roundRect(ctx, 0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx, 2)//圆角
              ctx.fillStyle='#379d88'
              ctx.fillRect(0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx)
              ctx.clip()//裁剪
              ctx.closePath();
              ctx.restore();
              //上面背景
              ctx.save();
              ctx.beginPath()//开始创建一个路径
              this.roundRect(ctx, 10*wpx, 10*wpx, 260*wpx, 50*wpx, 5,wpx)//圆角
              ctx.clip()//裁剪
              ctx.fillStyle='#f4f6f5'
              ctx.fillRect(0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx)
              ctx.closePath();
              ctx.restore();
              //下面背景
              ctx.save();
              ctx.beginPath()//开始创建一个路径
              this.roundRect(ctx, 10*wpx, 60*wpx, 260*wpx, 280*wpx, 5,wpx)//圆角
              ctx.clip()//裁剪
              ctx.fillStyle='#fff'
              ctx.fillRect(0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx)
              // ctx.drawImage(bgimg,10*wpx,10*wpx,260*wpx,330*wpx);//画背景
              ctx.closePath();
              ctx.restore();
              this.draw_we_iconurl(ctx,canvas,wpx);//We校园图标
              this.drawiconurl(ctx,canvas,wpx);//画头像
              ctx.fillStyle='black';
              ctx.font=String(15*wpx)+'px Arial';
              ctx.fillText("We 打卡",66*wpx,40*wpx);
              ctx.font=String(13*wpx)+'px Arial';
              ctx.fillText(nickName,64*wpx,274*wpx);//画wx名字
              ctx.font=String(11*wpx)+'px Arial';
              ctx.fillText(this.data.daytext[inum].Eng_daytext,20*wpx,88*wpx);//英文语句
              ctx.font=String(9*wpx)+'px Arial';
              ctx.fillText(this.data.daytext[inum].Ch_daytext,20*wpx,110*wpx);//中文语句
              ctx.fillStyle='gray';
              ctx.font=String(9*wpx)+'px Arial ';
              ctx.fillText(Wetext,172*wpx,120*wpx);//we校园每日分享
              //图片
              ctx.save();
              ctx.beginPath()//开始创建一个路径
              this.roundRect(ctx, 10*wpx, 133*wpx, 260*wpx, 113*wpx, 1)//圆角
              ctx.clip()//裁剪
              ctx.drawImage(bgimg,10*wpx,10*wpx,260*wpx,330*wpx);//这个要与上面背景位置大小保持一致
              ctx.globalAlpha="0"
              ctx.fillStyle='#ffff'
              ctx.fillRect(10*wpx, 228*wpx, 260*wpx, 113*wpx)//色块
              ctx.closePath();
              ctx.restore();
              //透明色块里面的字体
              ctx.fillStyle='black'
              ctx.globalAlpha="1"
              // ctx.font='30px Arial'
              ctx.font = String(11*wpx)+"px Arial"
              ctx.fillText(this.data.task_name,16*wpx,310*wpx)//任务名字
              ctx.font = String(9*wpx)+"px Arial"
              ctx.fillStyle='gray'
              ctx.fillText('任务',18*wpx,330*wpx)//任务
              ctx.fillText('打卡时间',83*wpx,330*wpx)
              ctx.font = String(11*wpx)+"px Arial"
              ctx.fillStyle='black'
              ctx.fillText(this.data.dakatime,83*wpx,310*wpx)//打卡时间
              ctx.font = String(9*wpx)+"px Arial"
              ctx.fillStyle='gray'
              ctx.fillText('坚持天数',155*wpx,330*wpx)//坚持天数
              ctx.font = String(11*wpx)+"px Arial"
              ctx.fillStyle='black'
              ctx.fillText(this.data.dakacount,155*wpx,310*wpx)//打卡天数
              //两个圆模拟打孔
              ctx.save();
              ctx.beginPath()//开始创建一个路径
              ctx.arc(10*wpx, 60*wpx, 10*wpx, 0, Math.PI * 2,false)
              ctx.arc(270*wpx, 60*wpx, 10*wpx, 0, Math.PI * 2,false)
              ctx.clip()//裁剪
              ctx.fillStyle='#379d88'
              ctx.fillRect(0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx)
              ctx.closePath();
              ctx.restore();
              //模拟裁剪虚线
              ctx.strokeStyle = 'gray';
              ctx.setLineDash([3, 5]);
              ctx.lineDashOffset = 1;
              ctx.beginPath();
              ctx.moveTo(20*wpx,60*wpx)
              ctx.lineTo(260*wpx, 60*wpx);
              ctx.stroke();
              wx.hideLoading();
              //二维码
              this.draw_we_codeurl(ctx,canvas,wpx);
          }
    },

    drawiconurl(ctx,canvas,wpx){
        console.log("drawiconurl");
        let iconurl = wx.getStorageSync('args').iconUrl;
        const headerImg = canvas.createImage();
        headerImg.src = iconurl;
        headerImg.onload = () => {
          ctx.save();
          ctx.beginPath()//开始创建一个路径
          ctx.arc(31*wpx, 270*wpx, 14*wpx, 0, 2 * Math.PI, false)//画一个圆形裁剪区域
          ctx.clip()//裁剪
          ctx.fillStyle='#389e89'
          ctx.fillRect(0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx)
          ctx.drawImage(headerImg,17.7*wpx,257*wpx,27*wpx,27*wpx);
          ctx.closePath();
          ctx.restore();
        }
    },

    draw_we_iconurl(ctx,canvas,wpx){
      console.log("drawiconurl");
      let we_iconurl = "http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcVSbqQOOiiPu97WXvRV9QiIZBX1umL4FZZY5hDkMBOsWWiaOGBzThG76xs176TsOiBBWM50wNm7v1AfDmY5EuRg!/r";
      const headerImg = canvas.createImage();
      headerImg.src = we_iconurl;
      headerImg.onload = () => {
        ctx.drawImage(headerImg,20*wpx,18*wpx,33*wpx,33*wpx);
      }
    },

    draw_we_codeurl(ctx,canvas,wpx){
      console.log("drawiconurl");
      let we_iconurl = "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/gh_2927abcc72c9_258.jpg?sign=b685101cc1b9e449b4ae4ef0700028f2&t=1647171838";
      const headerImg = canvas.createImage();
      headerImg.src = we_iconurl;
      headerImg.onload = () => {
        ctx.drawImage(headerImg,220*wpx,292.5*wpx,40*wpx,40*wpx);
      }
    },
    roundRect(ctx, x, y, w, h, r,wpx) {
        // 开始绘制
        ctx.beginPath()
        // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
        ctx.setFillStyle='transparent'
        ctx.setStrokeStyle='transparent'
        // 绘制左上角圆弧
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5,false)   
        // 绘制border-top
        ctx.moveTo(x + r, y)
        ctx.lineTo(x + w - r, y)
        ctx.lineTo(x + w, y + r)
        // 绘制右上角圆弧
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)   
        // 绘制border-right
        ctx.lineTo(x + w, y + h - r)
        ctx.lineTo(x + w - r, y + h)
        // 绘制右下角圆弧
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)    
        // 绘制border-bottom
        ctx.lineTo(x + r, y + h)
        ctx.lineTo(x, y + h - r)
        // 绘制左下角圆弧
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)   
        // 绘制border-left
        ctx.lineTo(x, y + r)
        ctx.lineTo(x + r, y)
        ctx.closePath()
        // 剪切
        ctx.clip()
      },
    startFun:function(e){
        console.log(e.currentTarget.id);
        this.setData({
            currentIndex: e.currentTarget.id
          });
          console.log(this.data.currentid);
    },
    
     //滑块移动中执行的事件
    moveFun: function (e) {
        //如果验证成功后仍允许滑动，则执行下面代码块（初始值默认为允许）
        if (this.data.pullStatus) {
          this.data.x = e.changedTouches[0].clientX - ((this.data.sysW * 0.1) + 25);
          this.data.x >= this.data.w ? this.data.xAxial = this.data.w : this.data.xAxial = this.data.x;
          if (this.data.x < 25) this.data.xAxial = 0;
          this.data.cssAnimation = 'translate3d(' + this.data.xAxial + 'px, 0, 0)';
          this.setData({
            cssAnimation: this.data.cssAnimation
          })
        }
      },

      endFun: function (res) {
        let id =res.currentTarget.id
        var detail = {};
        let isDaka=this.data.taskdata
        isDaka=isDaka[id].task_isDaka
        //如果触摸的X轴坐标大于等于限定的可移动范围，则验证成功
        if (this.data.x >= this.data.w&&!isDaka) {
          this.data.xAxial = this.data.w;
          this.data.succeedMsg = '';
          detail.msg = true;
          this.daka_prompt(res)
          console.log(res);
          this.data.xAxial = 0;
          this.setData({
            x:0
          })
        } else {
          this.data.xAxial = 0;
          this.data.succeedMsg = '';
          detail.msg = false;
        }
        this.triggerEvent('myevent', detail);
        //根据获取到的X轴坐标进行动画演示
        this.data.cssAnimation = 'translate3d(' + this.data.xAxial + 'px, 0, 0)';
        this.setData({
          succeedMsg: this.data.succeedMsg,
          cssAnimation: this.data.cssAnimation
        }) 
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
        if (movedistance <=-50) { // 移动达到距离就动画显示全部操作项
          recordX = -130;           //滑动后右边显示的范围
        } else if (-50<movedistance){// 移动未达到距离即还原
          recordX=0
        }
        this.slideAnimation(recordX, 500);
    },
    // 滑动动画
    slideAnimation(recordX, time) {
        let animation = wx.createAnimation({
          duration: time,
          timingFunction: 'liner'
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
        let dakatime = util.dakaTime(new Date());
        console.log(dakatime);
        this.setData({
          dakatime:dakatime
        });
        console.log(res);
        var id = Number(res.currentTarget.id);
        console.log(id);
        var taskdata = this.data.taskdata;
        var data = taskdata[id];
        console.log(data);
        var nowDate = new Date();
        var day = nowDate.getDay();
        console.log("今天星期"+day);
        //1.获取res的里面的关于打卡学号、周期、任务的信息
        let hashid = data.task_hashId;
        var cycle = data.task_cycle;
        //2.看今日day是否在cycle里面
        //由于页面渲染的数据来源于username，故不用判断
        if(cycle.length == 1 && cycle[0] == '每天'){
            this.daka(hashid);
            console.log("真打卡好了");
            let tasktemp = this.data.taskdata
            tasktemp[id].task_isDaka=true
            this.setData({
                taskdata:tasktemp
            })
            wx.setStorageSync('dakaArr', tasktemp);
            return;
        }
        //先判断周期能不能打再进行是否二次打卡判断
        for(var i = 0; i < cycle.length; i++){
            if(cycle[i] == '周一' && day == 1){    
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    wx.setStorageSync('dakaArr', tasktemp);
                    return;   
            }else if(cycle[i] == '周二' && day == 2){   
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    wx.setStorageSync('dakaArr', tasktemp);
                    return;    
            }else if(cycle[i] == '周三' && day == 3){   
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    wx.setStorageSync('dakaArr', tasktemp);
                    return;    
            }else if(cycle[i] == '周四' && day == 4){   
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    wx.setStorageSync('dakaArr', tasktemp);
                    return;  
            }else if(cycle[i] == '周五' && day == 5){ 
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                    taskdata:tasktemp
                    })
                    wx.setStorageSync('dakaArr', tasktemp);
                    return; 
            }else if(cycle[i] == '周六' && day == 6){   
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    wx.setStorageSync('dakaArr', tasktemp);
                    return;
            }else if(cycle[i] == '周日' && day == 0){
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    wx.setStorageSync('dakaArr', tasktemp);
                    return;
            }
        }
        
        await wx.showToast({
            title: '根据任务开放时间，今日不能打卡~',
            icon: 'none',
            duration: 2000
        })
    },

    async daka(hashid){
        let dakatime = util.formatTime(new Date())
        console.log(dakatime);
        let result = await wx.cloud.callFunction({
            name: "daka",
            data: {
                type:"getDakaRecord_ByHashId",
                hashId:hashid,
            }
        }).catch(err => {
          wx.showToast({
            title: '网络请求失败',
            icon: 'none',
          })
      })
        console.log(result);
        //细节坑：预防第一次打卡没有daka_lastTime的情况
        var daka_lastTime = new Date(result.result.data[0].daka_lastTime);
        // console.log(daka_lastTime);
        if(daka_lastTime != null){
            console.log(daka_lastTime);
            //获取最后一次打卡的日期
            var lastTime_year = daka_lastTime.getFullYear();
            var lastTime_month = daka_lastTime.getMonth()+1;
            var lastTime_day = daka_lastTime.getDate();
            // console.log("最后一次打卡时间是几号："+lastTime_day);
            //获取当天日期
            var nowDate = new Date();
            var nowYear = nowDate.getFullYear();
            var nowMonth = nowDate.getMonth()+1;
            var nowDay = nowDate.getDate();
            // console.log("今天是" + nowDay + "号");
            if(lastTime_year == nowYear && lastTime_month == nowMonth && lastTime_day == nowDay){
                 wx.showToast({
                    title: '您今儿个打过卡了',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
        }
        
        wx.cloud.callFunction({
            name: "daka",
            data: {
                type:"updateDakaRedord_ByHashId",
                hashId:hashid,
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '出错啦！请稍后重试'
              })
            }      
        })
        //要是能成功打卡就打开弹窗可以选择分享
        this.setData({showModel2:true});
        this.sharecanvas_new();
        // console.log('今日真打卡成功了！');
    },

    //打卡提示
    daka_prompt(res){
        this.data.xAxial = 0;
        //打卡次数本地增加1 渲染到弹窗
        let id =res.currentTarget.id
        let task_name=this.data.taskdata
        task_name=task_name[id].task_name
        console.log(task_name);
        let dakacount=this.data.taskdata
        dakacount=dakacount[id].count+1
        this.setData({ dakacount:dakacount,task_name:task_name})
        let that = this;
        console.log(res);
        // this.data.sharecanvas();
        wx.showModal({
            title: '提示',
            content: '是否确定打卡？',
            success(abc) {
              if (abc.confirm) {
                that.allowDaka(res);
                that.slideAnimation(0, 500);
              } else if (abc.cancel) {
                console.log('用户点击取消');
                that.data.pullStatus = true;
              }
            }
        });
    },
    //打卡删除提示
    daka_delpromp(res){
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
        var id = Number(res.currentTarget.id);
        var taskdata = this.data.taskdata;
        var data = taskdata[id];
        var hashid = data.task_hashId;
        wx.cloud.callFunction({
            name:"daka",
            data: {
                type:"delDakaRecord_ByHashId",
                hashId:hashid,
            }
        }).catch(err => {
          wx.showToast({
            title: '网络请求失败',
            icon: 'none',
          })
      })

        console.log('删除：',id)
    },

    //获取数据交与页面渲染
    async getDaka_record(){
        let that = this
        let username = wx.getStorageSync('args').username
        if(username){
        //用username查找uuid
        var dakaArr = [];
        //根据username获取到该用户的所有打卡记录
        const res = await wx.cloud.callFunction({
            name: "daka",
            data: {
                type:"getAllDakaRecord",
                username:username,
                is_delete:false,
            },
        }).catch(err=>{
          wx.showToast({
            icon: 'none',
            title: '出错啦！请稍后重试'
          })
        })

        let data = res.result.data
        for(var i = 0; i < data.length; i++){
            var hashid = data[i].hashId
            var obj = {
                task_name:data[i].task,
                task_cycle:data[i].cycle,
                task_start_time:data[i].startTime,
                task_end_time:data[i].endTime,
                task_hashId:hashid,
                task_lable1:data[i].lable1,
                task_lable2:data[i].lable2,
                count:data[i].count,
            }
            //判断该数据是否打卡的状态
            let task_isDakaTemp = data[i].isDaka;
            let daka_lastTime = new Date(data[i].daka_lastTime);
            //为了防止第一次打卡没有daka_lastTime
            if(daka_lastTime != null){
                //获取最后一次打卡的日期
                var lastTime_year = daka_lastTime.getFullYear();
                var lastTIme_month = daka_lastTime.getMonth()+1;
                var lastTime_day = daka_lastTime.getDate();
                //获取当天日期
                var nowDate = new Date();
                var nowYear = nowDate.getFullYear();
                var nowMonth = nowDate.getMonth()+1;
                var nowDay = nowDate.getDate();
                if(lastTime_year != nowYear || lastTIme_month != nowMonth || lastTime_day != nowDay){
                    //将该数据的是否打卡渲染值改变为task_isDakaTemp = false,则可以避免再次请求数据库拿该属性
                    task_isDakaTemp = false;
                    wx.cloud.callFunction({
                        name:"daka",
                        data:{
                            type:"updateIsDaka",
                            hashId:hashid,
                            isDaka:false,
                        }
                    }).catch(err => {
                      wx.showToast({
                        title: '网络请求失败',
                        icon: 'none',
                      })
                  })
                }
            }
            
            obj.task_isDaka = task_isDakaTemp;
            dakaArr.push(obj);
        }
        console.log(dakaArr);
        this.setData({
            taskdata:dakaArr
        })
        //放入缓存
        wx.setStorageSync('dakaArr', dakaArr);
        // wx.getStorageSync('dakaArr');
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
        //监听加载页
    onLoad() {
        // 判断登录
        app.loginState();
        var res = wx.getSystemInfoSync(); //获取设备的信息
        var rate = 750 / res.windowWidth;
        this.setData({
            rate: rate,
            clockHeight: rate * res.windowHeight
        })
        let that = this
        wx.getStorage({
            key: 'args',
            success(res) {
              that.setData({
                storageInfo: res.data,
              });
            },
            fail(err) {
              console.log("失败失败失败");
            }
          })

        let username = wx.getStorageSync('args').username;
        console.log(username);
        wx.showLoading({
          title: '加载中',
          mask:true
        })
        this.today()
        this.getDaka_record().then(res=>{wx.hideLoading()})
        wx.setNavigationBarTitle({
            title: 'We打卡',
        });
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
    onShow() {
       let dakaArr = this.data.dakaArr
       wx.setStorageSync('dakaArr', dakaArr);
       var pages = getCurrentPages();
       var currPage = pages[pages.length - 1]; //当前页面
       let json = currPage.data.mydata;
       console.log(json);
       if(json){
        this.data.taskdata.push(json);
        console.log(this.data.taskdata);
        this.setData({
            taskdata:this.data.taskdata
           })
        currPage.data.mydata=null;
        console.log(currPage.data.mydata);
        }
        
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
      wx.showLoading({
        title: '加载中',
        mask:true
      })
      this.getDaka_record().then(res=>{wx.hideLoading()})
      setTimeout(function(){
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
    },1000)
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