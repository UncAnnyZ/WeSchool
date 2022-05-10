Component({
  properties:{
    
  },
  methods:{
      //跳转详情页
      navigate(e){
        let index = e.currentTarget.dataset.index
        let content = this.data.list[index]
         // 先对数据进行 JSON
         let jsonStr = JSON.stringify(content);
         // 对数据进行URI编码，防止数据被截断。少量数据没问题，如果对象较大则容易被截断，获取不到完整数据
         let data = encodeURIComponent(jsonStr);
         wx.navigateTo({
           url: `/pages/more/pages/DetailContent/DetailContent?content=${data}`,
         })
      },
      
  }
})