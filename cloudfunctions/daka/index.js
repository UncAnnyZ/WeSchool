// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    switch(event.type){
        case "save_dakaRecord":
            return save_dakaRecord(event);
        case "getDakaRecord_ByHashId":
            return await getDakaRecord_ByHashId(event);
        case "updateDakaRedord_ByHashId":
            return await updateDakaRedord_ByHashId(event);
        case "delDakaRecord_ByHashId":
            return delDakaRecord_ByHashId(event);
        case "getAllDakaRecord":
            return await getAllDakaRecord(event);
        case "updateIsDaka":
            return updateIsDaka(event);
    } 
}

function save_dakaRecord(event){
    return db.collection("daka_record").add({
        data:{
            task:event.task,
            lable1:event.lable1,
            lable2:event.lable2,
            cycle:event.cycle,
            startTime:event.startTime,
            endTime:event.endTime,
            username:event.username,
            hashId:event.hashId,
            isDaka:event.isDaka,
            is_delete:event.is_delete,
            count:event.count,
            daka_lastTime:event.daka_lastTime,
        }
    })
}

async function getDakaRecord_ByHashId(event){
    return await db.collection("daka_record").where({hashId:event.hashId}).get();
}

async function updateDakaRedord_ByHashId(event){
    return await db.collection("daka_record").where({
        hashId:event.hashId
    }).update({
        data:{
            isDaka:true,
            //次数自增1
            count:_.inc(1),
            daka_lastTime:new Date(),
        }
    })
}

function delDakaRecord_ByHashId(event){
    return db.collection("daka_record").where({
        hashId:event.hashId
    }).update({
        data: {
            is_delete:true
        }
    }).then(res=>{
        console.log(res);
    })
}

async function getAllDakaRecord(event){
    return await db.collection("daka_record").where({
        username:event.username,
        is_delete:event.is_delete,
    }).get()
}

function updateIsDaka(event){
    return db.collection("daka_record").where({
        hashId:event.hashId
    }).update({
        data:{
            isDaka:event.isDaka,
        }
    })
}

