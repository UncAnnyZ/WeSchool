const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command

exports.main = async (event) => {
  let data = {
    msg: 'error'
  }
  switch (event.type) {
    // 校园圈我的也页面读取卡片
    case "read":
      data = await read(event); //  
      break;
    // 校园圈主页搜索逻辑
   
  }
  return data
}
async function read(event){
  //构造 一个obj里面是各个where条件 ,学号，页数,showid,学校
  var skipPage = event.currentPage * 15;
  var obj = {
    School: event.School,
    username: event.username 
  }
  event.ShowId != "全部" ? obj["Label"] = event.ShowId : '';
  try {
    return await db.collection('Campus-Circle').field({
      'CommentList.InputComment': false,
      'CommentList.CommentTime': false,
      'CommentList.iconUser': false,
      'CommentList.nickName': false,
      'CommentList.username': false,
      'Star_User.Star_time': false,
      'Star_User.iconUrl': false,
      'Star_User.nickName': false,
    }).orderBy('SortTime', 'desc').orderBy('Time', 'desc').where(obj).skip(skipPage).limit(15).get();
  } catch (e) {
    console.error(e);
  }
}
