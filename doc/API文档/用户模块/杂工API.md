# MixworkerController #
# index() #
## 杂工信息接口


### 接口地址


```
.../myworkers/mixworker
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/mixworker
```

###### Json数据格式
```
data
shop_id             shop_id        //店铺id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    mix_userid           mix_userid
                    mix_name             mix_nane
                    mix_sex              mix_sex
                    mix_age              mix_age
                    mix_birthplace       mix_birthplace  //籍贯
                    mix_worktime         mix_worktime    //从业时间
                    mix_price1           mix_price1
                    mix_price2           mix_price2
                    mix_price3           mix_price3
                    mix_price4           mix_price4
                    portrait_img         portrait_img     //头像
                    phone                phone
                    idcard               idcard
                    bankcard             bankcard
                    bank                 bank             //开户银行
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
112           店铺id不能为空
```
# add() #
## 添加杂工信息接口

### 接口地址

```
.../myworkers/addmixworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/addmixworker
```

###### Json数据格式
```
data
shop_id             shop_id        //店铺id
name                name           //工人姓名
sex                 sex            //工人性别
age                 age            //工人年龄
birthplace          birthplace     //工人籍贯
worktime            worktime       //工人从业时间
idcard              idcard
bankcard            bankcard
phone               phone
bank                bank           //开户银行
price1              prce1
price2              price2
price3              price3
price4              price4

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
```

# edit() #
## 编辑杂工信息接口

### 接口地址

```
.../myworkers/changemixworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/changemixworker
```

###### Json数据格式
```
data
worker_id           worker_id      //工人id
name                name           //工人姓名
sex                 sex            //工人性别
age                 age            //工人年龄
birthplace          birthplace     //工人籍贯
worktime            worktime       //工人从业时间
idcard              idcard
bankcard            bankcard
phone               phone
bank                bank           //开户银行
price1              prce1
price2              price2
price3              price3
price4              price4

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
```
# del() #
## 删除杂工信息接口

### 接口地址

```
.../myworkers/delmixworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/delmixworker
```

###### Json数据格式
```
data
worker_id           worker_id        //工人id
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