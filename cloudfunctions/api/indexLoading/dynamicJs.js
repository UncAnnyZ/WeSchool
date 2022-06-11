const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate



exports.main = async (event) => {
  let school = event.school || '空'
  console.log(school)
  var schoolInitData = {
    ...(await db.collection("schoolLoading").where({
        schoolName: school ? school : '空',
      }).field(
        {
          otherPageCode: true,
          ["otherPageCode." + event.content]: true
        }
      ).get()).data[0]
  }

  return schoolInitData

}