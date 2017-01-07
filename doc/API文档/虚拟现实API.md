# PanoramaController #
# gettags() #
## 筛选条件标签显示


### 接口地址


```
.../panorama/gettags
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../panorama/gettags
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
                   area             area 数组            //建筑面积筛选条件
                   housetype        housetype 数组       //户型筛选条件
                   servicetag       servicetag 数组      //装修风格筛选条件
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
# index() #
## 虚拟现实列表信息


### 接口地址


```
.../panorama
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../panorama
```

###### Json数据格式
```
data
可选参数
user_id             user_id
area                area 建筑面积筛选条件数组的key 
housetype           housetype 户型筛选条件数组的key
servicetag          servicetag 装修风格筛选条件数组的key
order               order 排序 0默认 1浏览量 2点赞量 3收藏量
page                page  第几页
limit               limit 每页显示几条数据

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                   panorama_id           panorama_id            //全景图id
                   panorama_img          panorama_img           //全景图图片
                   panorama_style        panorama_style         //装修风格
                   panorama_area         panorama_area          //建筑面积
                   panorama_housetype    panorama_housetype     //户型
                   panorama_url          panorama_url           //链接地址
                   scan_num              scan_num               //浏览量
                   like_num              like_num               //点赞量
                   total                 total                  //总数据数
                   iscollected           iscollected            1:已收藏 0:未收藏
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
117           信息不存在
```
# like() #
## 虚拟现实点赞接口


### 接口地址


```
.../panorama/like
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../panorama/like
```

###### Json数据格式
```
data
panorama_id         panorama_id

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