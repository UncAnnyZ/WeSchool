// 参考链接：https://juejin.cn/post/6953040813542604808
Component({
    properties: {
        AllPhoto:{
            type: Array
        }
    },
    data: {
        width:0,
        height:0,
    },
    lifetimes: {
        attached(){
            switch(this.data.AllPhoto.length){
                // 只有一张图片：根据宽高比显示
                case '1':
                    break;
                // 四张图片：四方格显示
                case '4':
                    break;
                // 其他情况：固定正方形显示
                default:
                    break;
            }
        },
    },
    methods: {
        
    }
})
