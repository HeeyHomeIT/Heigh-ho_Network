# CostCalculatorController #
# collectCalculatorResult()
## 收藏成本计算器结果接口

### 接口地址

```
.../costcalculator/result/collect
```

### 接口格式

### 调用

```
接收方式        GET     POST
```

```
.../costcalculator/count
```

###### Json数据格式
```
data
user_id                     user_id,
calculator_result_json      calculator_result_json     计算器数据（json封装）
{
            city            city,
            area            area,
            room_num        room_num,
            parlor_num      parlor_num,   
            bathroom_num    bathroom_num,
            balcony_num     balcony_num,
            sdrg            sdrg,          //水电人工
            wgrg            wgrg,           //瓦工人工
            mgrg            mgrg,           //木工人工
            yqgrg           yqgrg,          //油漆工人工
            zgrg            zgrg,           //杂工人工
            rgzj            rgzj,           //人工总价
            zdsdcl          zdsdcl,         //中端水电材料
            gdsdcl          gdsdcl,         //高端水电材料
            wgfc            wgfc,           //瓦工辅材
            mgfc            mgfc,           //木工辅材
            yqcl            yqcl,           //油漆材料
            czdd            czdd,           //瓷砖低端
            czgd            czgd,           //瓷砖高端
            bc              bc,             //板材
            dls             dls,            //大理石
            db              db,             //地板
            mm              mm,             //木门
            cfym            cfym,           //厨房移门
            lyfym           lyfym,          //淋浴移门
            ygym            ygym,           //衣柜移门
            jcdd            jcdd,           //集成吊顶
            cgsys           cgsys,          //橱柜石英石
            zj              zj              //装修总价
  },
callback                    callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          收藏成功
)
```

```
失败
callback(
code          200
data          ""
msg           收藏失败
)
```

###### Code值含义

```
000     收藏成功
200     收藏失败

```

# collectCalculatorResult()
## 获取收藏的成本计算器结果接口

### 接口地址

```
.../costcalculator/result/get
```

### 接口格式

### 调用

```
接收方式        GET     POST
```

```
.../costcalculator/count
```

###### Json数据格式
```
data
user_id                     user_id,
calculator_results_id       calculator_results_id  （可选项，填入计算器结果id则返还单条数据）
callback                    callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
            id                      id,
            calculator_results_id   calculator_results_id,
            user_id                 user_id,
            calculator_results_time calculator_results_time,   
            city                    city,
            housetype_id            housetype_id,
            area                    area,           //面积
            room                    room,           //房间数
            parlour                 parlour,        //客厅数
            toilet                  toilet,         //卫生间数
            balcony                 balcony,        //阳台数
            gzrg                    gzrg            //工长工资
            sdrg                    sdrg,           //水电人工
            wgrg                    wgrg,           //瓦工人工
            mgrg                    mgrg,           //木工人工
            yqgrg                   yqgrg,          //油漆工人工
            zgrg                    zgrg,           //杂工人工
            rgzj                    rgzj,           //人工总价
            zdsdcl                  zdsdcl,         //中端水电材料
            gdsdcl                  gdsdcl,         //高端水电材料
            wgfc                    wgfc,           //瓦工辅材
            mgfc                    mgfc,           //木工辅材
            yqcl                    yqcl,           //油漆材料
            czdd                    czdd,           //瓷砖低端
            czgd                    czgd,           //瓷砖高端
            bc                      bc,             //板材
            dls                     dls,            //大理石
            db                      db,             //地板
            mm                      mm,             //木门
            cfym                    cfym,           //厨房移门
            lyfym                   lyfym,          //淋浴移门
            ygym                    ygym,           //衣柜移门
            jcdd                    jcdd,           //集成吊顶
            cgsys                   cgsys,          //橱柜石英石
            zj                      zj              //装修总价
  },
msg          查询成功
)
```

```
失败
callback(
code          200
data          ""
msg           查询失败，没有数据
)
```

###### Code值含义

```
000     查询成功
200     查询失败，没有数据

```