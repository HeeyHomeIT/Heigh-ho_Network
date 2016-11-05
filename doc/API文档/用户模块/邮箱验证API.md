# EmailVerifyController #
# index
## 获取邮箱接口
### 接口地址


```
.../public/getbackpassword/emailverify
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/getbackpassword/emailverify
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
# send #
## 邮箱验证获取验证码接口 ## 
### 接口地址


```
.../public/getbackpassword/emailverify/send
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/getbackpassword/emailverify/send
```

###### Json数据格式
```
data
user_id           user_id
email             email     //邮箱

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    email    email     //邮箱
                    yzmsj    yzmsj     //验证码发送时间
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
128           邮箱格式不正确
126           用户和邮箱不匹配
127           每60秒内只能发送一次邮箱验证码，请稍后重试
```
# verify #
## 邮箱验证验证接口 ## 
### 接口地址
```
.../public/getbackpassword/emailverify/verify
```
### 接口格式
### 调用

```
接收方式        GET
```

```
.../public/getbackpassword/emailverify/verify
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