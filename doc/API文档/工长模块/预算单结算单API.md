# 预算单结算单API #

---

## 预算单结算单生成API ##
### 接口地址


```
.../order/aeckonandactual/generatelist
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
data
order_id                订单id
callback                回调
list_data_json{         可选项，格式内容可调用获取预算单结算单字段API
'0' => '123',
'1' => '123',
......
'63' => '123',
'62' => '123',
}                   
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          生成成功
)
```

```
失败
callback(
code          200
data          ""
msg           订单号错误
)
---
code 含义
000         生成成功
200         订单号错误、预算单已经存在、预算单生成失败、结算单生成失败

---
```
## 获取预算单结算单字段API ##
### 接口地址


```
.../order/aeckonandactual/getlistname
```
######分类接口地址如下：
```
.../order/aeckonandactual/getlistnamebylist
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
data
callback                callback                回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         array(）
msg          获取成功
)
```
---

## 添加预算单与结算单数据API ##
### 接口地址


```
.../order/aeckonandactual/adddate
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
order_id                订单id
list_data_json{         json数据（数据字段为63位）
                '0' => '123',
                '1' => '123',
                ......
                '63' => '123',
                '62' => '123',
                }
remark                  备注
callback                回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          插入成功
)
```

```
失败
callback(
code          200
data          ""
msg           插入失败
)
---
code 含义
000         插入成功
200         插入失败、订单号错误、缺少数据
---
```

---

## 修改结算单数据API ##
### 接口地址


```
.../order/aeckonandactual/update
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
order_id                订单id
list_data_json{         json数据（数据字段为63位）
                '0' => '123',
                '1' => '123',
                ......
                '63' => '123',
                '62' => '123',
                }
remark                  备注
callback                回调
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          插入成功
)
```

```
失败
callback(
code          200
data          ""
msg           订单号错误
)
---
code 含义
000         插入成功
200         订单号错误、缺少数据、订单当前状态无法修改结算单、插入失败
---

```

---

## 查询预结算单编辑状态API ##
### 接口地址


```
.../order/aeckonandactual/selstatus
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
                “预算单编辑状态” ：0
                “结算单编辑状态” ：1
                （0：不可编辑 1：可编辑）
            }
msg          查询成功
)
```

```
失败
callback(
code          200
data          ""
msg           预算单不存在
)
---
callback(
code          200
data          ""
msg           结算单不存在
)
---