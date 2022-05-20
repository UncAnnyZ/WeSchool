
const db = wx.cloud.database();
let args = wx.getStorageSync("args")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //构造返回的result
    result:{
      school:args.school, //先写后面直接缓存读取
      xuehao:args.username,
      name:args.nickName,
      photo:args.iconUrl,
      sex:"",
      height:"",
      introduce:"",
      purpose:"",
      lisex:"",
      liheight:"",
      one:"",
      two:"",
      three:"",
      four:"",
      weixin_id:""
    },
    //构造问题
    li:[
      {question:"你的性别为",answer:[
        "男" , "女"
      ],state:1,qus:"sex"},  
      {question:"寻找对象性别",answer:[
        "男" , "女"
      ],state:1,qus:"lisex"},
      {question:"你通常",answer:[
        "与人容易混熟" , "比较沉静或矜持"
      ],state:1,qus:"one"}, 
      {question:"按程序做事",answer:[
        "合你心意" , "令你感到束缚"
      ],state:1,qus:"two"},
      {question:"哪些人更吸引你",answer:[
        "一个思维敏捷及非常聪颖的人" , "实事求是，具有丰富常识的人"
      ],state:1,qus:"three"},
      {question:"你倾向于",answer:[
        "重视感情多于逻辑" , "重视逻辑多于感情"
      ],state:1,qus:"four"},
      {question:"你的恋爱目的为",answer:[
        "找个陪伴" , "对爱情的向往","快餐式恋爱"
      ],state:3,idx:1,qus:"purpose"},

      {
        question:"请选择你的年龄",
        title:"请选择你的年龄",
        state:2,
        id:1,
        tip:false,
        height_array:[
            17,18,19,20,21,22,23,24,25
        ] ,
        qus:"age",
        height_index:0,
      },
 
      {
        question:"你的身高为",
        state:2,
        id:2,
        title:"请选择身高",
        tip:false,
        qus:"height",
        height_array:[
          120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
          131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141,
          142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152,
          153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163,
          164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174,
          175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185,
          186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196,
          197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207,
          208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218,
          219
        ] ,
        height_index:50,
      },
      {
        question:"你理想对象身高为",
        state:2,
        id:2,
        title:"请选择身高",
        tip:false,
        qus:"liheight",
        height_array:[
          120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
          131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141,
          142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152,
          153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163,
          164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174,
          175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185,
          186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196,
          197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207,
          208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218,
          219
        ] ,
        height_index:50,
      },

      {question:"自我描述",describe:"请输入自我描述(限定100字内)",state:4,qus:"introduce"},
      {question:"请输入你的微信号",describe:"此信息只用于给匹配对象展示",state:4,qus:"weixin_id"},

    ],
    input_content:"", //输入
    // res:[], // 存放答案
    //选择的id
    //id_作为指针
    id_:0,
    MbtiType:"",
    describe:"",
    click:0,
    animationData: {},
  },
  //下拉事件
  bindPickerChange(e){
    let id = Number(e.currentTarget.id)
    console.log(id)
    let id_ = this.data.id_
    let res = this.data.result
    console.log(e)
    setTimeout(() => {
      this.setData({
        click:false
      })
    console.log(Number(e.detail.value))
    let li = this.data.li
    console.log(li)
     li.forEach((el)=>{
      if(el.state==2&&el.id===id){
        el.tip=true
        el.height_index=Number(e.detail.value)
        res[li[id_].qus] = String(el.height_array[Number(e.detail.value)])  
      }
    })

    this.setData({li,id_:this.data.id_+1})
  },100)
  },
  //动画效果
  touchstartX(e) {
    console.log(e);
    this.setData({
        currentIndex: e.currentTarget.dataset.index
      });
      console.log( e.currentTarget.dataset.index)
      // 获取触摸Y坐标
      this.recordY = e.touches[0].clientY;
      
  },
  //选项MBTI
  choose_ans(e){
    this.setData({
      click:e.currentTarget.dataset.index
    })
    setTimeout(() => {
      this.setData({
        click:false
      })
     let index = Number(e.currentTarget.dataset.index)
     console.log(index)
    let count = this.data.id_
    let li = this.data.li
    let res = this.data.result
    console.log(li[count].answer)
    res[li[count].qus] = li[count].answer[index-1]
    console.log(res)
    count = count +1
    this.setData({id_:count,idx:index})

    }, 100);
    
  },
  //返回
  choose_return(){
    console.log('choose_return');
    if(this.data.id_>0){
      this.setData({id_:this.data.id_-1})
    }
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('mathed_time')){
      wx.navigateTo({
        url: '/pages/more/pages/Love/pages/detail/detail',
      })
    }
 
  },
  //下一题点击事件
  next(){
    if(this.data.li[this.data.id_].state==4){
      let input_type = this.data.li[this.data.id_]
      let result = this.data.result;
      result[input_type.qus] = this.data.input_content
      this.setData({result,input_content:"",id_:this.data.id_+1})
      if(this.data.id_>=this.data.li.length){
        var that = this
        let result = this.data.result
        let dict = {
          "女":"0",
          "男":"1",
          "找个陪伴":"1",
          "对爱情的向往":"2",
          "快餐式恋爱":"3"
        }  //映射表
        result["lisex"] = dict[result["lisex"]]
        result["sex"] = dict[result["sex"]]
        result["purpose"] =dict[result["purpose"]]
        //写ajax请求
        wx.request({
          url: 'http://124.220.186.143:86/romantic_upload',
          method:"POST",
          data:that.data.result,
          success(res){
            console.log(res)
            // if(res.data.code==="200"){
              let result = JSON.stringify( that.data.result)
              wx.navigateTo({
                url: '/pages/more/pages/Love/pages/detail/detail?state=1&&content='+result,
              })
            // }
            // else{
              // wx.showToast({
              //   title: '匹配异常',
              //   icon:"none"
              // })
            // }
          },
          fail(){
            wx.showToast({
              title: '服务器出错，请联系',
              icon:"none"
            })
          }
        })
      
      }
      return -1
    }
    this.setData({id_:this.data.id_+1})

 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },


  //输入
  input(e){
    this.setData({input_content:e.detail.value}) 
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