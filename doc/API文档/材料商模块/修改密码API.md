# EditPasswordController #

# smsedit() #
## 短信验证接口 ## 
### 接口地址


```
.../editpassword/smsedit
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../editpassword/smsedit
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
# EditPasswordController #

# initialpwd() #
## 登录密码验证接口 ## 
### 接口地址


```
.../editpassword/initialpwd
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../editpassword/initialpwd
```

###### Json数据格式
```
data
user_id           user_id
oldpassword       oldpassword

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
115           原始密码不正确
```
# editpassword() #
## 修改密码接口


### 接口地址


```
.../editpassword
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../editpassword
```

###### Json数据格式
```
data
user_id             user_id
flag                flag
new_password        new_password

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
114            修改失败，用户不存在
126            信息不匹配
```