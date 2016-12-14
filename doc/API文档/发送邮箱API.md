# MailController
# emailsend() #
## 发送邮箱验证码接口 ## 


### 接口地址


```
.../sendmail
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../sendmail
```

###### Json数据格式
```
data
emial             email

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    email    email     //邮箱号
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
128           邮箱格式不正确
127           每60秒内只能发送一次邮箱验证码，请稍后重试
```