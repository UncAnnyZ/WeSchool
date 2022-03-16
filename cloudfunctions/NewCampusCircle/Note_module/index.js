const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command

exports.main = async (event) => {
    let data = {
        msg: 'error'
    }
    switch (event.type) {
        // 校园圈主页读取小纸条
        case "read":
            data = await read(event); //  
            break;
    }
    return data
}

async function read(event) {
    // 从校园圈首页读小纸条时, 没有currentPage
    if(!event.currentPage) {
        event["currentPage"] = 0;
    }
    var skipPage = event.currentPage * 10;
    var obj = {
        School: event.School
    }
    try {
        return await db.collection('Note_module').orderBy('_createTime', 'desc').where(obj).skip(skipPage).limit(30).get();
    } catch (e) {
        console.error(e);
    }
}


