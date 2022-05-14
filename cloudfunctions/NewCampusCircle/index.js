// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const CommentControl = require('./CommentControl/index');
const Card = require('./Card/index');
const Note_module = require('./Note_module/index');
const JuBao = require('./JuBao/index')
const myself = require('./myself/index')
const focusControl = require('./focusControl/index')
exports.main = async (event, context) => {

  var data;
  // 瀑布流评论增删
  if(event.url === 'CommentControl'){
    data = await CommentControl.main(event)
  }
  // 瀑布流卡片
  if(event.url === 'Card'){
    data = await Card.main(event)
  }
  // 小纸条模块
  if(event.url === 'Note_module') {
    data = await Note_module.main(event)
  }
  // 举报
  if(event.url === 'JuBao') {
    data = await JuBao.main(event)
  }
  if(event.url === 'myself') {
    data = await myself.main(event)
  }
  if(event.url === 'focusControl') {
    data = await focusControl.main(event)
  }
  return data
}