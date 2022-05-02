Page({
    data: {
        ismanage: false, //判别状态
        manage_text: "管理",

        before_IconList: [], //点击取消，还原之前的首页按钮数组
        before_other_iconList: [], //点击取消，还原之前的其余按钮数组
        iconList: [], //首页按钮
        other_iconList: [], //其余按钮
        inform: [],

        //移动排序数据
        disable: true, //判断是否移动
        list: [],
        //移动
        itemTransition: false,
        //列数、行数
        columns: 5,
        rows: 0,
        //按钮框高度、宽度
        itemWrapHeight: 0,
        //itemWrapWidth: 0,
    },

    //界面初始，读取首页按钮缓存、其余按钮缓存
    onShow: function (options) {
        //从缓存中或取iconList
        var that = this
        var other_btn = wx.getStorageSync('other_btn')
        that.setData({
            other_iconList: other_btn.other_iconList,
            iconList: other_btn.iconList
        })
        this.init(); //按钮排序坐标初始化
    },

    //管理按钮，turn时触发移除、增加按钮；false时禁用
    Manage: function () {
        let init_other_iconList = JSON.parse(JSON.stringify(this.data.other_iconList))
        let init_iconList = JSON.parse(JSON.stringify(this.data.list))

        if (this.data.ismanage) {
            this.setData({
                ismanage: false,
                manage_text: "管理",
                list: this.data._iconList,
                // iconList: this.data.before_IconList,
                other_iconList: this.data._other_iconList
                // iconList:init_iconList,
                // other_iconList:init_other_iconList
            })
            this.getWidth_Height()
            //刷新按钮排序也可以用这个函数
            this.getAfterRemove_Btn_Position(this.data.list);
        } else {
            this.setData({
                ismanage: true,
                manage_text: "取消",
                _iconList: init_iconList,
                _other_iconList: init_other_iconList
            })
        }
    },

    //需求将obj这个对象拷贝出一个新对象修改新对象的值不会影响原对象的值
    //定义一个函数

    //移除按钮，把首页按键移除到其余按键
    remove_click: function (e) {
        var id = e.currentTarget.id
        var arr = JSON.parse(JSON.stringify(this.data.list)) //上图标
        var other_arr = JSON.parse(JSON.stringify(this.data.other_iconList)) //下图标
        // console.log(arr,other_arr);

        other_arr.push(arr[id].data)
        arr.splice(id, 1)
        // console.log(arr);

        let list = this.getAfterRemove_Btn_Position(arr)

        //console.log(list)

        this.setData({
            other_iconList: other_arr,
            list: list
        })

        this.getWidth_Height();
    },

    //增加按钮,把其余按键添加到首页按键
    add_click: function (e) {
        var id = e.currentTarget.id
        var arr = JSON.parse(JSON.stringify(this.data.list))
        var other_arr = JSON.parse(JSON.stringify(this.data.other_iconList))

        let data = this.getAdd_Btn_Position(other_arr[id]);



        arr.push(data)
        other_arr.splice(id, 1)

        arr.forEach((e, index) => {
            if (e.data.name === '更多') {
                arr[index] = arr.splice(arr.length - 1, 1, arr[index])[0];
            }

        })

        this.setData({
            other_iconList: other_arr,
            list: arr
        })

        this.getWidth_Height(); //根据按键数，更改按钮框体大小

    },

    //保存排序，回到初始状态
    save: function () {
        var that = this

        //将list里面的data提取出来，赋值到iconList保存到手机内存上
        let iconList = []
        let list = that.data.list.forEach(item => {
            //iconList.push(item.data)
            //因为移动会打乱数据排序，为了保存打乱的数据排序，要用item.key
            iconList[item.key] = item.data
        })
        //避免深存储无法更改数据
        this.setData({
            iconList: iconList
        })

        var arr = JSON.parse(JSON.stringify(this.data.iconList)) //上图标
        var other_arr = JSON.parse(JSON.stringify(this.data.other_iconList)) //下图标

        //console.log(that.data.iconList)
        let bb = {
            other_iconList: that.data.other_iconList,
            iconList: iconList,
        }
        wx.setStorageSync('other_btn', bb)
        //回到初始状态
        that.setData({
            ismanage: false,
            manage_text: "管理",
            _iconList: arr,
            _other_iconList: other_arr
        })
    },

    /**
     *移动排序代码
     *实现思路：
     *一、初始化init()， 
     **/
    init: function () {
        let list = this.data.iconList.map((item, index) => {
            let data = {
                key: index,
                tranX: 0,
                tranY: 0,
                data: item
            }
            return data
        });
        this.setData({
            list: list,
        });

        // 获取每一项的宽高等属性
        this.createSelectorQuery().select(".iconn").boundingClientRect((res) => {

            let rows = Math.ceil(this.data.list.length / this.data.columns); //获取行数

            this.item = res;

            this.getPosition(this.data.list, false);

            let itemWrapHeight = rows * res.height;

            //console.log("行数、按钮高度、按钮框体高度", rows, res.height, itemWrapHeight);

            
            //let itemWrapWidth = this.data.columns * res.width;
            //console.log("按钮框体高度、宽度", itemWrapHeight, itemWrapWidth);

            this.setData({
                itemWrapHeight: itemWrapHeight,
                //itemWrapWidth: itemWrapWidth
            });
        }).exec();
    },

    /**
     * 长按触发移动排序
     */
    longPress(e) {
        //console.log(1111)
        //长按直接触发管理事件manage
        if (!this.data.ismanage) this.Manage();

        let list = []

        this.data.list.forEach((item) => {
            list[item.key] = item
        })

        this.setData({
            list:list,
            disable: false
        });

        //console.log(e)

        this.startX = e.changedTouches[0].pageX
        this.startY = e.changedTouches[0].pageY

        let index = e.currentTarget.id;
        //console.log(index)
        //console.log("key",this.data.list[index].key)

        //console.log("long",index)
        if (this.data.columns === 1) { // 单列时候X轴初始不做位移
            this.tranX = 0;
        } else { // 多列的时候计算X轴初始位移, 使 item 水平中心移动到点击处
            this.tranX = this.startX - this.item.width / 2 - 8;
        }

            // 计算Y轴初始位移, 使 item 垂直中心移动到点击处
        this.tranY = this.startY - this.item.height / 2 - 40;

        //console.log("计算后X/Y坐标",this.tranX, this.tranY);

        this.setData({
            cur: index,
            //curZ: index,
            tranX: this.tranX,
            tranY: this.tranY,
        });

        wx.vibrateShort();
    },
    
    touchMove(e) {
        if (this.data.disable) return; //如果不可动，直接返回

        //console.log(e)

        let tranX = e.touches[0].pageX - this.startX + this.tranX,
            tranY = e.touches[0].pageY - this.startY + this.tranY;

        // let tranX = e.detail.x,
        //     tranY = e.detail.y;
        

        this.setData({
            tranX: tranX,
            tranY: tranY
        });

        //console.log(e);
        //触发拖到事件时，setdata无法更改e.currentTarget.id，只能读取数组中的key
        //否则会触发if (originKey == endKey || this.originKey == originKey) return;，结果无反应
        let originKey = this.data.list[e.currentTarget.id].key;

        //console.log("点击的index", originKey)
        let endKey = this.calculateMoving(tranX, tranY);
        //console.log(e)
        //console.log("id",this.originKey,originKey,endKey)
        //console.log("移动到的位置", endKey)
        // 防止拖拽过程中发生乱序问题
        if (originKey == endKey || this.originKey == originKey) return;

        this.originKey = originKey;

        this.insert(originKey, endKey);
    },

    /**
     * 根据当前的手指偏移量计算目标key
     */
    calculateMoving(tranX, tranY) {
        let rows = Math.ceil(this.data.list.length / this.data.columns) - 1,
            i = Math.round(tranX / this.item.width),
            j = Math.round(tranY / this.item.height);

        i = i > (this.data.columns - 1) ? (this.data.columns - 1) : i;
        i = i < 0 ? 0 : i;

        j = j < 0 ? 0 : j;
        j = j > rows ? rows : j;

        let endKey = i + this.data.columns * j;

        endKey = endKey >= this.data.list.length ? this.data.list.length - 1 : endKey;

        return endKey
    },

    touchEnd() {
        if (this.data.disable) return;

        this.clearData();
    },

    // /**
    //  * 根据排序后 list 数据进行位移计算
    //  */
    getPosition(data, vibrate = true) {
        let list = data.map((item, index) => {
            item.tranX = this.item.width * (item.key % this.data.columns);
            item.tranY = Math.floor(item.key / this.data.columns) * this.item.height;
            // console.log(item.key)
            //console.log("每个按钮的坐标", item.tranX, item.tranY);
            return item
        });

        this.setData({
            list: list
        });

        //console.log("list",this.data.list)

        if (!vibrate) return;

        wx.vibrateShort();

        //let listData = []
        let iconListData = []

        list.forEach((item) => {
            //console.log("item",item)
            //listData[item.key] = item
            iconListData[item.key] = item.data
        });

        this.setData({
            //list: listData,
            iconList: iconListData
        })
    
        //this.triggerEvent('change', {list: listData});
     //console.log("list",this.data.list)
    },

    //去除一个按键，重新计算其余按键排序
    //刷新按钮坐标排序也可以用这个函数
    getAfterRemove_Btn_Position(data) {
        let list = data.map((item, index) => {
            item.key = index
            item.tranX = this.item.width * (item.key % this.data.columns);
            item.tranY = Math.floor(item.key / this.data.columns) * this.item.height;
            return item
        });

        return list
    },

    //增加一个按键，需计算其的位置x、y，直接调用init造成渲染重复
    getAdd_Btn_Position(data) {
        console.log(this.data.list.length)
        let list = {
            data: data,
            key: this.data.list.length,
            tranX: this.item.width * (this.data.list.length % this.data.columns),
            tranY: Math.floor(this.data.list.length / this.data.columns) * this.item.height
        };

        return list
    },


    //根据按键数，更改按钮框体大小
    getWidth_Height: function () {
        let rows = Math.ceil(this.data.list.length / this.data.columns); //获取行数

        let itemWrapHeight = rows * this.item.height;

        let itemWrapWidth = this.data.columns * this.item.width;

        this.setData({
            itemWrapHeight: itemWrapHeight,
            itemWrapWidth: itemWrapWidth
        });
    },

    insert: function (origin, end) {
        let list
        if (origin < end) {
            list = this.data.list.map((item) => {
                //console.log("item",item)
                if (item.key > origin && item.key <= end) {
                    item.key = item.key - 1;
                } else if (item.key == origin) {
                    item.key = end;
                }
                return item
            });
            this.getPosition(list);
        } else if (origin > end) {
            list = this.data.list.map((item) => {
                if (item.key >= end && item.key < origin) {
                    item.key = item.key + 1;
                } else if (item.key == origin) {
                    item.key = end;
                }
                return item
            });
            this.getPosition(list);
        }
    },
    /**
     * 清除参数
     */
    clearData() {
        this.originKey = -1;

        this.setData({
            disable: true,
            cur: -1,
            tranX: 0,
            tranY: 0
        });
    }
})