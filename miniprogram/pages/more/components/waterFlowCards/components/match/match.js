var app = getApp()
Component({
  properties: {
    item: {
      type: Object,
      value: [],
    },
    List: {
      type: Array,
      value: [],
    },
    openusername: {
      type: Object,
    },
    direction: {
      type: String,
      value: ""
    },
    type: {
      type: String,
      value: ""
    },
    time: {
      type: Number,
      value: Date.now()
    },
    // endTime: {
    //   type: Number,
    //   value: new Date(date)
    // }
    // data:{
    //   openusername:{}
    // }
  },
  lifetimes: {
    ready() {
      let content = this.data.item;
      console.log(content);
      let args = wx.getStorageSync('args');
      let character = {
        userName: args.username,
        iconUrl: args.iconUrl,
        nickName: args.nickName
      };
      let be_character = {
        userName: content.username,
        iconUrl: content.iconUrl,
        nickName: content.nickName
      }
      // console.log(content);
      this.setData({
        character, be_character,
      })
    },
    attached: function () {
    }
  },
  methods: {
    ShowContent: function (e) {
      //对数据进行更新
      // var assoMess = JSON.stringify(this.data.item.assoMess)
      // var Title = this.data.item.Title
      // var Text = this.data.item.Text
      // this.setData({
      // })
      let content = {
        _id: this.data.item._id,
        assoMess: this.data.item.assoMess,
        Title: this.data.item.Title,
        Text: this.data.item.Text,
        borderArr: this.data.item.borderArr,
        question: this.data.item.question,
        date: this.data.item.date,
        match_id: this.data.item.match_id,
        AllPhoto: this.data.item.AllPhoto
      }
      let jsonStr = JSON.stringify(content);
      // 对数据进行URI编码，防止数据被截断。少量数据没问题，如果对象较大则容易被截断，获取不到完整数据
      let data = encodeURIComponent(jsonStr);
      wx.navigateTo({
        // 从校园圈主页跳转
        url: `./pages/Match/Match?content=${data}`,
        // 从我的发布页面跳转
        fail() {
          wx.navigateTo({
            url: `../../pages/Match/Match?content=${data}`,
          })
        }
      })
    },
    onLazyLoad(info) {
    },
  }
})