# RegisterController #
# user_register
## 注册接口

### 接口地址

```
.../order/user/getrefundinfo
```

### 接口格式

### 调用

```
接收方式        POST        GET
```
###### Json数据格式
```
data
order_id            订单id

callback            回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    order_id        订单id
                    order_step      订单步骤    
                    order_time      订单事件
                    pay_amount      金额
                    refund_status   退款状态（0：未提交退款信息，1：等待退款，2：退款成功）
                    refund_account  用户退款账号
             }
msg          查询成功
)
```

```
失败
callback(
code          200
data          ""
msg           订单不存在
)
```
