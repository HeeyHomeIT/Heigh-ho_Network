# BannerController #
# index() #
## 首页banner图信息接口


### 接口地址


```
.../banner
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../banner
```

###### Json数据格式
```
data                ""

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    banner_id     banner_id     //图片id
                    img           img           //图片路径
                    img_path      img_path      //链接
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