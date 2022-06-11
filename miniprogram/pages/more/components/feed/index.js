
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
  },

/**
 * 组件的初始数据
 */
data: {
  loadAll: false,   // 状态标志 - 是否加载完所有内容
},
observers: {

},
lifetimes: {
  
  ready() {
    let list = this.data.list;
    list = list.filter(e => {
      return e
    })
    console.log(list);
    
  }
},
methods: {
  //处理左右结构
  
}
})
