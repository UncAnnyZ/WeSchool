/******/ (function() { // webpackBootstrap
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
      var html = "<view  class='contain' style='padding: 40rpx; padding-top: 0rpx;'>  " + this.data.detail.map(function (item, index) {
        return "<view  class='banner' bindtap='btn' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' data-index='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' style='background-color: #fff; border-radius: 20rpx; margin-top: 40rpx; padding: 0rpx 30rpx; padding-bottom: 20rpx;'>  <view  class='banner-top' style='align-items: center; display: flex; justify-content: space-between; padding: 30rpx 0rpx;'>  <view  class='banner-top-start' style='align-items: center; display: flex; left: 70rpx; position: absolute;'>  <view  class='banner-top-left' style='font-size: 32rpx; font-weight: 800; height: 70rpx; line-height: 66rpx; text-align: left; white-space: nowrap;'>  <image  class='banner-top-left-image' src='" + (_typeof(item.icon) === "object" ? JSON.stringify(item.icon) : item.icon) + "' style='border-radius: 100%; height: 70rpx; vertical-align: middle; width: 70rpx;'>   </image> <text  class='banner-top-left-text' style='margin-left: 15rpx; margin-right: 5rpx; width: 200rpx;'> " + (_typeof(item.title) === "object" ? JSON.stringify(item.title) : item.title) + "  </text>  </view> <view  class='banner-top-label' style='background-color: rgba(250,218,131); border-radius: 8rpx; color: rgba(85,41,2); font-size: 24rpx; margin-left: 20rpx; padding: 10rpx 8rpx;;" + (_this.data.dark === 'dark' ? '    filter: invert(90%) !important;  ' : '') + "'> " + (_typeof(item.label) === "object" ? JSON.stringify(item.label) : item.label) + "  </view>  </view> <view  class='banner-top-button' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' data-index='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' bindtap='btn' style='background-color: rgba(229,77,66); border-radius: 30rpx; color: white; font-size: 26rpx; padding: 14rpx 18rpx;;" + (_this.data.dark === 'dark' ? '    filter: invert(90%) !important;    /* background-color: #fff; */  ' : '') + "'> " + (_typeof(item.btn) === "object" ? JSON.stringify(item.btn) : item.btn) + "  </view>  </view> <view  class='banner-end'>  <image  style='width:100%' src='" + (_typeof(item.banner_img) === "object" ? JSON.stringify(item.banner_img) : item.banner_img) + "' class='banner-end-image' mode='widthFix'>   </image>  </view>  </view> ";
      }) + " </view> ";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
      detail: [{
        title: "美团外卖红包",
        label: "低价外卖",
        btn: "折扣购买",
        icon: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/logo.png?sign=71e2303e03df7c011e81f9dfd97197b9&t=1647496070",
        banner_img: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/meituan.png?sign=daa94d028da89f3ccf97c339e8bae823&t=1647496039",
        appid: "wxde8ac0a21135c07d",
        path: "/index/pages/h5/h5?lch=cps:waimai:5:401c6e8a33376657a4d076948b9d76ec:001:33:164009&f_userId=1&weburl=https%3A%2F%2Fclick.meituan.com%2Ft%3Ft%3D1%26c%3D2%26p%3DwTe5Vb5z7TbP&f_token=1"
      }, {
        title: "小猴云印",
        label: "包邮打印",
        btn: "立即前往",
        icon: "https://s1.ax1x.com/2022/05/05/OepvPP.jpg",
        banner_img: "https://s1.ax1x.com/2022/05/05/Oepf4x.jpg",
        appid: "wxb3e463a958f8d3c6",
        path: "pages/home/home?channel_id=45"
      }, {
        title: "饿了么外卖红包",
        label: "低价外卖",
        btn: "折扣购买",
        icon: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/logo%E9%A5%BF%E4%BA%86%E4%B9%88.jpg?sign=97c992a3809629ea111df917e9a86238&t=1647583943",
        banner_img: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/banner%E9%A5%BF%E4%BA%86%E4%B9%88.jpg?sign=f364558d08d2b3f224575946e99007d0&t=1647583992",
        appid: "wxece3a9a4c82f58c9",
        path: "taoke/pages/shopping-guide/index?scene=qeNArZu"
      }, {
        title: "滴滴出行",
        label: "出行优惠",
        btn: "出行优惠",
        icon: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E6%BB%B4%E6%BB%B4logo.png?sign=0119ab9b99c5f3176651ffae113376a7&t=1647587260",
        banner_img: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/banner%E6%BB%B4%E6%BB%B4.jpg?sign=dc69bc70e8cf236ee2f0bea006931dec&t=1647585882",
        appid: "wxaf35009675aa0b2a",
        path: "/pages/index/index?scene=5GpM5ek&source_id=d4aa4f87823d4bd0a3e4"
      }, {
        title: "花小猪",
        label: "出行优惠",
        btn: "出行优惠",
        icon: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E8%8A%B1%E5%B0%8F%E7%8C%AAlogo.png?sign=a93fac548b4c3d5655eed2e6c12262f6&t=1647586647",
        banner_img: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E8%8A%B1%E5%B0%8F%E7%8C%AAbanner.jpg?sign=48c7adf664419185031522c67c81716c&t=1647586190",
        appid: "wxd98a20e429ce834b",
        path: "/pages/chitu/index?scene=aL5PBdz&source_id=d4aa4f87823d4bd0a3e4"
      }, {
        title: "高德打车",
        label: "出行优惠",
        btn: "出行优惠",
        icon: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E9%AB%98%E5%BE%B7logo.png?sign=a456fc2467252d9ee8ec113b36168a65&t=1647613418",
        banner_img: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E9%AB%98%E5%BE%B7banner.png?sign=ac713603a76a13d65a64b632a4bbc4ec&t=1647613403",
        appid: "wxbc0cf9b963bd3550",
        path: "shareActivity/basic_activity/page/BasicActivityPop/BasicActivityPop?page_id=4k1Khw5X8wy&gd_from=outside_coupon_&pid=mm_2466800074_2598700088_111938000345"
      }, {
        title: "淘票票",
        label: "观影优惠",
        btn: "观影优惠",
        icon: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E6%B7%98%E7%A5%A8%E7%A5%A8logo.jpg?sign=701729ad4ee40744acc22ace245d65ab&t=1647613191",
        banner_img: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/%E6%B7%98%E7%A5%A8%E7%A5%A8banner.png?sign=95e8edbfeafaf160ac18ead009c64aba&t=1647613230",
        appid: "wx553b058aec244b78",
        path: "pages/index/index?sqm=dianying.wechat.taobaolianmeng.1.mm_2466800074_2598700088_111938000345&url=https%3A%2F%2Ft.taopiaopiao.com%2Fyep%2Fpage%2Fm%2Fstyuc69mu6"
      }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
      var _this2 = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this2.setdata({ dark: e.theme });
      });this.setdata();
    },

    btn: function btn(e) {
      console.log(e);
      console.log(e.currentTarget.id);
      var index = Number(e.currentTarget.id);
      console.log(index);
      var res = this.data.detail[index];
      console.log(res);
      wx.navigateToMiniProgram({
        appId: res.appid,
        path: res.path,
        success: function success(res) {
          console.log(res);
          console.log(111);
        }
      });
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