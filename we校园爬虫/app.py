from flask import Flask, request
import json
from school.茂名职业技术学院.main import login_MZ,getData_MZ
from school.茂名农林科技职业技术学院.main import login_NL,getData_NL
from school.广东科技学院.main import login_GKY,getData_GKY
from school.广东交通职业技术学院.main import login_GDJT
from school.浙江工商大学杭州商学院.main import login_ZJGSHZ,getData_ZJGSHZ
from school.广东石油化工学院.main import upData_GY, getData_GY
from school.嘉应学院.main import login_JY,getData_JY
from school.广东理工学院.main import login_GDLG,getData_GDLG
from school.广东医科大学.main import login_GYK,getData_GYK
from school.河南工业大学.main import login_HNGY,getData_HNGY
from school.南通大学杏林学院.main import login_NTXL,getData_NTXL
from another.physical import physical_Default,physical_Linear
from another.YiBan import YiBan_login,YiBan_post
from school.广东培正学院.main import login_GDPZ , getData_GDPZ
# from another.CWJ import YiBan_CWJ

# from another.chemical import chemical_chemistry,chemical_chemical_two,chemical_F_value

# import logging

app = Flask(__name__)


@app.route('/login_<school_name>', methods=['POST'])
def login(school_name):
    try:
        data = json.loads(request.data)
        print(type(data))
        print(data)
        username = data['username']
        password = data['password']
        return eval("login_" + school_name)(username, password)
    except Exception as e:
        return {
            "msg": "没有此学校,或者方法错误",
            "error": str(e),
            "code": "707"
               }



@app.route('/getData_<school_name>', methods=['POST'])
def getData(school_name):
    try:
        data = json.loads(request.data)
        username = data['username']
        password = data['password']
        other = data["other"]
        return eval("getData_" + school_name)(username, password, other)
    except Exception as e:
        return {
            "msg": "没有此学校,或者方法错误",
            "error": str(e),
            "code": "802"
        }


@app.route('/upData_<school_name>',methods=['POST'])
def upData(school_name):
    try:
        data = json.loads(request.data)
        return eval("upData_" + school_name)(data)
    except:
        return {"msg": "没有此学校,或者方法错误"}



@app.route('/physical_<physical_name>',methods=['POST'])
def get_physical_data(physical_name):
    try:
        data = json.loads(request.data)
        return eval("physical_"+physical_name)(data)
    except:
        return {"msg": "物理有问题"}

# @app.route('/YiBan_<yiban_name>',methods =['POST'] )
# def Yiban(yiban_name):
#     try:
#         data = json.loads(request.data)
#         return eval("YiBan_"+yiban_name)(data)
#     except:
#         return {"msg":"易班打卡有问题"}
# @app.route('/chemical_<chemical_name>',methods=['POST'])
# def chemical(chemical_name):
#     try:
#         data = json.loads(request.data)
#         return eval("chemical_"+chemical_name)(data)
#
#     except:
#         return{"msg":"化学有问题"}



if __name__ == '__main__':
    app.run(host='0.0.0.0')

# if __name__ != '__main__':
#     # 如果不是直接运行，则将日志输出到 gunicorn 中
#     gunicorn_logger = logging.getLogger('gunicorn.error')
#     app.logger.handlers = gunicorn_logger.handlers
#     app.logger.setLevel(gunicorn_logger.level)
