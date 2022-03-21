const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command
exports.main = async (event) => {
  let data = {
    msg: 'error'
  }
  switch (event.type) {
    case "writeComment":
      data = await writeComment(event); // 
      break;
    case "replyComment":
      data = await replyComment(event); // 
      break;
    case "delComment":
      data = await delComment(event); // 
      break;
    case "delReply":
      data = await delReply(event); // 
      break;
    case "starReply":
      data = await starReply(event); // 
      break;
    case "starComment":
      data = await starComment(event); // 
      break;
    case "star":
      data = await star(event); // 
      break;
    case "delReplystar":
      data = await delReplystar(event); // 
      break;
    case "delCommentstar":
      data = await delCommentstar(event); // 
      break;
    case "delStar":
      data = await delStar(event); // 
      break;
  }
  
  return data
}
async function writeComment(event, type, content) {
  
  if (event.addData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        SortTime: Date.parse(new Date()),
        CommentList: _.push(event.addData)
      }
    })
    data = {
      msg: 'success'
    }
    return data
  }

}
async function delComment(event, type, content) {
  if (event.delData) {

   await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        CommentList: _.pull({
          CommentTime : _.eq(event.delData.CommentTime),
          username : _.eq(event.delData.username),
          iconUser : _.eq(event.delData.iconUser),
        })
      }
    })
    data = {
      msg: 'success'
    }
    return data
  }


}

async function delReply(event, type, content) {

  if (event.delData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        ['CommentList.'+[event.index]+'.Reply']: _.pull({
          ReplyTime: _.eq(event.delData.ReplyTime),
          username: _.eq(event.delData.username),
          iconUser: _.eq(event.delData.iconUser),
        })
      }
    })
    data = {
      msg: 'success'
    }
  }

 }

async function replyComment(event, type, content) {
  if (event.addData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        SortTime: Date.parse(new Date()),
        ['CommentList.'+[event.index]+'.Reply']: _.push(event.addData)
      }
    })
    data = {
      msg: 'success'
    }
  }
}
async function starComment(event, type, content) {
  if (event.addData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        SortTime: Date.parse(new Date()),
        ['CommentList.'+[event.index]+'.Star_User']: _.push(event.addData)
      }
    })
    data = {
      msg: 'success'
    }
  }
}
async function starReply(event, type, content) {
  if (event.addData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        SortTime: Date.parse(new Date()),
        ['CommentList.'+[event.index]+'.Reply.'+[event.index2]+'.Star_User']: _.push(event.addData)
      }
    })
    data = {
      msg: 'success'
    }
  }
}
async function star(event, type, content) {
  if (event.addData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        SortTime: Date.parse(new Date()),
        Star_User: _.push(event.addData)
      }
    })
    data = {
      msg: 'success'
    }
  }
}
async function delReplystar(event, type, content) {

  if (event.delData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        ['CommentList.'+[event.index]+'.Reply.'+[event.index2]+'.Star_User']: _.pull({
          username: _.eq(event.delData)
        })
      }
    })
    data = {
      msg: 'success'
    }
  }

 }
 async function delCommentstar(event, type, content) {

  if (event.delData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        ['CommentList.'+[event.index]+'.Star_User']: _.pull({
          username: _.eq(event.delData)
        })
      }
    })
    data = {
      msg: 'success'
    }
  }

 }
 async function delStar(event, type, content) {
  if (event.delData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        Star_User: _.pull({
          username: _.eq(event.delData)
        })
      }
    })
    data = {
      msg: 'success'
    }
  }

 }