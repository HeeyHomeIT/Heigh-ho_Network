## 获取支付信息API ##
### 接口地址


```
.../order/getpayinfo
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
data
pay_type                    支付类型（'order':订单支付,'material':材料订单支付）
order_id                    订单编号（当订单类型位订单支付时，需要输入订单编号）
material_list               材料id列表(json格式，当支付类型为material时必填)

callback                    回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    service     
                    partner
                    seller_id
                    payment_type
                    notify_url
                    return_url
                    out_trade_no
                    subject
                    total_fee
                    body
                    _input_charset
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
111           订单不存在
112           订单状态不为用户预支付
113           不存在用户需要支付的金额
114           没有需要支付的订单

```
