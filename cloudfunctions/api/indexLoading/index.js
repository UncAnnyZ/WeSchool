const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database()
const _ = db.command

exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  const usernameData = (await db.collection("user").where({
    openid: wxContext.OPENID
  }).get()).data[0]
  var usernameDataOther = []
  if(usernameData ){
    usernameDataOther = (await db.collection("curriculumControl").where({
      username: usernameData.username 
    }).get()).data[0]
  }

  const {addCurriculumLogs = [], ConcealCurriculumLogs = []} = usernameDataOther || []
  usernameData ? delete usernameData.openid : null;
  let school = usernameData ? usernameData.school : '';
  let schoolInitData = (await db.collection("schoolLoading").where({
    schoolName: school ? school : '空'
  }).field({
    jsCode: false,
    otherPageCode: false,
  }).get()).data[0]

  if(!(event.jsVersion) || schoolInitData.jsVersion !== event.jsVersion){
    schoolInitData = {
      ...schoolInitData,
      ...(await db.collection("schoolLoading").where({
        schoolName: school ? school : '空'
      }).field({
        jsCode: true,
        otherPageCode: true,
      }).get()).data[0]
    }
  }
  var SchoolIndex = {}
  SchoolIndex = {
    SchoolIndex: {
      iconList: (await db.collection("jumpPage").where({
        schoolName: _.eq(school ? school : '空').or(_.eq('通用')),
        open: _.neq('关')
      }).get()).data,
      inform: (await db.collection("inform").where({
        schoolName: _.eq(school ? school : '空').or(_.eq('通用')),
      }).get()).data
    }
  }
  SchoolIndex.SchoolIndex.iconList.forEach(e => {
    if (e.type === '跳转WEB') {
      e.url = '/pages/common/common?type=web&url=' + e.url;
    } else if (e.type === '跳转小程序') {
      e.url = '/pages/common/common?type=small&id=' + e.url;
    } else if (e.type === '通用展示栏') {
      e.url = '/pages/common/common?type=commonPage&content=' + e.url;
    }
  })
  // 加载其他信息内容
  let otherData = {}
  if (schoolInitData.runOtherJS) {
    otherData.msg = "异常"
    try {
      const SchoolRunOther = require("./school/" + school + '/index.js')
      otherData = await SchoolRunOther.main(usernameData.username, usernameData.password)
      console.log(otherData)
    } catch (e) {
      console.log("runOtherJS错误")
      console.log(e)
      return {
        ...usernameData,
        ...schoolInitData,
        ...SchoolIndex,
        ...otherData,
        addCurriculumLogs,
        ConcealCurriculumLogs
      }
    }
  }
  return {
    ...usernameData,
    ...schoolInitData,
    ...SchoolIndex,
    ...otherData,
    addCurriculumLogs,
    ConcealCurriculumLogs
  }
}