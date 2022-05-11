
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
  // pages/calendar/calendar.js
  function formatDay(day) {
    switch (day) {
      case 1:
        day = "一";break;
      case 2:
        day = "二";break;
      case 3:
        day = "三";break;
      case 4:
        day = "四";break;
      case 5:
        day = "五";break;
      case 6:
        day = "六";break;
      case 7:
        day = "日";break;
      case 0:
        day = "日";break;

      case "一":
        day = 1;break;
      case "二":
        day = 2;break;
      case "三":
        day = 3;break;
      case "四":
        day = 4;break;
      case "五":
        day = 5;break;
      case "六":
        day = 6;break;
      case "七":
        day = 7;break;
      case "日":
        day = 7;break;
    }

    return day;
  }

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
      var html = "<view class='page' style='margin-top: 30rpx; padding-bottom: 1rpx;'>  <view class='page__hd' style='flex-direction: column; justify-content: center; padding: 20rpx 35rpx 0 35rpx;'>    <view class='page__title' style='color: rgb(0, 0, 0); font-size: 20px; font-weight: 400; margin-bottom: 5px; margin-left: 30rpx; text-align: left;'>\\u5012\\u6570\\u65E5</view>    <view class='page__desc' style='color: rgb(97, 97, 97); font-size: 30rpx; margin-left: 30rpx; text-align: left;'>      <view>" + (_typeof(this.data.term) === "object" ? JSON.stringify(this.data.term) : this.data.term) + "</view>      <text>" + (_typeof(this.data.jsonContent.month) === "object" ? JSON.stringify(this.data.jsonContent.month) : this.data.jsonContent.month + 1) + " \\u6708" + (_typeof(this.data.jsonContent.day) === "object" ? JSON.stringify(this.data.jsonContent.day) : this.data.jsonContent.day) + " \\u65E5 " + (_typeof(this.data.jsonContent.dayOfWeek) === "object" ? JSON.stringify(this.data.jsonContent.dayOfWeek) : this.data.jsonContent.dayOfWeek) + " \\uFF08\\u6ED1\\u52A8\\u53EF\\u5220\\u9664)</text>    </view>    <view class='touch' style='padding-left: -10rpx;'>      " + this.data.list.map(function (item, index) {
        return " <view style='touch-container' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' bindtap='showdates' bindtouchstart='touchstart' bindtouchmove='touchmove'  wx:key=' ' style='display: flex; font-size: 16px; justify-content: space-between; overflow: hidden; padding: 20rpx 0;'>        <view  " + (_this.data.dark === 'dark' ? 'style="    background-color: rgba(224, 224, 224, 0.589);  "' : '') + " style='touch-item " + (_typeof(item.isTouchMove) === "object" ? JSON.stringify(item.isTouchMove) : item.isTouchMove ? "wx&class    ;     -webkit-transform   :    translateX(0)   ;     transform   :    translateX(0)   ;   " : "") + "' style='background-color: rgba(248, 248, 248, 0.9); border-radius: 22rpx; box-shadow: 0 7rpx 7rpx #d1cece; color: #fff; display: flex; height: 110rpx; justify-content: space-around; margin-left: -130px; overflow: hidden; top: 3rpx; transform: translateX(130px); transition: all 0.4s; width: 92%;'>          <view class='weui-flex' style='margin-left:10rpx;color:#010C10;'>                       " + (_typeof(item.gapDays) === "object" ? JSON.stringify(item.gapDays) : item.gapDays > 0 ? "<view  " + (_this.data.dark === 'dark' ? 'style="    filter: invert(0%) !important;  "' : '') + " style='weui-item__title'  style='-webkit-box-orient: vertical; -webkit-line-clamp: 1; color: #444444; display: -webkit-box; font-size: 34rpx; font-weight: 550; margin-left: 15rpx; overflow: hidden; padding-top: 28rpx; text-overflow: ellipsis; width: 300rpx;'>              <text>" + (_typeof(item.holidayName) === "object" ? JSON.stringify(item.holidayName) : item.holidayName) + " \\u8FD8\\u6709</text>            </view>" : "") + "            " + (_typeof(item.gapDays) === "object" ? JSON.stringify(item.gapDays) : item.gapDays <= 0 ? "<view  " + (_this.data.dark === 'dark' ? 'style="    filter: invert(0%) !important;  "' : '') + " style='weui-item__title'  style='-webkit-box-orient: vertical; -webkit-line-clamp: 1; color: #444444; display: -webkit-box; font-size: 34rpx; font-weight: 550; margin-left: 15rpx; overflow: hidden; padding-top: 28rpx; text-overflow: ellipsis; width: 300rpx;'>              <text>" + (_typeof(item.holidayName) === "object" ? JSON.stringify(item.holidayName) : item.holidayName) + " \\u5DF2\\u7ECF</text>            </view>" : "") + "                      </view>          <view  " + (_this.data.dark === 'dark' ? 'style="    filter: invert(100%) !important;  "' : '') + " class='weui-flex__item' style='-webkit-box-flex: 1; -webkit-flex: 1; flex: 1;'>            <view style='gapDays " + (_typeof(item.gapDays) > 0 === "object" ? JSON.stringify(item.gapDays > 0) : item.gapDays > 0 ? "wx&class       ;        text-shadow     :      0px -1px 1px #865204f3 !important      ;          background-color     :      #fd9801e1 !important      ;      " : "wx&class       ;        text-shadow     :      0px -1px 1px #294161 !important      ;        background-color     :      #5685c2c2 !important      ;      ") + "  ' style='align-items: center; color: #ffff; display: flex; flex-direction: row; font-size: 62rpx; height: 110rpx; justify-content: center; text-align: center;'>              " + (_typeof(item.gapDays) === "object" ? JSON.stringify(item.gapDays) : item.gapDays > 0 ? "<text  style='flex: 1;'>" + (_typeof(item.gapDays) === "object" ? JSON.stringify(item.gapDays) : item.gapDays) + "</text>" : "") + "              " + (_typeof(item.gapDays) === "object" ? JSON.stringify(item.gapDays) : item.gapDays <= 0 ? "<text  style='flex: 1;'>" + (0 - item.gapDays) + "</text>" : "") + "              <view style='Days " + (_typeof(item.gapDays) > 0 === "object" ? JSON.stringify(item.gapDays > 0) : item.gapDays > 0 ? "wx&class     ;      background-color   :    #e27c07e8 !important    ;    " : "wx&class     ;      background-color   :    #3170a7e3 !important    ;    ") + " ' style='align-items: center; display: flex; height: 110rpx; justify-content: center; width: 115rpx;'>                <text style='color: #ffff; flex: 1; font-size: 38rpx;'>\\u5929</text>              </view>            </view>          </view>        </view>        <view  " + (_this.data.dark === 'dark' ? 'style="    filter: invert(0%) !important;  "' : '') + " style='edit " + (_typeof(item.isTouchMove) === "object" ? JSON.stringify(item.isTouchMove) : item.isTouchMove ? "wx&class    ;     -webkit-transform   :    translateX(0)   ;     transform   :    translateX(0)   ;   " : "") + "' bindtap='edit' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' style='-webkit-transform: translateX(130px); -webkit-transition: all 0.4s; align-items: center; background-color: #f7f5f5; border-radius: 115rpx; color: #fff; display: flex; flex-direction: column; height: 95rpx; justify-content: center; margin-top: 8rpx; transform: translateX(130px); transition: all 0.4s; width: 95rpx;'>          <image  " + (_this.data.dark === 'dark' ? 'style="    filter: invert(0%) !important;  "' : '') + " src='../../../images/edit.png' style='height: 40rpx; width: 40rpx;'></image>        </view>        <view style='del " + (_typeof(item.isTouchMove) === "object" ? JSON.stringify(item.isTouchMove) : item.isTouchMove ? "wx&class    ;     -webkit-transform   :    translateX(0)   ;     transform   :    translateX(0)   ;   " : "") + "' bindtap='del' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' style='-webkit-transform: translateX(130px); -webkit-transition: all 0.4s; align-items: center; background-color: #f7f5f5; border-radius: 115rpx; color: #fff; display: flex; flex-direction: column; height: 95rpx; justify-content: center; margin-top: 8rpx; transform: translateX(130px); transition: all 0.4s; width: 95rpx;'>          <image src='../../../images/del.png' style='height: 40rpx; width: 40rpx;'></image>        </view>      </view>";
      }) + "    </view>    <view class='nav-head' style='align-items: center; background-color: #FAFAFA; border-bottom-left-radius: 100%; border-top-left-radius: 100%; box-shadow: 0px 0px 4px 0px #c7c7c7; display: flex; flex-direction: row; height: 100rpx; justify-content: space-between; position: fixed; right: 5rpx; top: 50rpx; width: 110rpx; z-index: 9;'>      <view class='img-button feedback-btn' bindtap='feedbackHandler' style='display: inline-block; height: 60rpx; margin-left: 30rpx; margin-right: 20rpx; margin-top: 10rpx; width: 70rpx;'>        <image src='../../../images/btn_feed@2x.png' style='height: 80%; width: 80%;'></image>      </view>    </view>    <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(100%) !important;  "' : '') + " class='round-click' bindtap='showPic' style='align-items: center; background-color: #bc3e49; border-radius: 100%; bottom: 50rpx; display: flex; height: 120rpx; justify-content: center; position: fixed; right: 25rpx; width: 120rpx; z-index: 9;'>      <text style='color: #fff; font-size: 32rpx; max-width: 80rpx; text-align: center;'>\\u67E5\\u770B\\u6821\\u5386</text>    </view>  </view></view>" + (_typeof(this.data.showModel) === "object" ? JSON.stringify(this.data.showModel) : this.data.showModel ? "<view style='add'  style='bottom: 0; font-family: unset; left: 0; position: absolute; right: 0; top: 0; z-index: 9999;'>    <view class='add_background' bindtap='feedbackHandler' style='background-color: rgba(0, 0, 0, 0.349); bottom: 0; font-family: unset; height: 100%; left: 0; opacity: 0.6; position: absolute; right: 0; top: 0; z-index: 9999;'></view>    <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(0%) !important;    background-color: rgb(238, 237, 237);  "' : '') + " style='add_contain' animation='" + (_typeof(this.data.animation) === "object" ? JSON.stringify(this.data.animation) : this.data.animation) + "' style='align-items: center; background-color: #fff; bottom: 0; display: flex; flex-direction: column; padding: 50rpx 0; position: fixed; width: 100%; z-index: 99999;'>      <view class='add_title' style='font-weight: 600; padding-bottom: 50rpx; size: 18px;'>        <text>\\u6DFB\\u52A0\\u5012\\u6570\\u65E5</text>      </view>      <view class='course' style='align-content: center; background-color: rgb(245, 245, 245); border-radius: 20rpx; box-sizing: unset; display: flex; flex-direction: row; margin: 20rpx; padding: 20rpx; width: 85%;'>          \\u540D\\u79F0:        <input style='padding-top:2rpx;padding-left: 10rpx;' bindinput='bindInputChange' placeholder='\\u540D\\u79F0'></input>      </view>      <view class='section' dates='1' style='background-color: rgb(245, 245, 245); border-radius: 20rpx; margin: 20rpx; padding: 20rpx; width: 85%;'>          <picker mode='date' value='" + (_typeof(this.data.date) === "object" ? JSON.stringify(this.data.date) : this.data.date) + "' start='1978-01-01' end='2050-1-23' bindchange='bindDateChange'>            <view class='picker'>              \\u65E5\\u671F:   " + (_typeof(this.data.dates) === "object" ? JSON.stringify(this.data.dates) : this.data.dates) + "            </view>          </picker>        </view>      <view  " + (this.data.dark === 'dark' ? 'style="    color: rgba(0, 0, 0, 0.808);  "' : '') + " class='add_btn' style='align-items: center; display: flex; flex-direction: row; justify-content: center; margin: 70rpx 0 50rpx; width: 85%;'>        <button bindtap='feedbackHandler' style='background-color: rgba(245, 245, 245); border-radius: 50rpx; color: rgb(54, 54, 54); size: 16px; width: 45% !important;'>\\u53D6 \\u6D88</button>        <button bindtap='addSubmit' style='background-color: rgba(245, 245, 245); border-radius: 50rpx; color: rgb(54, 54, 54); size: 16px; width: 45% !important;'>\\u4FDD \\u5B58</button>      </view>    </view></view>" : "5");
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
      html: "",
      jsonContent: {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        dayOfWeek: "星期" + formatDay(new Date().getDay())
      },
      startX: 0, //开始坐标
      startY: 0,
      showModel: false,
      dates: "",
      list: [],
      dayName: "",
      changeDay: ""
    },

    feedbackHandler: function feedbackHandler() {
      //跳转到子页
      var that = this;
      var showModel = that.data.showModel;
      that.data.animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease'
      });
      console.log("in");
      if (showModel) {
        that.data.changeDay = "";
        that.data.dayName = "";
        that.data.dates = "";
        that.data.add_style = "add_hide";
        that.data.animation.opacity(0).translateY('100%').step();
        that.setdata({});
        setTimeout(function () {
          that.data.showModel = !showModel;
          that.setdata({});
        }, 700);
      } else {
        that.data.showModel = !showModel;
        that.data.animation.opacity(0).translateY('100%').step();
        that.setdata({});
        that.data.animation = wx.createAnimation({
          duration: 800,
          timingFunction: 'ease'
        });
        that.data.animation.opacity(1).translateY(0).step();
        that.setdata({});
      }

      /*wx.navigateTo({
        url: 'addition/addition'
      })*/
    },


    num_data: function num_data(start_date1, end_date1) {
      //计算倒数日
      var start_date = new Date(start_date1.replace(/-/g, "/"));
      var end_date = new Date(end_date1.replace(/-/g, "/"));
      var days = end_date.getTime() - start_date.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      return day * -1;
    },

    terms: function terms() {
      //学年显示
      var year = '';
      if (new Date().getMonth() > 4) {
        year = new Date().getFullYear() + '-' + (new Date().getFullYear() + 1) + '学年' + ' ' + '第' + 1 + '学期';
      } else {
        year = new Date().getFullYear() - 1 + '-' + new Date().getFullYear() + '学年' + ' ' + '第' + 2 + '学期';
      }
      this.setdata({
        term: year
      });
    },

    compare: function compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },

    setdataCalendar: function setdataCalendar() {
      //页面渲染全部倒数日
      var addday = app.globalData._adday || [];
      var xlist = [];
      var xlist1 = [];
      var nowdate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
      for (var i = 0; i < addday.length; i++) {
        var gapDays2 = this.num_data(addday[i].holidayDate, nowdate);
        if (gapDays2 > 0) {
          xlist.push({
            holidayName: addday[i].holidayName,
            holidayDate: addday[i].holidayDate,
            gapDays: gapDays2,
            holidayRestInfo: addday[i].holidayDate,
            isTouchMove: false
          });
        } else {
          xlist1.push({
            holidayName: addday[i].holidayName,
            holidayDate: addday[i].holidayDate,
            gapDays: gapDays2,
            holidayRestInfo: addday[i].holidayDate,
            isTouchMove: false
          });
        }
      }

      var list = xlist.sort(this.compare("gapDays")).concat(xlist1.sort(this.compare("gapDays")).reverse());
      app.globalData._adday = list;
      this.setdata({
        show: "",
        list: list
      });
    },

    showdates: function showdates(e) {
      //跳转到倒数日的详情页面
      var that = this;
      var index1 = e.currentTarget.id;
      var dates = that.data.list[index1];
      var holidayName = dates.holidayName;
      var gapDays = dates.gapDays;
      var holidayDate = dates.holidayDate;
      wx.navigateTo({
        url: "/pages/HOT/HotNoTop/HotNoTop?content=倒数日二跳页&Name=" + holidayName + "&gapDays=" + gapDays + "&Date=" + holidayDate
      });
    },


    touchstart: function touchstart(e) {
      //开始触摸时 重置所有删除
      this.data.list.forEach(function (v, i) {
        if (v.isTouchMove) //只操作为true的
          v.isTouchMove = false;
      });
      this.setdata({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY,
        list: this.data.list
      });
    },

    touchmove: function touchmove(e) {
      var that = this,
          index = e.currentTarget.id,
          //当前索引
      startX = that.data.startX,
          //开始X坐标
      startY = that.data.startY,
          //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,
          //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,
          //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
      that.data.list.forEach(function (v, i) {
        v.isTouchMove = false;
        //滑动超过30度角 return
        if (Math.abs(angle) > 30) return;
        if (i == index) {
          if (touchMoveX > startX) //右滑
            v.isTouchMove = false;else //左滑
            v.isTouchMove = true;
        }
      });
      //更新数据
      that.setdata({
        list: that.data.list
      });
    },

    angle: function angle(start, end) {
      var _X = end.X - start.X,
          _Y = end.Y - start.Y;
      //返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },

    del: function del(e) {
      //删除倒数日  
      var that = this;
      wx.showLoading({
        title: '处理中',
        mask: true
      });
      this.data.list.splice(e.currentTarget.id, 1);
      app.globalData._adday = this.data.list;
      wx.cloud.callFunction({
        name: 'readday',
        data: {
          _adday: JSON.stringify(this.data.list),
          username: wx.getStorageSync('args').username,
          type: 'write'
        },
        success: function success(res) {
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          });
          that.onShow();
        },
        fail: function fail(err) {
          wx.showToast({
            title: '删除失败',
            icon: 'none'
          });
        }
      });
    },

    bindInputChange: function bindInputChange(e) {
      //获取倒数日日期
      console.log(e.detail.value);
      this.setdata({
        dayName: e.detail.value
      });
    },

    bindDateChange: function bindDateChange(e) {
      //获取倒数日日期
      this.setdata({
        dates: e.detail.value
      });
    },
    addSubmit: function addSubmit(e) {
      //判断是否修改状态

      var that = this; //提交倒数日
      wx.showLoading({
        title: '处理中',
        mask: true
      });

      if (this.data.dayName == null || this.data.dayName == "" || this.data.dayName == undefined) {
        //判断填写是否为空
        wx.showToast({
          title: '名称不能为空',
          icon: 'none',
          duration: 1000
        });
      } else if (this.data.dates == null || this.data.dates == "" || this.data.dates == undefined) {
        wx.showToast({
          title: '日期不能为空',
          icon: 'none',
          duration: 1000
        });
      } else {
        var add = {
          'holidayName': this.data.dayName,
          'holidayDate': this.data.dates
        };
        if (this.data.changeDay !== "") {
          app.globalData._adday[this.data.changeDay].holidayName = this.data.dayName;
          app.globalData._adday[this.data.changeDay].holidayDate = this.data.dates;
        } else {

          app.globalData._adday.push(add);
        }

        wx.cloud.callFunction({ //访问云函数
          name: 'readday',
          data: {
            _adday: JSON.stringify(app.globalData._adday),
            username: wx.getStorageSync('args').username,
            type: 'write'
          },
          success: function success(res) {
            wx.showToast({
              title: '添加成功',
              icon: 'none'
            });
            that.onShow();
          },
          fail: function fail(err) {
            wx.showToast({
              title: '添加失败',
              icon: 'none'
            });
          },
          complete: function complete() {
            that.setdata({
              changeDay: "",
              dayName: "",
              dates: "",
              showModel: !that.data.showModel
            });
          }
        });
      }
    },

    edit: function edit(e) {
      //保存到changeDay来调用状态
      this.data.changeDay = e.currentTarget.id;
      this.setdata({
        dayName: app.globalData._adday[this.data.changeDay].holidayName,
        dates: app.globalData._adday[this.data.changeDay].holidayDate
      });
      this.feedbackHandler();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
      var _this2 = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this2.setdata({ dark: e.theme });
      });this.setdata(); //读取数据库
      var that = this;
      wx.setNavigationBarTitle({ title: 'We校园-倒数日' });
      app.loginState();
      that.terms();
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      wx.cloud.callFunction({
        name: 'readday',
        data: {
          username: wx.getStorageSync('args').username,
          type: 'read'
        },
        success: function success(res) {
          res.result ? res.result : [];
          app.globalData._adday = JSON.parse(res.result);
          that.setdataCalendar();
          wx.hideLoading({
            success: function success(res) {}
          });
        },
        fail: function fail(err) {
          console.log(err);
        }
      });
      that.data.animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease'
      });
      that.data.animation.opacity(0).translateY('100%').step();
      that.setdata();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onShow: function onShow(options) {
      this.setdataCalendar();
      // 调用函数时，传入new Date()参数，返回值是日期和时间  
    },

    onReady: function onReady() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function onShareAppMessage(res) {
      return {
        title: '广东石油化工学院校历'
      };
    },
    showPic: function showPic() {
      wx.previewImage({
        // cloud://un1-d62c68.756e-un1-d62c68-1258307938/xl.png
        current: 'https://s1.ax1x.com/2022/05/09/OJRwF0.jpg', // 当前显示图片的http链接
        urls: ['https://s1.ax1x.com/2022/05/09/OJRwF0.jpg'] // 需要预览的图片http链接列表
      });
    }
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
