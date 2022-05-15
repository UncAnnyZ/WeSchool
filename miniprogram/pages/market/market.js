
const db = wx.cloud.database({env:'mall-7gi19fir46652cb4'})
var app = getApp()
Page({
  data: {
    guige: false,
    goods: [],
    mydingdan: [], //订单
    mydindantotal: 0,
    skip: 0, //订单跳过前几条
    newuser: true,
    /* --------------------- */
    buy: [], //购物车
    totalprice: 0.00,
    // totalnumber: 0,
    /* ---------------------- */
    tabbar: true,
    havelocation: false,
    /* --------------------- */
    TabCur: '0',
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    data_show:[],
    menuList:[],
    productGroups:[],
    goodsList:[],
    bottomId:" "
  },

  onLoad: function (option)  {
    const args = wx.getStorageSync('args')
    var self = this
    this.order()
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    db.collection('shop').doc('uncanny').get().then(res => {
      wx.setStorage({
        key: "shop",
        data: res.data
      })
      self.setData({
        shop_id: 'uncanny',
        menuList: res.data.caidan,
        goods: res.data.goods,
        goprice: res.data.goprice * 1,
        shopname: res.data.name,
        shopid: res.data.shopid,
      })
    {
        wx.cloud.callFunction({
          name: 'login',
          env:'mall-7gi19fir46652cb4',
          data: {},
          success: loginres => {
            app.globalData.openid = loginres.result.openid
            db.collection('userinfo').where({
              _openid: loginres.result.openid
            }).get().then(userinfores => {
              if (userinfores.data.length > 0) {
                wx.setStorage({
                  key: "userinfo",
                  data: userinfores.data[0]
                })
                self.setData({
                  newuser: false,
                  username: userinfores.data[0].username,
                  usertximg: userinfores.data[0].usertximg,
                  userlocation: userinfores.data[0].userlocation,
                  havelocation: userinfores.data[0].havelocation,
                })
                self.obtainTop('#labelControl')
                self.menuRendering()
              } else {
                db.collection('userinfo').add({
                  data: {
                    _openid:loginres.result.openid,
                    username: args.username,
                    havelocation: false,
                    userlocation: {},
                    usertximg: args.iconUrl
                  }})
              }
              self.onShow()
              // self.getProductGroups()

              wx.getSystemInfo({
                success: function (res) {
                    //console.log('系统信息:', res);
                  self.setData({
                    windowWidth: res.windowWidth
                  })
                }
              });
            })
          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
          }
        })
    }
    })

  },

  onShow(e) {
    var self = this
    var skip = self.data.skip
    this.setData({
      userlocation: self.data.userlocation
    })
    
    if(!self.data.newuser){
      db.collection('dindan').where({
        _openid: app.globalData.openid
      }).count().then(totalres => {
   
        if (totalres.total > 20) {
          skip = totalres.total - 20
        }
        db.collection('dindan')
          .where({
            _openid: app.globalData.openid
          })
          .skip(skip)
          .limit(20)
          .get()
          .then(res => {
     
            self.setData({
              mydindantotal: totalres.total,
              mydingdan: res.data.reverse()
            })
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            console.log(res.data)
          })
          .catch(err => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            console.error(err)
          })
      })
    }

    wx.hideHomeButton();
  },

  obtainTop(type){
    var that=this
    const query = wx.createSelectorQuery()
    query.select(type).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      if(type==='#labelControl'){
        that.setData({
          topH:res[0].height,       // #the-id节点的上边界坐标
          windowHeight:wx.getSystemInfoSync().windowHeight
        })
      }else{
        that.setData({
          leftLength:res[0].left,
          widthLength:res[0].width,
        })
      }
    })
  },

  order(){
    this.obtainTop('#order')
    this.setData({
      order_2:550,
      comment_2:400,
      business_2:400,
      navState:0
    })
  },
  comment(){
    this.obtainTop('#comment')
    this.setData({
      comment_2:550,
      order_2:400,
      business_2:400,
      navState:1
    })
  },
  business(){
    this.obtainTop('#business')
    this.setData({
      comment_2:400,
      order_2:400,
      business_2:550,
      navState:2
    })
  },

  onReady() {

  },
  chooseLabel(e){
    var that=this
    that.data.menuList.map((item) => {
      item.type=0
    })
    that.data.menuList[e.currentTarget.id].type=1
    // this.scrollBottom()
    that.setData({
      choosen:true,
      menuList:that.data.menuList,
      bottomId: that.data.menuList[e.currentTarget.id].name,

    })
  },
  getProductGroups(){
    let productGroups=[]
    this.data.menuList.forEach((item) => {
      let goodsList=this.data.goods.filter((item2) => {
        return item2.caidan===item.name
      })
      let product={
        label:item.name,
        goodsList
      }
      productGroups.push(product)
    })
    this.setData({
      productGroups
    })
  },

  swiperChange(e){
    switch(e.detail.current){
      case 0: this.order(); break;
      case 1: this.comment(); break;
      case 2: this.business(); break;
    }
  },

   /* 菜单渲染 */
   menuRendering() {
    const menuList=this.data.menuList.map((item) => {
      // item.type=0
      let obj={
        name:item.name,
        type:0
      }
      return obj
    })
    this.setData({
      menuList
    })
    this.getProductGroups()
    wx.hideLoading()
  },

  trackingTag(){

  },
  // tabSelect(e) {
  //   this.setData({
  //     TabCur: String(e.currentTarget.dataset.id),
  //     MainCur: e.currentTarget.dataset.id,
  //     VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
  //   })
  // },
  // VerticalMain(e) {
  //   let that = this;
  //   let list = this.data.list;
  //   console.log("list",list);
  //   let tabHeight = 0;
  //   if (this.data.load) {
  //     for (let i = 0; i < list.length; i++) {
  //       let view = wx.createSelectorQuery().select("#main-" + list[i].id);
  //       view.fields({
  //         size: true
  //       }, data => {
  //         list[i].top = tabHeight;
  //         tabHeight = tabHeight + data.height;
  //         list[i].bottom = tabHeight;
  //       }).exec();
  //     }
  //     that.setData({
  //       load: false,
  //       list: list
  //     })
  //   }
  //   let scrollTop = e.detail.scrollTop + 20;
  //   for (let i = 0; i < list.length; i++) {
  //     if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
  //       that.setData({
  //         VerticalNavTop: (list[i].id - 1) * 50,
  //         TabCur: String(list[i].id)
  //       })
  //       return false
  //     }
  //   }
  // },

  /* 第一次添加购物车 */
  oneaddgoods(e) {
    const index = e.currentTarget.id
    if (this.data.newuser) {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      const buyIndex = this.data.buy.findIndex((item) => {
        return item.name===this.data.goods[index].name
      })
      if(buyIndex!=-1){
        this.data.buy[buyIndex].number += 1
      }else{
        let goods = {
          guige: false,
          id: this.data.goods[index].id,
          img: this.data.goods[index].img,
          name: this.data.goods[index].name,
          price: this.data.goods[index].price,
          discount: this.data.goods[index].discount,
          nowprice: this.data.goods[index].nowprice,
          shangpu: this.data.goods[index].shangpu, //所属商铺
          shopid: this.data.goods[index].shopid,
          number: 1, //用户购物车数量
          // index: this, //在goods列表里的index
        }
        this.data.buy.push(goods)
      }
      this.data.goods[index].number += 1
      this.buy(this.data.buy)
    }
  },
  /* 购物车+1 */
  addgoods(e) {
    const index = e.currentTarget.id
    this.data.buy[index].number += 1
    this.data.goods[index].number += 1
    this.setData({
      buy: this.data.buy,
      goods: this.data.goods,
    })
    this.buy(this.data.buy)
  },
  /* 购物车-1 */
  reducenumber(e) {
    const index = e.currentTarget.id
    if(this.data.buy[index].number === 1) {
      this.data.buy.splice(index,1)
    }else{
      this.data.buy[index].number -= 1;
    }
    this.data.goods[index].number -= 1
    this.setData({
      buy: this.data.buy,
      goods: this.data.goods
    })
    this.buy(this.data.buy)
  },

  buy(buy) {
    let numberSum = buy.reduce((numberSum, item) => {
      return numberSum + item.number;
    },0)
     // 购物车加购的商品价格（priceSum）加一
    let priceSum = buy.reduce((priceSum, item) => {
      return priceSum + item.number * item.nowprice;
      // return priceSum + item.number * (item.nowprice * item.zhekou * 0.1);      //---后期优化，无折扣商品：zhekou=10；有折扣商品：zhekou=zhekou*0.1
    },0)

    if (numberSum === 0) {
      this.setData({
        modalName: false
      })
    }

    this.setData({
      totalprice: priceSum.toFixed(2),
      totalTrue: priceSum.toFixed(2) < this.data.goprice,
      totalyuNumber: this.data.goprice - priceSum.toFixed(2),
      totalnumber: numberSum,
    })
    console.log("this.data.totalprice",this.data.totalprice);
  },
  popUp: function () {          //控制卡片/评论弹窗
    var payStyle = 'payHide';
    // picker动画样式
    if (payStyle == undefined || payStyle == 'payHide') {
      payStyle = 'payShow'
    } else {
      payStyle = 'payHide'
    }
    this.setData({
       payStyle,
    })
  },
  /* 购物车弹出 */
  showModal() {
    var self = this
    if (self.data.buy.length != 0) {
      self.popUp()
      self.setData({
        modalName: !this.data.modalName,
        buy: self.data.buy,
      })
    }
  },
  /* 地址设置 */
  userlocation(e) {
    var shop_id=this.data.shop_id
    console.log(shop_id)
    wx.navigateTo({
      url: '../HotTop/HotTop?content=地址&shop_id='+shop_id,
    })
  },
  /* 跳转支付 */
  pay(e) {
    console.log("pay");
    var self = this
    var buy = self.data.buy
    wx.setStorage({
      key: "pay",
      data: {
        buy: buy,
        totalnumber: self.data.totalnumber,
        totalprice: self.data.totalprice,
      }
    })
    wx.navigateTo({

      url: '../HotTop/HotTop?content=支付',
    })
  },
  /* 用户授权 */
  onGetUserInfo: function (e) {
    console.log(e)
    var self = this
    var openid = app.globalData.openid
    if (self.data.newuser && e.detail.userInfo) {
      wx.showLoading({
        mask: 'none',
        title: '用户信息建立中...',
      })
      db.collection('userinfo').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          username: e.detail.userInfo.nickName,
          usertximg: e.detail.userInfo.avatarUrl,
          userlocation: {},
          havelocation: false
        },
        success: function (res) {
          wx.setStorage({
            key: "userinfo",
            data: {
              _id: res._id,
              _openid: openid,
              username: e.detail.userInfo.nickName,
              usertximg: e.detail.userInfo.avatarUrl,
              userlocation: {},
              havelocation: false
            }
          })
          self.setData({
            newuser: false,
            username: e.detail.userInfo.nickName,
            usertximg: e.detail.userInfo.avatarUrl,
            userlocation: {},
            havelocation: false
          })
          console.log(res)
        },
        fail: console.error,
        complete: function (res) {
          wx.hideLoading()
        },
      })
    }
  },
  /* 下拉刷新 */
  onPullDownRefresh: function () {
    if (!this.data.tabbar) {
      wx.showNavigationBarLoading()
      this.onShow()
    } else {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
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
    // result=solve( (b * cos(radians(b1))) + (c * cos(radians(c1)))  - a, (b * sin(radians(b1))) - (c * sin(radians(c1))))
    // print(result,[b, c])
  },
  // select: function(e){
	// 	// console.log('当前导航：', e);
	// 	let _this = this,
	// 		nav = this.data.nav,
	// 		idx = e.currentTarget.id,
	// 		// width = nav.list[idx].name.length * 14,
	// 		windowWidth = this.data.windowWidth,
	// 		offsetLeft = e.target.offsetLeft;
	// 	// if (offsetLeft < windowWidth) {
	// 	// 	nav.left = width + 68 - windowWidth + offsetLeft;
	// 	// } else {
	// 	// 	nav.left = offsetLeft - windowWidth + width + 68;
	// 	// }
	// 	wx.createSelectorQuery().select('.scroll_item' + idx).boundingClientRect(function(res){
	// 		nav.active = idx;
	// 		// nav.width = res.width - 20;
	// 		nav.offsetLeft = offsetLeft + 11;
	// 		_this.setData({
	// 			nav: nav,
	// 		})
	// 		//可在这调用接口获取相应tab页的数据
	// 	}).exec();
	// }
})