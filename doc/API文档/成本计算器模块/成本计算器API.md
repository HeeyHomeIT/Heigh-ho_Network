# CostCalculatorController #
# costCalculator()
## 成本计算器接口

### 接口地址

```
.../costcalculator/count
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
calculator_json     calculator_json     计算器数据（json封装）
{
    city                city,                城市中文名（例如：苏州市）
    area                area,                面积
    room_num            room_num,            房间数
    parlor_num          parlor_num,          客厅书
    bathroom_num        bathroom_num,        卫生间数
    balcony_num         balcony_num,         阳台数
    floor               floor,               楼层数（0代表有电梯，其他数字代表楼层）    
    wall                wall,                墙体改造（true false）
    ground_sank         ground_sank,         卫生间地面下沉（true false）
    room_distribution   array{  
                                'master'=>'1',          //主卧数量
                                'second'=>'1',          //次卧数量
                                'child'=>'1',           //儿童房数量
                                'parent'=>'0',          //父母房数量
                                'cloakroom'=>'0',       //衣帽间数量
                                'study'=>'0'            //书房数量
                            },
    （以上参数为必填项，以下参数为选填）
    //主卧参数
    master_distribution array{  
    //地面处理方式 TODO 例：实木地板：smdb 强化复合地板：qhfhdb 瓷砖：cz
                                'ground'=>'smdb',       
    //衣柜制作方式 TODO 例：木工制作衣柜：true 自行购买衣柜：false
                                'wardrobe'=>'true',     
    //木工制作吊顶 TODO 例：需要：true 不需要：false                            
                                'ceiling'=>'true',      
    //墙面铺设墙纸 TODO 例：需要：true 不需要：false
                                'wallpaper'=>'false',   
    //有无飘窗结构 TODO 例：有飘窗：true 没有飘窗：false
                                'window'=>'true'        
                            },
    //儿童房参数                        
    child_distribution array{
                                'ground'=>'smdb',
                                'wardrobe'=>'true',                           
                                'ceiling'=>'true',
                                'wallpaper'=>'false',
                                'window'=>'true'     
    //榻榻米的制作 TODO 例：木工制作榻榻米：true 自行购买榻榻米：false
                                'tatami'=>'true'
    //书桌书架选择 TODO 例：木工制作简易书桌书架：true 购买成品书桌书架：false
                                'desk'=>'true'
                            },
    //次卧参数                        
    second_distribution     array{...},
    //父母房参数
    parent_distribution     array{...},
    //衣帽间参数
    cloakroom_distribution  array{...},
    //书房参数
    study_distribution      array{...},
                            
callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                sdrg        $sdrg,          //水电人工
                wgrg        wgrg,           //瓦工人工
                mgrg        mgrg,           //木工人工
                yqgrg       yqgrg,          //油漆工人工
                zgrg        zgrg,           //杂工人工
                rgzj        rgzj,           //人工总价
                zdsdcl      zdsdcl,         //中端水电材料
                gdsdcl      gdsdcl,         //高端水电材料
                wgfc        wgfc,           //瓦工辅材
                mgfc        mgfc,           //木工辅材
                yqcl        yqcl,           //油漆材料
                czdd        czdd,           //瓷砖低端
                czgd        czgd,           //瓷砖高端
                bc          bc,             //板材
                dls         dls,            //大理石
                db          db,             //地板
                mm          mm,             //木门
                cfym        cfym,           //厨房移门
                lyfym       lyfym,          //淋浴移门
                ygym        ygym,           //衣柜移门
                jcdd        jcdd,           //集成吊顶
                cgsys       cgsys           //橱柜石英石
             }
msg          计算成功
)
```

```
失败
callback(
code          200
data          ""
msg           暂未开放此城市
)
```

###### Code值含义

```
000     计算成功
200     暂未开放此城市（参数错误、参数错误，面积不在计算器计算范围）

```