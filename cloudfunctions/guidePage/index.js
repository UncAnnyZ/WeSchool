// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db=cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    switch(event.type){
        case "getSchoolInfo":
            return await getSchoolInfo(event);
    }

}

async function getSchoolInfo(event){
    return await db.collection("schoolLoading").where({
        openStatus:event.openStatus,
    }).field({
        schoolName:true,
        openStatus:true,
        school_ImgUrl:true,
    }).get()
}