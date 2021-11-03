var got = require('got'); //引用 got
var querystring = require("querystring");
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database()
const _ = db.command;

// 云函数入口函数
exports.main = async (event) => {
  
  if(!(event.password && event.username)){
    return {msg:'没有账号或者密码'}
  }
  const wxContext = cloud.getWXContext()
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  string = event.password.replace(/\r\n/g, "\n");
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }
  var input = utftext;
  while (i < input.length) {

    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

  }

  let getResponse = await got('https://jwxt.gdupt.edu.cn') //get请求 用httpbin.org这个网址做测试 
  let cookie = getResponse.headers["set-cookie"]
  let postResponse = await got.post('https://jwxt.gdupt.edu.cn/login!doLogin.action', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Cookie': cookie

    },
    body: querystring.stringify({ //把json数据（对象）解析成字符串
      account: event.username,
      pwd: output
    })
  })
  if (JSON.parse(postResponse.body).msg == "/login!welcome.action") {
    await db.collection('user').set({
      data: {
        openid: wxContext.OPENID,
        username: Number(event.username),
        password: event.password,
        school: event.school
      },
      success(res) {},
      fail(res) {
        console.log('数据库操作失败');
      }
    })
    return {msg:'welcome'}
  } else {
    return JSON.parse(postResponse.body)
  }
}
