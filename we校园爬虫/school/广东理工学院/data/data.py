from school.广东理工学院.data.curriculum.curriculum import curriculum
from school.广东理工学院.data.achievement.achievement import achievement
from database.sql import updata, search

def data(session,password, username,msg,other):
    try:
        cur = curriculum(session)
        ach = achievement(session)
        obj = {
            "username": username,
            "password": password,
            "school": "5",
            "name": '',
            "curriculum": str(cur),
            "achievement": str(ach),
            "other": ""
        }
        try:
            if other['out_interface']:
                updata(obj)
        except Exception as e:
            a = 5
        return{
            "curriculum":curriculum(session),
            "achievement":achievement(session),
            "code":"801"
            }
        # return {
        #     "curriculum":curriculum(session),
        #     "achievement":achievement(session)
        # }
    except:
        try:
            data = search('5', username, password, "data")
            return {
                "achievement": eval(data['achievement']),
                "curriculum": eval(data['curriculum']),
                "code": msg['code']
            }
        except Exception as e:
            return {
                "achievement": [],
                "curriculum": [],
                "code": 608,
                "error":str(e)
            }