import time

import requests
from lib import RSAJS
from pyquery import PyQuery as pq
from school.浙江工商大学杭州商学院.code.code import code_ocr
import re


# import time


def login(sessions: requests.session(), username, password):
    def login_test(sessions, username, password):
        status_code = 0
        try:
            t = time.time()
            code = code_ocr(username,sessions)
            import os
            if os.path.exists("ZJ_code.png" + username):
                os.remove("ZJ_code.png" + username)
            # print('验证码识别',time.time()-t)
            t = time.time()

            res = sessions.get('http://jxgl.zjhzcc.edu.cn')
            status_code = res.status_code
            # r = 'id=\"txtKeyModulus\" style=\"display:none\" value=\"(.*?)\"'
            doc = pq(res.text)
            modulus = doc('#txtKeyModulus').attr('value')
            VIESTATE = doc('#__VIEWSTATE').attr('value')
            VIESTATEATE = doc('#__VIEWSTATEGENERATOR').attr('value')
            exponent = doc('#txtKeyExponent').attr('value')
            rsa = RSAJS.RSAKey()
            rsa.setPublic(modulus, exponent)
            mm = rsa.encrypt(password)
            data = {
                "__VIEWSTATE": VIESTATE,
                "__VIEWSTATEGENERATOR": VIESTATEATE,
                "__LASTFOCUS": "",
                "__EVENTTARGET": "",
                "__EVENTARGUMENT": "",
                "txtUserName": username,
                "TextBox2": mm,
                "txtSecretCode": code,
                "RadioButtonList1": "学生",
                "Button1": "登录",
                "txtKeyExponent": exponent,
                "txtKeyModulus": modulus
            }
            # print(data)
            # print('获取重要信息',time.time()-t)
            # t=time.time()

            res = sessions.post('http://jxgl.zjhzcc.edu.cn/default2.aspx', data=data)
            status_code = res.status_code
            # print('登录POST请求',time.time()-t)

            # print(res.text)

            return res.text
        except:
            print("浙江工商大学杭州商学院,返回码为", status_code)
        # print(regname.findall(returnData)[0])
        # print(res.text)
        # print(url)

    returnData = login_test(sessions, username, password)
    name = ' '
    while True:
        if '用户名或密码不正确！' in returnData:
            return name, {
                "msg": '账号密码错误',
                "code": "703"
            }
        elif "安全退出" in returnData:

            # print(returnData)
            break
        elif '账号已锁定无法登录' in returnData:
            return {
                "msg": '密码错误，您密码输入错误已达规定次数，账号已锁定无法登录，次日自动解锁！如忘记密码，请与教务处联系!',
                "code": "702"
            }
        elif '密码有误' in returnData:
            return {
                "msg": '密码错误',
                "code": "703"
            }
        elif '验证码' in returnData:
            returnData = login_test(sessions, username, password)
        else:
            return name, {
                "msg": '异常，请重试',
                "code": "707"
            }
    regname = re.compile(r'xm=(.*?)&')
    name = regname.findall(returnData)[0]
    return name, {
        "msg": 'welcome',
    }
