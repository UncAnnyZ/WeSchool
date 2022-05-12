
Component({
  properties: {
    // 需要渲染的弹幕数组
    dmList: {
      type: Array
    }
  },
  lifetimes: {
    ready() {
      const dmList = this.data.dmList;

     

    },
  },
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
  },

  methods: {

  }
})
