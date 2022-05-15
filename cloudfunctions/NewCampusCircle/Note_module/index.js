const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command

exports.main = async (event) => {
  let data = {
    msg: 'error'
  }
  switch (event.type) {
    // 校园圈主页读取小纸条
    case "read":
      data = await read(event); //  
      break;
    case "write":
      data = await write(event);
      break;
    case "search":
      data = await search(event);
      break;
  }
  return data
}

async function read(event) {
  // 从校园圈首页读小纸条时, 没有currentPage
  if (!event.currentPage) {
    event["currentPage"] = 0;
  }
  console.log(event);
  var skipPage = event.currentPage * 10;
  var obj = {
    School: event.School
  }
  try {
    return await db.collection('Note_module').orderBy('Time', 'desc').where(obj).skip(skipPage).limit(30).field({
      'School': false,
      'signal': false,
      'username': false
    }).get();
  } catch (e) {
    console.error(e);
  }
}

async function write(event) {
  let { signal, content, niming, username, School, iconUrl, nickName, Time } = event;
  console.log(Time);
  try {
    return await db.collection('Note_module').add({
      data: {
        signal, content, niming, username, School, iconUrl, nickName, Time
      }
    })
  } catch (e) {

  }
}

async function search(event) {
  let {currentPage, School, signal} = event;
  console.log(event);
  var skipPage = currentPage * 10;  // 一次取 10 条数据
  try {
    return await db.collection('Note_module').field({
      'signal': false,
      'School': false
    }).where({
      School: School,
      signal: db.RegExp({
        regexp: signal,
        options: 'i',
      })
    }).skip(skipPage).limit(10).get()

  } catch (e) {
    return e
  }
}
