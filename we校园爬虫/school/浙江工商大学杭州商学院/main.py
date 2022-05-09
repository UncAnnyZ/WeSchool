import requests

from school.浙江工商大学杭州商学院.login.login import login
from school.浙江工商大学杭州商学院.data.data import data
import time


def login_ZJGSHZ(username, password):
    try:
        session = requests.session()
        _, res = login(session, username, password)
        return res
    except Exception as e:
        return {
            "msg": "登录失败,请找管理员",
            "error": str(e),
            "code": "707"
        }


def getData_ZJGSHZ(username, password,other):
    # t=time.time()
    try:
        while True:
            try:
                session = requests.session()
                # t=time.time()
                name, res = login(session, username, password)
                if res != {'msg': 'welcome'}:
                    return res
                get_data = data(username, name, session,password,res,other)
                # print(isinstance(get_data['achievement'], str))
                # print(get_data)
            except Exception as e:
                if not (isinstance(get_data['achievement'], str)):
                    return{
                        "msg": "数据获取失败,请找管理员",
                        "error": str(e),
                        "code": "802"
                    }
            break
        # print(time.time()-t)
    except Exception as e :
        return {
            "msg": "登录失败,请找管理员",
            "error": str(e),
            "code": "707"
        }
    return get_data


# if __name__ == '__main__':
#     t = time.time()
#     print(getData_ZJGSHZ('2121210136', 'yy20030406.'))
#     # print('总时间',time.time() - t)