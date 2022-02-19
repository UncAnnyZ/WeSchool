// app.js
import WebsocketHeartbeat from './pages/utils/websocket-heart/index';

//url:"ws://8.141.66.105:10102/webSocket?token="+wx.getStorageSync('token').token,
App({
  websocket_connect(){
    WebsocketHeartbeat({
      miniprogram: wx,
        connectSocketParams: {
            url:"ws://8.141.66.105:10102/webSocket?token="+wx.getStorageSync('token').token,
        }
  })
      .then(task => {
          task.onOpen = () => {//钩子函数
              console.log('open');
           
        
          };
          task.onClose = () => {//钩子函数
              console.log('close');
          };
          task.onError = e => {//钩子函数
              console.log('onError：', e);
          };
          task.onReconnect = () => {//钩子函数
              console.log('reconnect...');
          };
          task.socketTask.onOpen(data => {//原生实例注册函数，重连后丢失
            wx.showToast({
              title: 'websocket连接成功',
              icon:"none"
            })
          });
          task.socketTask.onMessage(data => {//原生实例注册函数，重连后丢失
              console.log( 1);
          });
    
       
        //   task.send({
        //     data: 'msg',
        //     success(){
        //       console.log(1)
        //     },
        // })
      })
  },
  onLaunch: function () {
    // console.log(websocket)
    this.websocket_connect()
  

    this.globalData = {
      url:["http://8.141.66.105:10102/api/login", //登录
          "http://8.141.66.105:10102/api/getDeviceByUserId", //首页展示
        "http://8.141.66.105:10102/api/searchDevice", //首页搜索
        'http://8.141.66.105:10102/api/getDeviceParam', //详情页
        "http://8.141.66.105:10102/api/getParamVal",//数据可视化,
        "http://8.141.66.105:10102/api/getVersion"//固件更新
      ]
    };
  },
 
});
