# OrderController #
# orderConfirm()
## 工长确认订单接口

### 接口地址

```
.../supplier/monthlyReport
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
user_id         用户id
confirm_time    确认上门时间（传1或2）
callback                
```

### 回调
###### Json数据格式

```
成功
callback(
code         000    
data         
msg          确认成功
)
```

```
失败
callback(
code         206    
data         
msg          修改失败
)
```
