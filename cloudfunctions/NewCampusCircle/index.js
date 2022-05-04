// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const CommentControl = require('./CommentControl/index');
const Card = require('./Card/index');
const focusControl = require('./focusControl/index');

exports.main = async (event, context) => {

  var data;
  if(event.url === 'CommentControl'){
    data = await CommentControl.main(event)
  }

  if(event.url === 'Card'){
    data = await Card.main(event)
  }
  if(event.url === 'focusControl'){
    data = await focusControl.main(event)
  }

  return data
}