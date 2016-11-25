# MyworkersController #
# index() #
## 店铺所有工人信息接口


### 接口地址


```
.../personal/myworkers
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myworkers
```

###### Json数据格式
```
data
user_id             user_id        //工长id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    woodworker      woodworker      {
                                                            wood_userid         wood_userid
                                                            wood_name           wood_nane
                                                            wood_sex            wood_sex
                                                            wood_age            wood_age
                                                            wood_birthplace     wood_birthplace
                                                    }
                    eleworker       eleworker       {
                                                            ele_userid          ele_userid
                                                            ele_name            ele_nane
                                                            ele_sex             ele_sex
                                                            ele_age             ele_age
                                                            ele_birthplace      ele_birthplace
                                                    }
                    brickworker     brickworker     {
                                                            brick_userid        brick_userid
                                                            brick_name          brick_nane
                                                            brick_sex           brick_sex
                                                            brick_age           brick_age
                                                            brick_birthplace    brick_birthplace
                                                    }    
                    paintworker     paintworker     {
                                                            paint_userid        paint_userid
                                                            paint_name          paint_nane
                                                            paint_sex           paint_sex
                                                            paint_age           paint_age
                                                            paint_birthplace    paint_birthplace
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
112           工长id不能为空
```
# add() #
## 按类添加工人信息接口

### 接口地址

```
.../personal/myworkers/add
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myworkers/add
```

###### Json数据格式
```
data
shop_id             shop_id        //店铺id
category            category       //类别
name                name           //工人姓名
sex                 sex            //工人性别
age                 age            //工人年龄
birthplace          birthplace     //工人籍贯
worktime            worktime       //工人从业时间
wages               wages          //工资

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          "成功"
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
000           添加成功
112           工种类别不能为空
```
# edit() #
## 编辑工人信息接口

### 接口地址

```
.../personal/myworkers/change
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myworkers/change
```

###### Json数据格式
```
data
worker_id           worker_id      //工人id
category            category       //类别
name                name           //工人姓名
sex                 sex            //工人性别
age                 age            //工人年龄
birthplace          birthplace     //工人籍贯
worktime            worktime       //工人从业时间
wages               wages          //工资

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          "成功"
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
000           修改成功
112           工种类别不能为空
```
# del() #
## 删除工人信息接口

### 接口地址

```
.../personal/myworkers/del
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myworkers/del
```

###### Json数据格式
```
data
worker_id           worker_id        //工人id
category            category         //类别
shop_id             shop_id          //店铺id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          "成功"
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
000           删除成功
112           工种类别不能为空
```