// pages/data_show/data_show.js
import * as echarts from   "../utils/ec-canvas/echarts.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec:{
      // onInit: initChart,
      lazyLoad: true
    },
    choose_Label:[{"describe":"一年","value":"365"},
    {"describe":"一个月","value":"30"},
    {"describe":"一日","value":"1"}],
    state:0
  },
  //echarts数据可视化
  setOption(chart, x, y) {
    console.log(x,y)

    var option = {
      xAxis: {
        type: 'category',
        //时间
        data: x
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data:y,
          type: 'line'
        }
      ]
    };
    chart.setOption(option);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  choose(e){  
    let unit = this.data.choose_Label[Number(e.target.id)].value
    this.get_data(unit)
  },
  echarts_opt(x,y){
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
      this.setOption(chart, x, y);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    })
  },
  get_data(unit){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url:  "http://8.141.66.105:10102/api/getParamVal",
      method:"GET",
      data:{
        parameterDefineId:that.data.parameterDefineId,
        unit:unit,
        deviceId:that.data.deviceId
      },
      header:{
        Authorization:wx.getStorageSync('token').token
      },
      success(res){
        wx.hideLoading()
        let x=res.data.content.time
        let y=res.data.content.data
        that.echarts_opt(x,y)
        //状态
        that.setData({state:1})
        console.log(res)
      }
    })
  },
  onLoad: function (e) {
   this.setData({parameterDefineId:e.parameterDefineId,deviceId:e.deviceId})
   //onload默认加载一天的
   this.get_data(1)
  },
 
  
})