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
    person_info: {
      iconUrl: args.iconUrl?args.iconUrl:"cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/myself/个人头像_o (1).png",
      nickName: args.nickName?args.nickName:"游客",
      username: args.username?args.username:"guest",
      School: args.school?args.school:"游客登录",
    },
    list: [],
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
    currentPage: 0, //默认是0下拉就加载page++1
    scrollTop: 0,
    //消息提示默认为0
    NewInfo: 0,
    navigationBar: app.globalData.navigationBarHeight,
    offsetTop: 0,
    loadAll: false,
    theme:app.globalData.theme
  },

  onScroll(e) {
    // console.log(e.detail.scrollTop);
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
  load_detail() {
    var that = this
    if(args.username){
      wx.cloud.callFunction({
        name: "NewCampusCircle",
        data: {
          url: "myself",
          type: "get_fans",
          username: args.username,
          School: args.School
        },
        success(res) {
          console.log(res)
          if (!(res.result)) {
            return -1
          }
          if (res.result[0].data && res.result[0].data.length > 0 && res.result[1].data && res.result[1].data.length > 0) {
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
    }

  },
  //初始化
  init() {
    this.load_detail()
    //判断登录
    let args = wx.getStorageSync("args")
    console.log(args)

    //判断标签
    //把标签转化为要的形式
    let data = this.data
    if(args){
      let tabitem = args.tabitem ? args.tabitem.map((e, index) => {
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
      console.log(data.windowHeight)
      //测
      let currentWaterFlowHeight = data.windowHeight + 1200
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
  
    }
    //没有登录的情况下数据写死
    else{
      this.setData({
        tabitem:[{
          title:"全部",
          type:1
        }]
      })
    }
    console.log(this.data.tabitem)
  },
  getData() {
    let that = this
    let data = this.data
    let currentTab = data.currentTab
    let currentPage = data.currentPageArr[currentTab]
    let ShowId = data.tabitem[currentTab].title // 当前选择的标签名字
    let School = args.schoolName
    let currComponent = that.selectComponent(`#InfoFlowCards${currentTab}`);
    //  ? ("游客登录" ? "广东石油化工学院" : args.schoolName) : "广东石油化工学院"     // 边界处理 - 用户没登录时
    //拉取数据
    let username = args.username;

    if (currComponent.data.loadAll || currComponent.data.NoData) {
      console.log("已经拉到底了");
      return;
    }

    console.log(currentPage)
    wx.cloud.callFunction({
      name: "NewCampusCircle",
      data: {
        //标签
        type: "read",
        url: "myself",
        currentPage,
        ShowId,
        School,
        username //自己的学号
      }, success(res) {
        console.log(res)
        console.log(res.result)
        let allList = data.allList,
          currentPageArr = data.currentPageArr;
        if (res.result && res.result.data.length > 0) {
          //每一个showid里面第几页 数据结构数组存储
          currentPageArr[currentTab] = ++currentPage;
          // 添加新数据到 allList[currentTab] 里, 并更新全局变量
          allList[currentTab] = allList[currentTab].concat(res.result.data);
          allList.forEach((item, index) => {
            // 添加新数据到 list 里 
            item.forEach((item_, index_) => {
              //判断是否已经更新
              item_.Time_format = utils.timeago(item_.Time, 'Y年M月D日')

              // } 
            })

          })
          app.globalData.allList = allList;
          that.setData({
            [`allList[${currentTab}]`]: allList[currentTab]
          });

          //请求道的数据存在app里面
          // 数据少于一页时
          console.log(res.result.data)
          if (res.result.data.length < 15) {
            currComponent.setData({
              loadAll: true
            });
            console.log(currentTab);
            console.log(currComponent.data);
          }
          that.setData({
            allList
          });
        }
        else { //不存在数据时
         
            currComponent.setData({
              
              NoData:true,
              list: [],         // 避免显示“玩命加载数据”
              loadAll: true         // 显示“暂无数据”
            })
        }
        wx.createSelectorQuery()
          .select(`#InfoFlowCards${currentTab}`)
          .boundingClientRect(res => {
            // 避免高度过小
            res.height < 100 ? res.height = 100 : '';
            console.log(res.height)
            that.setData({
              currentWaterFlowHeight: res.height
            })
          })
          .exec()
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })

  },

  readFocus: function () {
    const args = wx.getStorageSync("args")
    wx.cloud.callFunction({
      name: 'NewCampusCircle',
      data: {
        url: 'focusControl',
        username: args.username,
        type: "findFocus"
      }, success: res => {
        console.log()
        this.setData({
          fansNum: res.result.data[0].focusNum,
          focusNum: res.result.data[0].fansNum
        })
      }
    })
  },

  readStar: function () {
    const args = wx.getStorageSync("args")
    let sum = 0
    wx.cloud.callFunction({
      name: 'NewCampusCircle',
      data: {
        url: 'myself',
        username: args.username,
        type: "readStar"
      }, success: res => {

        res.result.data.forEach((item) => {
          if (item.Star_User) {
            sum = sum + item.Star_User.length
          }
          else {
            return -1
          }
        })
        this.setData({
          StarNum: sum
        })

      }
    })
  },
  toFans: function (e) {
    console.log(e.currentTarget.dataset.type);
    wx.setStorage({
      key: "fansAndfocus",
      data: {
        fansNum: this.data.fansNum,
        focusNum: this.data.focusNum
      }
    })
    wx.navigateTo({
      url: '../../pages/myself/pages/fansAndfocus/fansAndfocus?type=focusNum'
  })
  },
  onLoad: function (e) {

    this.init()
    if(args){
    this.getData()
    }
  },

  onReachBottom() {
    wx.showLoading({
      title: '加载更多中',
      mask: true
    })
    // 请求数据库
    this.getData();

    wx.hideLoading();

  },
  //点赞更新消息的云函数
  update_star() {
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
  navigate({currentTarget:{dataset:{type}}}) {

    console.log(type);

    if (type == "tip") {
      wx.navigateTo({
        url: '/pages/more/pages/NewInfo/NewInfo',
      })
    }
    else if(type == "set"){
      wx.navigateTo({
        url: '/pages/myself/pages/page/page',
      })
    }
  },

  //预览图片
  img_pre(e) {
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
    var that = this
    wx.createSelectorQuery()
    .select(`#InfoFlowCards${currentTab}`)
    .boundingClientRect(res => {
      // 避免高度过小
      res.height < 100 ? res.height = 100 : '';
      console.log(res.height)
      that.setData({
        currentWaterFlowHeight: res.height
      })
    })
    .exec()
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
       // 判断登录
    app.loginState();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
    //没有登录的话
    if(args){
      this.getNewInfo()
      this.readFocus()
      this.readStar()
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
    console.log("下拉");
  },


  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function (e) {
    console.log(e)
    //不同组件分情况
    if (e.from = "button") {
      console.log(e.target.dataset.index)
      let type = e.target.dataset.type
      let index = e.target.dataset.index
      let content = this.data.allList[type][index]
      console.log(content)
      let jsonStr = JSON.stringify(content);
      // 对数据进行URI编码，防止数据被截断。少量数据没问题，如果对象较大则容易被截断，获取不到完整数据
      let data = encodeURIComponent(jsonStr);
      return {
        title: content.title || content.Text,
        imageUrl: content.Cover,
        path: `/pages/more/pages/DetailContent/DetailContent?content=${data}`,
      }
    }
  }
})