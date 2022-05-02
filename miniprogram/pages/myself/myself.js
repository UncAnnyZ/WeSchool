// pages/index/index.js
var utils = require("./utils/time.js")
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
let args = wx.getStorageSync("args")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    person_info:{
      iconUrl:args.iconUrl,
      nickName:args.nickName,
      username:args.username,
      School:args.School,
      focusNum:0,
      fansNum:0,
      StarNum:0
    },
    list:[],
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
    currentPage:0, //默认是0下拉就加载page++1
    scrollTop:0,
    //消息提示默认为0
    NewInfo:0, 
    navigationBar:app.globalData.navigationBarHeight,
    offsetTop: 0,
  },

  onScroll(e){
    //下滑事件
    let statusBarHeight = this.data.statusBarHeight,
    lineHeight = this.data.lineHeight;
    wx.createSelectorQuery()
    .select('.container')
    .boundingClientRect((res) => {
      this.setData({
        scrollTop: e.detail.scrollTop,
        offsetTop: res.top + statusBarHeight + lineHeight,
      });
    })
    .exec();

    
},
load_detail(){
  var that = this
  wx.cloud.callFunction({
    name:"NewCampusCircle",
    data:{
      url:"myself",
      type:"get_fans",
      username:"20024410137",
      School:args.School
    },
    success(res){
      console.log(res)
      if(res.result[0].data&&res.result[0].data.length>0&&res.result[1].data&&res.result[1].data.length>0){
        let fansNum = res.result[0].data[0].fansNum.length
        let focusNum = res.result[0].data[0].focusNum.length
        let person_info = that.data.person_info
        let StarNum = res.result[1].data.length
        console.log()
        person_info["focusNum"] = focusNum
        person_info["fansNum"] = fansNum
        person_info["StarNum"] = StarNum
        that.setData({
          person_info
        })
      }
      // console.log(res)
    }
  })
},
//初始化
init(){
  this.load_detail()
//判断登录
let args = wx.getStorageSync("args")
console.log(args)
app.loginState();
//判断标签
//把标签转化为要的形式
let data = this.data
let tabitem = args.tabitem? args.tabitem.map((e, index) => {
  if (index == 0) {
    return {
       title: e,
        type: 1
     }
    }
   return {
        title: e,
       type: 0
  }
 }) : data.tabitem,
// 初始化 currentPageArr 和 currentWaterFlowHeight
//相当于创建一个数组如果点击到数组中的某一项就可以改变
currentPageArr = tabitem.map(item => { return 0; }),
// 初始化封号
campus_account = args.campus_account ? args.campus_account : false,
describe = args.describe ? args.describe : false
console.log( data.windowHeight)
//测
let currentWaterFlowHeight = data.windowHeight+1200
 // 初始化 allList
let allList = tabitem.map((item, index) => {
  let allList = [];
  return allList[index] = []
});
if (campus_account === true) {
  wx.showModal({
    title: "提示",
    content: describe,
    showCancel: false,
    success(res) {
      if (res.confirm) {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    }
  })
}
this.setData({
  currentWaterFlowHeight,
  currentPageArr,
  currentTab: 0,            // 返回到第一个标签
  // showPopUps: false,        // 关闭弹窗
  tabitem,                  // 初始化标签
  campus_account,           // 初始化封号
  allList,                  // 初始化allList
  iconUrl: args.iconUrl,     // 获取头像
  school: args.school        // 获取学校
})
console.log(this.data.allList)

},
getData(){

  let that = this
  let data = this.data
  let currentTab = data.currentTab
  let currentPage = data.currentPageArr[currentTab]
  let ShowId = data.tabitem[currentTab].title // 当前选择的标签名字
  let School = args.schoolName ? ("游客登录" ? "广东石油化工学院" : args.schoolName) : "广东石油化工学院"     // 边界处理 - 用户没登录时
  //拉取数据
  let username = args.username
  console.log(ShowId)
  console.log(School)
  console.log(currentPage)
  wx.cloud.callFunction({
    name: "NewCampusCircle",
    //要新建云函数多加字段
    data: {
      //标签
      type: "read",
      url: "myself",
      currentPage,
      ShowId,
      School,
      username //自己的学号
    },success(res){
      console.log(res)
      let allList = data.allList,
      currentPageArr = data.currentPageArr;
      if(res.result && res.result.data.length > 0){

        //每一个showid里面第几页 数据结构数组存储
        currentPageArr[currentTab] = ++currentPage;
          // 添加新数据到 allList[currentTab] 里, 并更新全局变量
          allList[currentTab] = allList[currentTab].concat(res.result.data);
          allList.forEach((item,index)=>{
            // 添加新数据到 list 里 
            item.forEach((item_,index_)=>{
                     //判断是否已经更新
              if(typeof(item_.Time)=="number"){
              item_.Time = utils.timeago(item_.Time,'Y年M月D日')      

              } 
            })
  
           })
          app.globalData.allList = allList;
          console.log(allList)
     
                         //判断我是否点赞 
            //       item.star_state = 0 //没有点赞的状态
            //       if(item.Star_User){
            //         let star_arr = item.Star_User
            //         star_arr.forEach((items,index)=>{
            //           if(items.username&&items.username == username){
            //           item.star_state = 1
            //           }
            //         })
            //       }
            //     that.setData({card_all_data,card_data:card_all_data})
            //     console.log(that.data.card_data)
          // })
          console.log(allList)
          //请求道的数据存在app里面
          if (res.result.data.length < 10) {
            that.setData({
              loadAll: true,
              allList
            });
          }
      }
      else{ //不存在数据时
        console.log("err")
        allList[currentTab]=[]
        console.log(allList)
        that.setData({
          allList
        })
      }
    }
  })
 4
},
  onLoad: function (e) {

  
    console.log(app.globalData.navigationBarHeight)
    this.init()
    this.getData()
    // wx.showLoading({
    //   title: '数据请求加载中',
    // })
    // let username = this.data.person_info.username
    // var that = this
    // let list = this.data.list
    // wx.cloud.callFunction({
    //   name: "CampusCircle",
    //   data: {
    //     type: "readUser",
    //     currentPage: 0, //页数
    //     username: username //自己的学号
    //   },
    //   success(res){
    //     //构造一个能带人到卡片的一个数组
    //     //使用es6对获得的数组进行处理
    //     let card_all_data = res.result.data
    //     // 添加新数据到 list 里 
    //     list = list.concat(res.result.data);
    //     console.log(list, "list");
    //     that.setData({ list });
    //     card_all_data.forEach((item,index)=>{
    //       item.Time = utils.timeago(item.Time,'Y年M月D日')
    //       //判断我是否点赞 
    //       item.star_state = 0 //没有点赞的状态
    //       if(item.Star_User){
    //         let star_arr = item.Star_User
    //         star_arr.forEach((items,index)=>{
    //           if(items.username&&items.username == username){
    //           item.star_state = 1
    //           }
    //         })
    //       }
    //     })
    //     that.setData({card_all_data,card_data:card_all_data})
    //     console.log(that.data.card_data)
    //     wx.hideLoading()

    //   }
    // })
  },

  //点赞更新消息的云函数
  update_star(){
    let starTime = new Date().getTime(); // 点赞时间
    wx.cloud.callFunction({ // 云函数更改点赞状态
      name: "CampusCircle",
      data: {
        type: "StarControlLogs",
        Star_User: content.Star_User,       // 旧云函数 starCount 要用到
        character: that.data.character,
        be_character: that.data.be_character,
        createTime: starTime,
        arcticle: content,
      }
    }).then()
  },
  //点赞函数
   star_tap(e){
    //本地更新
    let index = Number(e.target.id)
    let card_val =  this.data.card_data[index]
    let user = this.data.person_info.username
    let star_detail =card_val.Star_User

    if(card_val.star_state==1){
      //点赞变成不点赞
      card_val.star_state = 0
      star_detail = star_detail.filter((e)=>{
         return e.username != user
      })
      this.data.card_data[index].Star_User = star_detail
      console.log(star_detail)
      this.setData({card_data:this.data.card_data})
    }
    else{
      //不点赞的变成点赞的
      card_val.star_state = 1
      star_detail.push({"username":user})
      console.log(star_detail)
      this.setData({card_data:this.data.card_data})
      wx.showToast({
        title: '点赞成功',
        icon:"none"
      })
    }

    //记得还要写数据库更新(先在这里操作数据库后面写到云函数避免影响到线上的)
    db.collection('Campus-Circle').where({_id:card_val._id}).update({
      data: {
        Star_User: star_detail  //更新后的
      },
      success: function(res) {
        console.log(res)
      }
    })
    //更新消息 （我觉得可以写两个异步过程用promise.all对性能进行优化）
    let starTime = new Date().getTime(); // 点赞时间
    //模拟缓存
    let be_character ={
      nickName:this.data.person_info.nickName,
      userName:this.data.person_info.username,
      iconUrl:this.data.person_info.iconUrl
    }
    let character = {
      nickName:card_val.nickName,
      userName:card_val.username,
      iconUrl:card_val.iconUrl
    } 
    wx.cloud.callFunction({ // 云函数更改点赞状态
      name: "CampusCircle",
      data: {
        type: "StarControlLogs",
        Star_User: card_val.Star_User,       // 旧云函数 starCount 要用到
        character,     //  card_val里面拿到 我觉得可以直接在后端做处理的这东西
        be_character, // 缓存拿到
        createTime: starTime,
        arcticle: card_val,
      }
    }).then()
  },

 
  //预览图片
  img_pre(e){
    wx.previewImage({
      current: e.target.id, // 当前显示图片的http链接
      urls: [e.target.id] // 需要预览的图片http链接列表
    })
  },
  //滑动事件
  waterChange(e) {
    let currentTab = e.detail.current,
      tabitem = this.data.tabitem.map((item, index) => {
        item.type = 0;
        if (index == currentTab) {
          item.type = 1;
        }
        return item;
      });
    this.setData({
      tabitem,
      currentTab
    })
    console.log(currentTab);
    this.switchTab(currentTab);
  },
  // 滑动选择标签  
  switchTab: function (e) {
    var currentTab = e;

    if (this.data.allList[currentTab].length) {
      console.log("页面已经有数据了，不请求数据库");
      return;
    } else {
      this.getData();
    }
  },
  //按钮事件
  setCurrentTab: function (e) {
    var currentTab = {
      detail: {
        current: e.detail.currentTarget.dataset.index
      }
    };
    this.waterChange(currentTab)
  },

    // 获取新消息通知数量
    getNewInfo() {
      var that = this;
      // 边界处理 - 未登录时
      if (!args.username) {
        return;
      }
      wx.cloud.database().collection('New-Information').where({
        'be_character.userName': args.username,
        status: 0
      }).count().then(res => {
        console.log(res)
        that.setData({
          NewInfo: res.total
        })
       console.log(that.data.NewInfo)

      })
    },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getNewInfo()
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
  onShareAppMessage: function (e) {
    if(e.from="button"){
      console.log(e.target.dataset.index)
      console.log(this.data.list)
  }}
})