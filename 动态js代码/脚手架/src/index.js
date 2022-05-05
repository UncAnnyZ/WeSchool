
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[
      {
        title:"美团外卖红包",
        label:"低价外卖",
        btn:"折扣购买",
        icon:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/logo.png?sign=71e2303e03df7c011e81f9dfd97197b9&t=1647496070",
        banner_img:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/meituan.png?sign=daa94d028da89f3ccf97c339e8bae823&t=1647496039",
        appid:"wxde8ac0a21135c07d",
        path:"/index/pages/h5/h5?lch=cps:waimai:5:401c6e8a33376657a4d076948b9d76ec:001:33:164009&f_userId=1&weburl=https%3A%2F%2Fclick.meituan.com%2Ft%3Ft%3D1%26c%3D2%26p%3DwTe5Vb5z7TbP&f_token=1"
      },
      {
        title:"小猴云印",
        label:"包邮打印",
        btn:"立即前往",
        icon:"https://s1.ax1x.com/2022/05/05/OepvPP.jpg",
        banner_img:"https://s1.ax1x.com/2022/05/05/Oepf4x.jpg",
        appid:"wxb3e463a958f8d3c6",
        path:"pages/home/home?channel_id=45"
      },
      {
        title:"饿了么外卖红包",
        label:"低价外卖",
        btn:"折扣购买",
        icon:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/logo%E9%A5%BF%E4%BA%86%E4%B9%88.jpg?sign=97c992a3809629ea111df917e9a86238&t=1647583943",
        banner_img:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/banner%E9%A5%BF%E4%BA%86%E4%B9%88.jpg?sign=f364558d08d2b3f224575946e99007d0&t=1647583992",
        appid:"wxece3a9a4c82f58c9",
        path:"taoke/pages/shopping-guide/index?scene=qeNArZu"
      },
      {
        title:"滴滴出行",
        label:"出行优惠",
        btn:"出行优惠",
        icon:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E6%BB%B4%E6%BB%B4logo.png?sign=0119ab9b99c5f3176651ffae113376a7&t=1647587260",
        banner_img:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/banner%E6%BB%B4%E6%BB%B4.jpg?sign=dc69bc70e8cf236ee2f0bea006931dec&t=1647585882",
        appid:"wxaf35009675aa0b2a",
        path:"/pages/index/index?scene=5GpM5ek&source_id=d4aa4f87823d4bd0a3e4"
      },
      {
        title:"花小猪",
        label:"出行优惠",
        btn:"出行优惠",
        icon:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E8%8A%B1%E5%B0%8F%E7%8C%AAlogo.png?sign=a93fac548b4c3d5655eed2e6c12262f6&t=1647586647",
        banner_img:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E8%8A%B1%E5%B0%8F%E7%8C%AAbanner.jpg?sign=48c7adf664419185031522c67c81716c&t=1647586190",
        appid:"wxd98a20e429ce834b",
        path:"/pages/chitu/index?scene=aL5PBdz&source_id=d4aa4f87823d4bd0a3e4"
      },
      {
        title:"高德打车",
        label:"出行优惠",
        btn:"出行优惠",
        icon:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E9%AB%98%E5%BE%B7logo.png?sign=a456fc2467252d9ee8ec113b36168a65&t=1647613418",
        banner_img:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E9%AB%98%E5%BE%B7banner.png?sign=ac713603a76a13d65a64b632a4bbc4ec&t=1647613403",
        appid:"wxbc0cf9b963bd3550",
        path:"shareActivity/basic_activity/page/BasicActivityPop/BasicActivityPop?page_id=4k1Khw5X8wy&gd_from=outside_coupon_&pid=mm_2466800074_2598700088_111938000345"
      },
      {
        title:"淘票票",
        label:"观影优惠",
        btn:"观影优惠",
        icon:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E6%B7%98%E7%A5%A8%E7%A5%A8logo.jpg?sign=701729ad4ee40744acc22ace245d65ab&t=1647613191",
        banner_img:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E6%B7%98%E7%A5%A8%E7%A5%A8banner.png?sign=95e8edbfeafaf160ac18ead009c64aba&t=1647613230",
        appid:"wx553b058aec244b78",
        path:"pages/index/index?sqm=dianying.wechat.taobaolianmeng.1.mm_2466800074_2598700088_111938000345&url=https%3A%2F%2Ft.taopiaopiao.com%2Fyep%2Fpage%2Fm%2Fstyuc69mu6"
      },
     
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  btn(e){
    console.log(e)
    console.log(e.currentTarget.id)
    let index = Number(e.currentTarget.id)
    console.log(index)
    let res = this.data.detail[index]
    console.log(res)
    wx.navigateToMiniProgram({
      appId: res.appid,
      path:res.path,
      success(res){
        console.log(res)
        console.log(111)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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