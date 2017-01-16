# OrderPayController #
# subRefundInfo()
## 提交用户退款信息接口

### 接口地址

```
.../order/user/subrefundinfo
```

### 接口格式
### 调用

```
接收方式    POST    GET
```
###### Json数据格式
```
data

order_id        订单id
alipay_account  支付宝账户
callback                
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          提交退款信息成功
)
```

```
失败
callback(
code          200
data          ""
msg           提交退款信息失败/订单结转金额无需退款
)
```