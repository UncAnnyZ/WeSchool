from school.浙江工商大学杭州商学院.data.achievement.achievement import achievement
from urllib.parse import quote
from school.浙江工商大学杭州商学院.data.curriculum.curriculum import curriculum
from database.sql import updata, search

def data(username,name,session,password,res,other):
    try:
        ach = achievement(session,quote(name,'utf-8'),username)
        cur = curriculum(session,quote(name,'utf-8'),username)
        obj = {
            "username": username,
            "password": password,
            "school": "7",
            "name": name,
            "curriculum": str(cur),
            "achievement": str(ach),
            "other": ""
        }
        try:
            if other['out_interface']:
                updata(obj)
        except Exception as e:
            a=7
        return {
            "achievement": ach,
            "curriculum": cur,
            "code":"801"
        }
        # return {
        #     'achievement':achievement(session, quote(name,'utf-8'),username),
        #     "curriculum": curriculum(session,quote(name,'utf-8'),username)
        # }
    except:
        try:
            data = search('7', username, password, "data")
            return {
                "achievement": eval(data['achievement']),
                "curriculum": eval(data['curriculum']),
                "code": res['code']
            }
        except Exception as e:
            return {
                "achievement": [],
                "curriculum": [],
                "code": 608,
                "error":str(e)
            }