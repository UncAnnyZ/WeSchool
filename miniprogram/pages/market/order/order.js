
const db = wx.cloud.database({env:'mall-7gi19fir46652cb4'})
let timeOut=0
Page({

  data: {
    allOrders:[],
    widthLength:0,
    leftLength:0,
    unpaidList:[],
    paidList:[],
  },
  obtainTop(type){
    var that=this
    const query = wx.createSelectorQuery()
    query.select(type).boundingClientRect()
    query.select('#scroll').boundingClientRect()
    query.select('#showAllOrders').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      if(type==='#labelControl'){
        that.setData({
          topH:res[0].height,
          swiperHeight:res[1].height*that.data.allOrders.length+100,
          leftLength:res[2].left,
          widthLength:res[2].width,
        })
      }else{
        that.setData({
          leftLength:res[0].left,
          widthLength:res[0].width,
        })
      }
    })
  },
  showAllOrders(){
    this.obtainTop('#showAllOrders')
    this.setData({
      allOrders:this.data.allOrders,
      navState:0,
      showAllOrdersHeight:550,
      unpaidHeight:400,
      paidHeight:400
    })
  },
  unpaid(){
    let unpaidList=this.data.allOrders.filter((item) => {
      return item.paymentStatus===false
    })
    this.obtainTop('#unpaid')
    this.setData({
      unpaidList,
      navState:1,
      showAllOrdersHeight:400,
      unpaidHeight:550,
      paidHeight:400
    })
  },
  paid(){
    let paidList=this.data.allOrders.filter((item) => {
      return item.paymentStatus===true
    })
    this.obtainTop('#paid')
    this.setData({
      paidList,
      navState:2,
      showAllOrdersHeight:400,
      unpaidHeight:400,
      paidHeight:550
    })
  },
  swiperChange(e){
    switch(e.detail.current){
      case 0: this.showAllOrders(); break;
      case 1: this.unpaid(); break;
      case 2: this.paid(); break;
    }
  },
  onLoad(){
    wx.getStorage({
      key:'allOrders',
      success: res => {
        this.data.allOrders=res.data.allOrders
        this.showAllOrders()
        this.obtainTop('#labelControl')
      }
    })
  },
})