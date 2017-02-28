# OrderMaterialController #
# finishOrderMaterial()
## 用户确认材料收货接口

### 接口地址

```
.../order/material/finish
```

### 接口格式
### 调用

```
接收方式    POST    GET
```
###### Json数据格式
```
data

material_id            材料订单id
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
code         200    
data         
msg          材料订单当前状态不支持确认收货/材料订单不存在
)
```
