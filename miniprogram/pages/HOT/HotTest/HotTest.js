
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

      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var html = "<view class='container'>  <text class='top' style='color: rgba(0, 0, 0, 0.5); display: flex; font-size: 33rpx; font-weight: 800; justify-content: center;'>\\u5927\\u5B66\\u7269\\u7406\\u5B9E\\u9A8C\\u6570\\u636E\\u8BA1\\u7B97\\u5668</text>  <view class='title' style='display: table; margin: 0 auto; margin-top: 70rpx;'>    <view class='title-text' style='color: rgba(0, 0, 0, 0.7); font-size: 30rpx; font-weight: 800; margin-bottom: 26rpx;'>\\u539F\\u59CB\\u6570\\u636E</view>    <view class='title-data' style='display: flex; margin-bottom: 15rpx;'>      <input class='title-data-input' bindinput='input' placeholder='\\u6570\\u636E\\u4E4B\\u95F4\\u4EE5\\u7A7A\\u683C\\u5206\\u9694\\u5982(3.02 2.99 2.8) ' style='border: 1rpx solid #DCE0E7; border-radius: 20rpx; color: #C1C2C5; font-size: 26rpx; height: 80rpx; padding-left: 18rpx; width: 500rpx;'></input>      <view class='title-data-submit' bindtap='submit' style='align-items: center; background-color: #A1DFCD; border-radius: 20rpx; color: white; display: flex; font-size: 24rpx; line-height: 42rpx; margin-left: 26rpx; margin-right: 10rpx; padding: 0rpx 30rpx;'><image class='title-data-submit-submit' src='data:image/png;base64,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' style='display: inline-block; height: 48rpx; vertical-align: middle; width: 48rpx;'></image></view>    </view>      <view class='title-choose' style='display: flex; font-size: 23rpx; margin-bottom: 45rpx; margin-top: 20rpx;'>        <picker mode='selector' range='" + (_typeof(this.data.multiArray) === "object" ? JSON.stringify(this.data.multiArray) : this.data.multiArray) + "' value='" + (_typeof(this.data.multiIndex) === "object" ? JSON.stringify(this.data.multiIndex) : this.data.multiIndex) + "' bindchange='bindMultiPickerChange' style='display: flex;'>          <view class='title-choose-text' style='background-color: #B2E2F7; border-radius: 10rpx; color: white; display: flex; padding: 10rpx;'><text>" + (_typeof(this.data.instrument_name) === "object" ? JSON.stringify(this.data.instrument_name) : this.data.instrument_name) + "</text><image class='title-choose-image' src='data:image/png;base64,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' style='height: 28rpx; margin-left: 10rpx; vertical-align: middle; width: 28rpx;'></image></view>      </picker>        " + (_typeof(this.data.show) === "object" ? JSON.stringify(this.data.show) : this.data.show == "choose" ? "<view  class='title-choose-inch' style='position: absolute; right: 53rpx;'>          <picker mode='selector' range='" + (_typeof(this.data.calibration) === "object" ? JSON.stringify(this.data.calibration) : this.data.calibration) + "' value='" + (_typeof(this.data.calibrationIndex) === "object" ? JSON.stringify(this.data.calibrationIndex) : this.data.calibrationIndex) + "' bindchange='bindpickerchange' style='display: flex;'>          <view class='title-choose-text' style='background-color: #B2E2F7; border-radius: 10rpx; color: white; display: flex; padding: 10rpx;'><text>" + (_typeof(this.data.calibrationItem) === "object" ? JSON.stringify(this.data.calibrationItem) : this.data.calibrationItem) + "</text><image class='title-choose-image' src='data:image/png;base64,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' style='height: 28rpx; margin-left: 10rpx; vertical-align: middle; width: 28rpx;'></image></view>          </picker>        </view>" : "") + "        " + (_typeof(this.data.show) === "object" ? JSON.stringify(this.data.show) : this.data.show == "input" ? "<view  class='title-choose-input' style='border: 1rpx solid #B2E2F7; border-radius: 10rpx; position: absolute; right: 53rpx;'>          <input style='padding-left:10rpx' placeholder='\\u8BF7\\u8F93\\u5165\\u4EEA\\u5668\\u8BEF\\u5DEE' value='" + (_typeof(this.data.other_err) === "object" ? JSON.stringify(this.data.other_err) : this.data.other_err) + "' bindinput='err_input'></input>        </view>" : "2") + "    </view>  </view>  <view class='body' style='border-top: 1rpx solid rgba(187,187,187,0.3); margin: 0 25rpx; margin-bottom: 30rpx;'>    " + this.data.data_show.map(function (item, index) {
        return " <view style='body-describe'  style='border-bottom: 1rpx solid rgba(187,187,187,0.3); display: flex; font-size: 26rpx; padding: 30rpx 0rpx;'>            <text class='body-describe-text' style='margin-left: 24rpx;'>" + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + ":</text>      <view class='body-describe-data' style='border-bottom: 1rpx solid rgba(187,187,187,0.5); position: absolute; right: 60rpx;'>" + (_typeof(item.res) === "object" ? JSON.stringify(item.res) : item.res) + "</view>    </view>";
      }) + "  </view> </view><view class='end' style='background-color: #A1DFCD; border-radius: 20rpx; bottom: 10rpx; color: #FCFCFC; font-weight: 800; height: 80rpx; left: 50%; line-height: 80rpx; margin-left: -100rpx; position: relative; width: 200rpx;'>  <view class='end-text' bindtap='Check' style='font-size: 26rpx; text-align: center;'>\\u67E5\\u770B\\u516C\\u5F0F</view></view>";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
      //输入的数据
      experimentData: "",
      //
      ContentDescripe: ["算术平均值", "标准偏差", "算术平均偏差", "a类不确定度", "b类不确定度", "总不确定度", "总相对不确定度"],
      //b类不确定度的picker数据,用到的东西有点多后续优化
      multiArray: ["钢直尺", "钢卷尺", "游标卡尺", "螺旋测微器", "物理天平", "TG928A矿山天平", "水银温度计", "读数显微镜", "其他"],
      multiIndex: 0,
      calibrationIndex: 0,
      show: false,
      calibration: [],
      calibrationItem: "请选择实验过程使用仪器的刻度",
      instrument_name: "请选择实验过程使用的仪器",
      other_err: "",
      data_show: [{ name: "算术平均数", res: "NaN" }, { name: "标准偏差", res: "NaN" }, { name: "算术平均的标准偏差", res: "NaN" }, { name: "b类不确定度", res: "NaN" }, { name: "a类不确定度", res: "NaN" }, { name: "总不确定度", res: "NaN" }, { name: "总相对不确定度", res: "NaN" }]
    },
    err_input: function err_input(e) {
      this.setdata({ other_err: e.detail.value });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
      var _this = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this.setdata({ dark: e.theme });
      });this.setdata();
    },
    //输入
    input: function input(e) {
      this.setdata({
        experimentData: e.detail.value
      });
    },

    //b类不确定处理封装成一个函数
    process: function process(instrument_name) {
      var res = [];

      if (instrument_name == "游标卡尺") {
        res.push("0.02mm", "0.05mm", "0.1mm");
        console.log(res);
        this.setdata({
          //存储是否展示
          show: "choose",
          //存储刻度
          calibration: res
        });
      }
      if (instrument_name == "水银温度计") {
        res.push("0.2℃", "0.1℃");
        console.log(res);
        this.setdata({
          //存储是否展示
          show: "choose",
          //存储刻度
          calibration: res
        });
      }
      if (instrument_name == "其他") {
        this.setdata({
          //存储是否展示
          show: "input",
          //存储刻度
          calibration: res
        });
      }
    },

    //提交表单前的数据处理
    computer: function computer() {
      var input_data = this.data.experimentData;
      input_data = input_data.split(" ");
      console.log(input_data);
      var res = [];
      var flag = 0;
      input_data.forEach(function (element) {
        if (isNaN(Number(element))) {
          flag = 1;
        }
        res.push(Number(element));
      });
      if (flag == 1) {
        return "数据输入框格式错误";
      } else {
        if (res[0] == 0) {
          return "您还未输入数据";
        }
        return res;
      }
    },

    //提交表单
    submit: function submit() {
      var that = this;
      var res = this.computer();
      var result = {
        "experimentData": [],
        "b_": ""
      };
      if (typeof res == "string") {
        wx.showToast({
          title: res,
          icon: "none"
        });
      } else {
        var that = this;
        console.log(res);
        if (this.data.instrument_name == "游标卡尺" || this.data.instrument_name == "水银温度计") {
          console.log(that.data.calibrationItem);
          if (that.data.calibrationItem == "请选择实验过程使用仪器的刻度") {
            wx.showToast({
              title: '您还没选择刻度',
              icon: "none"
            });
          }
          var b_ = Number(that.data.calibrationItem.replace("mm", "").replace("℃", ""));
          result = {
            "experimentData": res,
            "b_": b_ / Math.pow(3, 1 / 2)
          };
          console.log(result);
        }
        if (this.data.instrument_name == "其他") {
          console.log(this.data.other_err);
          if (this.data.other_err / Math.pow(3, 1 / 2) == 0) {
            wx.showToast({
              title: '请输入仪器误差',
              icon: "none"
            });
          }
          if (isNaN(this.data.other_err / Math.pow(3, 1 / 2))) {
            wx.showToast({
              title: '仪器误差输入框格式错误,应为数字类型',
              icon: "none"
            });
          }
          result = {
            "experimentData": res,
            "b_": this.data.other_err / Math.pow(3, 1 / 2)
          };
          console.log(result);
        }
        if (this.data.instrument_name == "钢直尺" || this.data.instrument_name == "钢卷尺" || this.data.instrument_name == "螺旋测微器" || this.data.instrument_name == "物理天平" || this.data.instrument_name == "TG928A矿山天平" || this.data.instrument_name == "读数显微镜") {

          //定义哈希表把所有情况列举时间复杂度最低
          var hash = { "钢直尺": 0.1, "钢卷尺": 0.5, "螺旋测微器": 0.004, "物理天平": 50, "TG928A矿山天平": 5, "读数显微镜": 0.004 };
          var _b_ = hash[this.data.instrument_name];
          result = {
            "experimentData": res,
            "b_": _b_ / Math.pow(3, 1 / 2)
          };
          console.log(result);
        }
        if (this.data.instrument_name == "请选择实验过程使用的仪器") {
          wx.showToast({
            title: '您还未选择实验仪器',
            icon: "none"
          });
        }
      }

      console.log(result);
      //在这里进行异步请求加判断
      wx.request({
        url: 'https://www.biubbmk.cn/api_flask_zf/physical_Default',
        method: "POST",
        data: {
          arr: result.experimentData,
          ub: result.b_
        },
        success: function success(res) {
          that.setdata({ data_show: res.data });
        }
      });
    },

    //滚动事件
    bindMultiPickerChange: function bindMultiPickerChange(e) {
      var instrument_name = this.data.multiArray[e.detail.value];
      console.log(instrument_name);
      this.setdata({
        multiIndex: e.detail.value,
        show: false,
        instrument_name: instrument_name,
        calibrationItem: "请选择实验过程使用仪器的刻度", //初始化防止后续干扰
        other_err: ""
      });
      this.process(instrument_name);
    },
    bindpickerchange: function bindpickerchange(e) {
      this.setdata({
        calibrationIndex: e.detail.value,
        calibrationItem: this.data.calibration[e.detail.value]
      });
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {},
    Check: function Check() {
      wx.navigateTo({
        url: "/pages/HOT/HotNoTop/HotNoTop?content=实验计算器二跳页"
      });
    },


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
