# OrderController #
# orderDestroy()
## 工长提交订单消息接口

### 接口地址

```
.../order/shop/subupdatemsg
```

### 接口格式
### 调用

```
接收方式        GET
```
###### Json数据格式
```
data

order_id                订单id
callback                
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          发送成功
)
```

```
失败
callback(
code          200
data          ""
msg           没有订单
)
```