var utils = require("../../utils/time.js")
Component({
  properties: {
    list:{
        type: Array
    },
    currentTab:{
      type:Number
    }
  },
  data: {
    windowHeight: getApp().globalData.windowHeight,
    currentPage: 0,   // 当前第几页,0代表第一页 
    loadAll: false,   // 状态标志 - 是否加载完所有内容
    Label: '全部',    // 当前标签  
},
lifetimes: {
  ready(){
      const args = wx.getStorageSync('args');
      this.setData({
          iconUrl: args.iconUrl,
       
      })
  },
  attached: function() {
    //为什么这个list是空
    // 在组件实例进入页面节点树时执行
    let currentTab = this.properties.currentTab;

    let list_ = this.properties.list
    // list.forEach((i,item)=>{
    //   item.Time = utils.timeago(item.Time,'Y年M月D日')  
    // })
    this.setData({list_,currentTab})
  },
},
observers:{
  "list_,currentTab":function(list_,currentTab){  //监听函数回调
    if(list_&&list_.length>0){
      list_.forEach((item)=>{
        item.Time = utils.timeago(item.Time,'Y年M月D日')  
      })
      console.log(list_)
    } 
  }
},
methods: {
        
  init() {
      this.setData({
          currentPage: 0,
          list: [null]
      })
      
  },
  share(e){
    console.log(e)
  },
  getData() {
      let e = {
        currentPage:this.data.currentPage,  // 本组件当前第几页
        currentTab: this.properties.currentTab  // 本组件索引 - 方便标签选择
      }
      // 边界处理，拉到最底部时不允许再请求数据库
      if(this.data.loadAll) return;
      this.triggerEvent("getData",e);
      console.log("getData");
    },
  
    onShareAppMessage: function (e) {
      //我弄丢了 可以帮我看看吗
      //详情页面做转发朋友圈 
      console.log(e)
      if(e.from="button"){
        console.log(e.target.dataset.index)
        console.log(this.data.list)
        // let idx = e.target.dataset.index
        // console.log(idx)
        // console.log(this.data.card_data[idx])
        // wx.showShareMenu({
        //   withShareTicket: true,
        //   menus: ['shareAppMessage', 'shareTimeline']
        // })
        // return {
        //   title:this.data.card_data[idx].title?this.data.card_data[idx].title:this.data.card_data[idx].Text,
        //   imageUrl:this.data.card_data[idx].Cover,
        //   path:"pages/more/pages/"
        // }
      }
      if(e.from=="menu"){
        return {
          title:"",
          imageUrl:"",
          path:" "
        }
      }
    },

    

}
})