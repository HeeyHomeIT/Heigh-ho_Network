# GetloginrecordController #
# index #
## 登录历史信息接口


### 接口地址


```
.../public/personal/loginhistory
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/loginhistory
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
                    id                     id
                    login_time             login_time         
                    login_ip               login_ip
                    login_ip               login_ip
                    login_browser          login_browser
                    login_way              login_way
                    login_device           login_device
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
112           用户id不能为空
117           信息不存在
```