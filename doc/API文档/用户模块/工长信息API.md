# ForemaninfoController #
# index() #
## 读取工长信息接口


### 接口地址


```
.../public/personal/foremaninfo
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/foremaninfo
```

###### Json数据格式
```
data
foreman_id          foreman_id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    foremaninfo_userid        foremaninfo_userid
                    foremaninfo_nickname      foremaninfo_nickname      //用户昵称
                    foremaninfo_sex           foremaninfo_sex           //性别
                    foremaninfo_age           foremaninfo_age           //年龄
                    foremaninfo_email         foremaninfo_email         //邮箱
                    foremaninfo_tel           foremaninfo_tel           //联系电话
                    foremaninfo_worktime      foremaninfo_worktime      //从业时间
                    foremaninfo_servicearea   foremaninfo_servicearea   //服务区域
                    loc_province              loc_province              //所在地序号
                    loc_city                  loc_city
                    loc_district              loc_district
                    loc_address               loc_address
                    home_province             home_province             //家乡序号
                    home_city                 home_city
                    home_district             home_district
                    cloc_province             cloc_province             //所在地名称
                    cloc_city                 cloc_city
                    cloc_district             cloc_district
                    cloc_address              cloc_address
                    chome_province            chome_province            //家乡名称
                    chome_city                chome_city
                    chome_district            chome_district
                                           
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
.../public/personal/foremaninfo/change
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/personal/foremaninfo/change
```

###### Json数据格式
```
data
必选参数
foreman_id             foreman_id
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
worktime               worktime               //从业时间
servicearea            servicearea            //服务区域

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