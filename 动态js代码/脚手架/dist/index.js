/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function runCode() {

  var db = wx.cloud.database({ env: 'mall-7gi19fir46652cb4' });

  var Page = function Page(page) {
    return page;
  };
  return Page(_defineProperty({
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
      var _this = this;

      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var html = "<view  class='top' style='background-color: rgb(255, 255, 255); border-top-left-radius: 40rpx; border-top-right-radius: 40rpx; display: flex; flex-direction: column; height: 310rpx; margin-top: 50rpx; overflow: hidden; width: 100%;'>  <view  class='topName' style='font-size: 46rpx; font-weight: 550; margin: 20rpx 0rpx 0rpx 29rpx;'> " + (_typeof(this.data.shopname) === "object" ? JSON.stringify(this.data.shopname) : this.data.shopname) + "  </view> <view  class='topSold' style='color: #4c4c4ca3; font-size: 24rpx; margin: 10rpx 0rpx 5rpx 29rpx;'> \\u6708\\u552E2823  \\u914D\\u9001\\u7EA630\\u5206\\u949F  </view> <view  class='topTitle' style='display: flex; flex-direction: row; font-size: 23rpx; margin: 10rpx 0rpx 5rpx 29rpx;'>  <view  class='topTitlelabel' style='background-color: #e6e6e661; border-radius: 8rpx; padding: 5rpx 9rpx; width: fit-content;'> \\u5B98\\u6E21\\u5976\\u8336\\u4EBA\\u6C14\\u699C\\u7B2C\\u4E00\\u540D  </view>  </view> <view  class='topDiscount' style='display: flex; flex-direction: row; font-size: 23rpx; margin: 13rpx 0rpx 5rpx 29rpx;'>  <view  class='coupon' style='align-items: center; border: 1rpx solid crimson; border-radius: 8rpx; color: #ee5527; display: flex; margin-right: 5px; padding: 0px 4px; width: fit-content;'> 25\\u51CF1 | 35\\u51CF3 | 50\\u51CF5  </view> <view  class='coupon' style='align-items: center; border: 1rpx solid crimson; border-radius: 8rpx; color: #ee5527; display: flex; margin-right: 5px; padding: 0px 4px; width: fit-content;'> 4.88\\u6298\\u8D77  </view> <view  class='coupon' style='align-items: center; border: 1rpx solid crimson; border-radius: 8rpx; color: #ee5527; display: flex; margin-right: 5px; padding: 0px 4px; width: fit-content;'> \\u6536\\u85CF\\u9886\\u4E00\\u5143\\u5238  </view>  </view> <view  class='topNotice' style='color: #656565b8; font-size: 25rpx; margin: 10rpx 0rpx 5rpx 29rpx; width: 100%;'> \\u516C\\u544A\\uFF1A \\u6CB9\\u6821\\u5B66\\u751F\\u53EF\\u4EE5\\u5C0F\\u7A0B\\u5E8F\\u4E0B\\u5355\\u5907\\u6CE8\\u4E00\\u4E0B\\u9001\\u5230\\u5357\\u95E8\\u6216\\u897F\\u95E8  </view>  </view> <view  style='display: flex;flex-direction: row; align-items: center; height: 72rpx;width: 100%;position: sticky;background-color: white;top: 0rpx;z-index: 3;border-bottom: 2rpx solid #94949438;' id='labelControl'>  <view  class='order_1' bindtap='order' id='order' style='color: #464646de; display: flex; font-size: 29rpx; font-weight: " + (_typeof(this.data.order_2) === "object" ? JSON.stringify(this.data.order_2) : this.data.order_2) + "; margin: 0 28rpx;'>     \\u70B9\\u83DC      </view> <view  class='comment_1' bindtap='comment' id='comment' style='color: #464646de; display: flex; font-size: 29rpx; font-weight: " + (_typeof(this.data.comment_2) === "object" ? JSON.stringify(this.data.comment_2) : this.data.comment_2) + "; margin: 0 28rpx;'>     \\u8BC4\\u8BBA <view  class='commentNum' style='align-self: flex-end; color: #46464685; display: flex; font-size: 22rpx; margin: 0rpx 0rpx 4rpx 10rpx;'> 2333  </view>  </view> <view  class='business_1' bindtap='business' id='business' style='color: #464646de; display: flex; font-size: 29rpx; font-weight: " + (_typeof(this.data.business_2) === "object" ? JSON.stringify(this.data.business_2) : this.data.business_2) + "; margin: 0 28rpx;'>     \\u5546\\u5BB6      </view> <view  style='background-color: #FFD633;width: " + (_typeof(this.data.widthLength) === "object" ? JSON.stringify(this.data.widthLength) : this.data.widthLength) + "px;height: 4rpx;position: absolute;left:" + (_typeof(this.data.leftLength) === "object" ? JSON.stringify(this.data.leftLength) : this.data.leftLength) + "px;bottom: 0;transition: left .4s;' class='dede'>   </view>  </view> <!--  class='rotation'>  <view  class='rotationImg'>   </view>  </!--> <cyqswiper  bindchange='bindchange' topH='" + (_typeof(this.data.topH) === "object" ? JSON.stringify(this.data.topH) : this.data.topH) + "' style='height:1370rpx; width: 100%;position: sticky;top: " + (_typeof(this.data.topH) === "object" ? JSON.stringify(this.data.topH) : this.data.topH) + "px;' current='" + (_typeof(this.data.navState) === "object" ? JSON.stringify(this.data.navState) : this.data.navState) + "'>  <cyqswiper-item >  <view  style='display: flex;flex-direction: row;white-space: nowrap;background-color: white;height: 100%;width: 100%;'>  <view  style='position: sticky;top: " + (_typeof(this.data.topH) === "object" ? JSON.stringify(this.data.topH) : this.data.topH) + "px;height:" + (_typeof(this.data.windowHeight) - 30 === "object" ? JSON.stringify(this.data.windowHeight - 30) : this.data.windowHeight - 30) + "px;width: 20%;'>  <scroll-view  scroll-y='true' id='leftScroll' class='leftScroll' style='background-color: rgba(230, 230, 230, 0.301); width: 100%; z-index: 2;'>  " + this.data.menuList.map(function (item, index) {
        return "<view  class='recommend' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' bindtap='chooseLabel' style='align-items: center; background-color: " + ((_typeof(item.type) === "object" ? JSON.stringify(item.type) : item.type) === 1 ? 'white' : '') + "; display: flex; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'>  <image  src='data:image/png;base64,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' style='height: 34rpx; margin: 7rpx 10rpx 0rpx 0rpx; width: 34rpx;'>   </image> <view > " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "  </view>  </view> ";
      }) + "<view  class='null' style='align-items: center; display: flex; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'>   </view> <view  class='null' style='align-items: center; display: flex; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'>   </view> <view  class='null' style='align-items: center; display: flex; flex-wrap: wrap; font-size: 24rpx; height: 100rpx; justify-content: center;'>   </view>  </scroll-view>  </view> <scroll-view  class='rightScroll' style='background-color: white; display: flex; flex-direction: column; height: calc(100vh); padding-top: " + (_typeof(this.data.topH) === "object" ? JSON.stringify(this.data.topH) : this.data.topH) + "px; width: 80%;' scroll-into-view='" + (_typeof(this.data.bottomId) === "object" ? JSON.stringify(this.data.bottomId) : this.data.bottomId) + "' bindscroll='trackingTag' scroll-y='" + (_typeof(this.data.monitorScrolling) === "object" ? JSON.stringify(this.data.monitorScrolling) : this.data.monitorScrolling) + "'>  " + this.data.menuList.map(function (item, index) {
        return "<view  wx:key='id' id='" + (_typeof(item.changeLabel) === "object" ? JSON.stringify(item.changeLabel) : item.changeLabel) + "'>  <view  class='sign' style='background-color: rgb(255, 255, 255); display: flex; height: 82rpx; position: sticky; top: 0rpx; width: 100%; z-index: 3;'>  <view  class='signContent' style='border-radius: 15rpx; display: flex; font-size: 23rpx; height: 43rpx; margin-left: 10rpx; margin-top: 18rpx; overflow: hidden;'>               " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "               <!--  class='signContentone'> \\u62DB\\u724C  </!--> <view  class='signContenttwo'> \\u8001\\u677F\\u63A8\\u8350  </view>  </view>  </view> " + item.goodsList.map(function (item, index) {
          return "<view  wx:key='id'>  <view  class='goods' style='align-items: center; display: flex; height: 200rpx; margin: 0 10rpx 45rpx 10rpx; width: 100%;'>  <view  class='goodsImg' style='align-items: center; background-color: #e4e4e457; border-radius: 16rpx; display: flex; height: 95%; justify-content: center; overflow: hidden; width: 190rpx;'>  <image  src='" + (_typeof(item.img) === "object" ? JSON.stringify(item.img) : item.img) + "' mode='aspectFill' style='height: 100%; width: 100%;'>   </image>  </view> <view  class='goodsContent' style='height: 100%; line-height: 43rpx; padding: 0 0 0 19rpx; width: 62%;'>  <view  class='goodsName' style='-webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box; font-size: 30rpx; font-weight: 550; overflow: hidden; text-overflow: ellipsis; width: 100%; word-break: break-all;'> " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "  </view> <view  class='goodsBrief' style='color: rgb(37, 37, 37); font-size: 22rpx; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;'> \\u5F00\\u80C3\\u97E9\\u5F0F\\u6CE1\\u83DC + \\u4E94\\u5E38\\u5927\\u7C73 + \\u80A5\\u725B" + (_typeof(_this.data.topH) === "object" ? JSON.stringify(_this.data.topH) : _this.data.topH) + "  </view> <view  class='goodsSold' style='color: rgba(78, 78, 78, 0.692); font-size: 22rpx; width: 100%;'> \\u6708\\u552E " + (_typeof(item.yuenumber) === "object" ? JSON.stringify(item.yuenumber) : item.yuenumber) + "  </view> <view  class='goodsPrice' style='color: #ee5527; font-family: inherit; font-size: 24rpx; font-weight: 550; position: relative; top: 27rpx;'>                   \\uFFE5 <text  class='price' style='font-size: 36rpx; position: relative; right: 10rpx;'> " + (_typeof(item.price) === "object" ? JSON.stringify(item.price) : item.price) + "  </text>  </view> <view  class='goodsAdd' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' bindtap='oneaddgoods' style='align-items: center; background-color: #FFD633; border-radius: 50rpx; bottom: 28rpx; display: flex; float: right; height: 45rpx; justify-content: center; position: relative; width: 45rpx;'>  " + ((_typeof(item.number) === "object" ? JSON.stringify(item.number) : item.number) != 0 ? "<view  class='goodsNum' style='align-items: center; background-color: red; border-radius: 20rpx; bottom: 30rpx; color: white; display: flex; font-size: 17rpx; height: 24rpx; justify-content: center; position: absolute; right: -5rpx; width: 24rpx;'> " + (_typeof(item.number) === "object" ? JSON.stringify(item.number) : item.number) + "  </view> " : "") + "<image  src='data:image/png;base64,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' style='height: 58%; width: 58%;'>   </image>  </view>  </view>  </view>  </view> ";
        }) + " </view> ";
      }) + "<view  style='width: 100%;height: 200rpx;'>   </view> <view  style='width: 100%;height: 200rpx;'>   </view> <view  style='width: 100%;height: 200rpx;'>   </view> <view  style='width: 100%;height: 200rpx;'>   </view> <view  style='width: 100%;height: 200rpx;'>   </view> <view  style='width: 100%;height: 200rpx;'>   </view>  </scroll-view>  </view>  </cyqswiper-item>  </cyqswiper> <view  class='settle' style='align-items: center; background-color: #F7F7F7; bottom: 0; display: flex; flex-direction: column; height: 154rpx; position: fixed; width: 100%; z-index: 4;'>  " + (!(_typeof(this.data.modalName) === "object" ? JSON.stringify(this.data.modalName) : this.data.modalName) ? "<view  class='showDiscount_1' style='background-color: #fcf4dbfb; border-top-left-radius: 25rpx; border-top-right-radius: 25rpx; bottom: 62rpx; display: flex; height: 84rpx; justify-content: center; padding-top: 8rpx; position: relative; width: 92%;'>  <view  class='discountAgain' style='display: flex; font-size: 23rpx; justify-content: center; margin-top: 10rpx;'> 25\\u51CF1 , 35\\u51CF3 , 50\\u51CF5  </view>  </view> " : "") + ((_typeof(this.data.totalprice) === "object" ? JSON.stringify(this.data.totalprice) : this.data.totalprice) == 0.00 ? "<view  class='settleAll_1' style='align-items: center; background-color: #0E0D0C; border-radius: 26px; display: flex; flex-direction: row; height: 90rpx; position: absolute; width: 92%;'>  <view  class='settlePrice_1' style='color: white; font-size: 40rpx; margin-left: 64rpx;'> \\uFFE50   </view> <view  class='freight_1' style='color: #cacaca91; font-size: 26rpx; margin-left: 13rpx; width: 300rpx;'> | \\u9884\\u4F30\\u53E6\\u9700\\u914D\\u9001\\u8D39\\uFFE51  </view> <view  class='goSettle_1' style='color: #cacaca91; font-size: 30rpx; margin-left: 60rpx;'> \\uFFE513\\u8D77\\u9001  </view>  </view> " : "") + ((_typeof(this.data.totalprice) === "object" ? JSON.stringify(this.data.totalprice) : this.data.totalprice) != 0.00 ? "<view  class='settleAll_2' bindtap='showModal' style='align-items: center; background-color: #0E0D0C; border-radius: 26px; display: flex; flex-direction: row; height: 90rpx; justify-content: flex-end; overflow: hidden; position: absolute; width: 92%;'>  <view  style='height: 100%;display: flex;flex-direction: column;width: 420rpx;line-height: 38rpx;padding-top: 10rpx;color: white;'>  <view  class='settlePrice_2' style='font-size: 38rpx;'> \\uFFE5" + (_typeof(this.data.totalprice) === "object" ? JSON.stringify(this.data.totalprice) : this.data.totalprice) + "   </view> <view  class='freight_2' style='font-size: 21rpx; margin-left: 9rpx;'> \\u9884\\u4F30\\u53E6\\u9700\\u914D\\u9001\\u8D39\\uFFE51  </view>  </view> <view  class='goSettle_2' bindtap='pay' style='align-items: center; background: #FECC53; display: flex; font-size: 30rpx; font-weight: 550; height: 100%; justify-content: center; width: 165rpx;'> \\u53BB\\u7ED3\\u7B97  </view>  </view> " : "") + " </view> " + ((_typeof(this.data.modalName) === "object" ? JSON.stringify(this.data.modalName) : this.data.modalName) ? "<view  class='EditCom' style='align-items: center; bottom: 0; display: flex; font-family: unset; justify-content: center; left: 0; position: fixed; right: 0; top: 0; z-index: 3;'>  <view  class='EditCom_background' bindtap='showModal' style='align-items: center; background-color: rgba(0, 0, 0, 0.92); bottom: 0; display: flex; font-family: unset; height: 100%; justify-content: center; left: 0; opacity: 0.6; position: fixed; right: 0; top: 0; z-index: 3;'>   </view> <view  class='EditCom_contain' style='background-color: rgb(255, 255, 255); border-radius: 20rpx; bottom: 0; display: flex; flex-direction: column; justify-content: center; overflow: hidden; position: fixed; width: 100%; z-index: 99999;'>  <view  class='showDiscount_2' style='background-color: #fcf4dbfb; display: flex; height: 52rpx; justify-content: center; position: relative; width: 100%;'>  <view  class='discountAgain' style='display: flex; font-size: 23rpx; justify-content: center; margin-top: 10rpx;'> 25\\u51CF1 , 35\\u51CF3 , 50\\u51CF5  </view>  </view> <view  class='cleanShop' style='align-items: center; border-bottom: 2rpx solid #dadada59; color: #545454d4; display: flex; font-size: 22rpx; height: 74rpx; justify-content: flex-end; margin-bottom: 30rpx; padding: 0rpx 30rpx;'>       \\u6E05\\u7A7A\\u8D2D\\u7269\\u8F66        </view> " + this.data.buy.map(function (item, index) {
        return "<view  class='buy' style='height: 100px; padding: 0rpx 30rpx; width: 100%;'>  <view  style='display: flex;height: 160rpx;'>  <view  class='buyImg' style='height: 130rpx; width: 130rpx;'>  <image  src='" + (_typeof(item.img) === "object" ? JSON.stringify(item.img) : item.img) + "' mode='aspectFill' style='height: 100%; width: 100%;'>   </image>  </view> <view  class='buyContent' style='display: flex; flex-direction: column; height: 81%; line-height: 72rpx; padding-left: 15rpx; width: 565rpx;'>  <view  class='buyName' style='font-size: 30rpx; font-weight: 550; width: 100%;'> " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "  </view> <view >  <view  class='buyPrice' style='color: #ee5527; font-size: 38rpx; font-weight: 550;'> \\uFFE5" + (_typeof(item.price) === "object" ? JSON.stringify(item.price) : item.price) + "  </view> <view  class='buyNumber' style='align-items: center; bottom: 60rpx; display: flex; float: right; height: 48rpx; justify-content: center; position: relative; width: 174rpx;'>  <view  class='numberDel' bindtap='reducenumber' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' data-type='reduce' style='align-items: center; border: 2rpx solid #FECC53; border-bottom-left-radius: 8rpx; border-top-left-radius: 8rpx; color: #000; display: flex; height: 100%; justify-content: center; margin: 0 7rpx; width: 62rpx;'> -  </view> <view  class='numberShow' style='align-items: center; background-color: rgba(179, 179, 179, 0.14); display: flex; font-size: 24rpx; height: 100%; justify-content: center; width: 70rpx;'> " + (_typeof(item.number) === "object" ? JSON.stringify(item.number) : item.number) + "  </view> <view  class='numberAdd' bindtap='addgoods' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' style='align-items: center; background-color: #FECC53; border-bottom-right-radius: 8rpx; border-top-right-radius: 8rpx; color: #000; display: flex; height: 100%; justify-content: center; margin: 0 7rpx; width: 62rpx;'> +  </view>  </view>  </view>  </view>  </view> <view  style='background-color: #dadada59;width: 80%;height: 2rpx;float: right;'>   </view>  </view> ";
      }) + "<view  style='height: 216rpx;'>   </view>  </view>  </view> " : "");
      this.setData({ html: this.parse(html) });
    },

    data: {
      goods: [], //所有商品的列表
      mydingdan: [], //订单
      windowHeight: app.globalData.windowHeight,
      mydindantotal: 0,
      skip: 0, //订单跳过前几条
      newuser: true,
      buy: [], //购物车内的商品列表
      totalprice: 0.00, //购物车总价格，不可以删，否则下面的价格栏切换显示出现bug
      havelocation: false,
      menuList: [], //菜单列表
      productGroups: [], //最后用于展示在页面的商品列表
      bottomId: " ", //用于实现点击菜单，商品列表进行滑动操作的索引
      scrollNum: -1 //用于实现对商品列表滑动，菜单标签出现对应选中的索引
    },

    onLoad: function onLoad(option) {
      var _this2 = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this2.setdata({ dark: e.theme });
      });this.setdata();
      var args = wx.getStorageSync('args');
      var self = this;
      this.order();
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      db.collection('shop').doc('uncanny').get().then(function (res) {
        wx.setStorage({
          key: "shop",
          data: res.data
        });
        res.data.caidan.forEach(function (e) {
          return e.goodsList = [];
        });
        self.setdata({
          shop_id: 'uncanny',
          menuList: res.data.caidan,
          goods: res.data.goods,
          goprice: res.data.goprice * 1,
          shopname: res.data.name,
          shopid: res.data.shopid
        });
        {
          wx.cloud.callFunction({
            name: 'login',
            env: 'mall-7gi19fir46652cb4',
            data: {},
            success: function success(loginres) {
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
                  self.obtainTop('#labelControl');
                  self.menuRendering();
                } else {
                  db.collection('userinfo').add({
                    data: {
                      _openid: loginres.result.openid,
                      username: args.username,
                      havelocation: false,
                      userlocation: {},
                      usertximg: args.iconUrl
                    } });
                }
                self.onShow();

                wx.getSystemInfo({
                  success: function success(res) {
                    //console.log('系统信息:', res);
                    self.setdata({
                      windowWidth: res.windowWidth
                    });
                  }
                });
              });
            },
            fail: function fail(err) {
              console.error('[云函数] [login] 调用失败', err);
            }
          });
        }
      });
    },

    onShow: function onShow(e) {
      var self = this;
      var skip = self.data.skip;
      this.setdata({
        userlocation: self.data.userlocation
      });

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

      wx.hideHomeButton();
    },


    /* 获取盒子的尺寸：宽度/距离顶部的高/距离左边的长度/... */
    obtainTop: function obtainTop(type) {
      var that = this;
      var query = wx.createSelectorQuery();
      query.select(type).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(function (res) {
        if (type === '#labelControl') {
          that.setdata({
            topH: res[0].height, // #the-id节点的上边界坐标
            windowHeight: wx.getSystemInfoSync().windowHeight
          });
        } else {
          that.setdata({
            leftLength: res[0].left,
            widthLength: res[0].width
          });
        }
      });
    },


    /* 点菜/评论/商家 标签 */
    order: function order() {
      this.obtainTop('#order');
      this.setdata({
        order_2: 550,
        comment_2: 400,
        business_2: 400,
        navState: 0
      });
    },
    comment: function comment() {
      this.obtainTop('#comment');
      this.setdata({
        comment_2: 550,
        order_2: 400,
        business_2: 400,
        navState: 1
      });
    },
    business: function business() {
      this.obtainTop('#business');
      this.setdata({
        comment_2: 400,
        order_2: 400,
        business_2: 550,
        navState: 2
      });
    },


    /* 点击菜单列表 */
    chooseLabel: function chooseLabel(e) {
      this.data.menuList.map(function (item) {
        item.type = 0;
      });
      this.data.menuList[e.currentTarget.id].type = 1;
      this.setdata({
        choosen: true,
        menuList: this.data.menuList,
        monitorScrolling: true
      });
      this.scrollTo(this.data.menuList[e.currentTarget.id].changeLabel);
    },


    /* 商品的展示列表，将原本只存有所有商品的this.data.good，转化成格式为：
      arry[{
        name:'好吃'      //商品所属标签,
        goodsList:[]      //该标签对应下的商品,
        changeLabel:''    //用于选中菜单标签，商品列表实现对应滚动的功能
      },{},...] */
    getProductGroups: function getProductGroups() {
      var _this3 = this;

      this.data.menuList.forEach(function (item) {
        var goodsList = _this3.data.goods.filter(function (item2) {
          return item2.caidan === item.name;
        });
        item.goodsList = goodsList;
      });
      this.setdata({
        menuList: this.data.menuList
      });
    },


    /* 根据滑动页面的索引，来触发对应的函数，对上面的标签栏（菜单/评价/商家）进行动态渲染 */
    swiperChange: function swiperChange(e) {
      switch (e.detail.current) {
        case 0:
          this.order();break;
        case 1:
          this.comment();break;
        case 2:
          this.business();break;
      }
    },


    /* 菜单渲染 */
    menuRendering: function menuRendering() {
      var count = 0;
      var menuList = this.data.menuList.map(function (item) {
        var obj = {
          name: item.name,
          type: 0,
          goodsList: [],
          changeLabel: 'changeLabel' + count
        };
        count += 1;
        return obj;
      });

      this.setdata({
        menuList: menuList
      });
      this.getProductGroups();
      wx.hideLoading();
    },


    /* 控制下面的商品滚动，当商品列表没占据全屏时，商品列表不滚动 */
    onPageScroll: function onPageScroll(e) {
      if (e.scrollTop >= 187) {
        this.setdata({
          monitorScrolling: true
        });
      } else {
        this.setdata({
          monitorScrolling: false
        });
      }
    },


    /* 当商品列表不占据全屏时，点击菜单列表，页面滚动，商品列表总体往上滑，占据全屏 */
    scrollTo: function scrollTo(bottomId) {
      this.setdata({
        bottomId: bottomId
      });
      wx.createSelectorQuery().select('#labelControl').boundingClientRect(function (res) {
        if (res.top != 0) {
          wx.pageScrollTo({
            scrollTop: res.top, // 滚动到的位置（距离顶部 px）
            duration: 500 //滚动所需时间 如果不需要滚动过渡动画，设为0（ms）
          });
        }
      }).exec();
    },


    /* 实现滚动商品列表，菜单列表出现对应的选中渲染 */
    trackingTag: function trackingTag(e) {
      var that = this;
      var query = wx.createSelectorQuery();
      that.data.menuList.forEach(function (item) {
        var changeLabel = '#' + item.changeLabel;
        query.select(changeLabel).boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function (res) {
          that.data.menuList.map(function (item) {
            item.type = 0;
          });
          var we = res.find(function (item) {
            return -item.height < item.top - 30;
          });
          if (we != undefined) {
            that.data.scrollNum = we.id.replace(/[^0-9]/ig, "");
            that.data.menuList[that.data.scrollNum].type = 1;
          }
        });
      });
      that.setdata({
        menuList: that.data.menuList
      });
    },


    /* 在购物车图标添加商品 */
    oneaddgoods: function oneaddgoods(e) {
      var _this4 = this;

      var index = e.currentTarget.id;
      if (this.data.newuser) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000
        });
      } else {
        var buyIndex = this.data.buy.findIndex(function (item) {
          return item.name === _this4.data.goods[index].name;
        });
        if (buyIndex != -1) {
          this.data.buy[buyIndex].number += 1;
        } else {
          var goods = {
            guige: false,
            id: this.data.goods[index].id,
            img: this.data.goods[index].img,
            name: this.data.goods[index].name,
            price: this.data.goods[index].price,
            discount: this.data.goods[index].discount,
            nowprice: this.data.goods[index].nowprice,
            shangpu: this.data.goods[index].shangpu, //所属商铺
            shopid: this.data.goods[index].shopid,
            number: 1 //用户购物车数量
            // index: this, //在goods列表里的index
          };
          this.data.buy.push(goods);
        }
        this.data.goods[index].number += 1;
        this.buy(this.data.buy);
      }
    },


    /* 在购物车弹窗添加商品 */
    addgoods: function addgoods(e) {
      var index = e.currentTarget.id;
      this.data.buy[index].number += 1;
      this.data.goods[index].number += 1;
      this.setdata({
        buy: this.data.buy,
        goods: this.data.goods
      });
      this.buy(this.data.buy);
    },


    /* 在购物车弹窗删除商品 */
    reducenumber: function reducenumber(e) {
      var index = e.currentTarget.id;
      if (this.data.buy[index].number === 1) {
        this.data.buy.splice(index, 1);
      } else {
        this.data.buy[index].number -= 1;
      }
      this.data.goods[index].number -= 1;
      this.setdata({
        buy: this.data.buy,
        goods: this.data.goods
      });
      this.buy(this.data.buy);
    },
    buy: function buy(_buy) {
      var numberSum = _buy.reduce(function (numberSum, item) {
        return numberSum + item.number;
      }, 0);
      // 购物车加购的商品价格（priceSum）加一
      var priceSum = _buy.reduce(function (priceSum, item) {
        return priceSum + item.number * item.nowprice;
        // return priceSum + item.number * (item.nowprice * item.zhekou * 0.1);      //---后期优化，无折扣商品：zhekou=10；有折扣商品：zhekou=zhekou*0.1
      }, 0);

      if (numberSum === 0) {
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
    },


    /* 购物车弹出 */
    showModal: function showModal() {
      if (this.data.buy.length != 0) {
        var payStyle = 'payHide';
        payStyle === undefined || payStyle === 'payHide' ? payStyle = 'payShow' : payStyle = 'payHide';
        this.setdata({
          payStyle: payStyle,
          modalName: !this.data.modalName,
          buy: this.data.buy
        });
      }
    },


    /* 地址设置 */ //我也不知道这用来干啥
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


    /* 用户授权 */ //我也不知道这用来干啥
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
      // if (!this.data.tabbar) {
      //   wx.showNavigationBarLoading()
      //   this.onShow()
      // } else {
      //   wx.hideNavigationBarLoading()
      //   wx.stopPullDownRefresh()
      // }
    }

  }, "onPullDownRefresh", function onPullDownRefresh() {}));
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map