# OrderController #
# orderProduce()
## 预约订单接口

### 接口地址

```
.../order/client/produce
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../order/client/produce
```

###### Json数据格式
```
data

user_id                 user_id                 用户id
shop_id                 shop_id                 店铺id
address_id              address_id              地址id
calculator_result_id    calculator_result_id    计算器结果id
time                    time                    预约时间（json字符串）
worker                  worker                  预约工人的id（json字符串）
callback                callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    order_id        order_id            //订单ID
                    user_id         user_id             //用户id
                    shop_id         shop_id             //店铺id
                    order_status    order_status        //订单状态
                    order_step      order_step          //订单步骤
             }
msg          订单生成成功
)
```

```
失败
callback(
code          111
data          ""
msg           订单生成失败
)
```

###### Code值含义

```
201     订单生成失败
202     订单已重复存在

```