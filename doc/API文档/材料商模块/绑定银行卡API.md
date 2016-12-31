# BankCardController #
# getname() #
##获取持卡人姓名接口


### 接口地址


```
.../bankcard/getname
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../bankcard/getname
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
                    user_id         user_id
                    realname        realname
                    idcardno        idcardno
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
133           还没有进行实名认证

```
# getcardtype() #
##获取银行卡类型接口


### 接口地址


```
.../bankcard/getcardtype
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../bankcard/getcardtype
```

###### Json数据格式
```
data
user_id             user_id   
realname            realname
idcardno            idcardno
bankcardno          bankcardno

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    user_id         user_id
                    idcardno        idcardno        //身份证号
                    bankcardno      bankcardno      //银行卡号
                    realname        realname        //持卡人姓名
                    bankname        bankname        //银行名
                    cardtype        cardtype        //银行卡类型
                    banklogo        banklogo        //银行logo
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
200           银行卡校验不正确
201           银行卡号为空
202           银行卡号不正确
210           没有信息

```
# cardverify() #
## 银行卡四元素认证接口


### 接口地址


```
.../bankcard/cardverify
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../bankcard/cardverify
```

###### Json数据格式
```
data
user_id             user_id        
realname            realname
idcardno            idcardno
bankcardno          bankcardno
bankname            bankname
cardtype            cardtype
phone               phone
captcha             captcha
banklogo            banklogo

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    bankcard            bankcard
                    realname            realname
                    phone               phone
                    bankname            bankname
                    cardtype            cardtype
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
