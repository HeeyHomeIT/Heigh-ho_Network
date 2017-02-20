# ShopScoreController #
# orderOverScore()
## 订单评价接口

### 接口地址

```
.../order/order/evaluation
```

### 接口格式
### 调用

```
接收方式    POST    GET
```
###### Json数据格式
```
data

order_id            订单id
projectquality      施工质量
serviceattitude     服务态度
overallmerit        综合评价
callback                
```

### 回调
###### Json数据格式

```
成功
callback(
code         000    
data         
msg          评分成功
)
```

```
失败
callback(
code         200    
data         
msg          参数错误/订单状态不可评价/订单已评价，不可重复评价
             /店铺评分数据错误/订单数据错误/订单不存在
)
```
