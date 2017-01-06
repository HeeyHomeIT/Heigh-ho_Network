# 支付宝API #

---

## 支付宝支付API ##
### 接口地址


```
.../alipay/pay
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
pay_id                      订单编号（当订单类型位订单支付时，需要输入订单编号）
callback                    回调
```

### 回调
###### Json数据格式

```
成功
自动跳转支付宝支付界面
```

```
失败
callback(
code          200
data          ""
msg           参数错误/没有订单/当前支付订单已支付
)
---
