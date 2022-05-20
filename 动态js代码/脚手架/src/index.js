Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入的数据
    experimentData:"",
    //
    ContentDescripe:[
      "算术平均值",
      "标准偏差",
      "算术平均偏差",
      "a类不确定度",
      "b类不确定度",
      "总不确定度",
      "总相对不确定度"
    ],
    //b类不确定度的picker数据,用到的东西有点多后续优化
      multiArray: ["钢直尺","钢卷尺","游标卡尺","螺旋测微器","物理天平","TG928A矿山天平","水银温度计","读数显微镜","其他"],
      multiIndex: 0,
      calibrationIndex:0,
      show:false,
      calibration:[],
      calibrationItem:"请选择实验过程使用仪器的刻度",
      instrument_name:"请选择实验过程使用的仪器",
      other_err:"",
      data_show:[
       {name:"算术平均数",res:"NaN"},
       {name: "标准偏差",res:"NaN"},
       {name:"算术平均的标准偏差",res:"NaN"},
       {name:"b类不确定度",res:"NaN"},
       {name:"a类不确定度",res:"NaN"},
       {name:"总不确定度",res:"NaN"},
       {name:"总相对不确定度",res:"NaN"},
      ]
  },
  err_input(e){
    this.setData({other_err:e.detail.value})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //输入
  input(e){
    this.setData({
      experimentData:e.detail.value
    })
  },
  //b类不确定处理封装成一个函数
  process(instrument_name){
    let res = []

    if(instrument_name=="游标卡尺"){
      res.push("0.02mm","0.05mm","0.1mm")
      console.log(res)
      this.setData({
      //存储是否展示
      show:"choose",
      //存储刻度
      calibration:res
    })
    }
    if(instrument_name=="水银温度计"){
      res.push("0.2℃","0.1℃")
      console.log(res)
     this.setData({
      //存储是否展示
      show:"choose",
      //存储刻度
      calibration:res
    })
    }
    if(instrument_name=="其他"){
      this.setData({
        //存储是否展示
        show:"input",
        //存储刻度
        calibration:res
      })
    }
  },
  //提交表单前的数据处理
  computer(){
    let input_data = this.data.experimentData
    input_data=input_data.split(" ")
    console.log(input_data)
    let res = []
    let flag = 0
    input_data.forEach(element => {
      if(isNaN(Number(element))){
        flag=1        
      }
    res.push(Number(element))
  });
  if(flag==1){
    return "数据输入框格式错误"
  }
  else{
    if(res[0]==0){
      return "您还未输入数据"
    }
    return res
  }
  },
  //提交表单
  submit(){
    var that = this
  let res = this.computer()
  let result = {
    "experimentData":[],
    "b_":""
  }
  if(typeof(res)=="string"){
    wx.showToast({
      title:res,
      icon:"none"
    })
  }
  else{
    var that = this
    console.log(res)
    if(this.data.instrument_name=="游标卡尺"||this.data.instrument_name=="水银温度计"){
      console.log(that.data.calibrationItem)
      if(that.data.calibrationItem=="请选择实验过程使用仪器的刻度"){
        wx.showToast({
          title: '您还没选择刻度',
          icon:"none"
        })
      }
      let b_ = Number(that.data.calibrationItem.replace("mm","").replace("℃",""))
       result = {
        "experimentData":res,
        "b_":b_/(3**(1/2))
      }
      console.log(result)
    }
    if(this.data.instrument_name=="其他"){
      console.log(this.data.other_err)
      if(this.data.other_err/(3**(1/2))==0){
        wx.showToast({
          title: '请输入仪器误差',
          icon:"none"
        })
      }
      if(isNaN(this.data.other_err/(3**(1/2)))){
        wx.showToast({
          title: '仪器误差输入框格式错误,应为数字类型',
          icon:"none"
        })
      }
       result = {
        "experimentData":res,
        "b_":this.data.other_err/(3**(1/2))
      }
      console.log(result)
    }
    if(this.data.instrument_name=="钢直尺"||this.data.instrument_name=="钢卷尺"||this.data.instrument_name=="螺旋测微器"||this.data.instrument_name=="物理天平"||this.data.instrument_name=="TG928A矿山天平"||this.data.instrument_name=="读数显微镜"){

    //定义哈希表把所有情况列举时间复杂度最低
    let hash = {"钢直尺":0.1,"钢卷尺":0.5,"螺旋测微器":0.004,"物理天平":50,"TG928A矿山天平":5,"读数显微镜":0.004,}
    let b_ = hash[this.data.instrument_name]
     result = {
        "experimentData":res,
        "b_":b_/(3**(1/2))
      }
      console.log(result)
    }
    if(this.data.instrument_name=="请选择实验过程使用的仪器"){
      wx.showToast({
        title: '您还未选择实验仪器',
        icon:"none"
      })
    }
  }

  console.log(result)
//在这里进行异步请求加判断
  wx.request({
    url: 'https://www.biubbmk.cn/api_flask_zf/physical_Default',
    method:"POST",
    data:{
      arr:result.experimentData,
      ub:result.b_
    },
    success(res){
      that.setData({data_show:res.data})
    }
  })
  },
  //滚动事件
  bindMultiPickerChange: function (e) {
    let instrument_name = this.data.multiArray[e.detail.value]
    console.log(instrument_name)
    this.setData({
      multiIndex: e.detail.value,
      show:false,
      instrument_name,
      calibrationItem:"请选择实验过程使用仪器的刻度", //初始化防止后续干扰
      other_err:""
    })
    this.process(instrument_name)
  },
  bindpickerchange(e){
    this.setData({
      calibrationIndex: e.detail.value,
      calibrationItem:this.data.calibration[e.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  Check(){
    wx.navigateTo({
      url: "/pages/HOT/HotNoTop/HotNoTop?content=实验计算器二跳页"
    })
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