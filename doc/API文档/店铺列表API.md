# ShoplistController #
# gettags() #
## 筛选条件标签显示


### 接口地址


```
.../shoplist/gettags
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../shoplist/gettags
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
                   servicearea      servicearea 数组     //服务区域筛选条件
                   workernum        workernum 数组       //工人数量筛选条件
                   servicetag       servicetag 数组      //风格标签筛选条件
                   shopage          shopage 数组         //店铺年限
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
# index() #
## 店铺列表信息


### 接口地址


```
.../shoplist
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../shoplist
```

###### Json数据格式
```
data
可选参数
user_id             user_id
servicearea         servicearea 服务区域筛选条件数组的key   
workernum           workernum 工人数量筛选条件数组的key
servicetag          servicetag 风格标签筛选条件数组的key
shopage             shopage 店铺年限筛选条件数组的key
order               order 排序 0 1 2
page                page  第几页
limit               limit 每页显示几条数据

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   shop_id            shop_id
                   shopper_id         shopper_id                                //店长工人id
                   shop_name          shop_name
                   authentication     authentication 数组                       //认证
                   opentime           opentime
                   servicetag         servicetag 数组                     
                   servicearea        servicearea 数组                          //服务区域
                   shop_address       shop_address
                   shop_describe      shop_describe
                   shop_scan          shop_scan
                   shop_volume        shop_volume                               //成交量
                   shop_img           shop_img
                   total              total                                      //总数据条数
                   iscollected        iscollected                                //是否收藏 0:未收藏 1:已收藏
                   shop_score         {                                          //店铺评分
                                            projectquality    projectquality     //工程质量
                                            serviceattitude   serviceattitude    //服务态度
                                            overallmerit      overallmerit       //综合评价
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
117           信息不存在
```