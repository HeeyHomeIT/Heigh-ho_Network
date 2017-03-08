# OrderDisplayController #
# orderDetailsToShow()
## 订单详情展示接口


### 接口地址


```
.../order/detail
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../order/detail
```

###### Json数据格式
```
data
order_id          order_id

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    now_order_step        now_order_step
                    detail                {
                                                  order_step           订单步骤
                                                  img_time             开工时间
                                                  img_content          内容文字
                                                  img                  {
                                                                           img_url    图片地址
                                                                        }
                                                  material_pay_status   材料支付状态
                                                  order_actual_isclick  结算单是否编辑完
                                          }
                    worker                {
                                                  name         姓名
                                                  portrait     头像
                                                  type         工种
                                                  typename     工种
                                          }
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
```