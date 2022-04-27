const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command
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
    case "addRecord":
      data = await addRecord(event); // 
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
async function addFocus(event) {
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
async function delFocus(event) {
  try {
    return await db.collection('personalCenter').where({
      username: event.username
    }).update({
      data: {
        focusNum: _.pull({
          username: _.eq(event.dealData.username)
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
        username:event.addData.username,
        focusNum:event.addData.focusNum,
        collectionNum:event.addData.collectionNum
      },
      success: res => {},
      fail: err => {}
    })
  } catch (e) {
    console.log(e)
  }
}