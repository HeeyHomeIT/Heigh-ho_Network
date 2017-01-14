# ShopWagesController #
# getShopWages()
## 店铺工价接口

### 接口地址

```
.../shopwages
```

### 接口格式
### 调用

```
接收方式    POST    GET
```
###### Json数据格式
```
data

shop_id               店铺id
callback                
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                "1" =>{
                    "1"=>"2.00",
                    "2"=>"3.00",
                },
                "2" =>{
                    ......
                },
                ......
            }
msg          查询成功
)
```

```
失败
callback(
code          200
data          ""
msg           查询失败
)
```