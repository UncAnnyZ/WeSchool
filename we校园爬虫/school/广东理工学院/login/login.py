from another.conwork import encodeInp
def login(xh, pwd, session):
    try:

        account = encodeInp(xh)
        passwd = encodeInp(pwd)
        encoded = account + "%%%" + passwd
        data = {
            "userAccount": xh,
            "userPassword": "",
            "encoded": encoded
        }

        session.get('http://39.108.86.184:81/jsxsd/')
        res = session.post('http://39.108.86.184:81/jsxsd/xk/LoginToXk', data=data)
        if "用户名或密码错误" in res.text:
            return {
                "msg": "用户名或密码错误",
                "code": "703"

            }
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
