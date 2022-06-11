
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

  leftList: [],     // 左列表
  rightList: [],    // 右列表
  leftH: 0,         // 当前左列表高度
  rightH: 0,        // 当前右列表高度
},
observers: {
  'list': function(val) {
    // console.log(val,"lwknekonw");
  }
},
methods: {
  //处理左右结构
  
}
})
