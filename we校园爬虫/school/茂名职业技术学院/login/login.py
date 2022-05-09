import json
import time

from lib import RSAJS
from lib.hex2b64 import HB64
from pyquery import PyQuery as pq
from school.广东科技学院.code.code import code_ocr


def login(session, username, password):
    res = login_test(session, username, password)
    while True:
        if "用户名或密码不正确" in res.text:
            return {
                "msg": "学号或密码有误",
                "code": "703"
            }

        elif "验证码输入错误" in res.text:
            res = login_test(session, username, password)
        elif "index_initMenu.html" in res.url:
            break
        else:

            return {
                "msg": '异常',
                "code": "707"
            }
    return {
        "msg": 'welcome'
    }


def login_test(session, username, password):
    # code, cookie, nowTime = code_ocr(username,session)
    # import os
    # if os.path.exists("GKY_code.png" + username):
    #     os.remove("GKY_code.png" + username)
    nowTime = str(round(time.time() * 1000))
    url = "https://jwc.mmpt.edu.cn/"
    res = session.get(f'{url}xtgl/login_getPublicKey.html?time=' + nowTime)
    res_json = json.loads(res.text)
    modulus = res_json['modulus']
    exponent = res_json['exponent']
    rsa = RSAJS.RSAKey()
    rsa.setPublic(HB64().b642hex(modulus), HB64().b642hex(exponent))
    mm = HB64().hex2b64(rsa.encrypt(password))
    # print(mm)
    url = f'{url}xtgl/login_slogin.html?time=' + nowTime
    res = session.get(url)
    doc = pq(res.text)
    csrf = doc('#csrftoken').attr('value')
    # print(csrf)

    res = session.post(f'{url}xtgl/login_slogin.html?time=' + nowTime, data={
        # 'yzm': code,
        'yhm': username,
        'mm': mm,
        'csrftoken': csrf,
        'language': 'zh_CN'

    })
    return res