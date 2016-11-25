# EditMailController #
# verify()
## 绑定邮箱身份验证接口
### 接口地址

```
.../personal/safe/emailverify
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/safe/emailverify
```

###### Json数据格式
```
data
user_id           user_id
phone             phone
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
126           邮箱不匹配
```
# edit() #
## 修改邮箱接口 ## 
### 接口地址


```
.../personal/safe/emailchange
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/safe/emailchange
```

###### Json数据格式
```
data
user_id           user_id
flag              flag
newemail          newemail       //邮箱
captcha           captcha        //验证码

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    newemail    newemail
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