import ddddocr
import time


###识别技术
def code_ocr(username,session):
    status_code = 0
    code = ''
    cookies = ''
    nowTime = str(round(time.time() * 1000))
    try:
        image_url = 'GKY_code.png'+username
        res = session.get('http://gkwst8.gjob.info:9903/kaptcha?time=' + nowTime)
        cookies = res.cookies.items()
        status_code = res.status_code
        if res.status_code == 200:
            open(image_url, 'wb').write(res.content)  # 将内容写入图片
        del res
        image = open(image_url, 'rb')
        ocr = ddddocr.DdddOcr()
        code = ocr.classification(image.read())
        return code, cookies, nowTime
    except:
        print('错误,验证码的返回值为', status_code)
        print("广东科技学院验证码有问题")
        return code, cookies, nowTime
