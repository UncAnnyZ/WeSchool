const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const dakaTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[hour, minute].map(formatNumber).join(':')}`
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const fileSystem = wx.getFileSystemManager()


/*
建议只放小图片
图片缓存只针对屡次访问的图片，请按照实际状况调用。若是访问一次的也作，CDN流量消耗反倒翻倍，得不偿失。
小程序缓存最大10M。为防止将缓存写满，小程序初始化时，若是超过1000条，清空缓存记录，从新开始。
1000条。该数不是固定数字，请根据本身的实际状况自定。若是你自己就会往Storage放数据，请自行判断须要多少条，不要致使其余数据没法存入，影响其余功能正常使用。
为何不用LRU最近使用删除？不必。1000自己是个虚数，留存1~2M作其余代码备用，而文件异步保存，自己会致使有好多文件没法检测到，若是经过循环去判断最近时间，太耗费性能，还不如进入小程序时，直接清空，从头开始。小程序自己是轻量级的，一段时间清空一次便可
*/
const getStorageImage = (web_image) => {
  let webImages = wx.getStorageSync('webImages') || []
  let webImage = webImages.find(y => y.web_path === web_image)
  if (webImage) {
    try {
      fileSystem.accessSync(webImage.local_path)
      return webImage.local_path
    } catch(e) { 
      let webImageIdx = webImages.findIndex(y => y.web_path === web_image)
      webImages.splice(webImageIdx, 1)
      wx.setStorageSync('webImages', webImages)
    }
  } else {
    wx.downloadFile({
      url: web_image,
      success (res) {
        if (res.statusCode === 200) {
          let filePath = res.tempFilePath
          let webImageStorage = wx.getStorageSync('webImages') || []
          let storage = {
            web_path: web_image,
            local_path: filePath,
            last_time: Date.parse(new Date()),
          }
          webImageStorage.push(storage)
          wx.setStorageSync('webImages', webImageStorage)
        }
      }
    })
  }
  return web_image
}

// 计算周数
const getweekString = () => {
  var Date1 = new Date();
  if(!wx.getStorageSync('configData')){
    return 1;
  }
  var Date2 = new Date(wx.getStorageSync('configData').timeYear);
  var dayOfWeek = Date1.getDay();
  //如果把周日算在一周的最后一天，请加上下面这句
  // dayOfWeek = dayOfWeek == 0 ? 7 : dayOfWeek
  //如果把周日算在一周的第一天，请删除上面这句
  var num = (Date1 - Date2) / 1000 / 3600 / 24;
  var whichWeek = Math.ceil((num + dayOfWeek) / 7);
  // var whichWeek = Math.ceil((num) / 7);
  return whichWeek;
}

function formatTime2(number, format) {

  var formateArr = ['Y', 'M', 'D'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}


function timeago(dateTimeStamp, format) {	//这里融合了上面的自定义时间格式，“format”就是干这个用的
  // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var halfamonth = day * 15;
  var month = day * 30;

  var now = new Date().getTime();   //获取当前时间毫秒
  var diffValue = now - dateTimeStamp;//时间差

  if (diffValue < 0) { return; }

  var minC = diffValue / minute;  //计算时间差的分，时，天，周，月
  var hourC = diffValue / hour;
  var dayC = diffValue / day;
  var weekC = diffValue / week;
  var monthC = diffValue / month;
  var result = '';
  
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1 && dayC <= 3) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1 && hourC <= 24) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1 && minC <= 60) {
    result = "" + parseInt(minC) + "分钟前";
  } else if (minC < 1) {
    result = "刚刚";
  } else{
    result = formatTime2(new Date(dateTimeStamp) / 1000, format)		//否则输出“format”(自定义格式)的时间
  }
  return result;
}

/*节流*/
function throttle(fn, interval) {
 
  var enterTime = 0; //触发的时间
 
  var gapTime = interval || 300; //间隔时间，interval默认300ms
 
  return function () {
 
    var context = this;
 
    var backTime = new Date(); //第一次函数return即触发的时间
 
    if (backTime - enterTime > gapTime) {
 
      fn.call(context, arguments);
 
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
 
    }
 
  };
 
}
 
 
/*防抖*/
 
function debounce(fn, interval) {
 
  var timer;
 
  var gapTime = interval || 1000; //间隔时间，interval默认1000ms
 
  return function () {
 
    clearTimeout(timer);
 
    var context = this;
 
    var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
 
    timer = setTimeout(function () {
 
      fn.call(context, args);
 
    }, gapTime);
 
  };
 
}

module.exports = {
  getStorageImage,
  formatTime,
  getweekString,
  timeago:timeago,
  formatTime2: formatTime2,
  dakaTime,
  throttle,
  debounce
}
