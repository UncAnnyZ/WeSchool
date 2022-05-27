
const db = wx.cloud.database({env:'mall-7gi19fir46652cb4'})
let timeOut=0
Page({

  data: {
    shop:{name:''},
    buy:{buy:[]},
    userinfo:{userlocation:{}},
    remarks: '',
    picker: ['预约今天中午', '预约今天晚上', '预约明天中午', '预约明天晚上', ],
  },

  onShow: function (options) {
    let shop={}
    let buy={}
    let userinfo={}
    let oldindex=0
    let hours=new Date().getHours()
    const times=[11,17]
    wx.showLoading({
      title: '正在加载中',
      icon:'none'
    })
    times.forEach((item) => {
      if(hours>=item){
        oldindex += 1
      }
    })
    wx.getStorage({
      key:'shop',
      success: res => {
        shop=res.data
      }
    })
    wx.getStorage({
      key:'pay',
      success: res => {
        buy=res.data
      }
    })
    wx.getStorage({
      key:'userinfo',
      success: res => {
        userinfo=res.data
        this.setData({
          shop,
          buy,
          userinfo,
          oldindex,
          index:oldindex
        })
        wx.hideLoading()
      }
    })
  },
  /* 备注 */
  remarks(e) {
    console.log("e",e);
    this.setData({
      remarks: e.detail.value
    })
  },

  PickerChange(e) {
    if (this.data.oldindex <= e.detail.value) {
      this.setData({
        index: e.detail.value
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '不在规定时间内',
      })
    }
  },
  /* 地址设置 */
  location(e) {
    wx.navigateTo({
      url: '../HotTop/HotTop?content=地址&pay=' + true,
    })
  },

  newpay(e) {
    wx.showLoading({
      mask: true,
      title: '正在调起支付...',
    })
    var that=this
    let price=this.data.buy.totalprice*100
    if(JSON.stringify(this.data.userinfo.userlocation) != "{}"){
      let userInformation={
        userAddress: this.data.userinfo.userlocation.location, //地址
        userName: this.data.userinfo.userlocation.name,
        userTell: this.data.userinfo.userlocation.tell,
        userSchool: this.data.userinfo.userlocation.school, 
        userDormitory: this.data.userinfo.userlocation.sushehao,
      }
      let order = {
        _id: "A"+new Date().getTime()+ "F" + this.createNonceStr(),
        billingSituation: 0, //出单情况  0待出  1已出单
        orderTime:dayjs().format('YYYY-MM-DD') + ' ' + dayjs().format('HH:mm:ss'),  //下单时间
        userInformation,  //顾客信息
        shopId: this.data.shop.shopid, //商铺编号
        buy: this.data.buy.buy, //商品
        appointmentStatus: this.data.picker[this.data.index], //预约情况
        remarks: this.data.remarks, //备注
        totalNumber: this.data.buy.totalnumber, //总件数
        totalPrice: parseFloat(this.data.buy.totalprice), //总价
        paymentStatus:false
      }
      
      let jumpToThePage=function(){
        timeOut = setTimeout(() => {
          wx.reLaunch({
            url: '../HotTop/HotTop?content=商场&shop_id=' + that.data.shop._id,
          })
        }, 1500)
        console.log("timeOut",timeOut);
      }

      let changeTheState=function(){
        db.collection('order').where({
          _id: order._id
        }).update({
          data: {
            paymentStatus: true
          }
        })
        .then(res => {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          jumpToThePage()
        })
      }

      let paymentWindow = function(res) {
        wx.requestPayment(Object.assign(res.result.payment,{
          success:res =>{
            wx.hideLoading()
            changeTheState()
          }
        }))
      }

      let paymentInformation = function(){
        wx.cloud.callFunction({
          name: 'newpay',
          config: {
            env:'mall-7gi19fir46652cb4'
          },
          data: {
            buy: that.data.buy.buy,
            dingdan: order,
            outTradeNo: order._id,
            price,
          }
        })
        .then(res => {
          wx.hideLoading()
          paymentWindow(res);
        })
      }

      db.collection('order').add({
        data: order,
        success:res => {
          paymentInformation();
        }
      })
    }else{
      wx.showToast({
        icon: "none",
        title: '请添加送餐地址',
      })
    }
  },

  createNonceStr: function () {
    var str = "",
      range = 7, //min
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    /* if (true) {
      range = Math.round(Math.random() * (36 - 20)) + 20;
    } */
    for (var i = 0; i < range; i++) {
      var pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  },
  onUnload(){
    clearTimeout(timeOut)
  }

})