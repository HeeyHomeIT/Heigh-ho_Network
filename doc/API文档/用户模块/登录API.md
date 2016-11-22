# LoginController #
# login
## 用户登录接口

### 接口地址

```
.../public/login/login
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/login/login
```

###### Json数据格式
```
data
account             account
password            password
login_ip            login_ip
login_browser       login_browser
login_way           login_way
login_device        login_device

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    user_id         user_id         //ID
                    user_name       user_name       //用户名
                    user_phone      user_phone       
                    user_email      user_email
                    user_type       user_type       //用户类型
                    nickname        nickname
                    shop_id         shop_id
             }
msg          登录成功
)
```

```
失败
callback(
code          111
data          ""
msg           登录失败
)
```

###### Code值含义

```
000           登陆成功
112           登录失败，账户和密码不能为空
114           登陆失败，账户不存在
115           登陆失败，密码不正确
```