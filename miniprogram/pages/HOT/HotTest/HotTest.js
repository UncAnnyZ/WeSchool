
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function runCode() {
  var _Page;

  var db = wx.cloud.database({ env: 'mall-7gi19fir46652cb4' });

  var Page = function Page(page) {
    return page;
  };
  return Page((_Page = {
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
            if (c[0] === ' style') {
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

      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var html = ((_typeof(this.data.tabbar) === "object" ? JSON.stringify(this.data.tabbar) : this.data.tabbar) ? "<view >  " + (!(_typeof(this.data.shopyesno) === "object" ? JSON.stringify(this.data.shopyesno) : this.data.shopyesno) ? "<view  class='bg-red flex justify-center'>  <view  class='action'>  " + (!(_typeof(this.data.weihu) === "object" ? JSON.stringify(this.data.weihu) : this.data.weihu) ? "<text > \\u3010" + (_typeof(this.data.shopname) === "object" ? JSON.stringify(this.data.shopname) : this.data.shopname) + "\\u3011\\u76EE\\u524D\\u5DF2\\u6253\\u6837  </text> " : "") + ((_typeof(this.data.weihu) === "object" ? JSON.stringify(this.data.weihu) : this.data.weihu) ? "<text > \\u805A\\u98DF\\u96C6\\u5E73\\u53F023:50-00:00\\u5B9A\\u671F\\u7EF4\\u62A4  </text> " : "") + " </view>  </view> " : "") + "<view  class='top' style='background-color: rgb(255, 255, 255); border-top-left-radius: 40rpx; border-top-right-radius: 40rpx; display: flex; flex-direction: column; height: 310rpx; margin-top: 50rpx; overflow: hidden; width: 100%;'>  <view  class='topName' style='font-size: 46rpx; font-weight: 550; margin: 20rpx 0rpx 0rpx 29rpx;'> \\u76CA\\u79BE\\u5802  </view> <view  class='topSold' style='color: #4c4c4ca3; font-size: 24rpx; margin: 10rpx 0rpx 5rpx 29rpx;'> \\u6708\\u552E2823  \\u914D\\u9001\\u7EA630\\u5206\\u949F  </view> <view  class='topTitle' style='display: flex; flex-direction: row; font-size: 23rpx; margin: 10rpx 0rpx 5rpx 29rpx;'>  <view  class='topTitlelabel' style='background-color: #e6e6e661; border-radius: 8rpx; padding: 5rpx 9rpx; width: fit-content;'> \\u5B98\\u6E21\\u5976\\u8336\\u4EBA\\u6C14\\u699C\\u7B2C\\u4E00\\u540D  </view>  </view> <view  class='topDiscount' style='display: flex; flex-direction: row; font-size: 23rpx; margin: 13rpx 0rpx 5rpx 29rpx;'>  <view  class='coupon' style='align-items: center; border: 1rpx solid crimson; border-radius: 8rpx; color: #ee5527; display: flex; margin-right: 5px; padding: 0px 4px; width: fit-content;'> 25\\u51CF1 | 35\\u51CF3 | 50\\u51CF5  </view> <view  class='coupon' style='align-items: center; border: 1rpx solid crimson; border-radius: 8rpx; color: #ee5527; display: flex; margin-right: 5px; padding: 0px 4px; width: fit-content;'> 4.88\\u6298\\u8D77  </view> <view  class='coupon' style='align-items: center; border: 1rpx solid crimson; border-radius: 8rpx; color: #ee5527; display: flex; margin-right: 5px; padding: 0px 4px; width: fit-content;'> \\u6536\\u85CF\\u9886\\u4E00\\u5143\\u5238  </view>  </view> <view  class='topNotice' style='color: #656565b8; font-size: 25rpx; margin: 10rpx 0rpx 5rpx 29rpx; width: 100%;'> \\u516C\\u544A\\uFF1A \\u6CB9\\u6821\\u5B66\\u751F\\u53EF\\u4EE5\\u5C0F\\u7A0B\\u5E8F\\u4E0B\\u5355\\u5907\\u6CE8\\u4E00\\u4E0B\\u9001\\u5230\\u5357\\u95E8\\u6216\\u897F\\u95E8  </view>  </view> <view  style='display: flex;flex-direction: row; align-items: center; height: 72rpx;width: 100%;position: sticky;background-color: white;top: 0rpx;z-index: 3;'>  <view  class='order' bindtap='order' style='color: #464646de; font-size: 29rpx; margin: 0 28rpx;'>     \\u70B9\\u83DC      </view> <view  class='comment' bindtap='comment' style='color: #464646de; font-size: 29rpx; margin: 0 28rpx;'>     \\u8BC4\\u8BBA      </view> <view  class='business' bindtap='business' style='color: #464646de; font-size: 29rpx; margin: 0 28rpx;'>     \\u5546\\u5BB6      </view>  </view> <view  style='background-color: #94949438;width: 100%;height: 1rpx;position: sticky;top: 73rpx;z-index: 4;'>   </view> <view  class='rotation' style='align-items: center; background-color: white; display: flex; height: 260rpx; justify-content: center; width: 100%;'>  <view  class='rotationImg' style='background-color: azure; border-radius: 27rpx; height: 78%; width: 93%;'>   </view>  </view> <view  style='display: flex;flex-direction: row; background-color: white;'>  <scroll-view  scroll-y='true' style='width: 20%;height:100vh;background-color: rgba(230, 230, 230, 0.301);'>  <view  class='recommend' style='align-items: center; display: flex; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'> \\u63A8\\u8350  </view> <view  class='discount' style='align-items: center; display: flex; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'>  <image  src='data:image/png;base64,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' style='height: 34rpx; margin: 7rpx 10rpx 0rpx 0rpx; width: 34rpx;'>   </image> <view > \\u6298\\u6263  </view>  </view> <view  class='consult' style='align-items: center; display: flex; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'> \\u54C1\\u724C\\u54A8\\u8BE2  </view> <view  class='tasteFresh' style='align-items: center; display: flex; flex-direction: column; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'>  <image  src='data:image/png;base64,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' style='height: 34rpx; margin: 7rpx 10rpx 0rpx 0rpx; width: 34rpx;'>   </image> <view > \\u65B0\\u54C1\\u5C1D\\u9C9C  </view>  </view> <view  class='popularity' style='align-items: center; display: flex; flex-direction: column; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'>  <image  src='data:image/png;base64,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' style='height: 34rpx; margin: 7rpx 10rpx 0rpx 0rpx; width: 34rpx;'>   </image> <view > \\u4EBA\\u6C14\\u63A8\\u8350  </view>  </view> <view  class='welfare' style='align-items: center; display: flex; flex-direction: column; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'>  <image  src='data:image/png;base64,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' style='height: 34rpx; margin: 7rpx 10rpx 0rpx 0rpx; width: 34rpx;'>   </image> <view > \\u76CA\\u7C89\\u798F\\u5229  </view>  </view> <view  class='mustDrink' style='align-items: center; display: flex; flex-direction: column; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'>  <image  src='data:image/png;base64,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' style='height: 34rpx; margin: 7rpx 10rpx 0rpx 0rpx; width: 34rpx;'>   </image> <view > \\u5FC5\\u559D\\u7CFB\\u5217  </view>  </view> <view  class='coffee' style='align-items: center; display: flex; flex-direction: column; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'>  <image  src='data:image/png;base64,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' style='height: 34rpx; margin: 7rpx 10rpx 0rpx 0rpx; width: 34rpx;'>   </image> <view > \\u73B0\\u78E8\\u5496\\u5561  </view>  </view>  </scroll-view> <view  style='width: 80%;display: flex;flex-direction: column;background-color: white;'>  <view  class='sign' style='background-color: rgb(255, 255, 255); display: flex; height: 82rpx; margin-top: 10rpx; position: sticky; top: 71rpx; width: 100%; z-index: 3;'>  <view  class='signContent' style='border-radius: 15rpx; display: flex; font-size: 23rpx; height: 43rpx; margin-left: 10rpx; margin-top: 18rpx; overflow: hidden;'>  <view  class='signContentone' style='align-items: center; background-color: #FEE9E8; display: flex; font-weight: 550; height: 100%; justify-content: center; width: 90rpx;'> \\u62DB\\u724C  </view> <view  class='signContenttwo' style='align-items: center; background-color: #FF5337; color: white; display: flex; height: 100%; justify-content: center; width: 150rpx;'> \\u8001\\u677F\\u63A8\\u8350  </view>  </view>  </view> <scroll-view  scroll-y='true' style='height:100vh;' scroll-into-view='main-" + (_typeof(this.data.MainCur) === "object" ? JSON.stringify(this.data.MainCur) : this.data.MainCur) + "' bindscroll='VerticalMain'>  " + this.data.goods.map(function (item, index) {
        return "<view  wx:key='id'>  <view  class='goods' style='align-items: center; display: flex; height: 200rpx; margin: 0 10rpx 45rpx 10rpx; width: 100%;'>  <view  class='goodsImg' style='align-items: center; background-color: #e4e4e457; border-radius: 16rpx; display: flex; height: 95%; justify-content: center; overflow: hidden; width: 190rpx;'>  <image  src='" + (_typeof(item.img) === "object" ? JSON.stringify(item.img) : item.img) + "' mode='aspectFill' style='height: 100%; width: 100%;'>   </image>  </view> <view  class='goodsContent' style='height: 100%; line-height: 43rpx; padding: 0 0 0 19rpx; width: 62%;'>  <view  class='goodsName' style='-webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box; font-size: 30rpx; font-weight: 550; overflow: hidden; text-overflow: ellipsis; width: 100%; word-break: break-all;'> " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "  </view> <view  class='goodsBrief' style='color: rgb(37, 37, 37); font-size: 22rpx; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;'> \\u5F00\\u80C3\\u97E9\\u5F0F\\u6CE1\\u83DC + \\u4E94\\u5E38\\u5927\\u7C73 + \\u80A5\\u725B  </view> <view  class='goodsSold' style='color: rgba(78, 78, 78, 0.692); font-size: 22rpx; width: 100%;'> \\u6708\\u552E " + (_typeof(item.yuenumber) === "object" ? JSON.stringify(item.yuenumber) : item.yuenumber) + "  </view> <view  class='goodsPrice' style='color: #ee5527; font-family: inherit; font-size: 24rpx; font-weight: 550; position: relative; top: 27rpx;'>                 \\uFFE5 <text  class='price' style='font-size: 36rpx; position: relative; right: 10rpx;'> " + (_typeof(item.price) === "object" ? JSON.stringify(item.price) : item.price) + "  </text>  </view> <view  class='goodsAdd' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' bindtap='oneaddgoods' style='align-items: center; background-color: #8584A3; border-radius: 50rpx; bottom: 28rpx; display: flex; float: right; height: 45rpx; justify-content: center; position: relative; width: 45rpx;'>  <image  src='data:image/png;base64,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' style='height: 58%; width: 58%;'>   </image>  </view>  </view>  </view>  </view> ";
      }) + " </scroll-view>  </view>  </view>  </view> " : "") + "<view  class='box' style='width:100%;position:fixed;bottom:0;z-index:9999'>  <view  class='settle' bindtap='showModal' style='background-color: rgb(255, 255, 255); height: 90rpx; width: 100%;'>  <view  class='settleAll' style='display: flex; flex-direction: row; float: right; font-size: 30rpx; height: 100%; width: 50%;'>  <view  class='calcAll' style='color: rgb(0, 0, 0); font-size: 28rpx; height: 100%; line-height: 43rpx; width: 60%;'>           \\u5408\\u8BA1\\uFF1A <text  style='color: #7C73A9; font-size: 30rpx; position: relative; right: 10rpx;'> \\uFFE5" + ((_typeof(this.data.totalprice) === "object" ? JSON.stringify(this.data.totalprice) : this.data.totalprice) == 0 ? '0.00' : _typeof(this.data.totalprice) === "object" ? JSON.stringify(this.data.totalprice) : this.data.totalprice) + "  </text> <view  class='freight' style='color: rgba(78, 78, 78, 0.692); float: right; font-size: 25rpx; margin-right: 35rpx;'> \\u4E0D\\u542B\\u8FD0\\u8D39  </view>  </view> <view  class='goSettle' bindtap='pay' style='align-items: center; background-color: #696BA4; color: rgb(255, 255, 255); display: flex; font-size: 26rpx; height: 100%; justify-content: center; width: 50%;'> \\u7ED3\\u7B97  </view>  </view>  </view>  </view> " + ((_typeof(this.data.modalName) === "object" ? JSON.stringify(this.data.modalName) : this.data.modalName) ? "<view  class='EditCom' style='align-items: center; bottom: 0; display: flex; font-family: unset; justify-content: center; left: 0; position: fixed; right: 0; top: 0; z-index: 9999;'>  <view  class='EditCom_background' bindtap='showModal' style='align-items: center; background-color: rgba(0, 0, 0, 0.92); bottom: 0; display: flex; font-family: unset; height: 100%; justify-content: center; left: 0; opacity: 0.6; position: fixed; right: 0; top: 0; z-index: 9999;'>   </view> <view  class='EditCom_contain ' style='background-color: rgb(244, 244, 244); border-radius: 20rpx; bottom: 0; display: flex; flex-direction: column; justify-content: center; overflow: hidden; padding: 20rpx; position: fixed; width: 100%; z-index: 99999;;EditCom_contain " + (_typeof(this.data.payStyle) === "object" ? JSON.stringify(this.data.payStyle) : this.data.payStyle) + "'>  " + this.data.buy.map(function (item, index) {
        return "<view >  <view  class='buy' style='display: flex; height: 150rpx; padding-bottom: 20rpx; width: 100%;'>  <view  class='buyImg' style='height: 130rpx; width: 130rpx;'>  <image  src='" + (_typeof(item.img) === "object" ? JSON.stringify(item.img) : item.img) + "' mode='aspectFill' style='height: 100%; width: 100%;'>   </image>  </view> <view  class='buyContent' style='display: flex; flex-direction: column; line-height: 65rpx; padding: 0 15rpx; width: 80%;'>  <view  class='buyName' style='font-size: 30rpx; font-weight: 550; width: 100%;'> " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "  </view> <view >  <view  class='buyPrice' style='color: #8984A8; font-size: 38rpx; font-weight: 550;'> \\uFFE5" + (_typeof(item.price) === "object" ? JSON.stringify(item.price) : item.price) + "  </view> <view  class='buyNumber' style='align-items: center; bottom: 60rpx; display: flex; float: right; height: 50rpx; justify-content: center; position: relative; width: 182rpx;'>  <view  class='numberDel' bindtap='reducenumber' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' style='align-items: center; background-color: rgba(179, 179, 179, 0.14); border-bottom-left-radius: 8rpx; border-top-left-radius: 8rpx; display: flex; height: 100%; justify-content: center; margin: 0 7rpx; width: 62rpx;'> -  </view> <view  class='numberShow' style='align-items: center; background-color: rgba(179, 179, 179, 0.14); display: flex; font-size: 24rpx; height: 100%; justify-content: center; width: 70rpx;'> " + (_typeof(item.number) === "object" ? JSON.stringify(item.number) : item.number) + "  </view> <view  class='numberAdd' bindtap='addgoods' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' style='align-items: center; background-color: rgba(179, 179, 179, 0.14); border-bottom-right-radius: 8rpx; border-top-right-radius: 8rpx; display: flex; height: 100%; justify-content: center; margin: 0 7rpx; width: 62rpx;'> +  </view>  </view>  </view>  </view>  </view>  </view> ";
      }) + " </view>  </view> " : "");
      this.setData({ html: this.parse(html) });
    },

    data: {
      weihu: false,
      guige: false,
      goodsguigekouwei: [],
      goodsguigekouwei2: [],
      goods: [],
      guigeindex: '0',
      guigeindex2: '0',
      shopyesno: true,
      mydingdan: [], //订单
      mydindantotal: 0,
      skip: 0, //订单跳过前几条
      newuser: true,
      /* --------------------- */
      buy: [], //购物车
      totalprice: 0,
      totalnumber: 0,
      /* ---------------------- */
      tabbar: true,
      havelocation: false,
      /* --------------------- */
      TabCur: '0',
      MainCur: 0,
      VerticalNavTop: 0,
      list: [],
      load: true,
      data_show: []
    },
    onLoad: function onLoad(option) {
      var _this = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this.setdata({ dark: e.theme });
      });this.setdata();
      console.log(option);
      var shop_id = 'uncanny';
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      var self = this;

      db.collection('shop').doc(shop_id).get().then(function (res) {

        wx.setStorage({
          key: "shop",
          data: res.data
        });
        console.log("goods", res.data.goods);

        self.setdata({
          shop_id: shop_id,
          caidan: res.data.caidan,
          goods: res.data.goods,
          goprice: res.data.goprice * 1,
          shopyesno: res.data.shopyesno,
          shopyesnoing: res.data.shopyesno,
          shopname: res.data.name,
          shopid: res.data.shopid
        });
        {
          console.log(123);
          /* if (nowtime >= "23:50" && nowtime <= "23:59") {
            self.setdata({
              weihu: true,
              shopyesno: false,
            })
          } */
          // 调用云函数获取用户openid
          wx.cloud.callFunction({
            name: 'login',
            env: 'mall-7gi19fir46652cb4',
            data: {},
            success: function success(loginres) {
              console.log('[云函数] [login] user openid: ', loginres.result.openid);
              app.globalData.openid = loginres.result.openid;
              db.collection('userinfo').where({
                _openid: loginres.result.openid
              }).get().then(function (userinfores) {
                if (userinfores.data.length > 0) {
                  wx.setStorage({
                    key: "userinfo",
                    data: userinfores.data[0]
                  });
                  self.setdata({
                    newuser: false,
                    username: userinfores.data[0].username,
                    usertximg: userinfores.data[0].usertximg,
                    userlocation: userinfores.data[0].userlocation,
                    havelocation: userinfores.data[0].havelocation
                  });

                  self.onShow();
                  console.log(res.data.caidan, 1233);
                  self.caidanxuanran(res.data.caidan);
                } else {
                  var args = wx.getStorageSync('args');
                  db.collection('userinfo').add({
                    data: {
                      _openid: loginres.result.openid,
                      username: args.username,
                      havelocation: false,
                      userlocation: {},
                      usertximg: args.iconUrl

                    } }).then(self.onShow());
                }
              });
            },
            fail: function fail(err) {
              console.error('[云函数] [login] 调用失败', err);
            }
          });
        }
        console.log(res.data);
      });
    },
    onShow: function onShow(e) {
      var self = this;
      var skip = self.data.skip;
      var userinfo = wx.getStorageSync('userinfo');
      this.setdata({ userlocation: userinfo.userlocation });

      if (!self.data.newuser) {
        db.collection('dindan').where({
          _openid: app.globalData.openid
        }).count().then(function (totalres) {

          if (totalres.total > 20) {
            skip = totalres.total - 20;
          }
          db.collection('dindan').where({
            _openid: app.globalData.openid
          }).skip(skip).limit(20).get().then(function (res) {

            self.setdata({
              mydindantotal: totalres.total,
              mydingdan: res.data.reverse()
            });
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
            console.log(res.data);
          }).catch(function (err) {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
            console.error(err);
          });
        });
      }

      console.log(this.data.mydingdan, '55');
      wx.hideHomeButton();
    },

    /* 菜单渲染 */
    caidanxuanran: function caidanxuanran(e) {
      var caidan = e;
      var list = [{}];
      for (var i = 0; i < caidan.length; i++) {
        list[i] = {};
        list[i].name = caidan[i].name;
        list[i].id = i;
        list[i].myid = caidan[i].myid;
      }
      console.log(list, 233);
      this.setdata({
        list: list,
        listCur: list[0]
      });
      wx.hideLoading();
    },
    onReady: function onReady() {},
    tabSelect: function tabSelect(e) {
      this.setdata({
        TabCur: String(e.currentTarget.dataset.id),
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      });
    },
    VerticalMain: function VerticalMain(e) {
      var that = this;
      var list = this.data.list;
      console.log("list", list);
      var tabHeight = 0;
      if (this.data.load) {
        var _loop = function _loop(i) {
          var view = wx.createSelectorQuery().select("#main-" + list[i].id);
          view.fields({
            size: true
          }, function (data) {
            list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;
          }).exec();
        };

        for (var i = 0; i < list.length; i++) {
          _loop(i);
        }
        that.setdata({
          load: false,
          list: list
        });
      }
      var scrollTop = e.detail.scrollTop + 20;
      for (var i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setdata({
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: String(list[i].id)
          });
          return false;
        }
      }
    },

    /* 第一次添加购物车 */
    oneaddgoods: function oneaddgoods(e) {
      var self = this;
      var newuser = self.data.newuser;
      console.log("newuser", newuser);
      console.log("e", e);
      if (newuser) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000
        });
      } else {
        var _self$setdata;

        var index = e.currentTarget.id;
        console.log("self.data.goods", self.data.goods);
        var goodsnumber = self.data.goods[index].number;
        var goodsdata = "goodt[" + index + "].number";
        var buy = this.data.buy;
        var goods = {
          guige: false,
          id: self.data.goods[index].id,
          img: self.data.goods[index].img,
          name: self.data.goods[index].name,
          price: self.data.goods[index].price,
          zhekou: self.data.goods[index].zhekou,
          nowprice: self.data.goods[index].nowprice,
          shangpu: self.data.goods[index].shangpu, //所属商铺
          shopid: self.data.goods[index].shopid,
          number: 1, //用户购物车数量
          index: index //在goods列表里的index
        };
        buy.push(goods);
        self.data.goods[index].number += 1;
        self.setdata((_self$setdata = {
          buy: buy
        }, _defineProperty(_self$setdata, goodsdata, goodsnumber + 1), _defineProperty(_self$setdata, "goods", self.data.goods), _self$setdata));
        console.log(goodsnumber + 1);
        self.buy(buy);
      }
    },

    /* 购物车+1 */
    addgoods: function addgoods(e) {
      var self = this;
      var index = e.currentTarget.id;
      // if (!self.data.goods[index].guige) {
      self.data.buy[index].number += 1;
      self.data.goods[index].number += 1;
      self.setdata({
        buy: self.data.buy,
        goods: self.data.goods
      });
      self.buy(buy);
      // } 
      // var goodsnumber = self.data.goods[index].number
      // var buy = self.data.buy
      // var goodsdata = "goods[" + index + "].number"
      // for (var i = 0; i < buy.length; i++) {
      //   if (buy[i].id == self.data.goods[index].id) {
      //     buy[i].number++;
      //   }
      // }
    },

    /* 购物车-1 */
    reducenumber: function reducenumber(e) {
      var self = this;
      var index = e.currentTarget.id;
      if (self.data.buy[index].number === 1) {
        self.data.buy.splice(index, 1);
      } else {
        self.data.buy[index].number -= 1;
        self.data.goods[index].number -= 1;
      }
      // var goodsnumber = self.data.goods[index].number
      // var goodsdata = 'goods[' + index + '].number'
      // var buy = self.data.buy
      // for (var i = 0; i < buy.length; i++) {
      //   if (buy[i].id == self.data.goods[index].id) {
      //     if (buy[i].number == 1) {
      //       buy.splice(i, 1)
      //     } else {
      //       buy[i].number--;
      //       break;
      //     }
      //   }
      // }

      // if (goodsnumber > 0) {
      //   self.data.goods[index].number -= 1
      //   self.setdata({
      //     buy: self.data.buy,
      //     // [goodsdata]: goodsnumber - 1,
      //     goods: self.data.goods
      //   })

      //     self.buy(self.data.buy)


      // }
      self.setdata({
        buy: self.data.buy,
        // [goodsdata]: goodsnumber - 1,
        goods: self.data.goods
      });

      self.buy(self.data.buy);
      return res;
    },

    /* 购物车规格+1 */
    guigeaddgoods: function guigeaddgoods(e) {
      var self = this;
      var index = e.currentTarget.id;
      var goods = self.data.goods;
      var buy = self.data.buy;
      for (var i = 0; i < goods.length; i++) {
        if (buy[index].id == goods[i].id) {
          var goodsnumber = goods[i].number;
          var goodsdata = "goods[" + i + "].number";
          break;
        }
      }
      buy[index].number++;
      self.setdata(_defineProperty({
        buy: buy
      }, goodsdata, goodsnumber + 1));

      self.buy(buy);
    },

    /* 购物车规格-1 */
    guigereducenumber: function guigereducenumber(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var goods = self.data.goods;
      var buy = self.data.buy;
      for (var i = 0; i < goods.length; i++) {
        if (buy[index].id == goods[i].id) {
          var goodsnumber = self.data.goods[i].number;
          var goodsdata = 'goods[' + i + '].number';
          if (buy[index].number == 1) {
            buy.splice(index, 1);
            break;
          } else {
            buy[index].number--;
            break;
          }
        }
      }
      if (goodsnumber > 0) {
        console.log(buy);
        self.setdata(_defineProperty({
          buy: buy
        }, goodsdata, goodsnumber - 1));

        self.buy(buy);
      }
    },
    buy: function (_buy) {
      function buy(_x) {
        return _buy.apply(this, arguments);
      }

      buy.toString = function () {
        return _buy.toString();
      };

      return buy;
    }(function (buy) {
      // var totalprice = 0
      // var totalnumber = 0
      // for (var i = 0; i < buy.length; i++) {
      //   if(buy[i].zhekou){
      //     totalprice = totalprice + buy[i].number * buy[i].zhekouprice
      //   }else{
      //     totalprice = totalprice + buy[i].number * buy[i].nowprice
      //   }
      //   totalnumber = totalnumber + buy[i].number
      // }
      // 购物车加购的商品数量（numberSum）加一
      var numberSum = buy.reduce(function (numberSum, item) {
        return numberSum + item.number;
      }, 0);
      // 购物车加购的商品价格（priceSum）加一
      var priceSum = buy.reduce(function (priceSum, item) {
        return priceSum + item.number * item.nowprice;
        // return priceSum + item.number * (item.nowprice * item.zhekou * 0.1);      //---后期优化，无折扣商品：zhekou=10；有折扣商品：zhekou=zhekou*0.1
      }, 0);

      if (numberSum == 0) {
        this.setdata({
          modalName: false
        });
      }
      this.setdata({
        totalprice: priceSum.toFixed(2),
        totalTrue: priceSum.toFixed(2) < this.data.goprice,
        totalyuNumber: this.data.goprice - priceSum.toFixed(2),
        totalnumber: numberSum
      });
    }),

    popUp: function popUp() {
      //控制卡片/评论弹窗
      var self = this;
      var payStyle = 'payHide';
      // picker动画样式
      if (payStyle == undefined || payStyle == 'payHide') {
        payStyle = 'payShow';
      } else {
        payStyle = 'payHide';
      }
      self.setdata({
        payStyle: payStyle
      });
    },
    /* 购物车弹出 */
    showModal: function showModal() {
      var self = this;
      if (self.data.buy.length != 0) {
        self.popUp();
        self.setdata({
          modalName: !this.data.modalName,
          buy: self.data.buy
        });
      }
    },

    /* 商铺 */
    tabbarshop: function tabbarshop(e) {
      this.setdata({
        tabbar: true
      });
    },

    /* 个人 */
    tabbaruser: function tabbaruser(e) {
      this.setdata({
        tabbar: false
      });
    },

    /* 地址设置 */
    userlocation: function userlocation(e) {
      var shop_id = this.data.shop_id;
      console.log(shop_id);
      wx.navigateTo({
        url: '../HotTop/HotTop?content=地址&shop_id=' + shop_id
      });
    },

    /* 跳转支付 */
    pay: function pay(e) {
      console.log("pay");
      var self = this;
      var buy = self.data.buy;
      wx.setStorage({
        key: "pay",
        data: {
          buy: buy,
          totalnumber: self.data.totalnumber,
          totalprice: self.data.totalprice
        }
      });
      wx.navigateTo({

        url: '../HotTop/HotTop?content=支付'
      });
    },

    /* 用户授权 */
    onGetUserInfo: function onGetUserInfo(e) {
      console.log(e);
      var self = this;
      var openid = app.globalData.openid;
      if (self.data.newuser && e.detail.userInfo) {
        wx.showLoading({
          mask: 'none',
          title: '用户信息建立中...'
        });
        db.collection('userinfo').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            username: e.detail.userInfo.nickName,
            usertximg: e.detail.userInfo.avatarUrl,
            userlocation: {},
            havelocation: false
          },
          success: function success(res) {
            wx.setStorage({
              key: "userinfo",
              data: {
                _id: res._id,
                _openid: openid,
                username: e.detail.userInfo.nickName,
                usertximg: e.detail.userInfo.avatarUrl,
                userlocation: {},
                havelocation: false
              }
            });
            self.setdata({
              newuser: false,
              username: e.detail.userInfo.nickName,
              usertximg: e.detail.userInfo.avatarUrl,
              userlocation: {},
              havelocation: false
            });
            console.log(res);
          },
          fail: console.error,
          complete: function complete(res) {
            wx.hideLoading();
          }
        });
      }
    },
    /* 下拉刷新 */
    onPullDownRefresh: function onPullDownRefresh() {
      if (!this.data.tabbar) {
        wx.showNavigationBarLoading();
        this.onShow();
      } else {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    },
    /* 选规格弹窗开启 */
    xuanguige: function xuanguige(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var goodsname = self.data.goods[index].name;
      var goodsguigekouwei = self.data.goods[index].guigekouwei;
      var goodsguigekouwei2 = self.data.goods[index].guigekouwei2;
      self.setdata({
        xuanguigegoodsindex: index,
        goodsname: goodsname,
        goodsguigekouwei: goodsguigekouwei,
        goodsguige2: self.data.goods[index].guige2,
        goodsguigekouwei2: goodsguigekouwei2,
        guige: true
      });
    },

    /* 选规格弹窗隐藏 */
    hidexuanguige: function hidexuanguige(e) {
      var self = this;
      self.setdata({
        guige: false
      });
    },

    /* 选规格-口味 */
    guigekouwei: function guigekouwei(e) {
      this.setdata({
        guigeindex: e.currentTarget.dataset.index
      });
    },
    guigekouwei2: function guigekouwei2(e) {
      this.setdata({
        guigeindex2: e.currentTarget.dataset.index
      });
    },

    /* 选规格加购物车 */
    guigeoneaddgoods: function guigeoneaddgoods(e) {
      console.log(13);
      var self = this;
      var index = self.data.xuanguigegoodsindex;
      var goodsnumber = self.data.goods[index].number;
      var goodsdata = "good[" + index + "].number";
      var buy = this.data.buy;
      if (self.data.goodsguige2) {
        var name = self.data.goods[index].name + "(" + self.data.goodsguigekouwei[self.data.guigeindex] + ")" + "(" + self.data.goodsguigekouwei2[self.data.guigeindex2] + ")";
      } else {
        var name = self.data.goods[index].name + "(" + self.data.goodsguigekouwei[self.data.guigeindex] + ")";
      }

      var goods = {
        guige: true,
        id: self.data.goods[index].id,
        img: self.data.goods[index].img,
        name: name,
        price: self.data.goods[index].price,
        zhekou: self.data.goods[index].zhekou,
        zhekouprice: self.data.goods[index].zhekouprice,
        nowprice: self.data.goods[index].nowprice,
        shangpu: self.data.goods[index].shangpu, //所属商铺
        shopid: self.data.goods[index].shopid,
        number: 1, //用户购物车数量
        index: index //在goods列表里的index
      };
      buy.push(goods);
      self.setdata(_defineProperty({
        guige: false,
        buy: buy
      }, goodsdata, goodsnumber + 1), function () {
        self.buy(buy);
      });
    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function onUnload() {}

  }, _defineProperty(_Page, "onPullDownRefresh", function onPullDownRefresh() {}), _defineProperty(_Page, "onReachBottom", function onReachBottom() {}), _defineProperty(_Page, "onShareAppMessage", function onShareAppMessage() {}), _Page));
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
