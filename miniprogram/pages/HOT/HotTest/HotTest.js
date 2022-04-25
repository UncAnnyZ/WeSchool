
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
  // components/HotComponent/HotComponent.js


  var Page = function Page(page) {
    return page;
  };
  return Page({

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
      var html = "<view  " + (this.data.dark === 'dark' ? 'style="    background-color: #f1eded;    /* filter: invert(100%) !important; */  "' : '') + " class='pic' bindtap='ShowContent' style='background-color: rgb(255, 255, 255); border-radius: 15rpx; margin-bottom: 30rpx; overflow: hidden; width: 338rpx;'>  <image style='Show_Image' lazy-load src='" + (_typeof(item1.Cover) === "object" ? JSON.stringify(item1.Cover) : item1.Cover) + "' mode='aspectFill' style='background-color: #ebebebd8; border-radius: 15rpx; height: " + (_typeof(item1.ShowHeight) === "object" ? JSON.stringify(item1.ShowHeight) : item1.ShowHeight > 500 ? 500 + "rpx" : _typeof(item1.ShowHeight) === "object" ? JSON.stringify(item1.ShowHeight) : item1.ShowHeight + "rpx") + "; width: 338rpx;' binderror='binderrorimg' bindload='onLazyLoad'></image>  <view>    <span  " + (this.data.dark === 'dark' ? 'style="    color: #fff;    filter: invert(100%) !important;  "' : '') + " class='pic_Title' style='-webkit-box-orient: vertical; -webkit-line-clamp: 2; color: rgb(0, 0, 0); display: -webkit-box; font-family: 'Arial','Microsoft YaHei','\\u9ED1\\u4F53','\\u5B8B\\u4F53',sans-serif; font-size: 28rpx; letter-spacing: 1rpx; line-height: 35rpx; overflow: hidden; padding: 10rpx 21rpx 0rpx 21rpx; text-overflow: ellipsis; word-break: break-all;'>      <text>" + (_typeof(item1.Title) === "object" ? JSON.stringify(item1.Title) : item1.Title || _typeof(item1.Text) === "object" ? JSON.stringify(item1.Text) : item1.Text) + "</text>    </span>    <image src='" + (_typeof(item1.iconUrl) === "object" ? JSON.stringify(item1.iconUrl) : item1.iconUrl) + "' class='text_user' style='border-radius: 50rpx; height: 35rpx; margin: 15rpx 21rpx; width: 35rpx;'></image>    <span class='text_username' style='bottom: 22rpx; color: rgba(128,128,128,0.8); font-size: 20rpx; position: relative; right: 10rpx;'>" + (_typeof(item1.nickName) === "object" ? JSON.stringify(item1.nickName) : item1.nickName) + "</span>    <div class='comment' style='bottom: 13rpx; height: 20rpx; left: 240rpx; position: sticky; width: 20rpx;'>      <div style='margin-right:6px;'>               <span class='commentNum' style='bottom: 8rpx; color: rgba(0,0,0,0.4); font-size: 22rpx; left: 2rpx; padding-top: 2rpx; position: relative;'>" + (_typeof(item1.Star_User) === "object" ? JSON.stringify(item1.Star_User) : item1.Star_User ? _typeof(item1.Star_User.length) === "object" ? JSON.stringify(item1.Star_User.length) : item1.Star_User.length : 0) + "</span>      </div>      <div style='margin-right:6px;'>        <image src='../../../../../../images/comment.png' class='commentImg' style='height: 32rpx; width: 32rpx;'></image>        <span class='commentNum' style='bottom: 8rpx; color: rgba(0,0,0,0.4); font-size: 22rpx; left: 2rpx; padding-top: 2rpx; position: relative;'>" + (_typeof(item1.CommentList) === "object" ? JSON.stringify(item1.CommentList) : item1.CommentList ? _typeof(item1.CommentList.length) === "object" ? JSON.stringify(item1.CommentList.length) : item1.CommentList.length : 0) + "</span>      </div>    </div>  </view></view>";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {}
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
