import ddddocr
import time


###识别技术
def code_ocr(username, session):
    try:
        image_url = 'GDPZ_code'+username+'.png'
        res = session.get('http://qzjw.peizheng.edu.cn/jsxsd/verifycode.servlet')
        # 不知道啥原因。
        cookies = res.cookies.items()
        # print(res.content)
        if res.status_code == 200:
            open(image_url, 'wb').write(res.content)  # 将内容写入图片
        del res
        image = open(image_url, 'rb')
        ocr = ddddocr.DdddOcr()
        code = ocr.classification(image.read())
        image.close()
        return code
    except:
        return "验证码有问题"
