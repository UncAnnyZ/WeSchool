Component({
  data: {
    color: "#515151",
    selectedColor: "#DAA520",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/tabbar/主页.png",
        selectedIconPath: "/images/tabbar/主页_sel.png"
      },
      {
        pagePath: "/pages/curriculum/curriculum",
        text: "课表",
        iconPath: "/images/tabbar/课程表.png",
        selectedIconPath: "/images/tabbar/课程表_sel.png"
      },
      {
        pagePath: "/pages/record/record",
        bulge:true,
        iconPath: "/img/post.png",
        selectedIconPath: "/img/post-select.png"
      },
      {
        pagePath: "/images/tabbar/",
        text: "功能",
        iconPath: "/img/message.png",
        selectedIconPath: "/img/message-select.png"
      },
      {
        pagePath: "/pages/myself/myself",
        text: "我的",
        iconPath: "/images/tabbar/作者.png",
        selectedIconPath: "/images/tabbar/作者_sel.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url}) 
    }
  }
})