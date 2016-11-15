# AccountconfirmController #
# confirm() #
## 用户确认账号接口


### 接口地址


```
.../public/verification/confirm
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/verification/confirm
```

###### Json数据格式
```
data
user_id             user_id
account             account

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                     user_name     user_name
                     user_phone    user_phone 
                     user_email    user_email
             }
msg          成功
)
```

```
失败
callback(
code          111
data          ""
msg           失败
)
```
###### Code值含义

```
114            账号不存在         
```
# PhoneVerifyController #
# index()
## 获取手机号接口
### 接口地址

```
.../public/verification/phoneverify
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/verification/phoneverify
```

###### Json数据格式
```
data
user_id           user_id

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    userinfo_phone      userinfo_phone
             }
msg          成功
)
```

```
失败
callback(
code          111
data          ""
msg           失败
)
```
# verify() #
## 手机验证验证接口 ## 
### 接口地址


```
.../public/verification/phoneverify/verify
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/verification/phoneverify/verify
```

###### Json数据格式
```
data
user_id           user_id
phone             phone       //手机号
captcha           captcha     //验证码

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    flag    flag     //唯一标识符
             }
msg          成功
)
```

```
失败
callback(
code          111
data          ""
msg           失败
)
```

###### Code值含义

```
000           成功
118           验证码不正确
119           验证码超时
126           用户和手机号不匹配
```
# EmailVerifyController #
# index()
## 获取邮箱接口
### 接口地址


```
.../public/verification/emailverify
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/verification/emailverify
```

###### Json数据格式
```
data
user_id           user_id

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    userinfo_email      userinfo_email
             }
msg          成功
)
```

```
失败
callback(
code          111
data          ""
msg           失败
)
```
# verify() #
## 邮箱验证验证接口 ## 
### 接口地址
```
.../public/verification/emailverify/verify
```
### 接口格式
### 调用

```
接收方式        GET
```

```
.../public/verification/emailverify/verify
```

###### Json数据格式
```
data
user_id           user_id
email             email       //邮箱
captcha           captcha     //验证码

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    flag    flag     //唯一标识符
             }
msg          成功
)
```

```
失败
callback(
code          111
data          ""
msg           失败
)
```

###### Code值含义

```
000           成功
128           邮箱格式不正确
118           验证码不正确
119           验证码超时
126           用户和邮箱不匹配
```
# ResetPasswordController #
# resetpassword() #
## 重置密码接口


### 接口地址


```
.../public/resetpassword
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/resetpassword
```

###### Json数据格式
```
data
user_id             user_id
new_password        new_password
flag                flag

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          成功
)
```

```
失败
callback(
code          111
data          ""
msg           失败
)
```

###### Code值含义

```
000            成功
112            新密码不能为空
114            用户不存在
126            信息不匹配
```