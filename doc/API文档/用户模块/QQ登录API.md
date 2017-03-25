# QqLoginController #
# qqlogin()
## QQ登录接口

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
                    user_id                  user_id                //ID
                    userinfo_nickname        userinfo_nickname      //昵称
             }
msg          登录成功
)
```

```
失败
callback(
code          111
data          {
                    qq_id              qq_id             //qq openid
                    user_nickname      user_nickname     //qq昵称
                    user_head          user_head         //qq头像
              }
msg           登录失败，需要绑定手机号
)
```

###### Code值含义

```
```
# bindingQQLogin()
## QQ绑定账号接口

### 接口地址

```
.../bindingQQ
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../bindingQQ
```

###### Json数据格式
```
data
qq_id              qq_id             //qq openid
user_nickname      user_nickname     //qq昵称
user_head          user_head         //qq头像
phone              phone             //手机号
captcha            captcha           //验证码

callback           callback
```

### 回调
###### Json数据格式
分两种情况
-  1、手机号已经注册过
```
成功
callback(
code         000
data         {
                    user_id                  user_id                //ID
                    user_phone               user_phone
                    userinfo_nickname        userinfo_nickname      //昵称
             }
msg          绑定成功
)
```

```
失败
callback(
code          198
data          ""
msg           绑定失败
)
```
-  2、手机号没注册过
```
成功
callback(
code         000
data         {
                    user_id                  user_id                //ID
                    user_phone               user_phone
                    userinfo_nickname        userinfo_nickname      //昵称
             }
msg          绑定成功，请尽快修改你的密码        
)
```

```
失败
callback(
code          111
data          ""
msg           绑定失败
)
```
###### Code值含义

```
```
# QqLoginController #
# qqcallbackphone()
## 手机登录接口

### 接口地址

```
.../qqphonecallback
```

### 接口格式

### 调用

```
接收方式        GET      POST
```

```
.../qqphonecallback
```

###### Json数据格式
```
data
openid           
nickname          昵称
portrait          头像

callbcak          回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    user_id                  user_id                //ID
                    userinfo_nickname        userinfo_nickname      //昵称
             }
msg          登录成功
)
```

```
失败
callback(
code          111
data          {
                    qq_id              qq_id             //qq openid
                    user_nickname      user_nickname     //qq昵称
                    user_head          user_head         //qq头像
              }
msg           登录失败，需要绑定手机号
)
```

###### Code值含义

```
```
# QqLoginController #
# phoneisregister()
## 手机号是否被注册

### 接口地址

```
.../phoneisregister
```

### 接口格式

### 调用

```
接收方式        GET      POST
```

```
.../phoneisregister
```

###### Json数据格式
```
data
phone             手机号

callbcak          回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   is     是否被注册 true：被注册过 false：未注册过
             }  
msg          ""
)
```

###### Code值含义

```
```