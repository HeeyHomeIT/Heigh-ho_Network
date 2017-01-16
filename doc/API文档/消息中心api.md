# MessageController #
# index() #
## 读取消息信息接口


### 接口地址


```
.../personal/message
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/message
```

###### Json数据格式
```
data
必选参数
user_id             user_id
可选参数 
page                page         //当前页
limit               limit        //每页显示数目

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
                    senduser               senduser
                    msgtitle               msgtitle
                    msgcontent             msgcontent
                    sendtime               sendtime
                    isread                 isread       //0:未读 1:已读
                    total                  total
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
# del() #
## 删除消息接口


### 接口地址


```
.../personal/message/del
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/message/del
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
# isnew() #
## 新消息接口


### 接口地址


```
.../personal/message/isnew
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/message/isnew
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
                    newmsgtotal     newmsgtotal     //新消息数
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
000            有新的消息
111            没有新的消息

```
# read() #
## 消息已读标记接口


### 接口地址


```
.../personal/message/read
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/message/read
```

###### Json数据格式
```
data
msgid               msgid

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
# delall() #
## 清空消息接口


### 接口地址


```
.../personal/message/empty
```

### 接口格式

### 调用

```
接收方式        GET
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
```