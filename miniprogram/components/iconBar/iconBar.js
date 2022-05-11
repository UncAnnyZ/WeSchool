Component({
  properties: {
    iconList: {
      type: Array,
      value: [],
      observer: '_onRefresh'
    }
  },

  methods: {
    _onRefresh(newVal, oldVal) { //这里只要父级值改变，就会执行

      var newiconList = wx.getStorageSync('configData').iconList || []
      var other_btn = wx.getStorageSync('other_btn')
      var other_iconList = other_btn.other_iconList || []
      // 处理旧数据
      // console.log(other_iconList, 2)
      other_iconList = other_iconList.filter(e => other_iconList.every(e1 => e1.id === e.id))
      console.log(other_iconList)
      newiconList = newiconList.filter(e => {

        var a = false;
        if ((other_iconList.every(e1 => e1.id === e.id))) {
   
          a = true
        }
        console.log(a)
        return a
      })
      newiconList = newiconList.filter(e => other_iconList.every(e1 => e1.name !== e.name))

      newiconList.forEach((e, index) => 
      {
          if(e.name === '更多'){
            newiconList[index] = newiconList.splice(newiconList.length - 1, 1, newiconList[index])[0];
          }
    
      })
      console.log(newiconList, 1)
      var other_btn = {
        other_iconList: other_iconList,
        iconList: newiconList
      }

      if (JSON.stringify(this.data.iconList) != JSON.stringify(newiconList)) {
        this.setData({iconList: newiconList})
      }

      wx.setStorageSync('other_btn', other_btn)

    }
  }

})