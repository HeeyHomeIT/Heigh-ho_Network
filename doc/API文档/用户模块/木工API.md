# WoodworkerController #
# index() #
## 木工信息接口


### 接口地址


```
.../myworkers/woodworker
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/woodworker
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
                    wood_userid            wood_userid
                    wood_name              wood_nane
                    wood_sex               wood_sex
                    wood_age               wood_age
                    wood_birthplace        wood_birthplace  //籍贯
                    wood_worktime          wood_worktime    //从业时间
                    wood_price1            wood_price1
                    wood_price2            wood_price2
                    wood_price3            wood_price3
                    wood_price4            wood_price4
                    wood_price5            wood_price5
                    wood_price6            wood_price6
                    wood_price7            wood_price7
                    portrait_img           portrait_img     //头像
                    phone                  phone
                    idcard                 idcard
                    bankcard               bankcard
                    bank                   bank             //开户银行
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
## 添加木工信息接口

### 接口地址

```
.../myworkers/addwoodworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/addwoodworker
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
price5              price5
price6              price6
price7              price7

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
## 编辑木工信息接口

### 接口地址

```
.../myworkers/changewoodworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/changewoodworker
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
price5              price5
price6              price6
price7              price7

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
## 删除木工信息接口

### 接口地址

```
.../myworkers/delwoodworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/delwoodworker
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