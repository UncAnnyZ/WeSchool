// pages/association/components/assoCard/assoCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    go(e) {
      let count = e.currentTarget.dataset.assoindex
      wx.showLoading({
        title: "查询中",
        mask: true,
        success: (result) => {
          wx.cloud.database().collection("associationMess").where({ count }).get().then(res => {
            if (res.data[0].sendStatus == false) {
              wx.showToast({
                title: '该社团不在报名时间',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {
                  wx.hideLoading();
                },
              });
            }
            else {
              wx.cloud.callFunction({
                name: "associationSend",
                data: {
                  type: 7,
                  index: count + '社团'
                }
              }).then(res => {
                // console.log('222',res);
                wx.hideLoading();
                var content = JSON.stringify(res.result.data[0])
                try {
                  content = JSON.parse(JSON.stringify(res.result.data[0]))
                  if (content.CommentList) {
                    delete content.CommentList
                  }
                  content = JSON.stringify(content)
                } catch { }
                wx.navigateTo({

                  url: "/pages/more/pages/Freshman/Freshman?content=" + content,
                  fail() {
                    wx.navigateTo({
                      url: "/pages/more/pages/Freshman/Freshman?content=" + content,

                    })
                  }
                })
              })
            }
          })
        },
      });
    },
  }
})
