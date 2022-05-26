import re
import requests
from bs4 import BeautifulSoup


def curriculum(session):
    try:

        res = session.get('http://qzjw.peizheng.edu.cn/jsxsd/xskb/xskb_list.do').text

        a, _ = re.subn('\r', '', res)
        a, _ = re.subn('\n', '', a)
        a, _ = re.subn('\t', '', a)
        tr = re.findall('<tr.*?>.*?</tr>', a)
        # print(tr[1])

        weekday = {
            '1': '252CA240C2AD458F876BC334D9CEA623',
            '2': '0CF1A2E6925C407584781C8467D75DE0',
            '3': 'BD9DE97C20184A9BA02F8727044D3D59',
            '4': '490ED11A17E94111A4AFF3EB3DB42229',
            '5': '73598095EE214D8CB8260C5F2A8E5203'
        }
        all = []
        arr_all = []
        for section in range(1, 6):
            for day in range(1, 8):
                soup = BeautifulSoup(tr[section], 'html.parser')
                id = f"{weekday[str(section)]}-{day}-2"
                div = soup.find(attrs={'id': id})
                div = str(div).replace(f'<div class="kbcontent" id="{id}" style="display: none;">', '')
                div = div.replace('<font title="老师">', '')
                div = div.replace('</font>', '')
                div = div.replace('<font title="周次(节次)">', '')
                div = div.replace('<font title="教室">', '')
                div = div.replace('</div>', '')
                div = div.replace('</br>', '')
                div = div.split('<br/>')
                arr = []
                for i in range(len(div)):
                    div[i] = div[i].split('<br>')
                    # print(div[i])
                    for j in div[i]:
                        if j != '---------------------' and j != '':
                            arr.append(j)
                # print(arr)
                if len(arr) > 10:
                    n = len(arr) // 3
                    # print(n)
                    A = arr[:n]
                    B = arr[n:2*n]
                    C = arr[2*n:]
                    isarr(A)
                    isarr(B)
                    isarr(C)
                    get(A, day, all)
                    get(B, day, all)
                    get(C, day, all)
                elif len(arr) > 5:
                    n = len(arr) // 2
                    B = arr[:n]
                    C = arr[n:]
                    isarr(B)
                    isarr(C)
                    get(B, day, all)
                    get(C, day, all)
                elif len(arr) > 2:
                    isarr(arr)
                    get(arr, day, all)


        return all
    except Exception as e:
        print(e)
        return []



def get(arr, day, all):
    week = arr[2].split('(周)')[0]
    # print(week)
    a = re.findall('(\d+)-(\d+)', week)
    b = week.split(',')
    c = re.findall('(\d+)-(\d+)', arr[2].split('(周)')[1])[0]
    if len(a) > 0:
        m=a[0]
        for h in range(int(m[0]), int(m[1]) + 1):
            if len(arr) == 3:
                obj = {
                    'jcdm': c[0] + c[1],  # 第几节课
                    'jxcdmc': '',  # 教室
                    'kcmc': arr[0],  # 课程名称
                    'teaxms': arr[1],  # 任课教师
                    'xq': day,  # 星期几
                    'zc': h  # 第几周
                }
                all.append(obj)
            else:
                obj = {
                    'jcdm': c[0] + c[1],  # 第几节课
                    'jxcdmc': arr[3],  # 教室
                    'kcmc': arr[0],  # 课程名称
                    'teaxms': arr[1],  # 任课教师
                    'xq': day,  # 星期几
                    'zc': h  # 第几周
                }
                all.append(obj)
    elif len(b)> 0:
        for h in b:
            obj = {
                'jcdm': c[0] + c[1],  # 第几节课
                'jxcdmc': arr[3],  # 教室
                'kcmc': arr[0],  # 课程名称
                'teaxms': arr[1],  # 任课教师
                'xq': day,  # 星期几
                'zc': h  # 第几周
            }
            all.append(obj)

def isarr(arr):
    if len(arr) == 4:
        if '(' in arr[1]:
            arr[0]=arr[0]+arr[1]
            arr[1]=arr[2]
            arr[2]=arr[3]
            arr.pop()
    else:
        if '(' in arr[1]:
            arr[0]=arr[0]+arr[1]
            arr[1]=arr[2]
            arr[2]=arr[3]
            arr[3]=arr[4]
            arr.pop()
