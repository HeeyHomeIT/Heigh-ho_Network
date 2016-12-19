# MaterialslistController #
# index() #
## 工长材料清单列表接口


### 接口地址


```
.../materialslist
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../materialslist
```

###### Json数据格式
```
data

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    ele  {
                            material_id
                            ame
                            unit
                            img
                            spec {
                                     spec_id     spec_id
                                     spec_name   spec_name
                                 }
                         }
                    brick{
                            material_id
                            ame
                            unit
                            img
                            spec {
                                     spec_id     spec_id
                                     spec_name   spec_name
                                 }
                          }
                    wood  {
                            material_id
                            ame
                            unit
                            img
                            spec {
                                     spec_id     spec_id
                                     spec_name   spec_name
                                 }
                          }
                    paint {
                            material_id
                            ame
                            unit
                            img
                            spec {
                                     spec_id     spec_id
                                     spec_name   spec_name
                                 }
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



