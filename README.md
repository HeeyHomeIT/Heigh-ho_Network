# Heigh-ho_Network
## 网站文件目录结构v1.0

```		
	Heigh-ho_Network/  根目录
	├── doc/  开发文档
	│   └── web/ 前端开发文件存放处
	├── heeyhome_web/  前台目录
	│   ├── build/  用于上传的工程目录
	│   ├── src/  开发源文件（未经grunt处理）
	│   │ 	├── css/  存放所有的css样式
	│   │	│	├── common 存放公共的css样式
	│	│	│	└── img 存放css中所引用的背景修饰图片
	│   │ 	├── image/  放置公用图片文件
	│   │ 	├── js/  存放所有的js样式
	│	│	│	├── common  存放公共的 javascript 文件
	│	│	│	├── heeyHomeXXX  独立模块（以heeyHome 名字开头）
	│	│	│	│	├── controller  相关的子模板的controller.js存放在这里
	│	│	│	│	├── directives  相关的directive.js存放在这里
	│	│	│	│	├── xxx_app.js  (app模型定义和路由配置文件)
	│	│	│	│	├── xxx_main.js  (requirejs的入口和配置文件)
	│	│	│	│	└── xxx_services.js  (app的相关服务配置文件)
	│   │ 	├── lib/  第三方类库
	│	│	│	├── angular
	│	│	│	├── bootstrap
	│	│	│	├── jquery
	│	│	│	└── requirejs
	│   │ 	├── tpl/  子模板目录
	│   │ 	├── view/  页面目录
	│	│	│	├── common  公共页面目录
	│	│	│	└── vXXX  相关独立页面目录
	│   │ 	├── 404.html  错误页面HTML
	│   │ 	└── index.html  程序的总入口点，用以根据配置跳转到各个模块入口
	│   ├── node_modules/  grunt目录（不能上传）
	│   ├── test/  测试目录
	│   ├── temp/  个人目录
	│   ├── Gruntfile.js
	│   ├── package.json 
	│   ├── .jshintrc 
	│   ├── .csslintrc 
	│   └── favicon.ico  系统icon图标 
	├── heeyhome_webapi/  后台目录
	└── README.md
```