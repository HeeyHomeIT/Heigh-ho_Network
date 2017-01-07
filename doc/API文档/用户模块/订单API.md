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
                    order_id                //订单ID
                    user_id                 //用户id
                    shop_id                 //店铺id
                    order_status_id         //订单状态id
                    order_status            //订单状态
                    order_step_id           //订单步骤id
                    order_step              //订单步骤
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

# orderStatusSel()
## 查询订单状态及步骤接口

### 接口地址

```
.../order/client/selstatus
```

### 接口格式

### 调用

```
接收方式        GET
```
###### Json数据格式
```
data

user_id                 user_id                 用户id
order_id                order_id                店铺id
callback                callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    order_id                    //订单id
                    order_time                  //下单时间
                    order_confirmation_time     //确认时间
                    reservation_time            //预约上门时间
                    order_status_id             //订单状态id
                    order_step_id               //订单步骤id
                    order_status                //订单状态
                    order_step                  //订单步骤
             }
msg          查询成功
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

###### Code值含义

```
000     查询成功
200     没有订单

```

# orderStatusSel()
## 用户订单列表接口

### 接口地址

```
.../order/client/list
```

### 接口格式

### 调用

```
接收方式        GET
```
###### Json数据格式
```
data

user_id                 user_id                 用户id
page                    page                    订单页码(不填写默认为第一页)
limit                   limit                   每页显示条数（不填写默认为20条）
callback                callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    order_count                 订单总数
                    order_list                  订单列表
                    {
                        id                      自增id
                        order_id                订单id
                        user_id                 用户id
                        shop_id                 店铺id
                        shop_name               店铺名称
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
                        user_realname           用户真实姓名
                        user_phone              用户手机号
                        actual_finish_amount    用户已付金额
                        calculator_results_id   计算器结果id
                        area                    面积
                        room                    室
                        parlour                 厅
                        toilet                  卫生间
                        balcony                 阳台
                        user_portrait           用户头像
                    }
             }
msg          查询成功
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

###### Code值含义

```
000     查询成功
200     没有订单

```