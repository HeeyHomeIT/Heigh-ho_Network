# AuthenticationController #
# index() #
## 身份认证实名信息接口


### 接口地址


```
.../personal/safe/auth
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/safe/auth
```

###### Json数据格式
```
data
user_id             user_id        

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    bankcard        bankcard
                    realname        realname
                    idcard          idcard
                    mobile          mobile
             }
msg          ""
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
111           身份尚未验证

```
# cardverify() #
## 身份认证实名认证接口


### 接口地址


```
.../personal/safe/authverify
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/safe/authverify
```

###### Json数据格式
```
data
user_id             user_id        
name                name
idcard              idcard
bankcard            bankcard
phone               phone
captcha             captcha

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    bankcard        bankcard
                    realname        realname
                    idcard          idcard
                    mobile          mobile
             }
msg          ""
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
000           信息校验成功
111           抱歉，银行卡号校验不一致
201           银行卡号为空
202           真实姓名为空
203           银行卡号不正确
204           真实姓名包含特殊字符
205           身份证不正确
210           没有信息

```
