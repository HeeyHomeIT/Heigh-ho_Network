# MyshopimgController #
# index()
## 店铺图片显示接口


### 接口地址


```
.../personal/myshop/imgs
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myshop/imgs
```

###### Json数据格式
```
data
shop_id             shop_id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    id           id
                    shop_img     shop_img      //图片路径
                    is_face      is_face       //是否为封面    1：封面  2：不是封面
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
117           信息不存在
```
# upload()
## 上传店铺图片接口


### 接口地址


```
.../personal/myshop/uploadimg
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myshop/uploadimg
```

###### Json数据格式
```
data
shop_id             shop_id
myfile              myfile(file类型)

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    id           id
                    shop_img     shop_img
             }
msg          上传成功
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
000           上传成功
112           用户id不能为空
121           没有图片被上传
111           上传失败
122           图片上传出错
```
# setface()
## 设置封面图接口


### 接口地址


```
.../personal/myshop/imgsetface
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myshop/imgsetface
```

###### Json数据格式
```
data
shop_id             shop_id
img_id              img_id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    img_id        img_id         //图片id
                    img_path      img_path       //图片路径
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
000           上传成功
112           id不能为空
```
# del()
## 删除店铺图片接口


### 接口地址


```
.../personal/myshop/del
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myshop/del
```

###### Json数据格式
```
data
img_id              img_id

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
000           成功
112           id不能为空
```