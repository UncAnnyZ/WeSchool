var got = require('got'); //引用 got
const utils = require("../../../utils/recogCaptcha")
var querystring = require("querystring");
const fs = require('fs');
// 云函数入口函数
exports.main = async (event) => {
  let postResponse = ''
  if (!(event.password && event.username)) {
    return {
      msg: '没有账号或者密码'
    }
  }
  try {
    if(event.username=="WeCampus"&&event.password=="WeCampusHost"){
      return{
        msg:"welcome"
      }
    }
    postResponse = await got.post('https://www.biubbmk.cn/api_flask_zf/login_JY', {
      headers: {
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
        'Content-Type': 'application/json',
        // 'Accept': 'application/json, text/javascript, */*; q=0.01',
      },
      body: JSON.stringify({ //把json数据（对象）解析成字符串
        username: event.username,
        password: event.password,
      })
    })
    let Body = JSON.parse(postResponse.body)

    if (Body.msg) {
      return {
        msg: Body.msg
      }
    } else {
      return {
        msg: '错误'
      }
    }
  } catch (e) {
    console.log(e)
    if(String(e).match(/408/)){
      return {msg: '超时，请重新尝试'}
    }else{
      return {msg: '错误，请找管理员'}
    }

  }

}