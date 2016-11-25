# EmailVerifyController #
# verify() #
## 邮箱验证验证接口 ## 
### 接口地址
```
.../verification/emailverify/verify
```
### 接口格式
### 调用

```
接收方式        GET
```

```
.../verification/emailverify/verify
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