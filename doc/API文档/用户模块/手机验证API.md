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
# send() #
## 手机验证获取验证码接口 ## 


### 接口地址


```
.../public/verification/phoneverify/send
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/verification/phoneverify/send
```

###### Json数据格式
```
data
user_id           user_id
user_phone        user_phone  //手机号

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    phone    phone     //手机号
                    yzmsj    yzmsj     //短信发送时间
             }
msg          发送成功
)
```

```
失败
callback(
code          111
data          ""
msg           发送失败
)
```

###### Code值含义

```
000           发送成功
129           手机格式不正确
120           发送失败，短信发送过于频繁
126           用户和手机号不匹配
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