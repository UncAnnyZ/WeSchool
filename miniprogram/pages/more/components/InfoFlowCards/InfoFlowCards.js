// pages/more/components/InfoFlowCards/InfoFlowCards.js
Component({
    properties: {
        list:{
            type: Array
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
            console.log(this.data.list);
            this.setData({
                iconUrl: args.iconUrl,
            })
        }
    },
    methods: {
        
        init() {
            this.setData({
                currentPage: 0,
                list: [null]
            })
            
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
    }
})
