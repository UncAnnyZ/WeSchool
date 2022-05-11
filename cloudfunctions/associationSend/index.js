// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let type = event.type
  // 发布  招新
  if (type == 0) {
    return await cloud.database().collection("Campus-Circle").add({
      data: {
        AllPhoto: event.AllPhoto,
        Cover: event.Cover,
        CoverHeight: event.CoverHeight,
        CoverWidth: event.CoverWidth,
        Label: "社团招新",
        School: event.School,
        ShowHeight: event.ShowHeight,
        Text: event.Text,
        Time: Date.now(),
        Title: event.Title,
        question: event.question,
        association: event.association,
        index: event.index,
        endTime: event.endTime,
        personArr: []
      }
    })
  }
  // 删除  招新
  else if (type == 1) {
    return await cloud.database().collection("Campus-Circle").where({ index: event.count + '社团' }).remove().then(res => {
      cloud.database().collection("associationMess").where({ count: event.count }).update({
        data: {
          sendStatus: false
        }
      })
    })
  }
  // 保存并发布  赛事
  else if (type == 2) {
    return await cloud.database().collection("Campus-Circle").add({
      data: {
        AllPhoto: event.AllPhoto,
        Cover: event.Cover,
        CoverHeight: event.CoverHeight,
        CoverWidth: event.CoverWidth,
        Label: "社团赛事",
        School: event.School,
        ShowHeight: event.ShowHeight,
        Text: event.Text,
        Time: Date.now(),
        Title: event.Title,
        index: event.index,
        question: event.question,
        assoMess: event.assoMess,
        borderArr: event.borderArr,
        date: event.date,
        personArr: [],
        match_id: event.match_id
      }
    })
  }
  // 删除  赛事
  else if (type == 3) {
    cloud.database().collection("Campus-Circle").where({ index: event.index }).remove().then(res => {
      // cloud.database().collection("associtaionMath").where({})
    })
  }
  // 校园圈操作-->4 查询状态
  else if (type == 4) {
    return await cloud.database().collection("Campus-Circle").where({ _id: event._id }).get().then(res => {
      let personArr = res.data[0].personArr
      if (personArr.includes(event.username) == false) {
        personArr.push(event.username)
        cloud.database().collection("Campus-Circle").where({ _id: event._id }).update({
          data: {
            personArr
          }
        })
      }
    })
  }
  // 提交问卷-->比赛
  else if (type == 5) {
    return await cloud.database().collection("assoMatchPush").add({
      data: {
        userMess: event.userMess,
        matchDetail: event.matchDetail,
        assoName: event.assoName,
        assoCount: event.assoCount,
        pusherCount: event.pusherCount,
        CampusCircle_id: event.match_id,
        index: event.index,
        match_id: event.match_id,
        read: false
      }
    })
  }
  // 更新活动/数量
  else if (type == 6) {
    return await cloud.database().collection("associtaionMath").where({ count: event.count }).limit(1000).get()
      .then(res => {
        let activityCount = res.data.length == 1000 ? '1000+' : res.data.length
        cloud.database().collection("assoMatchPush").where({ assoCount: event.count }).limit(1000).get().then(res => {
          // 参与人数
          let personCount = res.data.length == 1000 ? '1000+' : res.data.length
          cloud.database().collection("associationApply").where({ count: event.count }).update({
            data: {
              personCount: personCount,
              activityCount: activityCount
            }
          })
        })
      })
  }
  // 跳转报名
  else if (type == 7) {
    return await cloud.database().collection("Campus-Circle").where({ index: event.index }).get()
  }
}