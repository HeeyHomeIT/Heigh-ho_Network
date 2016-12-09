# MyshoptechnicsController #
# index()
## 展示店铺工艺接口


### 接口地址


```
.../personal/myshop/technics
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myshop/technics
```

###### Json数据格式
```
data
shop_id             shop_id
describe            describe
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
                    
                    id                id                //工艺id
                    technics_text     technics_text     //工艺描述
                    technics_img      technics_img      //工艺图片
                                     
             }
msg          添加成功
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
# add()
## 添加店铺工艺接口


### 接口地址


```
.../personal/myshop/addtechnics
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myshop/addtechnics
```

###### Json数据格式
```
data
shop_id             shop_id
describe            describe
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
                    id                id
                    technics_text     technics_text
                    technics_img      technics_img
             }
msg          添加成功
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
# del()
## 删除店铺工艺接口


### 接口地址


```
.../personal/myshop/deltechnics
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myshop/deltechnics
```

###### Json数据格式
```
data
id                  id            //工艺id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          删除成功
)
```

```
失败
callback(
code          111
data          ""
msg           删除失败
)
```

###### Code值含义

```
```