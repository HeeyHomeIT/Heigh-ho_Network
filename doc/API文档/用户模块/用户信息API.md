# UserinfoController #
# index() #
## 读取用户信息接口


### 接口地址


```
.../public/personal/userinfo
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/userinfo
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
                    userinfo_userid        userinfo_userid
                    userinfo_nickname      userinfo_nickname      //用户昵称
                    userinfo_sex           userinfo_sex           //性别
                    userinfo_age           userinfo_age           //年龄
                    loc_province           loc_province           
                    loc_city               loc_city
                    loc_district           loc_district
                    loc_address            loc_address
                    home_province          home_province          
                    home_city              home_city
                    home_district          home_district
                    userinfo_email         userinfo_email         //邮箱
                    userinfo_tel           userinfo_tel           //联系电话
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
## 编辑用户信息接口


### 接口地址


```
.../public/personal/userinfo/change
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/userinfo/change
```

###### Json数据格式
```
data
必选参数
user_id                user_id
可选参数
userinfo_nickname      userinfo_nickname      //用户昵称
userinfo_realname      userinfo_realname      //真实姓名
userinfo_sex           userinfo_sex           //性别
userinfo_age           userinfo_age           //年龄
loc_province           loc_province           //所在地
loc_city               loc_city
loc_district           loc_district
loc_address            loc_address
home_province          home_province          //家乡
home_city              home_city
home_district          home_district

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
000            保存成功
112            用户id不能为空
111            保存失败
```