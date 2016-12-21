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
order_id                order_id                订单id
callback                callback                回调
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
code          206
data          ""
msg           订单号错误
)
---
callback(
code          220
data          ""
msg           预算单生成失败
)
---
callback(
code          221
data          ""
msg           结算单生成失败
)
```

---

## 获取预算单结算单字段API ##
### 接口地址


```
.../order/aeckonandactual/getlistname
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
data        array("shuidian_zj" => "水电方面总价（建筑面积）",
                "wagong_rg" => "瓦工人工（建筑面积）",
                "wagong_fztz" => "瓦工方形贴砖（铺贴面积）",
                "wagong_lxtz" => "瓦工菱形贴砖（铺贴面积）",
                "wagong_zbx" => "瓦工走边线（米数）",
                "wagong_fs" => "瓦工防水（涂刷面积）",
                "wagong_zp" => "瓦工找平（找平面积）",
                "wagong_qdq" => "瓦工砌单墙（砌墙面积）",
                "wagong_qmfs" => "瓦工墙面粉刷（粉刷面积）",
                "wagong_flsg" => "瓦工封落水管（根数）",
                "wagogn_qt" => "瓦工其他",
                "mugong_rg" => "木工人工（建筑面积）",
                "mugong_gz_high" => "木工柜子1米以上（投影面积）",
                "mugong_gz_low" => "木工柜子1米以下（长度）",
                "mugong_ct" => "木工抽屉（个数）",
                "mugong_mb" => "木工门板（个数）",
                "mugong_sgbdd_area" => "木工石膏板吊顶（面积）",
                "mugong_sgbdd_num" => "木工石膏板吊顶（张数）",
                "mugong_ftm" => "木工封头门及门套基础（个数）",
                "mugong_clh" => "木工窗帘盒（米数）",
                "mugon_qt" => "木工其他",
                "youqi_rg" => "油漆工人工（建筑面积）",
                "youqi_pwgb" => "油漆工铺网格布（卷数）",
                "youqi_stl" => "油漆工刷涂料（施工面积）",
                "youqi_qt" => "油漆其他",
                "remark" => "备注"
msg          返回预算单字段名成功
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
data
order_id                order_id                订单id
shuidian_zj             shuidian_zj             
wagong_rg               wagong_rg        
wagong_fztz             wagong_fztz        
wagong_lxtz             wagong_lxtz        
wagong_zbx              wagong_zbx        
wagong_fs               wagong_fs        
wagong_zp               wagong_zp        
wagong_qdq              wagong_qdq        
wagong_qmfs             wagong_qmfs        
wagong_flsg             wagong_flsg        
wagogn_qt               wagogn_qt        
mugong_rg               mugong_rg        
mugong_gz_high          mugong_gz_high        
mugong_gz_low           mugong_gz_low        
mugong_ct               mugong_ct        
mugong_mb               mugong_mb        
mugong_sgbdd_area       mugong_sgbdd_area        
mugong_sgbdd_num        mugong_sgbdd_num        
mugong_ftm              mugong_ftm        
mugong_clh              mugong_clh        
mugon_qt                mugon_qt        
youqi_rg                youqi_rg        
youqi_pwgb              youqi_pwgb        
youqi_stl               youqi_stl        
youqi_qt                youqi_qt        
remark                  remark    
callback                callback                回调
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
code          206
data          ""
msg           订单号错误
)
---
callback(
code          222
data          ""
msg           插入失败
)
---
callback(
code          223
data          ""
msg           数据不能为空
)
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
data
order_id                order_id                订单id
shuidian_zj             shuidian_zj             
wagong_rg               wagong_rg        
wagong_fztz             wagong_fztz        
wagong_lxtz             wagong_lxtz        
wagong_zbx              wagong_zbx        
wagong_fs               wagong_fs        
wagong_zp               wagong_zp        
wagong_qdq              wagong_qdq        
wagong_qmfs             wagong_qmfs        
wagong_flsg             wagong_flsg        
wagogn_qt               wagogn_qt        
mugong_rg               mugong_rg        
mugong_gz_high          mugong_gz_high        
mugong_gz_low           mugong_gz_low        
mugong_ct               mugong_ct        
mugong_mb               mugong_mb        
mugong_sgbdd_area       mugong_sgbdd_area        
mugong_sgbdd_num        mugong_sgbdd_num        
mugong_ftm              mugong_ftm        
mugong_clh              mugong_clh        
mugon_qt                mugon_qt        
youqi_rg                youqi_rg        
youqi_pwgb              youqi_pwgb        
youqi_stl               youqi_stl        
youqi_qt                youqi_qt        
remark                  remark    
callback                callback                回调
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
code          206
data          ""
msg           订单号错误
)
---
callback(
code          222
data          ""
msg           插入失败
)
---
callback(
code          223
data          ""
msg           数据不能为空
)
```