// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
console.log('15616')
const login = require('./login/index');
const indexLoading = require('./indexLoading/index');
const sloveExcel = require('./sloveExcel/index');
const coverBottom = require('./coverBottom/index');
exports.main = async (event, context) => {

  var data
  if(event.url === 'indexLoading'){
    data = await indexLoading.main(event)
  }

  if(event.url === 'login'){
    data = await login.main(event)
  }

  if(event.url === 'sloveExcel'){
    data = await sloveExcel.main(event)
  }

  if(event.url === 'coverBottom'){
    data = await coverBottom.main(event)
  }

  return data
}