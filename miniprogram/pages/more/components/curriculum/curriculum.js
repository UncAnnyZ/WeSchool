var utilTime = require('../../../../utils/time')
var util = require('../../../../utils/util')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    course: {
      type: Array
    },
    msg: {
      type: String
    }
  },

  data: {
    time: {
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    },
    week: utilTime.formatDay(new Date().getDay()),
    currWeek: util.getweekString(),
    whichCourse: 0,
    restCourse: 0,
  },
  lifetimes: {
    ready() {
      let course = this.data.course,
        time = this.data.time,
        args = wx.getStorageSync('args'),
        whichCourse,
        restCourse;

      course.forEach((item, index) => {
        // 在首页 more 中计算了当前课程，并添加到字段 isHighligh: Boolean
        if (item.isHighlight) {
          whichCourse = index;
          // 剩余课程数量 = 课程数量 - (当前课程索引+1)
          restCourse = course.length - (index + 1);

          if(args.courseTime) {
            let courseTime_school = args.courseTime,
              courseIndex = Number(item.time.replace(/[^\d.]/g, '')),
              schoolTime = Number(courseTime_school[courseIndex - 1].split(':').join('.')),
              nowTime = Number(`${time.hours}.${time.minutes}`); 
            // 三元不等式, 重新对 restCourse 进行计算
            restCourse = nowTime > schoolTime ? course.length - (index + 1) : course.length - (index)
          }
        }
      })

      this.setData({
        whichCourse,
        restCourse
      })

    }
  },
  methods: {

  }
})
