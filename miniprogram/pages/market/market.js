
const db = wx.cloud.database({env:'mall-7gi19fir46652cb4'})
var app = getApp()
let page=0
Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    goods: [],                  //所有商品的列表
    mydingdan: [], //订单
    mydindantotal: 0,
    skip: 0, //订单跳过前几条
    newuser: true,
    buy: [],                    //购物车内的商品列表
    totalprice: 0.00,           //购物车总价格，不可以删，否则下面的价格栏切换显示出现bug
    havelocation: false,
    menuList:[],                //菜单列表
    productGroups:[],           //最后用于展示在页面的商品列表
    bottomId:" ",               //用于实现点击菜单，商品列表进行滑动操作的索引
    scrollNum:-1                //用于实现对商品列表滑动，菜单标签出现对应选中的索引
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
                  // userlocation: userinfores.data[0].userlocation,
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
    // var self = this
    // var skip = self.data.skip
    // this.setData({
    //   userlocation: self.data.userlocation
    // })
    
    // if(!self.data.newuser){
    //   db.collection('dindan').where({
    //     _openid: app.globalData.openid
    //   }).count().then(totalres => {
   
    //     if (totalres.total > 20) {
    //       skip = totalres.total - 20
    //     }
    //     db.collection('dindan')
    //       .where({
    //         _openid: app.globalData.openid
    //       })
    //       .skip(skip)
    //       .limit(20)
    //       .get()
    //       .then(res => {
     
    //         self.setData({
    //           mydindantotal: totalres.total,
    //           mydingdan: res.data.reverse()
    //         })
    //         wx.hideNavigationBarLoading()
    //         wx.stopPullDownRefresh()
    //         console.log(res.data)
    //       })
    //       .catch(err => {
    //         wx.hideNavigationBarLoading()
    //         wx.stopPullDownRefresh()
    //         console.error(err)
    //       })
    //   })
    // }

    // wx.hideHomeButton();
    db.collection('order').orderBy('orderTime', 'desc').where({_openid: app.globalData.openid}).skip(page).limit(15).get().then(res => {
      this.setData({
        allOrders:res.data
      })
    });
  },

  /* 获取盒子的尺寸：宽度/距离顶部的高/距离左边的长度/... */
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

  /* 点菜/评论/商家 标签 */
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

  /* 点击菜单列表 */
  chooseLabel(e){
    this.data.menuList.map((item) => {
      item.type=0
    })
    this.data.menuList[e.currentTarget.id].type=1
    this.scrollTo(this.data.menuList[e.currentTarget.id].changeLabel)
  },

  /* 根据滑动页面的索引，来触发对应的函数，对上面的标签栏（菜单/评价/商家）进行动态渲染 */
  swiperChange(e){
    switch(e.detail.current){
      case 0: this.order(); break;
      case 1: this.comment(); break;
      case 2: this.business(); break;
    }
  },

   /* 菜单渲染 */
   menuRendering() {
     let count=0
     const menuList=this.data.menuList.map((item) => {
      let goodsList=this.data.goods.filter((item2) => {
        return item2.caidan===item.name
      })
      let obj={
        name:item.name,
        type:0,
        changeLabel:'changeLabel' + count ++,
        goodsList
      }
      return obj
    })
    menuList[0].type=1
    this.setData({
      menuList
    })
    wx.hideLoading()
  },

  /* 控制下面的商品滚动，当商品列表没占据全屏时，商品列表不滚动 */
  onPageScroll(e){
    let monitorScrolling=false
    e.scrollTop>=this.data.statusBarHeight+this.data.lineHeight+70 ? monitorScrolling=true : ''
    this.setData({
      monitorScrolling
    })
  },

  /* 当商品列表不占据全屏时，点击菜单列表，页面滚动，商品列表总体往上滑，占据全屏 */
  scrollTo(bottomId) {
    this.setData({
      choosen:true,
      menuList:this.data.menuList,
      monitorScrolling:true,
      bottomId
    })
    wx.createSelectorQuery().select('#labelControl').boundingClientRect(res => {
      if(res.top!=0){
        wx.pageScrollTo({
          scrollTop: res.top, // 滚动到的位置（距离顶部 px）
          duration: 500 //滚动所需时间 如果不需要滚动过渡动画，设为0（ms）
        })
      }
    }).exec()
  },

  /* 实现滚动商品列表，菜单列表出现对应的选中渲染 */
  trackingTag(e){
    let that=this
    const query = wx.createSelectorQuery()
    that.data.menuList.forEach((item) => {
      let changeLabel='#'+item.changeLabel
      query.select(changeLabel).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function(res){
        that.data.menuList.map((item) => {
          item.type=0
        })
        let we=res.find((item) => {
          return -(item.height)<item.top-30
        })
        if(we!=undefined){
          that.data.scrollNum= we.id.replace(/[^0-9]/ig,"");
          that.data.menuList[that.data.scrollNum].type=1
        }
      })
    })
    that.setData({
      menuList:that.data.menuList
    })
  },

  /* 在购物车图标添加商品 */
  oneaddgoods(e) {
    const inIndex=e.currentTarget.dataset.inindex
    const outIndex=e.currentTarget.dataset.outindex
    const buyIndex = this.data.buy.findIndex((item) => {
      return item.name===this.data.menuList[outIndex].goodsList[inIndex].name
    })
    if(buyIndex!=-1){
      this.data.buy[buyIndex].number += 1
    }else{
      let goods = {
        guige: false,
        id: this.data.menuList[outIndex].goodsList[inIndex].id,
        img: this.data.menuList[outIndex].goodsList[inIndex].img,
        name: this.data.menuList[outIndex].goodsList[inIndex].name,
        price: this.data.menuList[outIndex].goodsList[inIndex].price,
        discount: this.data.menuList[outIndex].goodsList[inIndex].discount,
        nowprice: this.data.menuList[outIndex].goodsList[inIndex].nowprice,
        shangpu: this.data.menuList[outIndex].goodsList[inIndex].shangpu, //所属商铺
        shopid: this.data.menuList[outIndex].goodsList[inIndex].shopid,
        number: 1, //用户购物车数量
        // index: this, //在goods列表里的index
      }
      this.data.buy.push(goods)
    }
    this.data.menuList[outIndex].goodsList[inIndex].number += 1
    this.buy()
  },
  orderPageJump(){
    wx.setStorage({
      key: "allOrders",
      data: {
        allOrders:this.data.allOrders
      }
    })
    wx.navigateTo({
      url:'../HOT/HotTest/HotTest?content=支付'
    })
  },

  /* 在购物车弹窗添加商品 */
  addgoods(e) {
    const index = e.currentTarget.id
    this.data.menuList.forEach((item) => {
      item.goodsList.map((item) => {
        if(this.data.buy[index].name===item.name){
          item.number += 1
        }
      })
    })
    this.data.buy[index].number += 1
    this.buy()
  },

  /* 在购物车弹窗删除商品 */
  reducenumber(e) {
    const index = e.currentTarget.id
    const name = this.data.buy[index].name
    this.data.buy[index].number === 1 ? this.data.buy.splice(index,1) : this.data.buy[index].number -= 1;
    this.data.menuList.forEach((item) => {
      item.goodsList.map((item) => {
        if(name===item.name){
          item.number -= 1
        }
      })
    })
    this.buy()
  },

  buy() {
    let numberSum = this.data.buy.reduce((numberSum, item) => {
      return numberSum + item.number;
    },0)
     // 购物车加购的商品价格（priceSum）加一
    let priceSum = this.data.buy.reduce((priceSum, item) => {
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
      menuList:this.data.menuList,
      buy:this.data.buy,
    })
  },
  
  /* 购物车弹出 */
  showModal() {
    if (this.data.buy.length != 0) {
      let payStyle = 'payHide'
      payStyle === undefined || payStyle === 'payHide' ? payStyle = 'payShow' : payStyle = 'payHide'
      this.setData({
        payStyle,
        modalName: !this.data.modalName,
        buy: this.data.buy,
      })
    }
  },

  /* 跳转支付 */
  pay() {
    wx.setStorage({
      key: "pay",
      data: {
        buy: this.data.buy,
        totalnumber: this.data.totalnumber,
        totalprice: this.data.totalprice,
      }
    })
    wx.navigateTo({
      url:'../HOT/HotTest/HotTest?content=支付'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

})