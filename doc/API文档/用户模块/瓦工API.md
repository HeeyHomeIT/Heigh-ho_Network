# EleworkerController #
# index() #
## 瓦工信息接口


### 接口地址


```
.../myworkers/brickworker
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/brickworker
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
                    brick_userid           brick_userid
                    brick_name             brick_nane
                    brick_sex              brick_sex
                    brick_age              brick_age
                    brick_birthplace       brick_birthplace  //籍贯
                    brick_worktime         brick_worktime    //从业时间
                    brick_price1           brick_price1
                    brick_price2           brick_price2
                    brick_price3           brick_price3
                    brick_price4           brick_price4
                    brick_price5           brick_price5
                    brick_price6           brick_price6
                    brick_price7           brick_price7
                    brick_price8           brick_price8
                    brick_price9           brick_price9
                    brick_price10          brick_price10
                    brick_price11          brick_price11
                    brick_price12          brick_price12
                    brick_price13          brick_price13
                    brick_price14          brick_price14
                    brick_price15          brick_price15
                    brick_price16          brick_price16
                    brick_price17          brick_price17
                    brick_price18          brick_price18
                    brick_price19          brick_price19
                    brick_price20          brick_price20
                    brick_price21          brick_price21
                    brick_price22          brick_price22
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
## 添加瓦工信息接口

### 接口地址

```
.../myworkers/addbrickworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/addbrickworker
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
price11             price11
price12             price12
price13             price13
price14             price14
price15             price15
price16             price16
price17             price17
price18             price18
price19             price19
price20             price20
price21             price21
price22             price22

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
## 编辑瓦工信息接口

### 接口地址

```
.../myworkers/changebrickworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/changebrickworker
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
price11             price11
price12             price12
price13             price13
price14             price14
price15             price15
price16             price16
price17             price17
price18             price18
price19             price19
price20             price20
price21             price21
price22             price22

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
## 删除瓦工信息接口

### 接口地址

```
.../myworkers/delbrickworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/delbrickworker
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