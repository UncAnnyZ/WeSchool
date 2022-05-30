// pages/roomCreate/roomCreate.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        roomNum: 20,//人数限制
        qxbq: '请点击选择标签',//标签
        aimgurl: "", // //临时图片的路径

        bqshuru: 0,
        array: ['学习', '运动', '娱乐', '日常', '游戏','其他'],

        countIndex: 1, // 可选图片剩余的数量
        imageData: [], // 所选上传的图片数据

        numLimit: [{
            value: '5',
            name: '5人'
        },
        {
            value: '10',
            name: '10人'
        },
        {
            value: '15',
            name: '15人'
        },
        {
            value: '20',
            name: '20人'
        }
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let args = wx.getStorageSync('args');
        this.setData({
            args
        })
    },

    write_Txt(e) {
        if (e.target.id == "Brief") {
            this.setData({
                roomBrief: e.detail.value
            })
        } else {
            this.setData({
                roomName: e.detail.value
            })
        }
    },

    radioChange(e) {
        //console.log('radio发生change事件，携带value值为：', e.detail.value)

        this.setData({
            roomNum: e.detail.value
        })

        //console.log(this.data.roomNum)
    },

    bindPickerChange(e) {
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        let array = this.data.array
        let index = e.detail.value
        this.setData({
            index,
            qxbq: array[index]
        })

        let index1 = this.data.index
        if (index1 != -1) {
            this.setData({
                bqshuru: 1
            })
            //console.log('bqshuru:',this.data.bqshuru)
        } else {
            console.log('erro!!!')
        }
    },

    /*图片浏览及上传 */
    browse: function (e) {
        let that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#CED63A",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album');
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera');
                    }
                }
            }
        })
    },

    /*打开相册、相机 */
    chooseWxImage: function (type) {
        let that = this;
        wx.chooseImage({
            count: that.data.countIndex,
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                // 选择图片后的完成确认操作
                console.log(res)
                that.setData({
                    aimgurl: res.tempFilePaths
                });
            }
        })
    },

    //保存方法
    Save_and_Create() {
        function totast(title) {
            wx.showToast({
                title: '请输入' + title,
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {
                },
            });
        }
        if (!this.data.roomName) {
            totast('自习室名称')
        }
        else if (!this.data.roomBrief) {
            totast('简介')
        }
        else if (!this.data.index) {
            totast('请点击选择标签')
        }
        else if (this.data.aimgurl.length == 0) {
            totast('照片')
        }
        else {
            wx.showLoading({
                title: '创建中',
                mask: true,
                success: (result) => {
                    let uid = this.guid()
                    let uuid = this.hash(this.data.args.username + this.data.roomName + uid)
                    wx.cloud.uploadFile({
                        cloudPath: "img/" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000),//云储存的路径及文件名
                        filePath: this.data.aimgurl[0], //要上传的图片/文件路径 这里使用的是选择图片返回的临时地址
                        success: res => {
                            let imgUrl = res.fileID
                            wx.cloud.getTempFileURL({
                              fileList: [imgUrl],
                              success: res => {
                                console.log("获取url地址：",res.fileList[0].tempFileURL);
                                let imghttpUrl = res.fileList[0].tempFileURL
                            db.collection("daka_group_member_information").add({
                                data: {
                                  group_name: this.data.roomName,
                                  member_name:this.data.args.nickName,
                                  member_url:this.data.args.iconUrl,
                                  member_username:this.data.args.username,
                                  task:[],
                                  time_logs:[],
                                  totalTime:0,
                                  bgurl:imghttpUrl,
                                  groupIntro:this.data.roomBrief,
                                  wxname:this.data.args.nickName,
                                  wxurl:this.data.args.iconUrl,
                                  uuid,
                                }
                            })
                            db.collection("data_group_information").add({
                                data: {
                                    group_name: this.data.roomName,
                                    introduce: this.data.roomBrief,
                                    notice: '',
                                    username: this.data.args.username,
                                    uuid,
                                    wxname: this.data.args.nickName,
                                    wxurl: this.data.args.iconUrl,
                                    imgUrl:imghttpUrl,
                                    roomNum:Number(this.data.roomNum),
                                    qxbq:this.data.qxbq,
                                    creattime:new Date(),
                                }
                            }).then(res => {
                                var pages = getCurrentPages()
                                var prevPage = pages[pages.length - 2]
                                prevPage.setData({
                                  isupdate:true
                                })
                                wx.showToast({
                                    title: '创建成功',
                                    icon: 'none',
                                    image: '',
                                    duration: 1500,
                                    mask: false,
                                    success: (result) => {
                                        setTimeout(() => {
                                            wx.navigateBack({
                                                delta: 1
                                            });
                                        }, 1000);
                                    },
                                });
                            })
                          },
                          fail: console.error
                        })
                      }
                    })

                },
            });
        }
    },
    cancel(){
        wx.navigateBack({
            delta: 1
        });
    },
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    hash(input) {
        var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');

        var hash = 5389;
        var i = input.length - 1;

        if (typeof input == 'string') {
            for (; i > -1; i--)
                hash += (hash << 5) + input.charCodeAt(i);
        }
        else {
            for (; i > -1; i--)
                hash += (hash << 5) + input[i];
        }
        var value = hash & 0x7FFFFFFF;

        var retValue = '';
        do {
            retValue += I64BIT_TABLE[value & 0x3F];
        }
        while (value >>= 1);

        return retValue;
    },
})