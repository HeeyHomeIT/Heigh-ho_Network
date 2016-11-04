# HomeEncyclopediaController #
# showcate #
## 获取家装百科分类接口


### 接口地址


```
.../public/jzbk/cate
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/jzbk/cate
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
                    id               id              //序号
                    cate_name        cate_name 
                    cate_describe    cate_describe
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
# showarticle #
## 获取文章列表接口


### 接口地址


```
.../public/jzbk/article
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/jzbk/article
```

###### Json数据格式
```
data
必选参数
cate_id           cate_id      //所属分类id
可选参数 
page              page         //当前页
limit             limit        //每页显示数目

callback          callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    id               id                  //序号
                    article_title    article_title       //文章标题
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
112           cate_id不能为空
```
# info
## 获取文章详情接口


### 接口地址


```
.../public/jzbk/info
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../public/jzbk/info
```

###### Json数据格式
```
data
id               id      //文章序号

callback         callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    id                id                 //序号
                    article_content   article_content    //内容
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
112           id不能为空
```