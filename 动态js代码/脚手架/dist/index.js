/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


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

      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var html = "<view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(0%)!important;    background-color: #FFA07A;  "' : '') + " class='body' style='align-items: center; background-color: rgba(214,231,242); border-radius: 24rpx; box-sizing: border-box; display: flex; height: 700rpx; justify-content: center; margin-top: -350rpx; position: absolute; top: 50%; width: 100%;'>  <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(10%)!important;  "' : '') + " class='body-box'>    <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(100%)!important;  "' : '') + " class='body-box-block color1' style='align-items: center; background-color: rgba(164,208,244); border-radius: 24rpx; color: rgba(5,66,104); display: flex; font-size: 60rpx; font-weight: 600; height: 130rpx; justify-content: center; margin-bottom: 40rpx; width: 610rpx;'>            <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(10%)!important;  "' : '') + " class='body-box-block-text' style='align-items: center; display: flex; text-align: center; vertical-align: middle;'>        <image src='data:image/png;base64,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' style='color: rgba(249,238,172); height: 100rpx; margin-right: 30rpx; vertical-align: middle; width: 100rpx;'></image>        <text>\\u7533\\u8BF7\\u5165\\u9A7B</text>      </view>    </view>    <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(100%)!important;  "' : '') + " class='body-box-block color2' style='align-items: center; background-color: rgba(189,196,244); border-radius: 24rpx; color: rgba(5,66,104); display: flex; font-size: 60rpx; font-weight: 600; height: 130rpx; justify-content: center; margin-bottom: 40rpx; width: 610rpx;'>            <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(10%)!important;  "' : '') + " class='body-box-block-text' style='align-items: center; display: flex; text-align: center; vertical-align: middle;'>        <image src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABVCAYAAAAbrvmPAAAACXBIWXMAAAsSAAALEgHS3X78AAADfklEQVR4nO2c3Y3TQBCAJyjvpANyFRAqwPeKhQkVEOQCCBUQKsC8Y3HpACz5maQCkg7uOrirIGhhfOzl7NlZe+14nfkkK1L8k/i7mdk/50aHwwHOgTBKJwCwBIAgz+KAc8vjoXsJo3QKACsAeGd77mAjJ4zSOUbKy5Ldl3kWb0zXGFTkYOrMMVKeEYdOOdcbhBxMHRUlCwB4yjhl+HLCKA1QiG09GW5BDqN0gZHyvOYlWJHzpObFTwbWlaCBGDDUo3u8ba2aNNHIizyLd9QB3kVOQZ7F13kWq/S6AIB1jUsYU8tbOQWapK+Wp85MB3gvR2Nuefx5yMHWi1VkNYafVsiqxjnG1s57OTWjpjiXTK0hRA4naj4DwEcAuDt6n0wtr+WEUWoaYAIKSfIsTlDGT23fMCNHG2yaWOZZfAv/mv3bPItVq3YJADcmOT4PPBPGCHybZ/HV8Zs4lzPFOZ9KvBw+hFGqIuYL49AL1Ums+zk+Djyn3CLcRAz4Fjk4It8w+ij7PIuNPWATvkVOwhBzV2MoUYo3csIoTZjTE8um6VTgRVphL/g749A1jtCd0PvIsRCzZ/Z72PQ6cizEqDozc5VOBb2NHKwxXDGBazHQxx4yNteqV/uGecrcNBdcl15FDk4hbCzEvOcs69alN3JwSPCbueSiUult2bjJJSdPK4yWpGLBv4yixrSSSjonk4O1RY2RPlictsca47z4ltG5HO0hoiVz0b9grc/NwP9BqKtO3/VxmnYmR7sRWykqjRZ5Fv8o2aeu+cnRV9xiK3lP63JwQmlh0QLpqIW6lR4tXdKKHBRSbDZRUrDFaOmktlTRWA7WkBk++RBYtDplrHEyvPWWiANLDj4kVBBor9O6a0Yae8z1q1OlTxWP5GDhVDc+w61JJJRxg73gv9upU4fikRz8sg+qNgrTtwlnIR4AVCTstNdd36KDgpVWKKy3f+G2GNIjKM4ROQQih0DkEHQyttKmJVygWjynE+lVdDXwnLTQX2odSSsCkUMgcghEDoHIIRA5BCKHQOQQlE12sX7ix6HNpdouKOsh/3L4uaP+3Ko9klYEIodA5BCIHAKRQyByCEQOgcghEDkEIodA5BCIHAKRQyByCEQOgcghEDkEIodA5BCIHIKz+a+2dZDIIRi9ev1thg8XCUeMLX8ld1ZIWhGIHIIx/s7B6zXtVgCAP/bD+y/8xBWvAAAAAElFTkSuQmCC' style='color: rgba(249,238,172); height: 100rpx; margin-right: 30rpx; vertical-align: middle; width: 100rpx;'></image>        <text>\\u5B9E\\u65F6\\u6570\\u636E</text>      </view>    </view>    <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(100%)!important;    background-color: rgba(249,238,172);  "' : '') + " class='body-box-block color3' style='align-items: center; background-color: rgba(249,238,172); border-radius: 24rpx; color: rgba(5,66,104); display: flex; font-size: 60rpx; font-weight: 600; height: 130rpx; justify-content: center; margin-bottom: 0rpx; width: 610rpx;'>            <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(10%)!important;  "' : '') + " class='body-box-block-text' style='align-items: center; display: flex; text-align: center; vertical-align: middle;'>        <image src='data:image/png;base64,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' style='color: rgba(249,238,172); height: 100rpx; margin-right: 30rpx; vertical-align: middle; width: 100rpx;'></image>        <text  " + (this.data.dark === 'dark' ? 'style="    filter: invert(10%)!important;  "' : '') + " class='body-box-block-text-end'>\\u6295\\u653E\\u5E7F\\u544A</text>      </view>    </view>  </view></view>";
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
      var _this = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this.setdata({ dark: e.theme });
      });this.setdata();
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
//# sourceMappingURL=index.js.map