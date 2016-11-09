# SecurityController #
# questionlist()
## 获取密保问题下拉列表
### 接口地址


```
.../public/personal/securitylist
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/securitylist
```

###### Json数据格式
```
data

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    dic_id      dic_id
                    content     content
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
# addsecurity() #
## 添加维护密保问题接口 ## 
### 接口地址


```
.../public/personal/security/add
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/security/add
```

###### Json数据格式
```
data
user_id           user_id
question1         question1
answer1           answer1
question2         question2
answer2           answer2
question3         question3
answer3           answer3

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          设置成功
)
```

```
失败
callback(
code          111
data          ""
msg           设置失败
)
```

###### Code值含义

```
000           设置成功
112           用户id不能为空
```