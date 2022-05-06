import json
import requests
from school.嘉应学院.login.login import login
from school.广东医科大学.data.curriculum.curriculum import curriculum
from school.广东医科大学.data.achievement.achievement import achievement
from database.sql import updata, search

def data(session,password, username,msg,other):
    try:
        cur = json.dumps(curriculum(username,session))
        ach = json.dumps(achievement(username,session))
        obj = {
            "username": username,
            "password": password,
            "school": "2",
            "name": '',
            "curriculum": json.loads(cur),
            "achievement": json.loads(ach),
            "other": ""
        }
        try:
            if other['out_interface']:
                updata(obj)
        except Exception as e:
            a = 2
        return ({
            "curriculum": json.loads(cur),
            "achievement": json.loads(ach)
        })
        # return json.dumps({
        #     "curriculum": curriculum(username, session),
        #     "achievement": achievement(username, session)
        # })
    except:
        try:
            data = search('2', username, password, "data")
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
