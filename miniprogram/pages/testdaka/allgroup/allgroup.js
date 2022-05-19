// pages/testdaka/allgroup/allgroup.js
// let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 5 //每页显示多少数据 
Page({

    /**
     * 页面的初始数据
     */
    data: {   
        currentPage:0, // 当前第几页,0代表第一页 
        loadMore: false, //"上拉加载"的变量，默认false，隐藏  
        loadAll: false,//“没有数据”的变量，默认false，隐藏 
        statusBarHeight: getApp().globalData.statusBarHeight,
        lineHeight: getApp().globalData.lineHeight,
        room:[
          // {group_name: "四级考试",
          // imgUrl: "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/img/1649602315348-328",
          // introduce: "广油学子四级考试",
          // notice: "",
          // qxbq: "学习",
          // roomNum: 20,
          // username: "20034480214",
          // uuid: "6duXrVKFiRIEixYs27dOHDhQIECB",
          // wxname: "Start from scratch",
          // wxurl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3o46ibDQPmdTZsm8DoKREXRw/132",
          // _id: "636050766252ef0d051b82d961b72423",
          // _openid: "oS03t5SyomLzhLSdSPde5aBFoNJ0"}
          ]
    },
    back(){
      wx.navigateBack({
        delta: 1,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.showLoading({
        title: '加载中',
      })
      this.getData();
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
      // let currentPage = 0 // 当前第几页,0代表第一页this,set()
      this.setData({
        loadMore: false, //"上拉加载"的变量，默认false，隐藏  
        loadAll: false,//“没有数据”的变量，默认false，隐藏 
      })
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
      console.log("上拉触底事件")
      let that = this
      if (!that.data.loadMore&&!that.data.loadAll) {
        that.setData({
          loadMore: true, //加载中  
          loadAll: false //是否加载完所有数据
        });
        //加载更多，这里做下延时加载
        setTimeout(function() {
          that.getData()
        }, 2000)
      }else{
        console.log("所有数据加载完");
      }
    },
    getData(){ 
      let that = this;
      let currentPage = this.data.currentPage
      let loadAll = this.data.loadAll
      //第一次加载数据
      if (currentPage == 1) {
        this.setData({
          loadMore: true, //把"上拉加载"的变量设为true，显示  
          loadAll: false //把“没有数据”设为false，隐藏  
        })
      }
      //云数据的请求
      console.log("执行if");
      wx.cloud.database().collection("data_group_information")
        .skip(currentPage * pageSize) //从第几个数据开始
        .limit(pageSize)
        .get({
          success(res) {
            console.log('请求了数据库');
            // console.log(res.data);
            if (res.data && res.data.length > 0) {
              console.log("请求成功", res.data)
              //把新请求到的数据添加到dataList里  
              let list = that.data.room.concat(res.data)
              currentPage++
              that.setData({
                room: list, //获取数据数组    
                loadMore: false, //把"上拉加载"的变量设为false，显示
                currentPage:currentPage
              });
              if (res.data.length < pageSize) {
                that.setData({
                  loadMore: false, //隐藏加载中。。
                  loadAll: true //所有数据都加载完了
                });
                console.log("数据加载完了");
              }
            } else {
              that.setData({
                loadAll: true, //把“没有数据”设为true，显示  
                loadMore: false //把"上拉加载"的变量设为false，隐藏  
              });
            }
            wx.hideLoading();
          },
          fail(res) {
            console.log("请求失败", res)
            that.setData({
              loadAll: false,
              loadMore: false
            });
          }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})