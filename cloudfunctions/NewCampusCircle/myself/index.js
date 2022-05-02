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
    // 获取关注数和粉丝数
    case "get_fans":
      data = await get_fans(event);
      break;
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
async function get_fans(event){
  //写 try catch
  var obj = {
    // School: event.School,
    username: event.username 
  }
  try{
    const res_fans =  db.collection("personalCenter").where(obj).get()
    const MAX_LIMIT = 100
    const total =  await db.collection("New-Information").where({'be_character.userName':event.username,status:_.eq(0).or(_.eq(1)),type:"点赞"}).count()
    const res_star_total =  total.total
    console.log(res_star_total)
    const batchTimes = Math.ceil(res_star_total / 100)
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      //两个异步任务没有存进去
      const promise =  db.collection("New-Information").where({'be_character.userName':event.username,status:_.eq(0).or(_.eq(1)),type:"点赞"}).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    console.log(tasks)
    let result = await Promise.all(tasks)
    
    let res = result.reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
    console.log(res)
     return await Promise.all([res_fans,res])
  }
  catch(e){
    console.log(e)
  }
}
