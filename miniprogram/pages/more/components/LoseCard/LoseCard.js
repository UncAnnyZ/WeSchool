var app = getApp()
class cardFunction {

}
Component({

  properties: {
    item: {
      type: Object,
      value: [],
    },
    type: {
      type: String,
      value: ""
    },
    // 当前标签下标
    currentTab: {         // 用于点赞逻辑
      type: Number,
    }
  },
  data: {
    character: {},
    be_character: {},
  },
  
  lifetimes: {
    ready() {
      let content = this.data.item;
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
        character,be_character
      })
    },
  },
  methods: {
    ShowContent: function (e) {
      console.log(this.data.item.LoseState)
      //对数据进行更新
      // var content = JSON.stringify(this.data.item)
      let content = {
        AllPhoto: this.data.item.AllPhoto,
        CommentList: this.data.item.CommentList,
        Cover: this.data.item.Cover,
        CoverHeight: this.data.item.CoverHeight,
        CoverWidth: this.data.item.CoverWidth,
        Label: this.data.item.Label,
        LoseTime: this.data.item.LoseTime,
        LoseType: this.data.item.LoseType,
        LoseState:this.data.item.LoseState,
        Other: this.data.item.Other,
        School: this.data.item.School,
        ShowHeight: this.data.item.ShowHeight,
        SortTime: this.data.item.SortTime,
        Star: this.data.item.Star,
        Star_User: this.data.item.Star_User,
        Text: this.data.item.Text,
        Time: this.data.item.Time,
        Title: this.data.item.Title,
        campus: this.data.item.campus,
        iconUrl: this.data.item.iconUrl,
        nickName: this.data.item.nickName,
        username: this.data.item.username,
        _id: this.data.item._id,
      }
      console.log(content)
      let jsonStr = JSON.stringify(content);
      let data = encodeURIComponent(jsonStr);
      wx.navigateTo({
    
        url: `./pages/LoseDetailContent/LoseDetailContent?content=${data}`,
        fail(){
          wx.navigateTo({
          url: `../../pages/LoseDetailContent/LoseDetailContent?content=${data}`,
          
          })
        }
      })
    },
    
    onLazyLoad(info) {},
  }
})