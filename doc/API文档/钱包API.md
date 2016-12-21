# WalletController #
# mycards() #
##我的银行卡接口


### 接口地址


```
.../mybankcards
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../mybankcards
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
                    bankcardno     bankcardno
                    bankname       bankname
                    cardtype       cardtype
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
131           未添加银行卡

```
# apply() #
##申请提现接口


### 接口地址


```
.../withdraw/apply
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../withdraw/apply
```

###### Json数据格式
```
data
user_id             user_id    
money               money
bankcardno          bankcardno
bankname            bankname
cardtype            cardtype

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          "申请提现成功，银行处理中"
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
```
