import time
from datetime import datetime
import threading




def achievement(session):
    achievements = []
    try:

        currentYear = datetime.now().year
        # print(type(currentYear))
        print(currentYear)
        max = (currentYear - 2017) * 2
        print(max)
        threads = []
        for i in range(1, max):
            threads.append(threading.Thread(target=get_achievement, args=(session, i,achievements)))
        for t in threads:
            t.start()
        for t in threads:
            t.join()
        return achievements
    except:
        print("茂名农林科技职业技术学院成绩有问题")
        return achievements


def get_achievement(session, i, achievements):
    time = {
        1: "2017-2018-1",
        2: "2018-2019-1",
        3: "2019-2020-2",
        4: "2020-2021-1",
        5: "2020-2021-2",
        6: "2019-2020-1",
        7: "2018-2019-2",
        8: "2017-2018-2",
        9: "2021-2022-1",
        10: "2021-2022-1"
    }
    res = session.get(
        'http://campus.gdnlxy.cn/campus-xmain/apic/xteach-chengji-student/query-score?pn=1&ps=20&filter={'
        '"termId":' + str(i) + '}'
    )
    cj = (res.json())['rows']
    for index in cj:
        if (index['props'])['testWay'] == "考试" and "scoreFinal" in index:
            jd = round(float((int(index['scoreFinal']) / 100) - 5), 1)
            achievements.append(
                {
                    "xnxqmc": time[i],  # 学年学期
                    "kcbh": index['courseId'],  # 课程编号
                    "kcmc": index['courseName'],  # 课程名称
                    "xdfsmc": "必修",  # 课程性质
                    "zcj": int(index['scoreFinal']) / 10,  # 成绩
                    "xf": index['xf'] / 10,  # 学分
                    "ksxzmc": "正常考试",
                    "cjjd": 0 if jd < 0 else jd,  # 绩点
                }
            )
