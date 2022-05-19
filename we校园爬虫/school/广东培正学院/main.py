import requests
from school.广东培正学院.login.login import login
from school.广东培正学院.data.data import data


def login_GDPZ(username, password):
    session = requests.session()
    try:
        msg = login(username, password, session)
        return msg
    except Exception as e:
        return {
            "msg": "登录失败,请找管理员",
            "error": str(e),
            "code": "707"
        }


def getData_GDPZ(username, password, other):
    try:
        session = requests.session()
        msg = login(username, password, session)
        if msg != {"msg": "welcome"}:
            return msg
    except Exception as e :
        return {
            "msg": "登录失败,请找管理员",
            "error": str(e),
            "code": "707"
        }
    return data(session, password, username, msg, other)

