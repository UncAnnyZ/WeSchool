const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command
let fansControl=false
exports.main = async (event) => {
  let data = {
    msg: 'error'
  }
  switch (event.type) {
    case "findFocus":
      data = await findFocus(event); // 
      break;
    case "addFocus":
      data = await addFocus(event); // 
      break;
    case "delFocus":
      data = await delFocus(event); // 
      break;
    case "delFans":
      data = await delFans(event); // 
      break;
    case "addRecord":
      data = await addRecord(event); // 
      break;
    case "addFans":
    data = await addFans(event); // 
    break;
  }
  return data
}
async function findFocus(event) {
  console.log(event);
  try {
    return await db.collection('personalCenter').where({
      username: event.username
    }).get()
  } catch (e) {
    return e
  }
}

async function addFans(event) {
  try {
    return await db.collection('personalCenter').where({
      username: event.dealData.userName
    }).update({
      data: {
        fansNum: _.push(event.fansData)
      }
    })
  } catch (e) {
    return e
  }
}
async function addFocus(event) {
  addFans(event)
  try {
    return await db.collection('personalCenter').where({
      username: event.username
    }).update({
      data: {
        focusNum: _.push(event.dealData)
      }
    })
  } catch (e) {
    return e
  }
}
async function delFans(event) {
  try {
    return await db.collection('personalCenter').where({
      username: event.dealData.userName
    }).update({
      data: {
        fansNum: _.pull({
          userName: _.eq(event.username)
        })
      }
    })
  } catch (e) {
    return e
  }
}

async function delFocus(event) {
  delFans(event)
  try {
    return await db.collection('personalCenter').where({
      username: event.username
    }).update({
      data: {
        focusNum: _.pull({
          userName: _.eq(event.dealData.userName)
        })
      }
    })
  } catch (e) {
    return e
  }
}

async function addRecord(event) {
  try {
    return await db.collection("personalCenter").add({
      data: {
        username:event.username,
        school:event.school,
        focusNum:[],
        fansNum:[]
      }
    })
  } catch (e) {
    console.log(e)
  }
}