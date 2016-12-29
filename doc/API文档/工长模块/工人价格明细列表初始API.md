# WorkerpricelistController #
# index() #
## 工人价格明细列表初始信息接口


### 接口地址


```
.../myworkers/pricelist
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkers/pricelist
```

###### Json数据格式
```
data
cate_id             cate_id         //工种类别
shop_id             shop_id         //店铺id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   serviceitem      serviceitem                       //服务项目
                   service          {
                                          id             id           //品类id   eg:service1,service2...
                                          servicename    servicename  //品类
                                          unit           unit         //单位
                                          cost           cost         //价格
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
112          工种类别不能为空
```
