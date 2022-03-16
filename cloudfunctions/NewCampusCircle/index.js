// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const CommentControl = require('./CommentControl/index');
const Card = require('./Card/index');
const Note_module = require('./Note_module/index');

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
  return data
}