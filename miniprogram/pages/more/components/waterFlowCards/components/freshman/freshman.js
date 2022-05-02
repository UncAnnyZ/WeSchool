var app = getApp()
class cardFunction {

}
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
    }
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
        character, be_character
      })
    },
    attached: function () {
      // let time=Date(Date.now()).toString().split("")
      // console.log(time);
    }
  },
  // attached(){
  //   console.log('666');
  // },
  methods: {
    ShowContent: function (e) {
      //对数据进行更新
      var content = JSON.stringify(this.data.item)
      try {
        content = JSON.parse(JSON.stringify(this.data.item))
        if (content.CommentList) {
          delete content.CommentList
        }
        content = JSON.stringify(content)
      } catch { }
      wx.navigateTo({

        url: "./pages/Freshman/Freshman?content=" + content,
        fail() {
          wx.navigateTo({
            url: "../../pages/Freshman/Freshman?content=" + content,

          })
        }
      })
    },
    allAsso: function () {
      wx.navigateTo({
        // url: '../../../../pages/allAsso/allAsso',
        url:'/pages/association/allAsso/allAsso',
        success: (result) => {

        },
      });
    },
    onLazyLoad(info) {
    },
  }
})