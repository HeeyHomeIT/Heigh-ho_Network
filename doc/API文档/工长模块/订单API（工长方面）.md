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

###### Json数据格式
```
data
shop_id                 shop_id                 商铺id             
user_id                 user_id                 工长id
page                    page                    订单页码(不填写默认为第一页)
limit                   limit                   每页显示条数（不填写默认为20条）
> 商铺id与工长id必填一个
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
                        order_step_ch           订单步骤中文
                        order_status            订单状态中文
                        user_portrait           用户头像
                    }
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

---

## 查询或添加装修风格API ##
### 接口地址


```
.../order/style/addhousestyle
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
data
order_id                order_id                订单id
house_style             house_style             装修风格（可选，如果不传则自动返回当前订单已有的装修风格）
callback                callback                回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          添加成功
)
```

```
失败
callback(
code          200
data          ""
msg           订单号错误/添加失败/已有装修风格
)
```

## 取消订单API ##
### 接口地址


```
.../order/shop/destory
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
data
order_id                order_id                订单id
user_id                 user_id
callback                callback                回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          添加成功
)
```

```
失败
callback(
code          200
data          ""
msg           
)
```

## 获取订单上门时间API ##
### 接口地址


```
.../order/appointment
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
data
order_id                order_id                订单id
callback                callback                回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                reservation_time1   第一个时间
                reservation_time2   第二个时间
            }
)
```

```
失败
callback(
code          200
data          ""
msg           
)
```
