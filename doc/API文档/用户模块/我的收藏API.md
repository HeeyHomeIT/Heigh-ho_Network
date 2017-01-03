# CollectimgController #
# index()
## 全景图收藏列表接口


### 接口地址


```
.../personal/collection/panorama
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/collection/panorama
```

###### Json数据格式
```
data
必选参数
user_id           user_id      //用户id
可选参数 
page              page         //当前页
limit             limit        //每页显示数目

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    id                 id                  //收藏序号
                    iscollected_id     iscollected_id      //全景图id
                    collect_time       collect_time        //收藏时间
                    panorama_img       panorama_img        //全景图封面图
                    panorama_style     panorama_style
//全景图风格
                    url                url                 //全景图链接地址
                    total              total               //总数据数
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
117           信息不存在
```
# CollectshopController #
# index()
## 店铺收藏列表接口


### 接口地址


```
.../personal/collection/shop
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/collection/shop
```

###### Json数据格式
```
data
必选参数
user_id           user_id      //用户id
可选参数 
page              page         //当前页
limit             limit        //每页显示数目

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   id                 id                      //收藏序号
                   shop_id            shop_id                 //店铺id
                   shop_name          shop_name
                   servicearea        servicearea 数组        //服务区域
                   shop_address       shop_address 
                   authentication     authentication 数组     //认证
                   shop_scan          shop_scan               //店铺浏览量
                   shop_volume        shop_volume             //店铺成交量
                   img                img                     //店铺封面图
                   total              total                   //总数据数
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
117           信息不存在
```
# del()
## 店铺删除收藏接口


### 接口地址


```
.../personal/collection/shopdel
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/collection/shopdel
```

###### Json数据格式
```
data
必选参数
shop_id           shop_id           //店铺id
user_id           user_id

callback          callback
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
000           成功
117           信息不存在
```
# del()
## 全景图删除收藏接口


### 接口地址


```
.../personal/collection/panoramadel
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/collection/panoramadel
```

###### Json数据格式
```
data
必选参数
panorama_id        panorama_id           //全景图id
user_id            user_id

callback           callback
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
000           成功
117           信息不存在
```