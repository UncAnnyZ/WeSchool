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
      date: new Date().getDate()
    },
    week: utilTime.formatDay(new Date().getDay()),
    currWeek: util.getweekString(),
    whichCourse: 0,
    restCourse: 0,
  },
  lifetimes: {
    ready() {
      let course = this.data.course,
        whichCourse,
        restCourse;

      course.forEach((item, index) => {
        // 在首页 more 中计算了当前课程，并添加到字段 isHighligh: Boolean
        if (item.isHighlight) {
          whichCourse = index;
          // 剩余课程数量 = 课程数量 - (当前课程索引+1)
          restCourse = course.length - (index + 1);
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
