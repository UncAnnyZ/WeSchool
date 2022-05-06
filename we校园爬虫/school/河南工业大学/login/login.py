import re
import base64

import requests

from lib import RSAJS
from lib.hex2b64 import HB64
from pyquery import PyQuery as pq


def login(username, password, session: requests.Session):

    def login(username, password, session: requests.Session):
        import time
        import json
        try:
            nowTime = str(round(time.time() * 1000))
            res = session.get(
                'https://jwglxt.haut.edu.cn/jwglxt/zfcaptchaLogin?type=resource&instanceId=zfcaptchaLogin&name=zfdun_captcha.js')
            # print(res.text)
            # print(res.text)
            rtk = re.findall('rtk:\'(.*)\'', res.text)[0]

            url = f'https://jwglxt.haut.edu.cn/jwglxt/zfcaptchaLogin?type=refresh&rtk={rtk}&time={nowTime}&instanceId=zfcaptchaLogin'
            a = json.loads(session.get(url).text)

            id = a['si']
            imtk = a['imtk']

            url = f'https://jwglxt.haut.edu.cn/jwglxt/zfcaptchaLogin?type=image&id={id}&imtk={imtk}&t={nowTime}&instanceId=zfcaptchaLogin'
            res = session.get(url)
            open("zfcaptchaLogin.png"+username, 'wb').write(res.content)

            import json
            import random
            import time
            from io import BytesIO

            from PIL import Image

            class ZfCaptchaRecognit(object):
                def __init__(self, img_stream):
                    with open(img_stream, 'rb') as f:
                        a = f.read()
                    obj = BytesIO(bytes(a))

                    self.img = Image.open(obj)

                def _get_xy(self):
                    # 计算 x,y 值
                    def _is_dividing_line(img_l, x, y):
                        for n in range(50):
                            # 寻找纵向连续50个像素点均是 X=x 比 X=x+1 颜色深
                            if y + n >= img_l.size[1] or x >= img_l.size[0] - 1:
                                return False
                            if img_l.getpixel((x + 1, y + n)) - img_l.getpixel((x, y + n)) < 2:
                                return False
                        return True

                    img_l = self.img.convert("L")
                    for x in range(img_l.size[0]):
                        for y in range(img_l.size[1]):
                            if _is_dividing_line(img_l, x, y):
                                return x, y

                def generate_payload(self):
                    base_x = 950
                    X, Y = self._get_xy()
                    payloads = [
                        {"x": base_x + random.randint(5, 20), "y": random.randint(150, 190), "t": int(time.time() * 1000)}]
                    for i in range(random.randint(15, 30)):
                        # 在上一个参数基础下浮动
                        last_payload = payloads[-1].copy()
                        payloads[0]["x"] += random.choice([0] * 8 + [1, -1] * 2 + [2, -2])
                        last_payload["t"] += random.randint(1, 20)
                        last_payload["y"] += random.choice([0] * 8 + [1, -1] * 2 + [2, -2])
                        payloads.append(last_payload)

                    payloads[-1]["x"] = base_x + random.randint(10, 20) + X
                    return json.dumps(payloads)
            extend = "eyJhcHBOYW1lIjoiTmV0c2NhcGUiLCJ1c2VyQWdlbnQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTkuMC40ODQ0LjUxIFNhZmFyaS81MzcuMzYiLCJhcHBWZXJzaW9uIjoiNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85OS4wLjQ4NDQuNTEgU2FmYXJpLzUzNy4zNiJ9"
            try:
                captcha = ZfCaptchaRecognit("zfcaptchaLogin.png"+username)
                import os
                if os.path.exists("zfcaptchaLogin.png"+username):
                    os.remove("zfcaptchaLogin.png"+username)


                mt = base64.b64encode(str(captcha.generate_payload()).encode('utf-8'))
            except Exception as e:
                return {
                    "msg": "登录失败,请找管理员",
                    "error": str(e),
                    "code": "704"
                }
                mt = ''
            data = {
                "type": "verify",
                "rtk": rtk,
                "time": nowTime,
                "mt": mt,
                "instanceId": "zfcaptchaLogin",
                "extend": extend
            }
            res = session.post('https://jwglxt.haut.edu.cn/jwglxt/zfcaptchaLogin', data=data)
            # print(res.text)
            if json.loads(res.text)['status'] == 'fail':
                return res
        except Exception as e:
            return {
                "msg": "河南工业大学有问题",
                "name": "未知",
                "code": 707,
                "error": str(e)
            }

        res = session.get('https://jwglxt.haut.edu.cn/jwglxt/xtgl/login_getPublicKey.html?time=' + nowTime)
        res_json = json.loads(res.text)
        modulus = res_json['modulus']
        exponent = res_json['exponent']
        rsa = RSAJS.RSAKey()
        rsa.setPublic(HB64().b642hex(modulus), HB64().b642hex(exponent))
        mm = HB64().hex2b64(rsa.encrypt(password))
        url = f'https://jwglxt.haut.edu.cn/jwglxt/xtgl/login_slogin.html?time=' + nowTime
        res = session.get(url)
        doc = pq(res.text)
        csrf = doc('#csrftoken').attr('value')
        data = {
            "csrftoken": csrf,
            "language": "zh_CN",
            "yhm": username,
            "mm": mm
        }
        res = session.post('https://jwglxt.haut.edu.cn/jwglxt/xtgl/login_slogin.html?time=' + nowTime, data=data)
        return res

    # result=''
    result = login(username, password, session)
    while True:
        if 'index_initMenu.html' in result.url:
            break
        elif "用户名或密码不正确" in result.text:
            return {
                "msg": '账号密码错误',
                "code": "703"
            }
        elif "fail" in result.text:
            result=login(username,password,session)
        else:
            return {
                "msg": "异常",
                "code": "707"
            }
    return {
        "msg": 'welcome'
    }
