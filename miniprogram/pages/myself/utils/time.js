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
    // result = formatTime2(new Date(dateTimeStamp) / 1000, format)		//否则输出“format”(自定义格式)的时间
  }
  return result;
}
export {
  timeago
}