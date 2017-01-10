# CollectimgController #
# collect()
## 收藏全景图接口


### 接口地址


```
.../panorama/collect
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../panorama/collect
```

###### Json数据格式
```
data
user_id           user_id        //用户id
panorama_id       panorama_id    //全景图id

callback          callback
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
000           收藏成功
111           收藏失败
135           已经收藏过
```