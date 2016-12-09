# IDCardController #
# index() #
## 身份认证实名信息接口


### 接口地址


```
.../personal/safe/auth
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/safe/auth
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
                    real_name       real_name
                    idcardno        idcardno
                    facephoto       facephoto       //正面照
                    backphoto       backphoto       //反面照
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
131           正在审核中
132           身份尚未验证

```
# cardverify() #
## 身份认证实名认证接口


### 接口地址


```
.../personal/safe/authverify
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/safe/authverify
```

###### Json数据格式
```
data
user_id             user_id        
name                name
idcardno            idcardno
face                face(file类型)
back                back(file类型)

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    real_name           real_name
                    idcardno            idcardno
                    facephoto           facephoto(图片路径)
                    backphoto           backphoto(图片路径)
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
122           图片上传出错

```
