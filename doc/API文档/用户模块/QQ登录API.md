# QqLoginController #
# qqlogin()
## 注册接口

### 接口地址

```
.../qqlogin
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../qqlogin
```

###### Json数据格式
```
data

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
```