from school.茂名农林科技职业技术学院.data.achievement.achievement import achievement
from database.sql import updata, search

def data(session,password, username,msg,other):

    try:
        achievements=achievement(session)
        obj = {
            "username": username,
            "password": password,
            "school": "8",
            "name": '',
            "curriculum": '',
            "achievement": str(achievements),
            "other": ""
        }
        try:
            if other['out_interface']:
                updata(obj)
        except Exception as e:
            a=8
        return {
            "achievement": achievements,
            "code":"801"
        }


    except:
        try:
            data = search('8', username, password, "data")
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