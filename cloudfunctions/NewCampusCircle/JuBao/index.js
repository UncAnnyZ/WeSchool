const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command

exports.main = async (event) => {
    let data = {
        msg: 'error'
    }
    switch (event.type) {
        // 举报
        case "write":
            data = await write(event);
            break;
    }
    return data
}

async function write(event) {
    let { content, username, School, Time, content_id, from_page } = event;

    
    try {
        return await db.collection('JuBao').add({
            data: {
                content, username, School, Time, content_id, from_page
            }
        })
    } catch (e) {

    }
}


