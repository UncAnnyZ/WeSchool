// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case "read":
      return await read(event); // 
    case "write":
      return await write(event); // 
    case "writeComment":
      return await writeComment(event); // 
    case "starCount":
      return await starCount(event); // 
    case "readComment":
      return await readComment(event); // 
    case "search":
      return await search(event); // 
    case "readUser":
      return await readUser(event); // 
    case "delCard":
      return await delCard(event); // 
    case "delComment":
      return await delComment(event); // 
    case "StarControlLogs":
      return await StarControlLogs(event); // 
    case "CommentControlLogs":
      return await CommentControlLogs(event); // 评论
    case "CancelCommentControlLogs":
      return await CancelCommentControlLogs(event); // 删除评论
    case "CancelReplyControlLogs":
      return await CancelReplyControlLogs(event); // 删除评论
    case "ReplyCommentControlLogs":
      return await ReplyCommentControlLogs(event); // 删除评论
    case "ReadControlLogs":
      return await ReadControlLogs(event); // 读取新消息 New-Info 
    case "LoseStateLogs":
      return await LoseStateLogs(event)
    case "addFocus":
      return await addFocus(event)
    case "delFocus":
      return await delFocus(event)
  }

}


async function addRecord(event, type, content){
  console.log(event,"addRecord");
  console.log(content);
  return await db.collection('New-Information').add({
    data: {
      character: event.character,
      be_character: event.be_character,
      type: type,
      status: 0,
      createTime: event.createTime,
      arcticle: event.arcticle,
      arcticle_id: event.arcticle._id,
      content: content                    // 点赞是空，回复和评论都要用这个
    },
  })

}


async function read(event) {
  var skipPage = event.currentPage * 10;
  var obj = {
    School: event.School
  }
  event.ShowId != "全部" ? obj["Label"] = event.ShowId : '';
  console.log(event);
  try {  

    // if(event.School === '茂名职业技术学院'){
    //   return await db.collection('Campus-Circle').orderBy('indexFront', 'desc').orderBy('Star', 'desc').where(obj).skip(skipPage).limit(10).get();
    // }
    return await db.collection('Campus-Circle').orderBy('indexFront', 'desc').orderBy('Time', 'desc').where(obj).skip(skipPage).limit(10).get();
  } catch (e) {
    console.error(e);
  }

}

async function write(event) {
  try {
    return await db.collection("Campus-Circle").add({
      data: {
        SortTime: Date.parse(new Date()),
        Other:event.Other,
        LoseTime:event.LoseTime,
        LoseType:event.LoseType,
        campus:event.campus,
        LoseState:false,
        Cover: event.Cover,
        AllPhoto: event.AllPhoto,
        Title: event.Title,
        Text: event.Text,
        CoverHeight: event.CoverHeight,
        CoverWidth: event.CoverWidth,
        Label: event.Label,
        Time: event.Time,
        ShowHeight: event.ShowHeight,
        nickName: event.nickName,
        username: event.username,
        iconUrl: event.iconUrl,
        School: event.School,
        Star: 0
      },
      success: res => {},
      fail: err => {}
    })
  } catch (e) {
    console.log(e)
  }
}

async function writeComment(event) {
  try {
    return await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        CommentList: event.CommentList
      }
    })
  } catch (e) {
    console.log(e)
  }
}

async function starCount(event) {
  try {
    return await db.collection('Campus-Circle').where({
      _id: event.arcticle._id
    }).update({
      data: {
        SortTime: Date.parse(new Date()),
        Star_User: event.Star_User
      }
    })
  } catch (e) {
    console.log(e)
  }
}

async function readComment(event) {
  // 记得有空删除一下，下面逻辑，暂时用event._id兜底
  try {

    return await db.collection('Campus-Circle').where({
      _id: event._id
    }).get()

  } catch (e) {
    console.log(e)
  }
}

async function search(event) {
  try {
    return await db.collection('Campus-Circle').where({
      Title: db.RegExp({
        regexp: event.searchKey,
        options: 'i',
      })
    }).get()

  } catch (e) {
    console.log(e)
  }
}

async function readUser(event) {
  try {
    return await db.collection('Campus-Circle').orderBy('Time', 'desc').where({
      username: event.username,
    }).skip(event.currentPage * 10).limit(10).get()
  } catch (e) {
    console.log(e)
  }
}

async function delCard(event) {
  try {
    await db.collection('Campus-Circle').doc(event._id).remove();
    // 兼容新消息提醒
    return await db.collection('New-Information').where({
      arcticle_id: event._id
    }).remove()
  } catch (e) {
    console.log(e)
  }
}

async function delComment(event) {
  try {
    return await db.collection('Campus-Circle').doc(event._id).update({
      data: {
        CommentList: event.CommentList
      },
    })
  } catch (e) {
    console.log(e)
  }
}

async function StarControlLogs(event) {
  // 兼容旧云函数
  if(event.outIndex===undefined){
    starCount(event);
  }

  const data1 = await db.collection('New-Information').where({ //查找记录
    'character.userName': event.character.userName,
    'be_character.userName': event.be_character.userName,
    type: '点赞',
    arcticle_id: event.arcticle._id,
  }).get()

  // 没有记录，add点赞
  if (data1.data[0] == undefined) {         
    await addRecord(event, "点赞", "")
  }
  // 有记录，判断是取消点赞/点赞
  if (data1.data[0] != undefined) {         
    // status等于 -1 时，status = 0
    if(data1.data[0].status == -1 ){        
      return await db.collection('New-Information').where({
        'character.userName': event.character.userName,
        'be_character.userName': event.be_character.userName,
        type: '点赞',
        arcticle_id: event.arcticle._id
      }).update({
        data: {
          status: 0,
          createTime: event.createTime
        }
      })
    }else {   // status等于 0||1 时，变成 -1
      return await db.collection('New-Information').where({
        'character.userName': event.character.userName,
        'be_character.userName': event.be_character.userName,
        type: '点赞',
        arcticle_id: event.arcticle._id
      }).update({
        data: {
          status: -1,
          createTime: event.createTime
        }
      })
    }
  }
}
async function LoseStateLogs(event){
  try{
    console.log(event.LoseState)
    return await db.collection("Campus-Circle").doc(event._id).update({
      data:{
        LoseState:event.LoseState
      }
    })
  }catch(e){
    console.log(e)
  }
}
async function CommentControlLogs(event) {
  try {
    return await addRecord(event, "评论", event.content)
  } catch (e) {
    console.log(e);
  }
}

async function CancelCommentControlLogs(event) {
  try {
    return await db.collection('New-Information').where({ // 感觉有问题
      'character.userName': event.username,
      'be_character.userName': event.be_username,
      arcticle_id: event.arcticle_id,
      type: '评论'
    }).update({
      data: {
        status: -1,
        createTime: event.createTime
      }
    }).then((res) => {
      console.log(res, "删除评论成功");
    })
  } catch (e) {
    console.log(e);
  }
}

async function CancelReplyControlLogs(event) {
  try {
    return await db.collection('New-Information').where({ // 感觉有问题
      'character.userName': event.username,
      'be_character.userName': event.be_username,
      arcticle_id: event.arcticle_id,
      type: '回复'
    }).update({
      data: {
        status: -1,
        createTime: event.createTime
      }
    }).then((res) => {
      console.log(res, "删除回复成功");
    })
  } catch (e) {
    console.log(e);
  }
}

async function ReplyCommentControlLogs(event) {
  try {
    return await addRecord(event, "回复", event.content)
  } catch (e) {
    console.log(e);
  }
}

async function ReadControlLogs(event) {
  const data = await db.collection('New-Information').orderBy('createTime', 'desc').where({
      'be_character.userName': event.be_username,
      status: _.gte(0)      // 大于等于零
    })
    .skip(event.currentPage * event.pageSize)
    .limit(event.pageSize)
    .get()
    console.log(event);
    console.log(data);
  // 更新
  await db.collection('New-Information').where({
    'be_character.userName': event.be_username,
      status: _.eq(0)
    }).update({
      data: {
        status: 1
      }
    }).then(console.log, "更新完成")
    .catch(console.error, "更新失败")

  return data
}
async function addFocus(event) {
  try {
    return await addRecord(event, "关注", "")
  } catch (e) {
    console.log(e);
  }
}

async function delFocus(event) {
  try {
    return await db.collection('New-Information').where({ // 感觉有问题
      'character.userName': event.username,
      'be_character.userName': event.be_username,
      arcticle_id: event.arcticle_id,
      type: '关注'
    }).update({
      data: {
        status: -1,
        createTime: event.createTime
      }
    }).then((res) => {
      console.log(res, "取消关注成功");
    })
  } catch (e) {
    console.log(e);
  }
}