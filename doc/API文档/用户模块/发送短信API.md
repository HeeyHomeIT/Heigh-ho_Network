# SmsController #
# sms_send()
## 发送短信验证码接口 ## 


### 接口地址


```
.../sendsms
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../sendsms
```

###### Json数据格式
```
data
必选参数
phone             phone               //手机号

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    phone    phone     //手机号
                    yzmsj    yzmsj     //短信发送时间
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
120           发送失败，短信发送过于频繁
```