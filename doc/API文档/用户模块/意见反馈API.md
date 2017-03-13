## 用户意见反馈API ##
### 接口地址


```
.../suggestions
```

### 接口格式

### 调用 

```
接收方式        GET     POST
```

###### Json数据格式
```
data
user_id                     用户id
content                     反馈意见内容
myfile                      图片文件
count                   

callback                    回调
```

### 回调
###### Json数据格式

```
成功
callback(
code          000
data          ""
msg           提交成功
)
```

```
失败
callback(
code          111
data          ""
msg           提交失败，请稍后重试
)
```
###### Code值含义

```
000     提交成功
111     提交失败，请稍后重试
121     没有图片被上传
131     上传失败
132     上传的文件无效

```