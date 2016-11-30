# EleworkerController #
# index() #
## 水电工信息接口


### 接口地址


```
.../myworkers/eleworker
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/eleworker
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
                    ele_userid         ele_userid
                    ele_name           ele_nane
                    ele_sex            ele_sex
                    ele_age            ele_age
                    ele_birthplace     ele_birthplace  //籍贯
                    ele_worktime       ele_worktime    //从业时间
                    ele_price1         ele_price1
                    ele_price2         ele_price2
                    ele_price3         ele_price3
                    ele_price4         ele_price4
                    ele_price5         ele_price5
                    ele_price6         ele_price6
                    portrait_img       portrait_img     //头像
                    phone              phone
                    idcard             idcard
                    bankcard           bankcard
                    bank               bank             //开户银行
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
## 添加水电工人信息接口

### 接口地址

```
.../myworkers/addeleworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/addeleworker
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
price1              price1
price2              price2
price3              price3
price4              price4
price5              price5
price6              price6

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
## 编辑水电工人信息接口

### 接口地址

```
.../myworkers/changeeleworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/changeeleworker
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
price1              price1
price2              price2
price3              price3
price4              price4
price5              price5
price6              price6

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
## 删除水电工人信息接口

### 接口地址

```
.../myworkers/deleleworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/deleleworker
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