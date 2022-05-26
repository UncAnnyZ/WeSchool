import json
import requests
from school.河南工业大学.login.login import login
from school.河南工业大学.data.curriculum.curriculum import curriculum
from school.河南工业大学.data.achievement.achievement import achievement
from database.sql import updata, search


def data(session, password, username, msg, other):
    try:
        cur = json.dumps(curriculum(username, session))
        ach = json.dumps(achievement(username, session))
        obj = {
            "username": username,
            "password": password,
            "school": "9",
            "name": '',
            "curriculum": json.loads(cur),
            "achievement": json.loads(ach),
            "other": ""
        }
        try:
            if other['out_interface']:
                updata(obj)
        except Exception as e:
            a = 9
        return ({
            "curriculum": json.loads(cur),
            "achievement": json.loads(ach)
        })
    except Exception as e:
        try:
            data = search('9', username, password, "data")
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