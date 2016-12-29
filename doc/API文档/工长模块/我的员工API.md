# MyworkersController #
# cate() #
## 工种分类信息接口


### 接口地址


```
.../myworkers/workercate
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/workercate
```

###### Json数据格式
```
data

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   cate_id     cate_id    //分类id
                   category    category   //分类名
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
```
# MyworkersController #
# workerlist() #
## 工人列表信息接口


### 接口地址


```
.../myworkers
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers
```

###### Json数据格式
```
data
必选参数
shop_id             shop_id
可选参数
cate_id             cate_id     //工种id  1：杂工 2：水电工 3：瓦工 4：木工 5：油漆工 

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   userid           userid           //工人id
                   name             name             //姓名
                   sex              sex              //性别   1：男生 2：女生
                   age              age              //年龄
                   birthplace       birthplace       //籍贯
                   worktime         worktime         //从业年限
                   phone            phone            //手机号
                   idcard           idcard
                   bankname         bankname         //开户银行
                   bankcard         bankcard
                   portrait_img     portrait_img     //头像
                   cate_id          cate_id          
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
112           工种类别不能为空
```
# WorkerController #
# workerinfo() #
## 工人详细信息接口


### 接口地址


```
.../myworkers/workerinfo
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/workerinfo
```

###### Json数据格式
```
data
cate_id             cate_id        //工种id  1：杂工 2：水电工 3：瓦工 4：木工 5：油漆工
worker_id           worker_id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   userid           userid           //工人id
                   name             name             //姓名
                   sex              sex              //性别   1：男生 2：女生
                   age              age              //年龄
                   birthplace       birthplace       //籍贯
                   worktime         worktime         //从业年限
                   phone            phone            //手机号
                   idcard           idcard
                   bankname         bankname         //开户银行
                   bankcard         bankcard
                   portrait_img     portrait_img     //头像
                   price            {
                                        serviceitem      serviceitem                       //服务项目
                                        service          {
                                                             id             id             //品类id   eg:service1,service2...
                                                             servicename    servicename    //品类
                                                             unit           unit           //单位
                                                             cost           cost           //价格                                           
                                                         }
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
112           工种类别不能为空
```
# WorkerController #
# add() #
## 添加工人信息接口


### 接口地址


```
.../myworkers/addworker
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/addworker
```

###### Json数据格式
```
data
cate_id             cate_id            //工种id     1：杂工 2：水电工 3：瓦工 4：木工 5：油漆工
shop_id             shop_id            //店铺id
name                name               //工人姓名
sex                 sex                //工人性别   1：男生 2：女生
age                 age                //工人年龄
birthplace          birthplace         //工人籍贯
worktime            worktime           //工人从业年限
idcard              idcard             //身份证
bankcard            bankcard           //银行卡
phone               phone              //手机号
bankname            bankname           //开户银行
myfile              myfile (file类型)  //头像

service1            service1         //服务品类价格 service1-service16为杂工必须参数 
service2            service2         
service3            service3         
service4            service4         
service5            service5        
service6            service6         
service7            service7         
service8            service8         
service9            service9         
service10           service10        
service11           service11        
service12           service12       
service13           service13        
service14           service14        
service15           service15        
service16           service16        
service17           service17        //service17-service18为水电工必须参数
service18           service18
service19           service19        //service19-service41为瓦电工必须参数
service20           service20
service21           service21
service22           service22
service23           service23
service24           service24
service25           service25
service26           service26
service27           service27
service28           service28
service29           service29
service30           service30
service31           service31
service32           service32
service33           service33
service34           service34
service35           service35
service36           service36
service37           service37
service38           service38
service39           service39
service40           service40
service41           service41
service42           service42        //service42-service53为木工必须参数
service43           service43
service44           service44
service45           service45
service46           service46
service47           service47
service48           service48
service49           service49
service50           service50
service51           service51
service52           service52
service53           service53
service54           service54        //service54-service63为油漆工必须参数
service55           service55
service56           service56
service57           service57
service58           service58
service59           service59
service60           service60
service61           service61
service62           service62
service63           service63

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          添加成功
)
```

```
失败
callback(
code          111
data          ""
msg           添加失败
)
```

###### Code值含义

```
130           抱歉，银行卡号校验不一致
201           银行卡号为空
202           真实姓名为空
203           银行卡号不正确
204           真实姓名包含特殊字符
205           身份证不正确
210           没有信息
```
# WorkerController #
# edit() #
## 编辑工人信息接口


### 接口地址


```
.../myworkers/changeworker
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/changeworker
```

###### Json数据格式
```
data
cate_id             cate_id          //工种id     1：杂工 2：水电工 3：瓦工 4：木工 5：油漆工
worker_id           worker_id        //工人id
name                name             //工人姓名
sex                 sex              //工人性别   1：男生 2：女生
age                 age              //工人年龄
birthplace          birthplace       //工人籍贯
worktime            worktime         //工人从业年限
idcard              idcard           //身份证
bankcard            bankcard         //银行卡
phone               phone            //手机号
bankname            bankname         //开户银行

service1            service1         //服务品类价格 service1-service16为杂工必须参数 
service2            service2         
service3            service3         
service4            service4         
service5            service5        
service6            service6         
service7            service7         
service8            service8         
service9            service9         
service10           service10        
service11           service11        
service12           service12       
service13           service13        
service14           service14        
service15           service15        
service16           service16        
service17           service17        //service17-service18为水电工必须参数
service18           service18
service19           service19        //service19-service41为瓦电工必须参数
service20           service20
service21           service21
service22           service22
service23           service23
service24           service24
service25           service25
service26           service26
service27           service27
service28           service28
service29           service29
service30           service30
service31           service31
service32           service32
service33           service33
service34           service34
service35           service35
service36           service36
service37           service37
service38           service38
service39           service39
service40           service40
service41           service41
service42           service42        //service42-service53为木工必须参数
service43           service43
service44           service44
service45           service45
service46           service46
service47           service47
service48           service48
service49           service49
service50           service50
service51           service51
service52           service52
service53           service53
service54           service54        //service54-service63为油漆工必须参数
service55           service55
service56           service56
service57           service57
service58           service58
service59           service59
service60           service60
service61           service61
service62           service62
service63           service63

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          修改成功
)
```

```
失败
callback(
code          111
data          ""
msg           修改失败
)
```

###### Code值含义

```
```
# WorkerController #
# del() #
## 删除工人信息接口

### 接口地址

```
.../myworkers/delworker
```
### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/delworker
```

###### Json数据格式
```
data
cate_id             cate_id          //工种类别
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
msg          删除成功
)
```

```
失败
callback(
code          111
data          ""
msg           删除失败
)
```

###### Code值含义

```
```