// pages/testdaka/addDakaChallenge/addDakaChallenge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputNum:0,
    maxlength:500,
    showDayNum:false,
    showDeadLine:false,
    checkboxarr:[
      { name: '7', value: '7' },
      { name: '14', value: '14' },
      { name: '21', value: '21' },
      { name: '30', value: '30' },
      { name: '60', value: '60' },
      { name: '90', value: '90' },
      { name: '180', value: '180' },
      { name: '365', value: '365' },
    ],
    disabled:false,
    inputDayPlaceholder:'自定义天数',
    showDay:true,
    checked:false,
    inputDayValue:'',
    showDeadLineDisabled:true,
    DeadLineValue:'请填写时间',
    showDeadLineInput:'',
    // 最后需要上传的数据在这里
    titleInput:'',
    textInput:'',
    checkboxValue:'请选择天数',
    DeadLine:'',
    DeadLineValue:'请填写时间',
  },
  //发布
  send(e){
    console.log(e);
    let titleInput = this.data.titleInput //标题
    let textInput = this.data.textInput //规则
    let checkboxValue = this.data.checkboxValue //累计打卡天数
    let DeadLine = this.data.DeadLine //长期有效还是截止时间
    let DeadLineValue = this.data.DeadLineValue //指定截止时间时要填写
    if (titleInput == '') {
      wx.showToast({
        title: '请填写标题',
        icon:'none'
      })
    } else if (textInput == '') {
      wx.showToast({
        title: '请填写规则',
        icon:'none'
      })
    } else if (checkboxValue == '请选择天数') {
      wx.showToast({
        title: '请选择累计打卡天数',
        icon:'none'
      })
    } else if (DeadLine == '') {
      wx.showToast({
        title: '请填写打卡截止时间',
        icon:'none'
      })
    } else if (DeadLineValue == '') {
      wx.showToast({
        title: '请填写打卡截止时间',
        icon:'none'
      })
    } else {
      console.log("数据填写完成");
      //上传数据库
    }
  },
  //标题输入
  titleInput(e){
    this.setData({
      titleInput:e.detail.value
    })
  },
  //规则输入
  textInput(e){
    console.log(e);
    this.setData({
      textInput:e.detail.value,
      inputNum:e.detail.cursor
    })
  },
  // 打卡截止时间弹窗
  bindChangeRadio(e){
    console.log(e.detail.value);
    if (e.detail.value == "longtime") {
      this.setData({
        DeadLine:e.detail.value,
        showDeadLineInput:"",
        showDeadLineDisabled:true
      })
    } else if (e.detail.value == "shorttime") {
      this.setData({
        DeadLine:e.detail.value,
        showDeadLineDisabled:false
      })
    }
  },
  showDeadLineInput(e){
    console.log(e.detail.value);
    this.setData({
      showDeadLineInput:e.detail.value
    })
  },
  confirmShowDeadLine(){
    let DeadLine = this.data.DeadLine
    let showDeadLineInput = this.data.showDeadLineInput
    console.log(showDeadLineInput);
    if (DeadLine == "longtime") {
      this.setData({
        DeadLineValue:"长期有效",
        showDeadLine:false
      })
    } else if (DeadLine == "shorttime" && showDeadLineInput != '') {
      //这里判断输入数据的合法性
      this.setData({
        DeadLineValue:this.data.showDeadLineInput,
        showDeadLine:false
      })
    } else if (showDeadLineInput == '' && DeadLine == "shorttime") {
      wx.showToast({
        title: '请填写指定截止时间',
        icon:'none'
      })
    }
  },
  tuiShowDeadLine(){
    this.setData({
      showDeadLine:false
    })
  },
  // 累计打卡天数弹窗
  inputDayinput(e){
    console.log(e.detail.value);
    this.setData({
      inputDayValue:Number(e.detail.value),
    })
  },
  inputDayfocus(){
    this.setData({
      inputDayPlaceholder:"输入1-336",
      // disabled:true,
      showDay:false,
      checked:false
    })
  },
  inputDayblur(){
    this.setData({
      inputDayPlaceholder:"自定义天数",
      disabled:false,
      // showDay:true
    })
    console.log(this.data.inputDayValue);
    console.log(typeof(this.data.inputDayValue));
    if (this.data.inputDayValue == '' || this.data.inputDayValue == null) {
      this.setData({
        showDay:true,
      })
    }
  },
  checkboxValue(e){
    this.setData({
      inputDayValue:'',
      checkboxValue:e.detail.value + "天",
      showDay:true
    })
    console.log(e.detail.value);
  },
  showDayNum(){
    this.setData({
      showDayNum:true
    })
  },
  showDeadLine(){
    this.setData({
      showDeadLine:true
    })
  },
  showDayNuConfirm(){
    if (this.data.inputDayValue != "" && (this.data.inputDayValue > 366 || this.data.inputDayValue < 1)) {
      wx.showToast({
        title: "请输入1-366",
        icon:"none",
      })
    } else {
      this.setData({
        showDayNum:false,
      })
      if (this.data.inputDayValue != "") {
        this.setData({
          checkboxValue:this.data.inputDayValue + "天"
        })
      }
    }
  },
  tuiShowDayNum(){
    this.setData({
      showDayNum:false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})