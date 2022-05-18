const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event) => {
  let data = {
    msg: 'error'
  }
  switch (event.type) {
    case "read":
      data = await read(event); // 
      break;
  }
  return data
}
async function read(event) {
  try {
    return await db.collection('shop').where({
      _id: event._id
    }).get()
  } catch (e) {
    console.error(e);
  }
}