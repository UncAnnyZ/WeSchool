# !/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2021/8/12
# @Author  : 2984922017@qq.com
# @File    : YiBan.py
# @Software: PyCharm

import base64
import json
import random
# 系统自带库
import re
import time

import requests
# from crypto.Cipher import PKCS1_v1_5
# from crypto.PublicKey import RSA


# 邮箱模组
# 第三方库


# 配置文件

# 全局变量

class YiBan:
    def __init__(self, dic, data, ):
        self.dic = dic
        self.data = data
        self.sess = requests.session()
        self.csrf = ''.join(random.sample('zyxwvutsrqponmlkjihgfedcba0123456789', 32))
        self.sess.cookies.update({"csrf_token": self.csrf})

    def getName(self):
        if self.dic['remark'] != "":
            return self.dic['remark']
        else:
            return self.dic['account']

    def encryptPassword(self, pwd):
        # 密码加密
        PUBLIC_KEY = '''-----BEGIN PUBLIC KEY-----
            MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6aTDM8BhCS8O0wlx2KzA
            Ajffez4G4A/QSnn1ZDuvLRbKBHm0vVBtBhD03QUnnHXvqigsOOwr4onUeNljegIC
            XC9h5exLFidQVB58MBjItMA81YVlZKBY9zth1neHeRTWlFTCx+WasvbS0HuYpF8+
            KPl7LJPjtI4XAAOLBntQGnPwCX2Ff/LgwqkZbOrHHkN444iLmViCXxNUDUMUR9bP
            A9/I5kwfyZ/mM5m8+IPhSXZ0f2uw1WLov1P4aeKkaaKCf5eL3n7/2vgq7kw2qSmR
            AGBZzW45PsjOEvygXFOy2n7AXL9nHogDiMdbe4aY2VT70sl0ccc4uvVOvVBMinOp
            d2rEpX0/8YE0dRXxukrM7i+r6lWy1lSKbP+0tQxQHNa/Cjg5W3uU+W9YmNUFc1w/
            7QT4SZrnRBEo++Xf9D3YNaOCFZXhy63IpY4eTQCJFQcXdnRbTXEdC3CtWNd7SV/h
            mfJYekb3GEV+10xLOvpe/+tCTeCDpFDJP6UuzLXBBADL2oV3D56hYlOlscjBokNU
            AYYlWgfwA91NjDsWW9mwapm/eLs4FNyH0JcMFTWH9dnl8B7PCUra/Lg/IVv6HkFE
            uCL7hVXGMbw2BZuCIC2VG1ZQ6QD64X8g5zL+HDsusQDbEJV2ZtojalTIjpxMksbR
            ZRsH+P3+NNOZOEwUdjJUAx8CAwEAAQ==
            -----END PUBLIC KEY-----'''
        cipher = PKCS1_v1_5.new(RSA.importKey(PUBLIC_KEY))
        cipher_text = base64.b64encode(cipher.encrypt(bytes(pwd, encoding="utf8")))
        return cipher_text.decode("utf-8")

    def login(self):
        url = "https://mobile.yiban.cn/api/v4/passport/login"
        param = {
            "device": "HUAWEI",
            "v": "5.0.1",
            "mobile": int(self.dic['account']),
            "password": self.encryptPassword(self.dic['password']),
            "token": "",
            "ct": "2",
            "identify": "0",
            "sversion": "25",
            "app": "1",
            "apn": "wifi",
            "authCode": "",
            "sig": "934932a8993b5e23"
        }
        header = {
            'Origin': 'https://mobile.yiban.cn',
            'User-Agent': 'YiBan/5.0.1 Mozilla/5.0 (Linux; Android 7.1.2; V1938T Build/N2G48C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.70 Safari/537.36',
            'Referer': 'https://mobile.yiban.cn',
            'AppVersion': '5.0.1'
        }
        response = self.sess.post(url=url, params=param, headers=header).json()
        # print(response)
        if response['response'] == 100:
            self.access_token = response['data']['access_token']
            # print(self.access_token)
            time.sleep(0.1)
            a = self.getAuthUrl()
            # print(a)
            return a
        else:
            return {
                "username": self.getName(),
            }

    def getAuthUrl(self):
        url = "https://f.yiban.cn/iapp/index"
        param = {
            "act": "iapp603148"
        }
        header = {
            "authorization": f"Bearer {self.access_token}",
            # "client": "iOS",
            'User-Agent': 'YiBan/5.0.1 Mozilla/5.0 (Linux; Android 7.1.2; V1938T Build/N2G48C; wv) AppleWebKit/537.36 '
                          '(KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.70 Safari/537.36',
            "loginToken": self.access_token
        }
        self.sess.get(f"https://f.yiban.cn/iapp603148", headers=header, allow_redirects=False)
        time.sleep(0.1)
        response = self.sess.get(url=url, params=param, headers=header, allow_redirects=False)
        self.verify = response.headers['Location']
        self.verify_request = re.findall(r"verify_request=(.*?)&", self.verify)[0]
        url2 = self.verify
        response = self.sess.get(url=url2, headers=header, params=param)
        response.encoding = "utf-8"
        # print(response.url)
        time.sleep(0.1)
        return self.auth()

    def auth(self):
        url = "http://210.38.250.128:1024/nonlogin/yiban/authQYY.htm?deviceId="
        import uuid
        url += str(uuid.uuid1()).upper()
        # print(url)
        self.sess.headers.update({
            # 'origin': 'https://app.uyiban.com',
            'referer': 'http://210.38.250.128:1024/sanythPage/yiban/authorize.html',
            'Host': '210.38.250.128:1024',
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 yiban_iOS/5.0.1'
        })
        param = {

        }
        response = self.sess.get(url=url, params=param)
        response.encoding = "utf-8"
        if "登录失败" in response.text:
            return {
                "msg": "在校园系统认证失败！需要先下载易班绑定广油账号"
            }
        url = "http://210.38.250.128:1024/yiban/api/getUserInfo.htm"
        response = self.sess.get(url=url)
        response.encoding = "utf-8"
        # print(response.text)
        time.sleep(0.1)
        return self.GduptSign()

    def GduptSign(self):
        chk_url = "http://210.38.250.128:1024/syt/zzapply/checkrestrict.htm"
        param = {
            'xmid': '52a67a007e304439017ee6442066494d',
            'pdnf': '2021',
            'type': 'YQSJSB'
        }
        resp = self.sess.post(url=chk_url, params=param)
        resp.encoding = "utf-8"
        if (resp.text == "今日已经填报"):
            return {
                "msg": resp.text
            }
            # exit(0)
        submit_url = "http://210.38.250.128:1024/syt/zzapply/operation.htm"

        form = {
            "data": self.data,
            "msgUrl": "syt/zzapply/list.htm?type=YQSJSB&xmid=52a67a007e304439017ee6442066494d",
            "uploadFileStr": {},
            "multiSelectData": {},
            "type": "YQSJSB"
        }
        resp = self.sess.post(url=submit_url, params=form)
        resp.encoding = "utf-8"
        if resp.text == "success":
            return {
                "msg": "打卡成功"
            }

        else:
            # print(self.data)
            # print("今天的打卡失败了，返回的错误信息: " + resp.text)
            return {
                "error": resp.text,
                "msg": "打卡失败"
            }

    def getInitiateId(self):
        url = f"https://api.uyiban.com/officeTask/client/index/detail"
        param = {
            "TaskId": self.CompletedTaskID,
            "CSRF": self.csrf
        }
        response = self.sess.get(url=url, params=param).json()
        self.InitiateId = response['data']['InitiateId']
        time.sleep(0.1)
        return self.getClockInMess()

    def getClockInMess(self):
        url = f"https://api.uyiban.com/workFlow/c/work/show/view/{self.InitiateId}"

        param = {
            "CSRF": self.csrf
        }
        self.result = self.sess.get(url=url, params=param).json()
        time.sleep(0.1)
        return self.unCompletedList()

    def unCompletedList(self):
        today = time.strftime("%Y-%m-%d", time.localtime(time.time()))
        url = f"https://api.uyiban.com/officeTask/client/index/uncompletedList?StartTime={today}%2000%3A00&EndTime={today}%2023%3A59&CSRF={self.csrf}"
        response = self.sess.get(url=url).json()
        if response['code'] == 0:
            if len(response['data']) == 1:
                self.unCompletedTaskID = response['data'][0]['TaskId']
                time.sleep(0.1)
                return self.getWFId()
            elif len(response['data']) == 0:
                return {
                    "username": self.getName(),
                    "msg": "任务未发布，故不继续执行！"
                }
            elif len(response['data']) > 1:
                dic = [content for content in response['data'] if
                       re.findall(f"学生每日健康打卡\({time.strftime('%Y-%m-%d', time.localtime(time.time()))}）",
                                  content['Title']) != []]
                if len(dic) == 1:
                    self.unCompletedTaskID = dic[0]['TaskId']
                    time.sleep(0.1)
                    return self.getWFId()
                else:
                    return {
                        "username": self.getName(),
                        "error": "存在多个任务，尝试进行筛选",
                        "msg": "筛选失败，故不进行打卡！"
                    }
        else:
            return {
                "username": self.getName(),
                "error": response['message'],
                "msg": "请手动检查易班是否正常！"
            }

    def getWFId(self):
        url = f"https://api.uyiban.com/officeTask/client/index/detail"
        param = {
            "TaskId": self.unCompletedTaskID,
            "CSRF": self.csrf
        }
        response = self.sess.get(url=url, params=param).json()
        if round(time.time()) > response['data']['StartTime']:
            self.WFId = response['data']['WFId']
            self.title = response['data']['Title']
            time.sleep(0.1)
            return self.isUpdate()
        else:
            return {
                "username": self.getName(),
                "error": "未到打卡时间！"
            }

    def isUpdate(self):
        url = f"https://api.uyiban.com/workFlow/c/my/form/{self.WFId}"
        param = {
            "CSRF": self.csrf
        }
        response = self.sess.get(url=url, params=param).json()
        if response['data']['Id'] == self.result['data']['Initiate']['WFId']:
            time.sleep(0.1)
            return self.clockIn()
        else:
            return {
                "username": self.getName(),
                "error": "打卡内容已更新，请手动打卡！",
                "msg": "打卡失败！"
            }

    def clockIn(self):
        url = f"https://api.uyiban.com/workFlow/c/my/apply/{self.WFId}"
        param = {
            "CSRF": self.csrf
        }
        data = {
            'data': json.dumps({
                "a441d48886b2e011abb5685ea3ea4999":
                    {
                        "time": time.strftime('%Y-%m-%d %H:%M', time.localtime()),
                        "longitude": self.result['data']['Initiate']['FormDataJson'][0]['value']['longitude'],
                        "latitude": self.result['data']['Initiate']['FormDataJson'][0]['value']['latitude'],
                        "address": self.result['data']['Initiate']['FormDataJson'][0]['value']['address']
                    },
                "9cd65a003f4a2c30a4d949cad83eda0d": self.result['data']['Initiate']['FormDataJson'][1]['value'],
                "65ff68aeda65f345fef50b8b314184a7": self.result['data']['Initiate']['FormDataJson'][2]['value'],
                "b36100fc06308abbd5f50127d661f41e": self.result['data']['Initiate']['FormDataJson'][3]['value'],
                "c693ed0f20e629ab321514111f3ac2cb": self.result['data']['Initiate']['FormDataJson'][4]['value'],
                "91b48acca5f53c3221b01e5a1cf84f2f": self.result['data']['Initiate']['FormDataJson'][5]['value'],
                "9c96c042296de3e31a2821433cfec228": self.result['data']['Initiate']['FormDataJson'][6]['value'],
                "fd5e5be7f41a011f01336afc625d2fd4": self.result['data']['Initiate']['FormDataJson'][7]['value'],
                "c4b48d92f1a086996b0b2dd5f853c9f7": self.result['data']['Initiate']['FormDataJson'][8]['value']
            }, ensure_ascii=False),
            "extend": json.dumps(
                {
                    "TaskId": self.unCompletedTaskID,
                    "title": self.result['data']['Initiate']['ExtendDataJson']['title'],
                    "content": [
                        {"label": self.result['data']['Initiate']['ExtendDataJson']['content'][0]['label'],
                         "value": self.title},
                        {"label": self.result['data']['Initiate']['ExtendDataJson']['content'][1]['label'],
                         "value": self.result['data']['Initiate']['ExtendDataJson']['content'][1]['value']}]
                }, ensure_ascii=False)
        }
        response = self.sess.post(url=url, params=param, data=data)
        if response.json()['code'] == 0:
            return {
                "username": self.getName(),
                "msg": "打卡成功!"
            }
        else:
            return {
                "username": self.getName(),
                "msg": "打卡失败！",
                "error": response.json()['msg'],
                "code": response.status_code
            }


class YiBan_Login:
    def __init__(self, dic):
        self.dic = dic
        self.sess = requests.Session()

    def getName(self):
        if self.dic['remark'] != "":
            return self.dic['remark']
        else:
            return self.dic['account']

    def encryptPassword(self, pwd):
        # 密码加密
        PUBLIC_KEY = '''-----BEGIN PUBLIC KEY-----
            MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6aTDM8BhCS8O0wlx2KzA
            Ajffez4G4A/QSnn1ZDuvLRbKBHm0vVBtBhD03QUnnHXvqigsOOwr4onUeNljegIC
            XC9h5exLFidQVB58MBjItMA81YVlZKBY9zth1neHeRTWlFTCx+WasvbS0HuYpF8+
            KPl7LJPjtI4XAAOLBntQGnPwCX2Ff/LgwqkZbOrHHkN444iLmViCXxNUDUMUR9bP
            A9/I5kwfyZ/mM5m8+IPhSXZ0f2uw1WLov1P4aeKkaaKCf5eL3n7/2vgq7kw2qSmR
            AGBZzW45PsjOEvygXFOy2n7AXL9nHogDiMdbe4aY2VT70sl0ccc4uvVOvVBMinOp
            d2rEpX0/8YE0dRXxukrM7i+r6lWy1lSKbP+0tQxQHNa/Cjg5W3uU+W9YmNUFc1w/
            7QT4SZrnRBEo++Xf9D3YNaOCFZXhy63IpY4eTQCJFQcXdnRbTXEdC3CtWNd7SV/h
            mfJYekb3GEV+10xLOvpe/+tCTeCDpFDJP6UuzLXBBADL2oV3D56hYlOlscjBokNU
            AYYlWgfwA91NjDsWW9mwapm/eLs4FNyH0JcMFTWH9dnl8B7PCUra/Lg/IVv6HkFE
            uCL7hVXGMbw2BZuCIC2VG1ZQ6QD64X8g5zL+HDsusQDbEJV2ZtojalTIjpxMksbR
            ZRsH+P3+NNOZOEwUdjJUAx8CAwEAAQ==
            -----END PUBLIC KEY-----'''
        cipher = PKCS1_v1_5.new(RSA.importKey(PUBLIC_KEY))
        cipher_text = base64.b64encode(cipher.encrypt(bytes(pwd, encoding="utf8")))
        return cipher_text.decode("utf-8")

    def login(self):
        url = "https://mobile.yiban.cn/api/v4/passport/login"
        param = {
            "device": "HUAWEI",
            "v": "5.0.1",
            "mobile": int(self.dic['account']),
            "password": self.encryptPassword(self.dic['password']),
            "token": "",
            "ct": "2",
            "identify": "0",
            "sversion": "25",
            "app": "1",
            "apn": "wifi",
            "authCode": "",
            "sig": "934932a8993b5e23"
        }
        header = {
            'Origin': 'https://mobile.yiban.cn',
            'User-Agent': 'YiBan/5.0.1 Mozilla/5.0 (Linux; Android 7.1.2; V1938T Build/N2G48C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.70 Safari/537.36',
            'Referer': 'https://mobile.yiban.cn',
            'AppVersion': '5.0.1'
        }
        response = self.sess.post(url=url, params=param, headers=header).json()
        if response['response'] == 100:
            self.access_token = response['data']['access_token']
            time.sleep(0.1)
            return {
                "msg": "登录成功"
            }
        else:
            return {
                "账号": self.getName(),
                "msg": "登录失败！"
            }


def YiBan_post(data):
    username = data['username']
    password = data['password']
    submit = data['submit']
    c6 = submit['c6']
    if c6 == "是":
        # print("走进了是")
        c1 = submit['c1']
        c2 = submit['c2']
        c3 = submit['c3']
        c5 = submit['c5']
        c8 = submit['c8']
        location_longitude = submit['location_longitude']
        location_latitude = submit['location_latitude']
        location_address = submit['location_address']
        post = '{"xmqkb":{"id":"52a67a007e304439017ee6442066494d"},' \
               f'"c1":"{c1}",' \
               f'"c2":"{c2}",' \
               f'"c3":"{c3}",' \
               f'"c5":"{c5}",' \
               f'"c6":"{c6}",' \
               f'"c8":"{c8}",' \
               f'"type":"YQSJSB",' \
               f'"location_longitude":{location_longitude},' \
               f'"location_latitude":{location_latitude},' \
               f'"location_address":"{location_address}"' \
               '}'
    else:
        # print("走进了否")
        c1 = submit['c1']
        c2 = submit['c2']
        c3 = submit['c3']
        c5 = submit['c5']
        c7 = submit['c7']
        c8 = submit['c8']
        location_longitude = submit['location_longitude']
        location_latitude = submit['location_latitude']
        location_address = submit['location_address']
        post = '{"xmqkb":{"id":"52a67a007e304439017ee6442066494d"},' \
               f'"c1":"{c1}",' \
               f'"c2":"{c2}",' \
               f'"c3":"{c3}",' \
               f'"c5":"{c5}",' \
               f'"c6":"{c6}",' \
               f'"c7":"{c7}",' \
               f'"c8":"{c8}",' \
               f'"type":"YQSJSB",' \
               f'"location_longitude":{location_longitude},' \
               f'"location_latitude":{location_latitude},' \
               f'"location_address":"{location_address}"' \
               '}'

    accounts = {
        "account": username,  # 登陆用的手机号
        "password": password,  # 登陆密码
        "remark": "111",
        # "mail": ""
    }
    # print(post)
    try:
        yiBan = YiBan(accounts, post)
        return yiBan.login()
    except Exception as e:
        if type(e) == requests.exceptions.ConnectionError:
            return {
                "msg": "不在易班打卡时间内"
            }
        else:
            return {
                "msg": "未知错误,请找管理员"
            }


def YiBan_login(data):
    username = data['username']
    password = data['password']
    accounts = {
        "account": username,  # 登陆用的手机号
        "password": password,  # 登陆密码
        "remark": "111",
        # "mail": ""
    }

    yiBan_login = YiBan_Login(accounts)
    return yiBan_login.login()


# if __name__ == '__main__':
#     data = {
#         "username": "18565242473",
#         "password": "Zhangyue1221",
#         "submit": {
#             "xmqkb":
#                 {"id": "52a67a007e304439017ee6442066494d"},
#             "c1": "正常",
#             "c2": "无上述症状",
#             "c3": "否",
#             "c5": "绿色",
#             "c6": "是",
#             "c8": "茂名市 茂南区 官渡街道 官渡二路 139号",
#             "type": "YQSJSB",
#             "location_longitude": 110.92235,
#             "location_latitude": 21.679371,
#             "location_address": "茂名市 茂南区 官渡街道 官渡二路 139号"
#         }
#     }
#     print(YiBan_post(data))
