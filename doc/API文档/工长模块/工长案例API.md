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
                    case_id         case_id                 //案例id
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