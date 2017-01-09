# 材料订单API #

---

## 用户材料订单数据获取API ##
### 接口地址


```
.../order/material/userget
```

### 接口格式

### 调用 

```
接收方式    GET   POST
```

###### Json数据格式
```
data
order_id                    订单id
material_type               材料类型
callback                    回调
```

### 回调
###### Json数据格式

```
成功
callback(
code          000
data          {
                无品牌=>array( "id":4,
                "material_list_id":"1482215662046501",
                "material_id":20000,
                "name":"热水管",
                "unit":"根",
                "price":"0.00",
                "img":"api/public/materials/1.png",
                "cate_id":1,
                "cate_name":"水电材料",
                "spec_id":2,
                "spec_name":"6分",
                "brand_id":"1",
                "brand_name":"公元优家"),
                公元优家=>array(),
                伟星管业=>array(),
                上海熊猫=>array(),
                昆山长江线=>array(),
                泰山牌=>array(),
                拉法基牌=>array(),
                公元PVC=>array(),
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
