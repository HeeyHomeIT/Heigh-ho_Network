# MyworkcaseController #
# index() #
## 显示工长添加的案例列表信息接口


### 接口地址


```
.../myworkcase
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkcase
```

###### Json数据格式
```
data
必须参数
foreman_id          foreman_id     //工长id
可选参数
type                type           //默认为type等于1和2  1:入驻之前的作品 2：已完成的订单作品 3:未完成的订单作品
page
limit


callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    case_id         case_id                 //案例id    如果是订单case_id就为订单id
                    area            area                    //建筑面积
                    housetype       housetype               //户型
                    style           style                   //装修风格
                    timelong        timelong                //工期
                    address         address                 //房屋地址
                    scan_num        scan_num
                    like_num        like_num
                    img             {
                                          img_id         img_id
                                          case_img       case_img
                                    }
                    type            type                     //1:入驻之前的作品 2：已完成的订单作品 3:未完成的订单作品
                    total           total                    //数据总数
                    order_step      order_step               //如果是订单会返这个字段
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
117           信息不存在
112           工长id不能为空
```
# add() #
## 工长添加案例信息接口


### 接口地址


```
.../addmyworkcase
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../addmyworkcase
```

###### Json数据格式
```
data
foreman_id             foreman_id              //工长id
housetype              housetype               //户型       eg:1室1厅1卫1阳
style                  style                   //装修风格   eg:现代风格
timelong               timelong                //工期       eg:2016.12.22-2016.12.25
address                address                 //房屋地址   
myfile                 myfile 多文件数组       //图片

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
121            没有图片被上传
132            图片上传出错
131            上传失败
```
# del() #
## 工长删除案例信息接口


### 接口地址


```
.../delmyworkcase
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../delmyworkcase
```

###### Json数据格式
```
data
case_id                case_id       //案例id

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
```
# like() #
## 工长案例点赞接口


### 接口地址


```
.../myworkcase/like
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkcase/like
```

###### Json数据格式
```
data
case_id             case_id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   like_num      like_num
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
# scan() #
## 工长案例浏览量计数接口


### 接口地址


```
.../myworkcase/scan
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkcase/scan
```

###### Json数据格式
```
data
case_id             case_id

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   scan_num      scan_num
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
# edit() #
## 工长编辑案例接口


### 接口地址


```
.../myworkcase/edit
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../myworkcase/edit
```

###### Json数据格式
```
data
case_id             case_id
housetype           housetype
style               style
area                area
timelong            timelong
address             address
可选
img_id              img_id       //要删除的图片img_id(数组)
count               count        //上传的图片数        

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          "修改成功"
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
000           修改成功
121           没有图片被上传
131           图片上传失败
132           上传的图片无效
```