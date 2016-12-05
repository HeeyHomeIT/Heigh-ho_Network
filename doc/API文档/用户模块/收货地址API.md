# DriveaddressController #
# index() #
## 读取收货地址信息接口


### 接口地址


```
.../personal/drive_address
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/drive_address
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
                    id                     id                 //地址id
                    receiver               receiver           //收货人
                    province               province           //省份
                    city                   city               //城市
                    district               district           //区
                    street                 street             //街道
                    address                address            //详细地址
                    zipcode                zipcode            //邮政编码
                    mobile                 mobile             //联系电话
                    is_default             is_default         //是否默认地址   1:默认地址 2:非默认地址
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
```
# add() #
## 添加收货地址接口


### 接口地址


```
.../personal/drive_address/add
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/drive_address/add
```

###### Json数据格式
```
data
user_id              user_id            //用户id
receiver             receiver           //收货人
province             province           //省份
city                 city               //城市
district             district           //区
street               street             //街道
address              address            //详细地址
zipcode              zipcode            //邮政编码
mobile               mobile             //联系电话
is_default           is_default         //是否默认地址   1:默认地址 2:非默认地址

callback             callback
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
000            添加成功
112            用户id不能为空
111            添加失败
```
# edit() #
## 编辑收货地址信息接口


### 接口地址


```
.../personal/drive_address/change
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/drive_address/change
```

###### Json数据格式
```
data
必选参数
id                     id                 //地址id
可选参数
receiver               receiver           //收货人
province               province           //省份
city                   city               //城市
district               district           //区
street                 street             //街道
address                address            //详细地址
zipcode                zipcode            //邮政编码
mobile                 mobile             //联系电话
is_default             is_default         //是否默认地址

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
000            修改成功
112            id不能为空
117            地址不存在
111            修改失败
```
# del() #
## 删除收货地址信息接口


### 接口地址


```
.../personal/drive_address/del
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/drive_address/del
```

###### Json数据格式
```
data
id                  id             //地址id

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
000            删除成功
112            id不能为空
117            地址不存在
111            删除失败
```
# setdefault() #
## 设置默认收货地址接口


### 接口地址


```
.../personal/drive_address/setdefault
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/drive_address/setdefault
```

###### Json数据格式
```
data
id                     id           //地址id
user_id                user_id      //用户id

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
000            修改成功
112            id不能为空
111            修改失败
```