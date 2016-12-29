# OrderOperateController #
# searchActualDataAndReckonData()
## 预约订单接口

### 接口地址

```
.../order/aeckonandactual/seldata
```

### 接口格式

### 调用

```
接收方式        GET
```

###### Json数据格式
```
data

order_id                订单id
callback                callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                1 ：{
                    name : "预算单数据",
                    data_list : array(...)
                }
                2 ：{
                    name : "结算单数据",
                    data_list : array(...)
                }
                3 ：{
                    name : "结算单数据(隐藏)",
                    data_list : array(...)
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
msg           查询失败
)
```

###### Code值含义

```
000     查询成功
200     查询失败

```