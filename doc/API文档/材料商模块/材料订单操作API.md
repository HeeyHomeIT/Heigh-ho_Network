# 材料订单操作API #

---

## 更新材料单状态为配送中API ##
### 接口地址


```
.../order/material/changeMaterialStatus
```

### 接口格式

### 调用 

```
接收方式    GET   POST
```

###### Json数据格式
```
data
material_id                 材料订单id
callback                    回调
```

### 回调
###### Json数据格式

```
成功
callback(
code          000
data          ”“
msg           更新成功
)
```

```
失败
callback(
code          200
data          ""
msg           更新失败
)
---
