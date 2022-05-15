// pages/more/components/MoreModule/MoreModule.js
Component({
  properties: {

  },

  data: {

  },

  methods: {
    naviToPage(e) {
      let id = { id: e.currentTarget.id }
      this.triggerEvent('navigate', id)
    },
    showToast() {
      wx.showToast({
        title: '开发中,敬请期待~',
        icon: 'none'
      })
    }
  }
})
