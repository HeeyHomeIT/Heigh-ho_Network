# 材料订单API #

---

## 获取材料订单列表API ##
### 接口地址


```
.../order/material/getlist
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
data
order_id                    订单id
user_id                     用户id
material_supplier_id        材料商id
callback                    回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                order_id,               订单id
                order_material_id,      材料订单id
                material_type,          材料订单类型id
                material_list,          列表id
                material_time,          创建时间
                material_price,         金额
                pay_status,             支付状态
                order_material_status,  材料订单状态id
                material_supplier_id,   材料商id
                material_status_name,   材料状态名称
                material_type_name,     材料类型名称
                user_id,                用户id
                order_address_id,       用户地址id
                user_realname,          用户真实姓名
                user_phone,             用户手机号
                order_address           用户地址
                }
msg          查询成功
)
```

```
失败
callback(
code          200
data          ""
msg           参数错误,获取列表失败/没有订单
)
---
