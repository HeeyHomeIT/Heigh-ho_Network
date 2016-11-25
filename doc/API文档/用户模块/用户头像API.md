# PortraitController #
# index() #
## 读取用户头像接口


### 接口地址


```
.../personal/portrait
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/portrait
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
                    user_id     user_id
                    user_img    user_img     //用户头像路径
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
114           用户不存在
```
# edit() #
## 上传用户头像接口


### 接口地址


```
.../personal/portrait/change
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/portrait/change
```

###### Json数据格式
```
data
user_id             user_id
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
                    user_id    user_id  
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
123           图片上传出错,不能大于2M
```