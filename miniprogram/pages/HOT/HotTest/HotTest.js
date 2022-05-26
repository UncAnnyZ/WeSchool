
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

  var db = wx.cloud.database({ env: 'mall-7gi19fir46652cb4' });
  var timeOut = 0;

  var Page = function Page(page) {
    return page;
  };
  return Page(_defineProperty({

    onLoad: function onLoad(options) {
      options = this.options;
      this.setdata({});
    },

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

      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var html = "<view class='container' style='align-items: center; background: #FBE9A3; display: flex; flex-direction: column; height: 100%; width: 100%;'>  <view class='labelControl' style='align-items: center; background-color: white; border-bottom: 2rpx solid #94949438; display: flex; flex-direction: row; height: 72rpx; padding: 25rpx 0rpx; position: sticky; top: 0rpx; width: 100%; z-index: 3;'>    <view class='showAllOrders' id='showAllOrders' bindtap='showAllOrders' style='color: #464646de; display: flex; font-size: 25rpx; font-weight: " + (_typeof(this.data.showAllOrdersHeight) === "object" ? JSON.stringify(this.data.showAllOrdersHeight) : this.data.showAllOrdersHeight) + "; margin: 0 28rpx;'>\\u5168\\u90E8\\u8BA2\\u5355</view>    <view class='unpaid' id='unpaid' bindtap='unpaid' style='color: #464646de; display: flex; font-size: 25rpx; font-weight: " + (_typeof(this.data.unpaidHeight) === "object" ? JSON.stringify(this.data.unpaidHeight) : this.data.unpaidHeight) + "; margin: 0 28rpx;'>\\u5F85\\u4ED8\\u6B3E</view>    <view class='paid' id='paid' bindtap='paid' style='color: #464646de; display: flex; font-size: 25rpx; font-weight: " + (_typeof(this.data.paidHeight) === "object" ? JSON.stringify(this.data.paidHeight) : this.data.paidHeight) + "; margin: 0 28rpx;'>\\u5DF2\\u4ED8\\u6B3E</view>    <view class='labelControlLine' style='background-color: #FFD633; bottom: 0; height: 4rpx; left: " + (_typeof(this.data.leftLength) === "object" ? JSON.stringify(this.data.leftLength) : this.data.leftLength) + "px; position: absolute; transition: left .4s; width: " + (_typeof(this.data.widthLength) === "object" ? JSON.stringify(this.data.widthLength) : this.data.widthLength) + "px;'></view>  </view>  <swiper bindchange='bindchange' style='height: 100%;width: 94%;' current='" + (_typeof(this.data.navState) === "object" ? JSON.stringify(this.data.navState) : this.data.navState) + "'>  <swiper-item>  <view style='width: 94%;display: flex;flex-direction: column;padding: 10rpx 0rpx 20rpx 0rpx;'>    " + this.data.allOrders.map(function (item, index) {
        return " <view style='background-color: white;width: 100%;display: flex;flex-direction: column;border-radius: 15rpx;color: black;margin-top: 15rpx;padding:20rpx;' >      <view style='font-weight: 550;color: black;display: flex;flex-direction: row;align-items: center;padding: 5rpx 0rpx;border-bottom: 1rpx solid #94949438;padding-bottom: 20rpx;'>        <view>" + (_typeof(item.buy["0"].shangpu) === "object" ? JSON.stringify(item.buy["0"].shangpu) : item.buy["0"].shangpu) + "</view>        " + (_typeof(item.paymentStatus) === "object" ? JSON.stringify(item.paymentStatus) : item.paymentStatus ? "<view style='margin-left: auto;font-weight: 400;font-size: 24rpx;' >\\u5DF2\\u4ED8\\u6B3E</view>" : "        <view style='margin-left: auto;color: red;font-weight: 400;font-size: 24rpx;' wx:else>\\u5F85\\u4ED8\\u6B3E</view>") + "      </view>      " + item.buy.map(function (item, index) {
          return " <view style='display: flex;flex-direction: row;width: 100%;' >        <view style='width: 160rpx;display: flex;flex-direction: column;margin:15rpx 15rpx 0rpx 0rpx;'>          <view style='height: 108rpx;background-color: #e4e4e457;border-radius: 12rpx;overflow: hidden;'>            <image src='" + (_typeof(item.img) === "object" ? JSON.stringify(item.img) : item.img) + "' mode='aspectFill' style='height: 100%;width: 100%;'></image>          </view>          <view style='font-size: 20rpx;color: #464646de;margin:5rpx 0rpx 0rpx 5rpx;'>          " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "          </view>        </view>      </view>";
        }) + "      <view style='display: flex;flex-direction: row;height: 40rpx;width: 100%;font-size: 24rpx;color: #464646de;margin:20rpx 0rpx 0rpx 5rpx;align-items: center;'>        <view>        \\u4E0B\\u5355\\u65F6\\u95F4\\uFF1A " + (_typeof(item.orderTime) === "object" ? JSON.stringify(item.orderTime) : item.orderTime) + "        </view>        <view style='margin-left: auto;display: flex;flex-direction: row;margin-right: 5rpx;align-items: center;'>        \\u5408\\u8BA1 <view style='font-weight: 500;font-size: 31rpx;color: black;'> \\uFFE5" + (_typeof(item.totalPrice) === "object" ? JSON.stringify(item.totalPrice) : item.totalPrice) + "</view>        </view>      </view>    </view>";
      }) + "  </view>  </swiper-item></swiper></view>";
      this.setData({ html: this.parse(html) });
    },

    data: {
      allOrders: [],
      widthLength: 0,
      leftLength: 0
    },
    obtainTop: function obtainTop(type) {
      var that = this;
      var query = wx.createSelectorQuery();
      query.select(type).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(function (res) {
        that.setdata({
          leftLength: res[0].left,
          widthLength: res[0].width
        });
      });
    },
    showAllOrders: function showAllOrders() {
      this.obtainTop('#showAllOrders');
      this.setdata({
        showAllOrdersHeight: 550,
        unpaidHeight: 400,
        paidHeight: 400
      });
    },
    unpaid: function unpaid() {
      this.obtainTop('#unpaid');
      this.setdata({
        showAllOrdersHeight: 400,
        unpaidHeight: 550,
        paidHeight: 400
      });
    },
    paid: function paid() {
      this.obtainTop('#paid');
      this.setdata({
        showAllOrdersHeight: 400,
        unpaidHeight: 400,
        paidHeight: 550
      });
    }
  }, "onLoad", function onLoad() {
    var _this = this;

    wx.getStorage({
      key: 'allOrders',
      success: function success(res) {
        console.log(res.data.allOrders);
        _this.setdata({
          allOrders: res.data.allOrders
        });
        _this.showAllOrders();
      }
    });
  }));
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
