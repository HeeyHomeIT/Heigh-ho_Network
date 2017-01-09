# MaterialController #
# brand() #
## 品牌列表接口


### 接口地址


```
.../materials/brands
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../materials/brands
```

###### Json数据格式
```
data
必选参数
cate_id             cate_id     1:水电材料 2：瓦工材料 3：木工材料 4:油漆工材料
page                    page                    订单页码(不填写默认为第一页)
limit                   limit                   每页显示条数（不填写默认为20条）
callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   brand_id        品牌id
                   brand_name      品牌
             }
msg          成功
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
111          该材料分类下没有品牌
```
# index() #
## 材料商店铺材料列表接口


### 接口地址


```
.../materials
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../materials
```

###### Json数据格式
```
data
必选参数
cate_id             cate_id     1:水电材料 2：瓦工材料 3：木工材料 4:油漆工材料
可选参数 
brand_id            brand_id  

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    
                    material_id     材料id
                    name            材料名
                    unit            单位
                    img             图片
                    spec  {
                              spec_id        规格id
                              spec_name      规格
                          }
                    price { 
                              price          价格  
                          }
             }
msg          成功
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



