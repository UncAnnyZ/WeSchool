import requests
from school.茂名职业技术学院.login.login import login
from school.茂名职业技术学院.data.data import data


def login_MZ(username, password):
    try:
        session = requests.session()
        return login(session, username, password)
    except Exception as e :
        return {
            "msg": "登录失败,请找管理员",
            "error": str(e),
            "code": "707"
        }

def getData_MZ(username, password,other):
    try:
        session = requests.session()
        msg = login(session, username, password)
        if msg != {"msg": 'welcome'}:
            return msg
    except Exception as e:
        return {
            "msg": "登录失败,请找管理员",
            "error": str(e),
            "code": "707"
        }
    return data(username,password,session,other,msg)


# if __name__ == '__main__':
#    getData_MZ("32105300128", "q122622", {})

