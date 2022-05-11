# RC4的Python实现
r=open('RC4密文.txt', 'r+', encoding='utf-8')
def ini_S(R):  # 初始化S
    S = [x for x in range(256)]  # 列表推导式，初始化状态向量S
    j = 0
    # 进行初始置换，位于S[i]的字节与S数组中的另一个字节（由R[i]决定）进行交换
    for i in range(256):
        j = (j + S[i] + R[i]) % 256
        # 进行值交换
        temp = S[i]
        S[i] = R[i]
        R[i] = temp

    return S


def gen_R(key):  # 生成辅助表R
    T = bytes(key, encoding='utf-8')  # 将utf-8的字节码解码成Python默认的unicode的字符串
    T = list(T)  # 转换成列表类型
    #print('private key:', T)  # 输出密钥
    len_key = len(T)  # 确定密钥的长度
    R = [T[i % len_key] for i in range(256)]  # 对T进行复制和填充，并保存在R数组中

    return R


def stream_k(S, length):
    i = 0
    j = 0
    Sh = []  # Sh保存流
    length = int(length)  # 保存明文的长度或者密文长度的一半
    for i in range(length):
        i = (i + 1) % 256  # 如果用完256个位置，再从S[i]开始
        j = (j + S[i]) % 256  # 选择S[i]与S的另一个字节
        # 对S[i]和s的另一字节进行交换
        temp = S[i]
        S[j] = S[j]
        S[i] = temp
        h = (S[j] + S[i]) % 256  # 防溢出操作
        k = S[h]
        Sh.append(k)  # 将k在Sh的末尾添加新的对象
    return Sh


choose = input('1为加密，2为解密:')  # 1为加密，2为解密
# 加密操作
if choose == '1':
    key = input('请输入密钥:')  # key保存密钥
    R = gen_R(key)  # R保存key的辅助表
    S = ini_S(R)  # S的初始化
    plaintext=input('请输入要加密明文:')#plaintext保存明文
    ciphertext = ''  # ciphertext保存密文
    Sh = stream_k(S, len(plaintext))  # 生成明文的流
    # Sh与明文的下一个字节进行异或运算
    for i in range(len(plaintext)):
        ciphertext = ciphertext + '%02x' % (Sh[i] ^ ord(plaintext[i]))  # 进行异或运算并保存在ciphertext
    print('经加密得到密文:', ciphertext)  # 输出密文
    print(f'''密文数据:{ciphertext}已写入RC4密文.txt''')
    r.write(ciphertext)
# 解密操作
if choose == '2':
    key = input('输入密钥:')  # key保存密钥
    K = gen_R(key)  # K保存key的辅助表
    S = ini_S(K)  # S的初始化
    for ciphertext in r:
        ciphertext = ciphertext
    ciphertext = ciphertext  # plaintext保存明文
    print(f'''已从RC4密文.txt读取完密文数据:{ciphertext}''')
    plaintext = ''  # plaintext保存明文
    Sh = stream_k(S, len(ciphertext) / 2)  # 生成密文的流
    # Sh与密文的下一个字节进行异或运算
    for i in range(int(len(ciphertext) / 2))