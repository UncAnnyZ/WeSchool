from another.conwork import encodeInp
from school.广东培正学院.code.code import code_ocr


def login(xh, pwd, session):
    try:
        code = code_ocr(xh, session)
        import os
        if os.path.exists("GDPZ_code"+xh+'.png'):
            os.remove("GDPZ_code"+xh+'.png')
        account = encodeInp(xh)
        passwd = encodeInp(pwd)
        encoded = account + "%%%" + passwd
        data = {
            "userAccount": account,
            "userPassword": passwd,
            "encoded": encoded,
            "RANDOMCODE" : code
        }

        # session.get('http://qzjw.peizheng.edu.cn/jsxsd/')
        res = session.post('http://qzjw.peizheng.edu.cn/jsxsd/xk/LoginToXk', data=data)
        if "用户名或密码错误" in res.text:
            return {
                "msg": "用户名或密码错误",
                "code": "703"

            }
        elif "验证码输入错误" in res.text:
            return "验证码输入错误"
        elif 'xsMain.jsp' in res.url:
            return {
                "msg": "welcome",
            }
        else:
            return {
                "msg":"错误,找管理员",
                "code":"707"
            }
    except Exception as e:
        return {
            "msg": "错误,找管理员",
            "error":str(e),
            "code": "707"
        }
