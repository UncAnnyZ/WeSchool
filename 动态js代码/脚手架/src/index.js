
const db = wx.cloud.database({env:'mall-7gi19fir46652cb4'})
let timeOut=0
Page({

  data: {
    allOrders:[],
    widthLength:0,
    leftLength:0
  },
  obtainTop(type){
    var that=this
    const query = wx.createSelectorQuery()
    query.select(type).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      that.setData({
        leftLength:res[0].left,
        widthLength:res[0].width,
      })
    })
  },
  showAllOrders(){
    this.obtainTop('#showAllOrders')
    this.setData({
      showAllOrdersHeight:550,
      unpaidHeight:400,
      paidHeight:400
    })
  },
  unpaid(){
    this.obtainTop('#unpaid')
    this.setData({
      showAllOrdersHeight:400,
      unpaidHeight:550,
      paidHeight:400
    })
  },
  paid(){
    this.obtainTop('#paid')
    this.setData({
      showAllOrdersHeight:400,
      unpaidHeight:400,
      paidHeight:550
    })
  },
  onLoad(){
    wx.getStorage({
      key:'allOrders',
      success: res => {
        console.log(res.data.allOrders);
        this.setData({
          allOrders:res.data.allOrders
        })
        this.showAllOrders()
      }
    })
  },
  

})