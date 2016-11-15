# ShopimgController #
# upload()
## 上传店铺图片接口


### 接口地址


```
.../public/personal/myshop/uploadimg
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/myshop/uploadimg
```

###### Json数据格式
```
data
shop_id             shop_id
myfile              myfile

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    shop_id    shop_id  
                    path       path     //用户头像路径
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
.../public/personal/myshop/imgsetface
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/myshop/imgsetface
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
                    img_id      img_id         //图片id
                    img_path    img_path       //图片路径
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
.../public/personal/myshop/del
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/myshop/del
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