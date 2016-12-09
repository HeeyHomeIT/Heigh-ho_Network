# EditPhoneController #
# verify()
## 绑定手机身份验证接口
### 接口地址

```
.../personal/safe/phoneverify
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/safe/phoneverify
```

###### Json数据格式
```
data
user_id           user_id
oldphone          oldphone
captcha           captcha

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    flag      flag
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
000           验证成功
118           验证码不正确
119           验证码超时
126           手机号码不匹配
```
# edit() #
## 修改手机号码接口 ## 
### 接口地址


```
.../personal/safe/phonechange
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/safe/phonechange
```

###### Json数据格式
```
data
user_id           user_id
flag              flag
newphone          newphone    //手机号
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
                    newphone    newphone
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
126           信息不匹配
```