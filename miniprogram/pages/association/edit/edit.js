// pages/association/edit/edit.js
let count = ""
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let count = options.count
    // if (count != 'guest') {
    //   count = Number(options.count)
    // }
    let that = this
    wx.showLoading({
      title: "查询中",
      mask: true,
      success: (result) => {
        // console.log(count);
        db.collection("associationApply").where({ count }).get().then(res => {
          // console.log(res);
          let dataObj = res.data[0].hostMess
          that.setData({
            listObj: [
              {
                title: "社团名称",
                value: dataObj.association,
                tap: "warnTip",
                name: "association"
              },
              {
                title: "管理员学号",
                value: dataObj.card,
                tap: "warnTip",
                name: "card"
              },
              {
                title: "管理员姓名",
                value: dataObj.name,
                tap: "getHandle",
                name: "name"
              },
              {
                title: "管理员电话",
                value: dataObj.phone,
                tap: "getHandle",
                name: "phone"
              },
            ]
          })
          wx.hideLoading();
        })
      },
    });
    // console.log(options.count);
  },
  // 不可修改警告
  warnTip() {
    wx.showToast({
      title: '不可修改',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {

      },
    });
  },
  // 提交表单
  formSubmit(e) {
    console.log(e);
    let newDate = e.detail.value
    let that = this
    wx.showLoading({
      title: "审核中",
      mask: true,
      success: (result) => {
        if ((newDate.association == that.data.listObj[0].value) == false) {
          wx.hideLoading();
          wx.showModal({
            title: '警告',
            content: '社团名称不可修改,需要修改请联系负责人。是否继续提交其余修改内容',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {
                // 提交
                search(newDate)
              }
            },
          });
        }
        else {
          search(newDate)
        }
        function search(newDate) {
          let card = (newDate.card == that.data.listObj[1].value)
          let name = (newDate.name == that.data.listObj[2].value)
          let phone = (newDate.phone == that.data.listObj[3].value)
          // let that=this
          if (card == true && name == true && phone == true) {
            wx.hideLoading();
            wx.showToast({
              title: '成功',
              icon: 'none',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {

              },
            });
          }
          else {
            // console.log(newDate.phone);
            db.collection("associationApply").where({ count: count }).update({
              data: {
                hostMess: {
                  "association": that.data.listObj[0].value,
                  "card": that.data.listObj[1].value,
                  "name": newDate.name,
                  "phone": newDate.phone
                }
              }
            }).then(res => {
              // console.log(res);
              wx.hideLoading();
              wx.showToast({
                title: '修改成功',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {

                },
              });
            })
          }
        }
      },
    });
    // console.log(e);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})