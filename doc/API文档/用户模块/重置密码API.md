# ResetPasswordController #
# smsreset() #
## 手机邮箱验证重置密码接口


### 接口地址


```
.../public/smsresetpassword
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/smsresetpassword
```

###### Json数据格式
```
data
user_id             user_id
new_password        new_password
flag                flag
二选一
phone               phone
email               email

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
# mbreset() #
## 密保问题验证重置密码接口


### 接口地址


```
.../public/mbresetpassword
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/mbresetpassword
```

###### Json数据格式
```
data
user_id             user_id
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
112            参数不能为空
```