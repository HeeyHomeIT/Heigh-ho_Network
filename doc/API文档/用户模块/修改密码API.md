# EditPasswordController #
# editpassword() #
## 修改密码接口


### 接口地址


```
.../public/editpassword
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/editpassword
```

###### Json数据格式
```
data
user_phone          user_phone
new_password        new_password
old_password        old_password
captcha             captcha         //短信验证码

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
000            成功
112            参数不能为空
118            短信验证码不正确
115            原始密码不正确
114            修改失败，用户不存在
119            短信验证码超时
```