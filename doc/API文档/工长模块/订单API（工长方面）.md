# 订单API #

---

## 订单列表（店铺）API ##
### 接口地址


```
.../order/shop/list
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

```
.../public/personal/securitylist
```

###### Json数据格式
```
data
shop_id                 shop_id                 商铺id             
user_id                 user_id                 工长id
page                    page                    订单页码
> 商铺id与工长id必填一个
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    order_list                  订单列表
                    {
                        id                      自增id
                        order_id                订单id
                        user_id                 用户id
                        shop_id                 店铺id
                        order_address           订单地址
                        order_status            订单状态
                        order_step              订单步骤
                        pay_status              支付状态
                        order_candd             订单纠纷id
                        order_personnel         订单人员id
                        material_id             材料单关联id
                        calculator_result_id    计算器结果id
                        reckon_list             预算表id
                        actual_list             结算表id
                        order_time              订单创建时间
                    }
                    order_list_verify           待确认订单列表  
                    order_list_reservation      待预约订单列表
                    order_list_amount           待上门量房订单列表
                    order_list_prepayments      待用户预支付订单列表
                    order_list_processing       进行中订单列表
                    order_list_complete         已完成订单列表
                    order_list_cancel           已取消订单列表
                    order_list_cancel_foreman   工长店铺取消订单列表
             }
msg          查询成功
)
```

```
失败
callback(
code          205
data          ""
msg           没有订单
)
```