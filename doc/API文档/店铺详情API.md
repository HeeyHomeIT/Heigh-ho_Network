# ShopdetailController #
# index() #
## 店铺详情信息接口


### 接口地址


```
.../shopinfo
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../shopinfo
```

###### Json数据格式
```
data
shop_id             shop_id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    shopper_id           shopper_id             //工长id
                    shop_name            shop_name              //店铺名
                    authentication       authentication 数组    //店铺认证  1:保证金 2:团队保险 3:平台实名认证 4:两年质保维修
                    opentime             opentime               //开店时间   
                    servicetag           servicetag 数组        //擅长风格
                    servicearea          servicearea 数组       //服务区域
                    shop_address         shop_address
                    shop_workernum       shop_workernum         //施工团队
                    shop_describe        shop_describe          //店铺理念(签名)
                    shop_imgs            {
                                               id               id
                                               shop_img         shop_img
                                               is_face          is_face
                    shopper_info         {
                                               foremaninfo_realname    foremaninfo_realname
                                               home_province           home_province
                                               home_city               home_city
                                               worktime                worktime                    //工龄
                                               experience              experience 数组             //从业经历
                                               decoratedareas          decoratedareas 数组         //装修小区
                                               portrait_img            portrait_img               //工长头像
                                               ordernum                ordernum                   //接单数
                                         }
                    shop_score           {
                                                projectquality          projectquality     //工程质量评分
                                                serviceattitude         serviceattitude    //服务态度评分
                                                overallmerit            overallmerit       //综合评价
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
000           成功
112           店铺id不能为空
111           店铺不存在
```