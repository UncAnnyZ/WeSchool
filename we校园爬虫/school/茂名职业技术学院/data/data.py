from school.茂名职业技术学院.data.achievement.achievement import achievement
from school.茂名职业技术学院.data.curriculum.curriculum import curriculum
from database.sql import updata, search

def data(username,password,session,other,msg):
    try:
        ach = achievement(session)
        cur = curriculum(session)
        obj = {
            "username": username,
            "password": '',
            "school": "1",
            "name": '',
            "curriculum": str(cur),
            "achievement": str(ach),
            "other": ""
        }
        try:
            if other['out_interface']:
                updata(obj)
        except Exception as e:
            a = 1
        return {
            "achievement": ach,
            "curriculum": cur
        }



    except:
        try:
            data = search('1', username, password, "data")
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
                "error": str(e)
            }