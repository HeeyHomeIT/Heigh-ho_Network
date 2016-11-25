# RegisterController #
# gz_register
## 注册接口


### 接口地址


```
.../public/register/gz_register
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/register/gz_register
```

###### Json数据格式
```
data
phone               phone
password            password
captcha             captcha

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    foreman_id          foreman_id        //ID
                    foreman_name        foreman_name      //用户名
             }
msg          注册成功
)
```

```
失败
callback(
code          111
data          ""
msg           注册失败
)
```

###### Code值含义

```
000           注册成功
112           注册失败，用户名、密码不能为空
113           注册失败，账号已存在
```