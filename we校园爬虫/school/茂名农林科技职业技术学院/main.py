# from school.茂名农林科技职业技术学院.code.code import code_ocr
from school.茂名农林科技职业技术学院.login.login import login
from school.茂名农林科技职业技术学院.data.data import data
import requests


def login_NL(username, password):
    try:
        session = requests.session()
        msg = login(session, username, password)
        return msg
    except Exception as e:
        return {
            "msg":"登录失败,请找管理员",
            "error":str(e),
            "code":"707"
        }

def getData_NL(username, password,other):
    try:
        session = requests.session()
        msg = login(session, username, password)
        if msg != {"msg": 'welcome'}:
            return msg
    except Exception as e :
        return {
            "msg": "登录失败,请找管理员",
            "error": str(e),
            "code": "707"
        }
    return data(session,password, username,msg,other)

