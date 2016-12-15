# MyshoptechnicsController #
# index() #
## 显示店铺工艺列表信息接口


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
必须参数
shop_id          shop_id     //店铺id
可选参数
page
limit

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    technics_id      technics_id             //工艺id
                    technics_text    technics_text        
                    img              {
                                          img_id           img_id
                                          technics_img     technics_img
                                     }
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
117           信息不存在
```
# add() #
## 添加店铺工艺信息接口


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
shop_id                shop_id                 //店铺id
describe               describe                //工艺描述   
myfile                 myfile 多文件数组       //图片

callback               callback
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
000            保存成功
121            没有图片被上传
132            图片上传出错
131            上传失败
```
# del() #
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
technics_id            technics_id       //工艺id

callback               callback
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