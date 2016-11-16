# RegisterController #
# user_register
## 注册接口

### 接口地址

```
.../public/register/user_register
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/register/user_register
```

###### Json数据格式
```
data
phone               phone
password            password
captcha             captcha

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    user_id         user_id        //ID
                    user_name       user_name      //用户名
                    nickname        nickname       //昵称
             }
msg          注册成功
)
```

```
失败
callback(
code          111
data          ""
msg           注册失败
)
```

###### Code值含义

```
000           注册成功
112           注册失败，用户名、密码、验证码不能为空
118           注册失败，短信验证码不正确
113           注册失败，账号已存在
119           注册失败，短信验证码超时
```