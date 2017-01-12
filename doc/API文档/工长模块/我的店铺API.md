# MyshopController #
# index() #
## 读取我的店铺信息接口


### 接口地址


```
.../personal/myshop
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myshop
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
                    shop_id              shop_id
                    shopper_id           shopper_id             //工长id
                    shop_name            shop_name              //店铺名
                    authentication       authentication 数组    //店铺认证  1:保证金 2:团队保险 3:平台实名认证 4:两年质保维修
                    opentime             opentime               //开店时间   
                    servicetag           servicetag 数组        //擅长风格
                    servicearea          servicearea 数组       //服务区域
                    foremanimg           foremanimg             //工长个人头像
                    shop_address         shop_address           //地址
                    shop_describe        shop_describe          //店铺理念(签名)
                    shop_scan            shop_scan              //店铺浏览量
                    shop_volume          shop_volume            //店铺成交量
                    collectnum           collectnum             //收藏量
                    shop_imgs            {
                                               id               id
                                               shop_img         shop_img
                                               is_face          is_face
                                         }
                    shop_technics        {
                                               id                id
                                               technics_text     technics_text
                                               technics_img      {
                                                                      img_id         img_id
                                                                      technics_img   technics_img
                                                                 }
                                         }
                    workcase             {
                                               case_id      case_id
                                               area         area              //建筑面积
                                               housetype    housetype         //户型
                                               style        style             //装修风格
                                               timelong     timelong          //工期
                                               address      address           //地址
                                               case_img     { 
                                                                 img_id        img_id
                                                                 case_img      case_img
                                                            }
                                         }
                    shop_score           shop_score             //店铺评分
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
114           店铺不存在
```
# edit() #
## 编辑店铺信息接口


### 接口地址


```
.../personal/myshop/change
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/myshop/change
```

###### Json数据格式
```
data
必选参数
shop_id                shop_id
可选参数
shop_name              shop_name              //店铺名称
servicetag             servicetag 数组        //擅长风格
servicearea            servicearea 数组       //服务区域
shop_address           shop_address           //店铺地址
shop_describe          shop_describe          //店铺理念

callback               callback
```
### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
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
000            保存成功
112            店铺id不能为空
114            店铺不存在
111            保存失败
```