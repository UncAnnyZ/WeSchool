import time, json
import threading


def achievement(session):
    year = time.localtime().tm_year  # 获取当前时间
    achievements = []
    try:
        threads = []
        for yeara in range(2018, year):
            threads.append(threading.Thread(target=get_achievement, args=(session, yeara, achievements)))
        for t in threads:
            t.start()
        for t in threads:
            t.join()
        return achievements
    except:
        print('茂名职业技术学院成绩有异常')
        return achievements


def get_achievement(session, yeara, achievements):
    url = "https://jwc.mmpt.edu.cn/"
    achievement_data = {
        "xnm": str(yeara),  # 学年
        "xqm": ""  # 学期末
    }
    achievement_request = session.post(
        f'{url}cjcx/cjcx_cxXsgrcj.html?doType=query&gnmkdm=N305005&su=2018152414'
        , data=achievement_data
    )
    # print(achievement_request.text)
    # print(achievement_request.text)
    achievement_json = json.loads(achievement_request.text)
    achievement_items = achievement_json['items']

    for index in achievement_items:
        for i in index['kcxzmc']:
            if i == '选':
                achievement_item = {
                    "xnxqmc": index['xnmmc'] + '-' + index['xqmmc'],
                    "kcbh": index['bh'],
                    "kcmc": index['kcmc'],
                    "xdfsmc": "选修",
                    "zcj": index['bfzcj'],
                    "xf": index['xf'],
                    "ksxzmc": index['ksxz'],
                    "cjjd": int(index['bfzcj'])/10-5,
                }
                achievements.append(achievement_item)
            elif i == '必':
                achievement_item = {
                    "xnxqmc": index['xnmmc'] + '-' + index['xqmmc'],
                    "kcbh": index['bh'],
                    "kcmc": index['kcmc'],
                    "xdfsmc": "必修",
                    "zcj": index['bfzcj'],
                    "xf": index['xf'],
                    "ksxzmc": index['ksxz'],
                    "cjjd": int(index['bfzcj'])/10-5,
                }
                achievements.append(achievement_item)
