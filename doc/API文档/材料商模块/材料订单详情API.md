# 材料订单API #

---

## 材料订单详情API ##
### 接口地址


```
.../order/material/getOrderMaterialDetails
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
data          {{
    "code":"000",
    "msg":"查询成功",
    "data":{
        "basic_info":[
            {
                "order_id",                 材料订单所属订单id（材料商无用）
                "order_material_id",        材料订单id
                "material_type",            材料订单类型
                "material_list",            材料订单列表id
                "material_time",            创建时间
                "material_price",           价格
                "pay_status",               支付状态
                "order_material_status",    材料单状态
                "material_supplier_id",     材料商id
                "material_status_name",     材料订单状态名称
                "material_type_name",       材料类型名称
                "user_id",                  用户id
                "order_address_id",         订单地址
                "user_realname",            用户真实姓名
                "user_phone",               用户手机号
                "order_address"             用户地址
            }
        ],
        "material_info":[
            {
                "id",                       材料id
                "material_list_id",         材料列表id
                "material_id",              材料名称id
                "name",                     材料名
                "unit",                     单位
                "price",                    单价
                "img",                      图片
                "num",                      数量
                "cate_id",                  材料品种id
                "cate_name",                材料品种名
                "spec_id",                  规格id
                "spec_name",                规格名
                "brand_id",                 品牌id
                "brand_name"                品牌名
            }
        ]
    }
msg           材料单数据
)
```

```
失败
callback(
code          200
data          ""
msg           订单不存在
)
---
