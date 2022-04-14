
  const app = getApp()
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      html : [{type: 'view', text: '模版错误啦'}],
      
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var args = {
        xxx: 'xxx',
        code: `/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function runCode() {

  var Page = function Page(page) {
    return page;
  };
  return Page({
    parseTag: function parseTag(tag) {
      var res = {
        type1: "tag",
        name: "",
        voidElement: false,
        // attrs: {},
        children: []
      };
      var tagMatch = tag.match(/<\\/?([^\\s]+?)[/\\s>]/);
      if (tagMatch) {
        // 标签名称为正则匹配的第2项
        res.type1 = tagMatch[1];
        if (tag.charAt(tag.length - 2) === "/") {
          // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
          res.voidElement = true;
        }
      }
      // 匹配所有的标签正则
      var classList = tag.match(/\\s([^'"/\\s><]+?)\\s*?=\\s*?(".*?"|'.*?')/g);

      if (classList) {
        var style = '';
        for (var i = 0; i < classList.length; i++) {
          // 去空格再以= 分隔字符串  得到['属性名称','属性值']

          var c = classList[i].split("=");
          // c[1] = c[1].replace(/\\s*/g, "")
          c[0] = c[0].replace(/\\s*/g, "");
          // 循环设置属性
          var lengthc = 2;
          for (lengthc; lengthc < c.length; lengthc++) {
            c[1] += "=" + c[lengthc];
          }
          var p = c[1].substring(1, c[1].length - 1);
          try {
            p = JSON.parse(c[1].substring(1, c[1].length - 1));
          } catch (e) {}

          if (c[1]) {
            if (c[0] === 'style') {
              style = p + style;
              res[c[0]] = style;
            } else {
              res[c[0]] = p;
            }
          };
        }
      }
      return res;
    },
    parse: function parse(html) {
      var that = this;
      var result = [];
      var current = void 0;
      var level = -1;
      var arr = [];
      var tagRE = /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
      html.replace(tagRE, function (tag, index) {
        // 判断第二个字符是不是'/'来判断是否open
        var isOpen = tag.charAt(1) !== "/";
        // 获取标签末尾的索引
        var start = index + tag.length;
        // 标签之前的文本信息
        var text = html.slice(start, html.indexOf("<", start));

        var parent = void 0;
        if (isOpen) {
          level++;
          // 设置标签属性
          current = that.parseTag(tag);
          // 判断是否为文本信息，是就push一个text children  不等于'  '
          if (!current.voidElement && text.trim()) {
            current["text"] = text;
          }
          // 如果我们是根用户，则推送新的基本节点
          if (level === 0) {
            result.push(current);
          }
          // 判断有没有上层，有就push当前标签
          parent = arr[level - 1];
          if (parent) {
            parent.children.push(current);
          }
          // console.log(current)
          arr[level] = current;
        }
        // 如果不是开标签，或者是空元素：</div><img>
        if (!isOpen || current.voidElement) {
          // level--
          level--;
        }
      });
      // console.log(result)
      return result;
    },

    setdata: function setdata(dictData) {
      var _this = this;

      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var html = "<view class='bg' style='background-color: #F4F4F4; height: auto; width: 100%;'><view class='dayclock' style='background: #FFFFFF; border-radius: 20rpx; height: auto; margin: 0rpx 30rpx 20rpx 30rpx; position: relative; top: 20rpx; width: 690rpx;'>          <view class='dayclock_title' style='border-bottom: 2rpx solid #E5E5E5; height: 109rpx; width: 100%;'>         <view class='dayclock_column' style='float: left; height: 100%; width: 33.3%;'><image  " + (this.data.dark === 'dark' ? 'style="        filter: invert(80%) !important;      "' : '') + " bindtap='attention' class='dayclock_column_left' src='../images/tishi.png' style='height: 40rpx; padding: 35rpx 0 35rpx 26rpx; width: 40rpx;'></image></view>         <view class='dayclock_column' style='float: left; height: 100%; width: 33.3%;'><view  " + (this.data.dark === 'dark' ? 'style="        filter: invert(1) !important;        color: #fff;      "' : '') + " class='dayclock_column_center' style='color: #666666; font-size: 32rpx; font-weight: 549; padding: 35rpx 0; text-align: center;'>\\u6211\\u7684\\u6BCF\\u65E5\\u6253\\u5361</view></view>         <view class='dayclock_column' style='float: left; height: 100%; width: 33.3%;'><image  " + (this.data.dark === 'dark' ? 'style="        filter: invert(60%) !important;      "' : '') + " class='dayclock_column_right' src='../images/tianjia.png' bindtap='add_task' style='float: right; height: 40rpx; padding: 35rpx 35rpx 35rpx 0; width: 40rpx;'></image></view>     </view>          " + this.data.taskdata.map(function (item, index) {
        return " <view style='dayclock_data'  wx:key='*this' style='background-color: rgb(255, 255, 255); height: 120rpx; overflow: hidden; position: relative; width: 100%;'>          <view class='dayclock_data_huadong_bg' style='height: 120rpx; position: absolute; width: 100%; z-index: 0;'>          <view  " + (_this.data.dark === 'dark' ? 'style="        filter: invert(90%) !important;        background-color: #fc9090;        /* background-color: gray; */        color: #fff;      "' : '') + " style='dayclock_data_huadong_bg_bg' style='align-items: center; background-color: rgba(255, 0, 0, 0.582); box-sizing: border-box; color: white; display: flex; height: 118rpx; line-height: 152rpx; padding-left: 33rpx; padding-right: 33rpx; position: absolute; right: 0rpx; text-align: center;'><view id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' class='dayclock_data_huadong_bg_del' catchtap='daka_delpromp'>\\u5220\\u9664</view></view>     </view>          <view style='dayclock_data_huadong' bindtouchstart='touchstartX' bindtap='resetX' bindtouchmove='touchmoveX' bindtouchend='touchendX' animation='" + (_typeof(_this.data.currentIndex) === "object" ? JSON.stringify(_this.data.currentIndex) : _this.data.currentIndex === (typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index ? _typeof(_this.data.animation) === "object" ? JSON.stringify(_this.data.animation) : _this.data.animation : "") + "' data-index='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' style='background-color: #fff; height: 100rpx; padding: 10rpx 0 10rpx 0; position: absolute; width: 100%; z-index: 999;'><view class='border'>                    <view id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' data-id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' style='" + (_typeof(item.task_isDaka) === "object" ? JSON.stringify(item.task_isDaka) : item.task_isDaka == _typeof(_this.data.true) === "object" ? JSON.stringify(_this.data.true) : _this.data.true ? "wx&class                       ;                            float                     :                      left                      ;                            height                     :                      90rpx                      ;                            width                     :                     100  %                        ;                            background-color                     :                      #fff                      ;                            border-radius                     :                      0px 45px 45px 0px                      ;                            overflow                     :                      hidden                      ;                            position                     :                      absolute                      ;                                /        *     top                     :                      0                      ;                           *        /          color                     :                      #fff                      ;                            margin                     :                      7rpx 0                      ;                          " : "wx&class                       ;                            float                     :                      left                      ;                            height                     :                      90rpx                      ;                            width                     :                     100  %                        ;                            background-color                     :                      #74D5D3                      ;                            border-radius                     :                      0px 45px 45px 0px                      ;                            overflow                     :                      hidden                      ;                            position                     :                      absolute                      ;                                /        *     top                     :                      0                      ;                           *        /          color                     :                      #fff                      ;                            margin                     :                      7rpx 0                      ;                          ") + "' style='left: " + -(_typeof(_this.data.w) === "object" ? JSON.stringify(_this.data.w) : _this.data.w + 2) + "px; transform: " + (_typeof(_this.data.currentIndex) === "object" ? JSON.stringify(_this.data.currentIndex) : _this.data.currentIndex == (typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index ? _typeof(_this.data.cssAnimation) === "object" ? JSON.stringify(_this.data.cssAnimation) : _this.data.cssAnimation : "") + ";background:" + (_typeof(item.task_isDaka) === "object" ? JSON.stringify(item.task_isDaka) : item.task_isDaka == _typeof(_this.data.true) === "object" ? JSON.stringify(_this.data.true) : _this.data.true ? " # fff" : "") + ";'>               <text>" + (_typeof(_this.data.succeedMsg) === "object" ? JSON.stringify(_this.data.succeedMsg) : _this.data.succeedMsg) + "</text>                              <view id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' style='background:" + (_typeof(item.task_isDaka) === "object" ? JSON.stringify(item.task_isDaka) : item.task_isDaka == _typeof(_this.data.true) === "object" ? JSON.stringify(_this.data.true) : _this.data.true ? " # fff" : "") + ";' style='" + (_typeof(item.task_isDaka) === "object" ? JSON.stringify(item.task_isDaka) : item.task_isDaka == _typeof(_this.data.true) === "object" ? JSON.stringify(_this.data.true) : _this.data.true ? "wx&class                       ;                            width                     :                      145rpx                      ;                            height                     :                      90rpx                      ;                            background                     :                      #fff                      ;                            border-radius                     :                      0px 45px 45px 0px                      ;                               display                     :                      flex                      ;                            align-items                     :                      center                      ;                            justify-content                     :                      center                      ;                            position                     :                      absolute                      ;                            right                     :                      0                      ;                            top                     :                      0                      ;                          " : "wx&class                       ;                            width                     :                      145rpx                      ;                            height                     :                      90rpx                      ;                            background                     :                      #74D5D3                      ;                            border-radius                     :                      0px 45px 45px 0px                      ;                               display                     :                      flex                      ;                            align-items                     :                      center                      ;                            justify-content                     :                      center                      ;                            position                     :                      absolute                      ;                            right                     :                      0                      ;                            top                     :                      0                      ;                          ") + "' catchtouchstart='startFun' catchtouchmove='moveFun' catchtouchend='endFun'>               <image src='" + (_typeof(item.task_isDaka) === "object" ? JSON.stringify(item.task_isDaka) : item.task_isDaka == _typeof(_this.data.true) === "object" ? JSON.stringify(_this.data.true) : _this.data.true ? "..    /    images    /    complete.png" : "..    /    images    /    right.png") + " '></image>               </view>          </view>                           <view style='dayclock_data_column_3' style='float: right; height: 100rpx; width: 22.9%;'><view class='" + (_typeof(item.task_isDaka) === "object" ? JSON.stringify(item.task_isDaka) : item.task_isDaka == _typeof(_this.data.true) === "object" ? JSON.stringify(_this.data.true) : _this.data.true ? "wx&class           ;                font-size         :          38rpx          ;                font-weight         :          800          ;                color         :          #74D5D3          ;                line-height         :          100rpx          ;              " : "wx&class           ;                font-size         :          36rpx          ;                font-weight         :          800          ;                color         :          #F7ECCE          ;                line-height         :          100rpx          ;              ") + "'>" + (_typeof(item.task_isDaka) === "object" ? JSON.stringify(item.task_isDaka) : item.task_isDaka == _typeof(_this.data.true) === "object" ? JSON.stringify(_this.data.true) : _this.data.true ? "已完成" : "待完成") + "</view></view>                  <view class='dayclock_data_column_2' style='float: right; height: 100rpx; width: 55%;'>              <view  " + (_this.data.dark === 'dark' ? 'style="        filter: invert(1) !important;        color: #fff;      "' : '') + " style='dayclock_data_column_2_task' data-task='" + (_typeof(item.task_name) === "object" ? JSON.stringify(item.task_name) : item.task_name) + "' bindtap='12345' style='color: #666666; font-family: Source Han Sans CN; font-size: 25rpx; font-weight: 600; margin: 13rpx auto 0 22rpx;'>" + (_typeof(item.task_name) === "object" ? JSON.stringify(item.task_name) : item.task_name) + "</view>              <view class='dayclock_data_column_2_cycle' style='color: #666666; font-family: Source Han Sans CN; font-size: 18rpx; font-weight: 500; margin: 6rpx auto 6rpx 22rpx; padding: 6rpx auto 6rspx 22rpx;'>                   <view class='dayclock_data_column_2_cycle_week' style='color: #a8a8a8; float: left; padding-right: 20rpx; width: auto;'>" + (_typeof(item.task_cycle) === "object" ? JSON.stringify(item.task_cycle) : item.task_cycle) + "</view>                   <view class='dayclock_data_column_2_cycle_time' style='color: #a8a8a8; float: left; width: auto;'>" + (_typeof(item.task_start_time) === "object" ? JSON.stringify(item.task_start_time) : item.task_start_time) + "</view>                   <view class='dayclock_data_column_2_cycle_time' style='color: #a8a8a8; float: left; width: auto;'>- " + (_typeof(item.task_end_time) === "object" ? JSON.stringify(item.task_end_time) : item.task_end_time) + "</view>              </view>         </view>     </view></view>     </view>";
      }) + "     <view class='dayclock_bottom' style='height: 30rpx;'></view></view></view>" + (_typeof(this.data.showModel2) === "object" ? JSON.stringify(this.data.showModel2) : this.data.showModel2 ? "<view style='complete'  style='bottom: 0; font-family: unset; left: 0; position: fixed; right: 0; top: 0; z-index: 9999;'>     <view  " + (this.data.dark === 'dark' ? 'style="        filter: invert(90%) !important;      "' : '') + " class='complete_bg' style='background-color: rgba(0, 0, 0, 0.349); bottom: 0; font-family: unset; height: 100%; left: 0; opacity: 0.6; position: fixed; right: 0; top: 0; z-index: 9999;'></view>     <view class='complete_share' style='height: 705rpx; left: 93rpx; position: fixed; top: 200rpx; width: 560rpx; z-index: 99999;'>          <canvas  " + (this.data.dark === 'dark' ? 'style="        filter: invert(1) !important;      "' : '') + " type='2d' class='complete_share_image' id='shareCanvas' style='background-repeat: no-repeat; background-size: 100% 100%; border-radius: 40rpx; height: 100%; width: 100%;'></canvas>          <view class='complete_share_box' style='align-items: center; display: flex; flex-direction: column; height: 23%; justify-content: center; width: 100%;'>               <view  " + (this.data.dark === 'dark' ? 'style="        filter: invert(90%) !important;        background: rgb(172, 211, 254);        color: #fff;      "' : '') + " class='complete_share_box_button' bindtap='savecanvas' style='background-color: #dadada; border-radius: 50rpx; color: #fff; height: 90rpx; line-height: 90rpx; margin: 10rpx; text-align: center; width: 450rpx;'>\\u6821\\u53CB\\u5708\\u4E00\\u952E\\u5206\\u4EAB</view>                         </view>     </view>     <image class='complete_share_close' bindtap='complete_share_close' src='../images/close.png' style='height: 70rpx; left: 338rpx; position: fixed; top: 1060rpx; width: 70rpx; z-index: 99999;'></image></view>" : "") + (_typeof(this.data.showModel3) === "object" ? JSON.stringify(this.data.showModel3) : this.data.showModel3 ? "<view style='attention' >     <view  " + (this.data.dark === 'dark' ? 'style="        filter: invert(90%) !important;      "' : '') + " class='attention_bg' style='background-color: rgba(0, 0, 0, 0.349); bottom: 0; font-family: unset; height: 100%; left: 0; opacity: 0.6; position: fixed; right: 0; top: 0; z-index: 9999;'></view>     <view class='attention_text' style='background-color: #fff; border-radius: 40rpx; left: 88rpx; padding-bottom: 30rpx; position: fixed; top: 200rpx; width: 570rpx; z-index: 99999;'>          <view class='attention_text_title' style='margin: 40rpx auto; text-align: center;'>\\u4F7F\\u7528\\u6CE8\\u610F</view>          <view class='attention_text_duanluo' style='margin: 10rpx 40rpx; text-align: justify;'>               <view style='line-height: 75rpx;'>1.\\u5F53\\u65B0\\u5EFA\\u4E00\\u4E2A\\u6253\\u5361\\u4EFB\\u52A1\\u65F6\\uFF0C\\u9664\\u4E86\\u70ED\\u5EA6\\u699C\\u91CC\\u7684\\u6807\\u7B7E\\u53EF\\u81EA\\u884C\\u9009\\u62E9\\u4E4B\\u5916\\uFF0C\\u5176\\u4ED6\\u8BB0\\u5F55\\u6253\\u5361\\u7684\\u4FE1\\u606F\\u90FD\\u8981\\u586B\\u5199\\u3002</view>               <view style='line-height: 75rpx;'>2.\\u5BF9\\u4E8E\\u540C\\u4E00\\u4EFB\\u52A1\\uFF0C\\u4E0D\\u80FD\\u4E00\\u5929\\u6253\\u5361\\u4E24\\u6B21\\u6216\\u4EE5\\u4E0A\\u3002</view>               <view style='line-height: 75rpx;'>\\u6CE8\\u610F\\u4E8B\\u9879\\uFF1A\\u5982\\u53D1\\u751F\\u663E\\u793A\\u95EE\\u9898\\uFF0C\\u8BF7\\u5C1D\\u8BD5\\u7740\\u5237\\u65B0\\u9875\\u9762\\u91CD\\u65B0\\u52A0\\u8F7D\\u3002</view>               </view>     </view>     <image class='attention_close' src='../images/close.png' bindtap='attention' style='height: 70rpx; left: 338rpx; position: fixed; top: 1000rpx; width: 70rpx; z-index: 99999;'></image></view>" : "2") + "<!-- <view>  <image  " + (this.data.dark === 'dark' ? 'style="        filter: invert(0) !important;        color: blanchedalmond;        position: fixed;        bottom: 600rpx;        right: 25rpx;        opacity: 0;        z-index: 999;      "' : '') + " src='../images/rank.png' style='img-style' animation='" + (_typeof(this.data.animCollect) === "object" ? JSON.stringify(this.data.animCollect) : this.data.animCollect) + "' bindtap='collect'></image>  <image  " + (this.data.dark === 'dark' ? 'style="        filter: invert(0) !important;        color: blanchedalmond;        position: fixed;        bottom: 600rpx;        right: 25rpx;        opacity: 0;        z-index: 999;      "' : '') + " src='../images/time.png' style='img-style' animation='" + (_typeof(this.data.animTranspond) === "object" ? JSON.stringify(this.data.animTranspond) : this.data.animTranspond) + "' bindtap='transpond'></image>  <image  " + (this.data.dark === 'dark' ? 'style="        filter: invert(0) !important;        color: blanchedalmond;        position: fixed;        bottom: 600rpx;        right: 25rpx;        opacity: 0;        z-index: 999;      "' : '') + " src='../images/log.png' style='img-style' animation='" + (_typeof(this.data.animInput) === "object" ? JSON.stringify(this.data.animInput) : this.data.animInput) + "' bindtap='input'></image>  <image  " + (this.data.dark === 'dark' ? 'style="        filter: invert(0) !important;        color: black;        position: fixed;        bottom: 600rpx;        right: 50rpx;        z-index: 999;      "' : '') + " src='../images/time_2.png' style='img-plus-style' animation='" + (_typeof(this.data.animPlus) === "object" ? JSON.stringify(this.data.animPlus) : this.data.animPlus) + "' bindtap='plus'></image>  <text  " + (this.data.dark === 'dark' ? 'style="        position: fixed;        bottom: 550rpx;        right: 70rpx;      "' : '') + " class='text_time'>\\u8BA1\\u65F6</text></view> -->";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
      var _this2 = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this2.setdata({ dark: e.theme });
      });this.setdata();
      // wx.navigateTo({
      //   url: '/pages/HOT/HotTop/HotTop?content=测试',
      // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function onShareAppMessage() {}
  });
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map`
      }
      if (args) {
        try {
          var onload1 = app.jsRun(args, args.code)
          const onloadDict = onload1()
          for(let i in onloadDict){
            this[i] = onloadDict[i]
          }
          this.onLoad(this.options)
        } catch (e) {
          console.log(e)
        }
      }
  
    },
  
  })
