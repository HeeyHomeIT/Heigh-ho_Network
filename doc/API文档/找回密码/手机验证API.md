# PhoneVerifyController #
# verify() #
## 手机验证验证接口 ## 
### 接口地址


```
.../verification/phoneverify
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../verification/phoneverify
```

###### Json数据格式
```
data
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
                    flag       flag     //唯一标识符
                    user_id    user_id
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