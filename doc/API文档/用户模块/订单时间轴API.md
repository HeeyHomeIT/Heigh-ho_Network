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
                                                  order_step           order_step
                                                  img_time             img_time
                                                  img_content          img_content
                                                  img                  {
                                                                           img_url    img_url
                                                                        }
                                                  material_pay_status   material_pay_status
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