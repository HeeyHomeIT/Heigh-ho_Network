# PaintworkerController #
# index() #
## 油漆工信息接口


### 接口地址


```
.../myworkers/paintworker
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/paintworker
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
                    paint_userid           paint_userid
                    paint_name             paint_nane
                    paint_sex              paint_sex
                    paint_age              paint_age
                    paint_birthplace       paint_birthplace  //籍贯
                    paint_worktime         paint_worktime    //从业时间
                    paint_price1           paint_price1
                    paint_price2           paint_price2
                    paint_price3           paint_price3
                    paint_price4           paint_price4
                    paint_price5           paint_price5
                    paint_price6           paint_price6
                    paint_price7           paint_price7
                    paint_price8           paint_price8
                    paint_price9           paint_price9
                    paint_price10          paint_price10
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
## 添加油漆工信息接口

### 接口地址

```
.../myworkers/addpaintworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/addpaintworker
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
price8              price8
price9              price9
price10             price10

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
## 编辑油漆工信息接口

### 接口地址

```
.../myworkers/changepaintworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/changepaintworker
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
price8              price8
price9              price9
price10             price10

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
## 删除油漆工信息接口

### 接口地址

```
.../myworkers/delpaintworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/delpaintworker
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