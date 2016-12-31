# SafeLevelController #
# index() #
## 安全等级信息接口


### 接口地址


```
.../personal/safe
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/safe
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
                  score  score
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
```