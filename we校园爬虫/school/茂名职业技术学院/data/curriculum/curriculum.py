import json
def curriculum(session):
    url = "https://jwc.mmpt.edu.cn/"
    curriculums = []  # 课表
    try:
        curriculum_data = {
            "xnm": "2021",  # 年份
            "xqm": "3",  # 学期末
            "kzlx": "ck"  # 参数
        }
        curriculum_html = session.post(
            f'{url}kbcx/xskbcx_cxXsgrkb.html?gnmkdm=N253508&su=2018152414'

            , data=curriculum_data
        )
        curriculum_body = json.loads(curriculum_html.text)
        week_map = {
            "星期一": 1,
            "星期二": 2,
            "星期三": 3,
            "星期四": 4,
            "星期五": 5,
            "星期六": 6,
            "星期日": 7,
        }

        for index in curriculum_body['kbList']:
            s = index['zcd']
            a = s.split(',')
            for i in a:
                m = (i.split('周')[0]).split('-')
                if len(m) < 2:
                    test = {
                        'jcdm': '0' + index['jcs'][0] + '0' + index['jcs'][2],  # 第几节课
                        'jxcdmc': index['xqmc'] + index['cdmc'],
                        'teaxms': index['xm'],
                        'xq': week_map[index['xqjmc']],
                        'zc': int(m[0])
                    }
                    curriculums.append(test)
                else:
                    for h in range(int(m[0]), int(m[1]) + 1):
                        test = {
                            'jcdm': '0' + index['jcs'][0] + '0' + index['jcs'][2],  # 第几节课
                            'jxcdmc': index['xqmc'] + index['cdmc'],
                            'teaxms': index['xm'],
                            'xq': week_map[index['xqjmc']],
                            'zc': h,
                            'kcmc': index['kcmc']
                        }
                        curriculums.append(test)
        return curriculums
    except:
        # print("茂名职业技术学院课表有异常")
        return curriculums