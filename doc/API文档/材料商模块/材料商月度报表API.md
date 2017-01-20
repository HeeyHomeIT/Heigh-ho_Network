# MaterialsupplierReportsController #
# monthlyReport()
## 材料商月度报表接口

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

material_supplier_id        材料商id
month                       日期（例：201701）
callback                
```

### 回调
###### Json数据格式

```
成功
callback(
code         000    
data         "hydropower" : 0            //水电工
             "plaster" : 4500         //瓦工
             "wood" : 5000         //木工
             "paint" : 100000       //油漆工
             "other" : 0            //其他
msg          查询成功
)
```
