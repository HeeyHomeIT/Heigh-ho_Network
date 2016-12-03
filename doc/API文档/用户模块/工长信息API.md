# ForemaninfoController #
# index() #
## 读取工长信息接口


### 接口地址


```
.../personal/foremaninfo
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/foremaninfo
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
                    foremaninfo_sex           foremaninfo_sex           //性别   1：男生 2：女生
                    foremaninfo_age           foremaninfo_age           //年龄
                    experience                experience                //从业经历
                    decoratedareas            decoratedareas            //装修小区
                    loc_province              loc_province              //所在地
                    loc_city                  loc_city
                    loc_district              loc_district    
                    loc_address               loc_address               //详细地址
                    home_province             home_province             //家乡
                    home_city                 home_city
                    home_district             home_district              
                    worktime                  worktime                  //从业时间
                    servicearea               servicearea 数组          //服务区域
                    foremaninfo_email         foremaninfo_email         //邮箱
                    foremaninfo_phone         foremaninfo_phone         //联系电话
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
.../personal/foremaninfo/change
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/foremaninfo/change
```

###### Json数据格式
```
data
必选参数
foreman_id             foreman_id
可选参数
name                   name                   //登录名
nickname               nickname               //用户昵称
realname               realname               //真实姓名
sex                    sex                    //性别
age                    age                    //年龄
experience             experience             //从业经历
decoratedareas         decoratedareas         //装修小区
loc_province           loc_province           //所在地
loc_city               loc_city
loc_district           loc_district
loc_address            loc_address
home_province          home_province          //家乡
home_city              home_city
home_district          home_district
worktime               worktime               //从业时间
servicearea            servicearea 数组       //服务区域

callback               callback
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
                    experience                experience                //从业经历
                    decoratedareas            decoratedareas            //装修小区
                    loc_province              loc_province              //所在地
                    loc_city                  loc_city
                    loc_district              loc_district
                    loc_address               loc_address               //详细地址
                    home_province             home_province             //家乡
                    home_city                 home_city
                    home_district             home_district
                    worktime                  worktime                  //从业时间
                    servicearea               servicearea 数组          //服务区域
                    foremaninfo_name          foremaninfo_name          //登录名
                    foremaninfo_email         foremaninfo_email         //邮箱
                    foremaninfo_phone         foremaninfo_phone         //联系电话
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
000            保存成功
112            用户id不能为空
111            保存失败
```