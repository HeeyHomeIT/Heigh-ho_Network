## 确认付款成功API ##
### 接口地址


```
.../order/payconfirm
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
data
out_trade_no                    商户订单号
trade_no                        支付宝交易号
notify_time                     时间  
total_fee                       金额

callback                        回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
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
111           没有产生支付信息

```
