# AccountconfirmController #
# account() #
## 确认账号接口


### 接口地址


```
.../verification/confirm
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../verification/confirm
```

###### Json数据格式
```
data
account             account

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                 user_id        user_id
                 user_name      user_name
                 user_phone     user_phone
                 user_email     user_email
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
```