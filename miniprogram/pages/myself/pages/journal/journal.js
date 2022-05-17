var app =getApp()
const db = wx.cloud.database();
const journal = db.collection('journal');
var currentPage = 0 // 当前第几页,0代表第一页 
var pageSize = 10 //每页显示多少数据 
Page({
  data: {
    dataList: [], //放置返回数据的数组  
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false //“没有数据”的变量，默认false，隐藏  
  },
  //页面显示的事件
  onShow() {
    this.getData()
  },
  onLoad(){
    currentPage =0;
    pageSize =10
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function() {
    console.log("上拉触底事件")
    if (!this.data.loadMore) {
      this.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      });
      this.getData()
    }
  },
  //访问网络,请求数据  
  getData() {
    let that = this;
    //第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }
    //云数据的请求
    wx.cloud.database().collection("journal").orderBy('_updateTime','desc')
      .skip(currentPage * pageSize) //从第几个数据开始
      .limit(pageSize)
      .get({
        success(res) {
          if (res.data && res.data.length > 0) {
            console.log("请求成功", res.data)
            currentPage++
            //把新请求到的数据添加到dataList里  
            let list = that.data.dataList.concat(res.data)
            that.setData({
              dataList: list, //获取数据数组    
              loadMore: false //把"上拉加载"的变量设为false，显示  
            });
            if (res.data.length < pageSize) {
              that.setData({
                loadMore: false, //隐藏加载中。。
                loadAll: true //所有数据都加载完了
              });
            }
          } else {
            that.setData({
              loadAll: true, //把“没有数据”设为true，显示  
              loadMore: false //把"上拉加载"的变量设为false，隐藏  
            });
          }
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
})