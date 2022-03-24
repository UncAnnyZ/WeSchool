const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command

exports.main = async (event) => {
  let data = {
    msg: 'error'
  }
  switch (event.type) {
    // 校园圈主页读取卡片
    case "read":
      data = await read(event); //  
      break;
    // 校园圈主页搜索逻辑
    case "search":
      data = await search(event); //  
      break;
    // 电子游戏板块读取卡片
    case "read_Game":
      data = await read_Game(event)
  }
  return data
}

async function read(event) {
  var skipPage = event.currentPage * 10;
  var obj = {
    School: event.School
  }
  event.ShowId != "全部" ? obj["Label"] = event.ShowId : '';
  console.log(event);
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
    }).orderBy('indexFront', 'desc').orderBy('SortTime', 'desc').orderBy('Time', 'desc').where(obj).skip(skipPage).limit(15).get();
  } catch (e) {
    console.error(e);
  }

}

async function search(event) {
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
    }).where({
      Title: db.RegExp({
        regexp: event.searchKey,
        options: 'i',
      })
    }).get()

  } catch (e) {
    return e
  }
}

async function read_Game(event) {
  var skipPage = event.currentPage * 10;
  var obj = {
    School: event.School
  }
  event.ShowId != "全部" ? obj["Label"] = event.ShowId : '';
  console.log(event);
  try {
    return await db.collection('Campus-Circle-GameModule').field({
      'CommentList.InputComment': false,
      'CommentList.CommentTime': false,
      'CommentList.iconUser': false,
      'CommentList.nickName': false,
      'CommentList.username': false,
      'Star_User.Star_time': false,
      'Star_User.iconUrl': false,
      'Star_User.nickName': false,
    }).orderBy('indexFront', 'desc').orderBy('SortTime', 'desc').orderBy('Time', 'desc').where(obj).skip(skipPage).limit(15).get();
  } catch (e) {
    console.error(e);
  }

}