// logs.js
const util = require('../../../utils/util.js')
const app = getApp(); //全局变量
import * as echarts from '../ec-canvas/echarts';
Page({
    data: {
        ec:{
        lazyLoad: true
        },
        navState: 0,//导航状态
        logsa:[{a:1},{b:2}],
        total:0,
        totalTime:0,
        downloaddata:{},
        storageInfo:{},
        logs: [],
        activeIndex: 0,
        dayList: [],
        list: [],
        totaltime123: 0,
        total123: 0,
        userInfo: {},
        hasUserInfo: false,
        sum: [{
                title: '今日番茄次数',
                val: '0'
            },
            {
                title: '累计番茄次数',
                val: '0'
            },
            {
                title: '今日专注时长',
                val: '0分钟'
            },
            {
                title: '累计专注时长',
                val: '0分钟'
            }
        ],
    },
    //echarts数据可视化
  setOption(chart,echarr) {
    var option = {
      title: {
        text: '统计图',
        subtext: '任务时间占比',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          name: '分钟',
          type: 'pie',
          radius: '50%',
          data:
          echarr,
          //  [
          //   { value: 1048, name: '学习' },
          //   { value: 735, name: '阅读' },
          //   { value: 580, name: '娱乐' },
          //   { value: 484, name: '思考' },
          //   { value: 300, name: '运动' }
          // ],
          
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chart.setOption(option);
  },
  echarts_opt(echarr){//echart库有代码
    let ecComponent = this.selectComponent('#mychart-dom');
    ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      //调用设定EChart报表状态的函数，并且把从后端拿到的数据传过去
      this.setOption(chart,echarr);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    })
  },
  get_data(){
    let that = this
    let username = String(wx.getStorageSync('args').username)
    wx.cloud.database().collection("totaltime").where({username:username}).get().then(abc=>{
     let b=abc.data[0].logs
      let dict = {}
      let echarr = []
      let a = b.map(i=>{
          return i.cate
      })
      a = Array.from(new Set(a))
      a.forEach(et => {
          dict = {
              name:"",
              value:0
          }
          b.forEach((e=>{
              if(e.cate==et){
                  dict.name = e.cate
                  dict.value = dict.value + e.time
              }
          }))
          echarr.push(dict)
      });
      console.log(echarr)
      that.echarts_opt(echarr)
    })
  },
  abc(){
  },
  def(){
    let a = []
    a = [
          {"休息":[{cate:"休息",time:1},{cate:"休息",time:2}]},
          {"修bug":[{cate:"修bug",time:3},{cate:"修bug",time:5}]}
      ]
      let res = []
      a.forEach((item,index)=>{
          let dict = {
              name:"",
              value:0
          }
          dict.name = Object.keys(item)[0]
          let temp  = item[Object.keys(item)]
          temp.forEach((e,i)=>{
              dict["value"]+=e.time
          })
          res.push(dict)
      })
      console.log(res)
  },
    onShow: function() {
        let username = wx.getStorageSync('args').username 
        wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
             var logs=res.data[0].logs
             var day = 0;
             var total = logs.length;
             var dayTime = 0;
             var totalTime = 0;
             var dayList = [];
             if (logs.length > 0) {
                 for (var i = 0; i < logs.length; i++) {
                //if (!isNaN(logs[i].time)) {
                     if (logs[i].date.substr(0, 10) == util.formatTime(new Date).substr(0, 10)) {
                         day = day + 1;
                         dayTime = dayTime + parseInt(logs[i].time);
                         dayList.push(logs[i]);
                         this.setData({
                             dayList: dayList,
                             list: dayList
                         })
                     }
                // }
                     totalTime = totalTime + parseInt(logs[i].time);
                }
                  this.setData({
                    'sum[0].val': day,
                    'sum[1].val': total,
                    'sum[2].val': dayTime + '分钟',
                    'sum[3].val': totalTime + '分钟',
                    totaltime123: totalTime,
                    total123: total
                  })
                  this.updata()
             }
            
        })
         
    },
    onLoad(){
        let that = this
        wx.getStorage({
            key: 'args',
            success(res) {
              that.setData({
                storageInfo: res.data,
              });
            },
            fail(err) {
              console.log("学号获取失败失败失败");
            }
          });
    },
    updata(){
        wx.showLoading({
          title: '加载数据中',
        })
        let username = String(wx.getStorageSync('args').username)
        wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
            let totaltime = wx.cloud.database().collection("totaltime")
            let len = res.data.length
            if(len == 0){
                console.log("数据库无数据");
                wx.showToast({
                  title: '您还没有数据',
                  icon:"none"
                })
                wx.hideLoading();
            }else{
                let totalTime=this.data.totaltime123
                totaltime.where({username:username}).update({
                    data:{
                        totalTime
                    }
                }).then(res=>{
                  console.log(res);
                }).catch(err=>{
                  console.log(err)
                })
                wx.hideLoading();
            }
        })
    },
    changeType: function(e) {
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
            this.setData({
                list: this.data.dayList
            })
        } else if (index == 1) {
            let username = wx.getStorageSync('args').username
            wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
                let logs = res.data[0].logs
                this.setData({
                    list : logs
                })
            })
        }
        this.setData({
            activeIndex: index
        })
    },
    navSwitch: function(e) {
        let index = e.currentTarget.dataset.index;
        if(index == 1){
          wx.showLoading({
            title: '加载中',
            mask:true
          }).then(res=>{
            this.get_data()
            wx.hideLoading()
          })
        }
        this.setData({
          navState:index
        })
    },
})