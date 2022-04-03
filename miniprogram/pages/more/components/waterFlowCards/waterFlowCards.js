
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      // 用于滑动逻辑
      tabitem: {
        type: Array,
        value: []
      },
      height:{
        type: String,
        value: ''
      },
      // 当前组件需渲染的数据
      list: {
        type: Array,
        value: []
      },
      // 本组件的下标 
      currentTab: {
        type: Number
      },
      // 控制可否滑动
      ifScroll: {
        type: Boolean,
        value: false
      }
    },

  /**
   * 组件的初始数据
   */
  data: {

    currentPage: 0,   // 当前第几页,0代表第一页 
    loadAll: false,   // 状态标志 - 是否加载完所有内容
    Label: '全部',    // 当前标签

    leftList: [],     // 左列表
    rightList: [],    // 右列表
    leftH: 0,         // 当前左列表高度
    rightH: 0,        // 当前右列表高度
  },
  lifetimes: {
    ready() {
      this.selectComponent('.content')
    }
  },
  methods: {
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
    //处理左右结构
    RightLeftSolution(empty = false) {
      if (empty) {
        this.setData({
          currentPage: 0,
          leftList: [],
          rightList: [],
          leftH: 0,
          rightH: 0,
          list: [null],
        })
        return
      }

      let currentTab = this.properties.currentTab;
      let list = this.data.list;
      console.log(list,"丢入瀑布流的数据");
      // 边界处理
      if(list[0] == null) return;
      // 兼容 “我的发布” 页面，这个页面没有 currentTab
      if(currentTab) {
        // 边界条件 - 存在即赋值，不存在即初始化
        if(getApp().globalData.allList) {
          getApp().globalData.allList[currentTab] = list;
        }else {
          let allList = new Array(this.properties.tabitem.length);
          getApp().globalData.allList = allList;
        }
      }

      for (let i = 0; i < list.length; i++) {
        // 兼容点赞/评论
        this.data.leftList.forEach(e => {
          if(e._id === list[i]._id) {
            e.Star_User = list[i].Star_User;
            e.CommentList = list[i].CommentList;
          }
        })
        this.data.rightList.forEach(e => {
          if(e._id === list[i]._id) {
            e.Star_User = list[i].Star_User;
            e.CommentList = list[i].CommentList;
          }
        })
        // 边界判断: 如果该数据在页面中已存在，则continue
        if (this.data.leftList || this.data.rightList) {
          // 无法直接对比对象，因此拿到文章id进行比较
          let leftListID = this.data.leftList.map(item => {
            return item._id
          })
          let rightListID = this.data.rightList.map(item => {
            return item._id
          })
          if (leftListID.includes(list[i]._id) || rightListID.includes(list[i]._id)) {
            continue
          }
        }
        // 判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
        if (this.data.leftH <= this.data.rightH) { 
          this.data.leftList.push(list[i]);
          this.data.leftH += list[i].ShowHeight;
        } else {
          this.data.rightList.push(list[i]);
          this.data.rightH += list[i].ShowHeight;
        }
      }
      
      this.setData({
        leftList: this.data.leftList,
        rightList: this.data.rightList,
      })
      console.log(this.data.leftList,this.data.rightList,"左右列表");
    },
  }
})
