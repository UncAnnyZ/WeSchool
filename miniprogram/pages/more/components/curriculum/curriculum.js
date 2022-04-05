var utilTime = require('../../../../utils/time')
var util = require('../../../../utils/util')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        course: {
            type:Array
        }
    },

    data: {
        time:{
            month: new Date().getMonth() + 1,
            date: new Date().getDate()
        },
        week: utilTime.formatDay(new Date().getDay()),
        currWeek: util.getweekString(),
        color:[
            '#986bfd',
            '#a5c9fa'
        ]
    },
    methods: {

    }
})
