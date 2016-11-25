# CollectimgController #
# index()
## 全景图收藏列表接口


### 接口地址


```
.../personal/collection/panorama
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../personal/collection/panorama
```

###### Json数据格式
```
data
必选参数
user_id           user_id      //用户id
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
                    iscollected_id   iscollected_id      //全景图id
                    collect_time     collect_time        //收藏时间
                    isdel            isdel               //是否删除
                    picture          picture             //全景图封面图
                    url              url                 //全景图链接地址
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
```