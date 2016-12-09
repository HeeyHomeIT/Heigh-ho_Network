# MyshopController #
# index() #
## 店铺风格服务标签列表信息接口


### 接口地址


```
.../personal/myshop/stylelist
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myshop/stylelist
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
                    stylename      stylename
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