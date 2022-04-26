
const db = wx.cloud.database({env:'mall-7gi19fir46652cb4'})

Page({
  data: {
    weihu: false,
    guige: false,
    goodsguigekouwei: [],
    goodsguigekouwei2: [],
    goods: [],
    guigeindex: '0',
    guigeindex2: '0',
    shopyesno: true,
    mydingdan: [], //订单
    mydindantotal: 0,
    skip: 0, //订单跳过前几条
    newuser: true,
    /* --------------------- */
    buy: [], //购物车
    totalprice: 0,
    totalnumber: 0,
    /* ---------------------- */
    tabbar: true,
    havelocation: false,
    /* --------------------- */
    TabCur: '0',
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    data_show:[]
  },
  onLoad: function (option)  {
    console.log(option)
    var shop_id = 'uncanny'
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    var self = this

    db.collection('shop').doc(shop_id).get().then(res => {
 
      wx.setStorage({
        key: "shop",
        data: res.data
      })
      console.log("goods", res.data.goods);
      
      self.setData({
        shop_id: shop_id,
        caidan: res.data.caidan,
        goods: res.data.goods,
        goprice: res.data.goprice * 1,
        shopyesno: res.data.shopyesno,
        shopyesnoing: res.data.shopyesno,
        shopname: res.data.name,
        shopid: res.data.shopid,
      })
{
        console.log(123)
        /* if (nowtime >= "23:50" && nowtime <= "23:59") {
          self.setData({
            weihu: true,
            shopyesno: false,
          })
        } */
        // 调用云函数获取用户openid
        wx.cloud.callFunction({
          name: 'login',
          env:'mall-7gi19fir46652cb4',
          data: {},
          success: loginres => {
            console.log('[云函数] [login] user openid: ', loginres.result.openid)
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
                  havelocation: userinfores.data[0].havelocation
                })
                
                  self.onShow()
                  console.log(res.data.caidan, 1233)
                  self.caidanxuanran(res.data.caidan)
                
              } else {
                let args = wx.getStorageSync('args')
                db.collection('userinfo').add( {
                  data: {
                  _openid:loginres.result.openid,
                  username: args.username,
                  havelocation: false,
                  userlocation: {},
                  usertximg: args.iconUrl

                }}).then(
                  self.onShow()
                )
   
              }
            })
          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
          }
        })
      }
      console.log(res.data)
    })

  },
  onShow(e) {
    var self = this
    var skip = self.data.skip
    var userinfo =wx.getStorageSync('userinfo')
    this.setData({userlocation: userinfo.userlocation})
    
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
    
    console.log(this.data.mydingdan, '55')
    wx.hideHomeButton();
  },
  /* 菜单渲染 */
  caidanxuanran(e) {
    var caidan = e
    let list = [{}];
    for (let i = 0; i < caidan.length; i++) {
      list[i] = {};
      list[i].name = caidan[i].name;
      list[i].id = i;
      list[i].myid = caidan[i].myid;
    }
    console.log(list, 233)
    this.setData({
      list: list,
      listCur: list[0]
    })
      wx.hideLoading()
    
  },
  onReady() {

  },
  tabSelect(e) {
    this.setData({
      TabCur: String(e.currentTarget.dataset.id),
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    console.log("list",list);
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: String(list[i].id)
        })
        return false
      }
    }
  },
  /* 第一次添加购物车 */
  oneaddgoods(e) {
    var self = this
    var newuser = self.data.newuser
   console.log("newuser",newuser);
   console.log("e",e);
    if (newuser) {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000
      })
    } else {

      var index = e.currentTarget.id
      console.log("self.data.goods",self.data.goods);
      var goodsnumber = self.data.goods[index].number
      var goodsdata = "goodt[" + index + "].number"
      var buy = this.data.buy
      var goods = {
        guige: false,
        id: self.data.goods[index].id,
        img: self.data.goods[index].img,
        name: self.data.goods[index].name,
        price: self.data.goods[index].price,
        zhekou: self.data.goods[index].zhekou,
        nowprice: self.data.goods[index].nowprice,
        shangpu: self.data.goods[index].shangpu, //所属商铺
        shopid: self.data.goods[index].shopid,
        number: 1, //用户购物车数量
        index: index, //在goods列表里的index
      }
      buy.push(goods)
      self.data.goods[index].number += 1
      self.setData({
        buy: buy,
        [goodsdata]: goodsnumber + 1,
        goods: self.data.goods
      })
      console.log(goodsnumber + 1)
      self.buy(buy)
    }
  },
  /* 购物车+1 */
  addgoods(e) {
    var self = this
    var index = e.currentTarget.id
    // if (!self.data.goods[index].guige) {
    self.data.buy[index].number += 1
    self.data.goods[index].number += 1
    self.setData({
      buy: self.data.buy,
      goods: self.data.goods,
    })
    self.buy(buy)
    // } 
     // var goodsnumber = self.data.goods[index].number
    // var buy = self.data.buy
    // var goodsdata = "goods[" + index + "].number"
    // for (var i = 0; i < buy.length; i++) {
      //   if (buy[i].id == self.data.goods[index].id) {
      //     buy[i].number++;
      //   }
      // }
  },
  /* 购物车-1 */
  reducenumber(e) {
    var self = this
    var index = e.currentTarget.id
    if(self.data.buy[index].number === 1) {
      self.data.buy.splice(index,1)
    }else{
      self.data.buy[index].number -= 1;
      self.data.goods[index].number -= 1
    }
    // var goodsnumber = self.data.goods[index].number
    // var goodsdata = 'goods[' + index + '].number'
    // var buy = self.data.buy
    // for (var i = 0; i < buy.length; i++) {
    //   if (buy[i].id == self.data.goods[index].id) {
    //     if (buy[i].number == 1) {
    //       buy.splice(i, 1)
    //     } else {
    //       buy[i].number--;
    //       break;
    //     }
    //   }
    // }
   
    // if (goodsnumber > 0) {
    //   self.data.goods[index].number -= 1
    //   self.setData({
    //     buy: self.data.buy,
    //     // [goodsdata]: goodsnumber - 1,
    //     goods: self.data.goods
    //   })

    //     self.buy(self.data.buy)
      

    // }
    self.setData({
      buy: self.data.buy,
      // [goodsdata]: goodsnumber - 1,
      goods: self.data.goods
    })

    self.buy(self.data.buy)
    return res
  },
  /* 购物车规格+1 */
  guigeaddgoods(e) {
    var self = this
    var index = e.currentTarget.id
    var goods = self.data.goods
    var buy = self.data.buy
    for (var i = 0; i < goods.length; i++) {
      if (buy[index].id == goods[i].id) {
        var goodsnumber = goods[i].number
        var goodsdata = "goods[" + i + "].number"
        break;
      }
    }
    buy[index].number++;
    self.setData({
      buy: buy,
      [goodsdata]: goodsnumber + 1
    })

      self.buy(buy)
    
  },
  /* 购物车规格-1 */
  guigereducenumber(e) {
    var self = this
    var index = e.currentTarget.dataset.index
    var goods = self.data.goods
    var buy = self.data.buy
    for (var i = 0; i < goods.length; i++) {
      if (buy[index].id == goods[i].id) {
        var goodsnumber = self.data.goods[i].number
        var goodsdata = 'goods[' + i + '].number'
        if (buy[index].number == 1) {
          buy.splice(index, 1)
          break;
        } else {
          buy[index].number--;
          break;
        }
      }
    }
    if (goodsnumber > 0) {
      console.log(buy)
      self.setData({
        buy: buy,
        [goodsdata]: goodsnumber - 1
      })

        self.buy(buy)
      
    }
  },

  buy(buy) {
    // var totalprice = 0
    // var totalnumber = 0
    // for (var i = 0; i < buy.length; i++) {
    //   if(buy[i].zhekou){
    //     totalprice = totalprice + buy[i].number * buy[i].zhekouprice
    //   }else{
    //     totalprice = totalprice + buy[i].number * buy[i].nowprice
    //   }
    //   totalnumber = totalnumber + buy[i].number
    // }
    // 购物车加购的商品数量（numberSum）加一
    var numberSum = buy.reduce((numberSum, item) => {
      return numberSum + item.number;
    },0)
     // 购物车加购的商品价格（priceSum）加一
    var priceSum = buy.reduce((priceSum, item) => {
      return priceSum + item.number * item.nowprice;
      // return priceSum + item.number * (item.nowprice * item.zhekou * 0.1);      //---后期优化，无折扣商品：zhekou=10；有折扣商品：zhekou=zhekou*0.1
    },0)

    if (numberSum == 0) {
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
  },
  popUp: function () {          //控制卡片/评论弹窗
    var self=this
    var payStyle = 'payHide';
    // picker动画样式
    if (payStyle == undefined || payStyle == 'payHide') {
      payStyle = 'payShow'
    } else {
      payStyle = 'payHide'
    }
    self.setData({
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
  /* 商铺 */
  tabbarshop(e) {
    this.setData({
      tabbar: true
    })
  },
  /* 个人 */
  tabbaruser(e) {
    this.setData({
      tabbar: false
    })
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
  /* 选规格弹窗开启 */
  xuanguige(e) {
    var self = this
    var index = e.currentTarget.dataset.index
    var goodsname = self.data.goods[index].name
    var goodsguigekouwei = self.data.goods[index].guigekouwei
    var goodsguigekouwei2=self.data.goods[index].guigekouwei2
    self.setData({
      xuanguigegoodsindex: index,
      goodsname: goodsname,
      goodsguigekouwei: goodsguigekouwei,
      goodsguige2:self.data.goods[index].guige2,
      goodsguigekouwei2:goodsguigekouwei2,
      guige: true
    })
  },
  /* 选规格弹窗隐藏 */
  hidexuanguige(e) {
    var self = this
    self.setData({
      guige: false
    })
  },
  /* 选规格-口味 */
  guigekouwei(e) {
    this.setData({
      guigeindex: e.currentTarget.dataset.index
    })
  },
  guigekouwei2(e) {
    this.setData({
      guigeindex2: e.currentTarget.dataset.index
    })
  },
  /* 选规格加购物车 */
  guigeoneaddgoods(e) {
    console.log(13)
    var self = this
    var index = self.data.xuanguigegoodsindex
    var goodsnumber = self.data.goods[index].number
    var goodsdata = "good[" + index + "].number"
    var buy = this.data.buy
    if(self.data.goodsguige2){
      var name= self.data.goods[index].name + "(" + self.data.goodsguigekouwei[self.data.guigeindex] + ")"+ "(" + self.data.goodsguigekouwei2[self.data.guigeindex2] + ")"
    }else{
      var name= self.data.goods[index].name + "(" + self.data.goodsguigekouwei[self.data.guigeindex] + ")"
    }
    
    var goods = {
      guige: true,
      id: self.data.goods[index].id,
      img: self.data.goods[index].img,
      name: name,
      price: self.data.goods[index].price,
      zhekou: self.data.goods[index].zhekou,
      zhekouprice: self.data.goods[index].zhekouprice,
      nowprice: self.data.goods[index].nowprice,
      shangpu: self.data.goods[index].shangpu, //所属商铺
      shopid: self.data.goods[index].shopid,
      number: 1, //用户购物车数量
      index: index, //在goods列表里的index
    }
    buy.push(goods)
    self.setData({
      guige: false,
      buy: buy,
      [goodsdata]: goodsnumber + 1
    }, () => {
      self.buy(buy)
    })
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