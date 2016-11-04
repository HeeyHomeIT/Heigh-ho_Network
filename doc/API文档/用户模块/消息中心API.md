# MessageController #
# index #
## 读取消息信息接口


### 接口地址


```
.../public/personal/message
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/message
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
                    userinfo_nickname      userinfo_nickname
                    msgcontent             msgcontent
                    msgtype                msgtype
                    sendtime               sendtime
                    isread                 isread
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
117           信息找不到
```
# del #
## 删除消息接口


### 接口地址


```
.../public/personal/message/del
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/message/del
```

###### Json数据格式
```
data
id                  id

callback            callback
```
### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
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
000            删除成功
112            id不能为空
111            删除失败
```