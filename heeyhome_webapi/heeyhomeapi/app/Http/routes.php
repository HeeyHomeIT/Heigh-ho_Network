<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    /*banner图*/
    Route::any('banner', 'BannerController@index');
    /*虚拟现实*/
    Route::any('panorama/gettags', 'PanoramaController@gettags');
    Route::any('panorama', 'PanoramaController@index');
    Route::any('panorama/like', 'PanoramaController@like');
    Route::any('panorama/scan', 'PanoramaController@scan');
    /*家装百科*/
    Route::any('jzbk/cate', 'HomeEncyclopediaController@showcate');
    Route::any('jzbk/article', 'HomeEncyclopediaController@showarticle');
    Route::any('jzbk/info', 'HomeEncyclopediaController@info');
    /*登录*/
    Route::any('login/login', 'LoginController@login');
    /*qq第三方登录*/
    Route::any('qqlogin', 'QqLoginController@qqlogin');
    Route::any('qqcallback', 'QqLoginController@qqcallback');
    Route::any('bindingQQ', 'QqLoginController@bindingQQLogin');
    /*wechat第三方登录*/
    Route::any('wxlogin', 'WxLoginController@wxlogin');
    Route::any('wxcallback', 'WxLoginController@wxcallback');
    Route::any('bindingWX', 'WxLoginController@bindingWXLogin');
    /*用户注册*/
    Route::any('register/user_register', 'RegisterController@user_register');
    /*发送短信*/
    Route::any('sendsms', 'SmsController@sms_send');
    /*发送邮箱*/
    Route::any('sendmail', 'MailController@emailsend');
    /*修改密码*/
    Route::any('editpassword/smsedit', 'EditPasswordController@smsedit');
    Route::any('editpassword/initialpwd', 'EditPasswordController@initialpwd');
    Route::any('editpassword', 'EditPasswordController@editpassword');
    /*用户个人资料*/
    Route::any('personal/userinfo', 'UserinfoController@index');
    Route::any('personal/userinfo/change', 'UserinfoController@edit');
    /*工长个人资料*/
    Route::any('personal/foremaninfo', 'ForemaninfoController@index');
    Route::any('personal/foremaninfo/change', 'ForemaninfoController@edit');
    /*用户头像*/
    Route::any('personal/portrait', 'PortraitController@index');
    Route::any('personal/portrait/change', 'PortraitController@fileupload');
    /*登录历史*/
    Route::any('personal/loginhistory', 'GetloginrecordController@index');
    /*手机验证*/
    Route::any('verification/phoneverify', 'PhoneVerifyController@verify');
    /*邮箱验证*/
    Route::any('verification/emailverify', 'EmailVerifyController@verify');
    /*重置密码*/
    Route::any('resetpassword', 'ResetPasswordController@resetpassword');
    /*收货地址*/
    Route::any('personal/drive_address', 'DriveaddressController@index');
    Route::any('personal/drive_address/add', 'DriveaddressController@add');
    Route::any('personal/drive_address/change', 'DriveaddressController@edit');
    Route::any('personal/drive_address/del', 'DriveaddressController@del');
    Route::any('personal/drive_address/setdefault', 'DriveaddressController@setdefault');
    /*消息中心*/
    Route::any('personal/message', 'MessageController@index');
    Route::any('personal/message/del', 'MessageController@del');
    Route::any('personal/message/empty', 'MessageController@delall');
    Route::any('personal/message/isnew', 'MessageController@isnew');
    Route::any('personal/message/read', 'MessageController@read');
    Route::any('personal/message/readall', 'MessageController@readall');
    /*收藏全景图*/
    Route::any('panorama/collect', 'CollectimgController@collect');
    /*收藏店铺*/
    Route::any('shop/collect', 'CollectshopController@collect');
    /*我的店铺*/
    Route::any('personal/myshop/stylelist', 'MyshopController@stylelist');
    Route::any('personal/myshop', 'MyshopController@index');
    Route::any('personal/myshop/change', 'MyshopController@edit');
    /*店铺图片*/
    Route::any('personal/myshop/imgs', 'MyshopimgController@index');
    Route::any('personal/myshop/uploadimg', 'MyshopimgController@upload');
    Route::any('personal/myshop/imgsetface', 'MyshopimgController@setface');
    Route::any('personal/myshop/del', 'MyshopimgController@del');
    /*店铺工艺*/
    Route::any('personal/myshop/technics', 'MyshoptechnicsController@index');
    Route::any('personal/myshop/addtechnics', 'MyshoptechnicsController@add');
    Route::any('personal/myshop/deltechnics', 'MyshoptechnicsController@del');
    /*安全等级*/
    Route::any('personal/safe', 'SafeLevelController@index');
    /*身份认证*/
    Route::any('personal/safe/auth', 'IDCardController@index');
    Route::any('personal/safe/authverify', 'IDCardController@cardverify');
    /*绑定手机*/
    Route::any('personal/safe/phoneverify', 'EditPhoneController@verify');
    Route::any('personal/safe/phonechange', 'EditPhoneController@edit');
    /*绑定邮箱*/
    Route::any('personal/safe/emailverify', 'EditMailController@verify');
    Route::any('personal/safe/emailchange', 'EditMailController@edit');
    /*我的员工*/
    Route::any('myworkers/workercate', 'MyworkersController@cate');
    Route::any('myworkers', 'MyworkersController@workerlist');
    Route::any('myworkers/workerinfo', 'WorkerController@workerinfo');
    Route::any('myworkers/pricelist', 'WorkerpricelistController@index');
    Route::any('myworkers/addworker', 'WorkerController@add');
    Route::any('myworkers/changeworker', 'WorkerController@edit');
    Route::any('myworkers/delworker', 'WorkerController@del');
    /*我的收藏-全景图*/
    Route::any('personal/collection/panorama', 'CollectimgController@index');
    /*我的收藏-店铺*/
    Route::any('personal/collection/shop', 'CollectshopController@index');
    /*我的收藏-删除*/
    Route::any('personal/collection/panoramadel', 'CollectimgController@del');
    Route::any('personal/collection/shopdel', 'CollectshopController@del');
    /*店铺列表*/
    Route::any('shoplist/gettags', 'ShoplistController@gettags');
    Route::any('shoplist', 'ShoplistController@index');
    /*店铺详情*/
    Route::any('shopinfo', 'ShopdetailController@index');
    /*添加银行卡*/
    Route::any('bankcard/getname', 'BankCardController@getname');
    Route::any('bankcard/getcardtype', 'BankCardController@getcardtype');
    Route::any('bankcard/cardverify', 'BankCardController@cardverify');
    /*我的作品案例*/
    Route::any('myworkcase', 'MyworkcaseController@index');
    Route::any('addmyworkcase', 'MyworkcaseController@add');
    Route::any('delmyworkcase', 'MyworkcaseController@del');
    Route::any('myworkcase/like', 'MyworkcaseController@like');
    Route::any('myworkcase/scan', 'MyworkcaseController@scan');
    Route::any('myworkcase/edit', 'MyworkcaseController@edit');
    /*工长材料清单*/
    Route::any('materialslist', 'MaterialslistController@index');
    /*我的钱包*/
    Route::any('mywallet', 'WalletController@index');
    /*提现申请*/
    Route::any('withdraw/apply', 'WalletController@apply');
    /*我的银行卡*/
    Route::any('mybankcards', 'WalletController@mycards');
    /*账单明细*/
    Route::any('mywallet/bill', 'WalletController@bill');
    /*单条明细删除*/
    Route::any('mywallet/bill/del', 'WalletController@del');

    /*材料*/
    //材料列表
    Route::any('materials/brands', 'MaterialController@brand');
    Route::any('materials', 'MaterialController@materials');


    //成本计算器
    //成本计算
    Route::any('costcalculator/count', 'CostCalculatorController@costCalculator');
    //收藏成本计算结果
    Route::any('costcalculator/result/collect', 'CostCalculatorController@collectCalculatorResult');
    //获取已收藏的成本计算结果
    Route::any('costcalculator/result/get', 'CostCalculatorController@getCalculatorResult');
    //删除已收藏的成本计算结果
    Route::any('costcalculator/result/del', 'CostCalculatorController@delCostCalculatorResult');

    /*订单*/
    /*订单生成api*/
    Route::any('order/client/produce', 'OrderController@orderProduce');
    //查询订单状态及步骤
    Route::any('order/client/selstatus', 'OrderController@orderStatusSel');
    //用户订单列表
    Route::any('order/client/list', 'OrderController@orderListUser');
    //店铺订单列表
    Route::any('order/shop/list', 'OrderController@orderListFeroman');
    //店铺订单列表（筛选）
    Route::any('order/shop/listfilter', 'OrderController@orderListFeromanFilter');
    //取消订单
    Route::any('order/client/destory', 'OrderController@orderDestroy');
    //确认订单
    Route::any('order/shop/confirm', 'OrderController@orderConfirm');
    //生成预算单与结算单
    Route::any('order/aeckonandactual/generatelist', 'OrderOperateController@generateActualListAndReckonList');
    //生成装修人员订单
    Route::any('order/generateOrderWorker', 'OrderOperateController@generateOrderWorker');
    //获取预算单结算单字段
    Route::any('order/aeckonandactual/getlistname', 'OrderOperateController@getActualDataAndReckonData');
    //获取预算单结算单字段(分类)
    Route::any('order/aeckonandactual/getlistnamebylist', 'OrderOperateController@getActualDataAndReckonDataList');
    //添加预算单与结算单数据
    Route::any('order/aeckonandactual/adddate', 'OrderOperateController@addActualDataAndReckonData');
    //修改结算单数据
    Route::any('order/aeckonandactual/update', 'OrderOperateController@updateActualData');
    //获取预算单结算单数据
    Route::any('order/aeckonandactual/getlistdata', 'OrderOperateController@getActualAndReckonData');
    //查询预结算单数据和付款信息
    Route::any('order/aeckonandactual/seldata', 'OrderOperateController@searchActualDataAndReckonData');
    //查询预结算单编辑状态
    Route::any('order/aeckonandactual/selstatus', 'OrderOperateController@getActualReckonStatus');
    //生成订单纠纷表
    Route::any('order/dispute/generate', 'OrderOperateController@generateOrderCandd');
    //插入纠纷数据
    Route::any('order/dispute/update', 'OrderOperateController@intoOrderCandd');
    //插入纠纷解决方式数据
    Route::any('order/dispute/updateresult', 'OrderOperateController@intoOrderCanddResult');
    //更改纠纷订单状态为已解决
    Route::any('order/dispute/changetype', 'OrderOperateController@changeOrderCanddFinish');
    //添加材料订单
    Route::get('order/material/produce', 'OrderMaterialController@generateOrderMaterial');
    //用户材料订单数据获取
    Route::get('order/material/userget', 'OrderMaterialController@getMaterialListData');
    //用户确认材料单线下购买
    Route::get('order/material/outMaterialByUser', 'OrderMaterialController@outMaterialByUser');
    //订单详情
    Route::any('order/detail', 'OrderDisplayController@orderDetailsToShow');
    //获取上门预约时间
    Route::any('order/appointment', 'OrderController@appointment');
    //查询或添加装修风格
    Route::any('order/style/addhousestyle', 'OrderController@addHouseStyle');
    Route::any('order/shop/destory', 'OrderController@orderDestroy');
    //用户退款信息获取
    Route::any('order/user/getrefundinfo', 'OrderPayController@getRefundInfo');


    //材料订单
    //获取材料订单列表
    Route::any('order/material/getlist', 'OrderMaterialController@getMaterialList');
    //获取材料商订单未完成、已完成、正在完成数量
    Route::any('order/materialCount', 'OrderMaterialController@getOrderMaterialCount');
    //根据状态未完成、已完成、正在完成获取材料订单
    Route::any('order/materialByStatus', 'OrderMaterialController@materialOrderByStatus');
    //查询材料订单订单详情
    Route::any('order/material/getOrderMaterialDetails', 'OrderMaterialController@getOrderMaterial');
    //材料商更新材料单状态为去配送中
    Route::any('order/material/changeMaterialStatus', 'OrderMaterialController@changeMaterialStatus');

    
});

Route::group(['prefix' => 'admin', 'namespace' => 'Admin','middleware' => ['web','admin.login']], function()
{

    Route::any('loginout', 'LoginController@loginout');
    Route::any('index', function(){
        return view('index');
    });
    Route::any('webset','IndexController@webset');
    Route::any('editpassword', function (){
        return view('editpassword');
    });
    /*轮播图*/
    Route::any('banner', 'BannerController@index');
    Route::any('addbanner', function (){
        return view('addbanner');
    });
    Route::any('banner/add', 'BannerController@add');
    Route::any('banner/changeorder', 'BannerController@changeorder');
    Route::any('banner/del', 'BannerController@del');
    Route::any('adminlist', 'AdminUserController@index');
    Route::any('addadminuser', function (){
        return view('addadminuser');
    });
    Route::any('adminuser/add', 'AdminUserController@add');
    Route::any('adminuser/del', 'AdminUserController@del');
    Route::any('adminuser/editpwd', 'AdminUserController@editpwd');
    /*虚拟现实*/
    Route::any('panorama', 'PanoramaController@index');
    Route::get('addpanorama', function () {
        return view('addpanorama');
    });
    Route::any('panorama/add', 'PanoramaController@add');
    Route::any('panorama/del', 'PanoramaController@del');
    Route::any('panorama/delall', 'PanoramaController@delall');
    /*家装百科*/
    Route::any('homeencyclopedia', 'HomeEncyclopediaController@index');
    Route::any('addhomeencyclopediacate', 'HomeEncyclopediaController@cate');
    Route::any('homeencyclopediacate/changeorder', 'HomeEncyclopediaController@changeorder');
    Route::any('homeencyclopediacate/del', 'HomeEncyclopediaController@catedel');
    Route::any('addhomeencyclopediaarticle', 'HomeEncyclopediaController@createarticle');
    Route::any('homeencyclopedia/addcate', 'HomeEncyclopediaController@addcate');
    Route::any('homeencyclopedia/addarticle', 'HomeEncyclopediaController@addarticle');
    Route::any('homeencyclopedia/del', 'HomeEncyclopediaController@del');
    Route::any('homeencyclopedia/edit/{id}', 'HomeEncyclopediaController@edit');
    Route::any('homeencyclopedia/editarticle', 'HomeEncyclopediaController@editarticle');
    Route::any('homeencyclopedia/delall', 'HomeEncyclopediaController@delall');
    /*工长入驻*/
    Route::any('foreman', 'ForemanController@index');
    Route::any('addforeman', function(){
        return view('addforeman');
    });
    Route::any('addforeman/pricelist/{shop_id}', 'ForemanController@pricelist');
    Route::any('addforeman/addprice', 'ForemanController@addprice');
    Route::any('editforeman/{id}', 'ForemanController@editforeman');
    Route::any('foreman/edit', 'ForemanController@edit');
    Route::any('foreman/add', 'ForemanController@add');
    Route::any('foreman/del', 'ForemanController@del');
    Route::any('foreman/delall', 'ForemanController@delall');
    /*提现申请*/
    Route::any('application', 'ApplicationController@index');
    Route::any('application/process/{id}','ApplicationController@process');
    Route::any('application/doprocess','ApplicationController@doprocess');
    Route::any('application/info/{id}','ApplicationController@info');
    /*实名认证*/
    Route::any('verification', 'VerifyController@index');
    Route::any('verification/verify/{id}', 'VerifyController@verify');
    Route::any('verification/doverify', 'VerifyController@doverify');
    /*材料*/
    Route::any('materials', 'MaterialController@index');
    Route::any('addmaterial', 'MaterialController@addmaterial');
    Route::any('material/add', 'MaterialController@add');
    Route::any('material/del', 'MaterialController@del');
    Route::any('material/editmaterial/{id}', 'MaterialController@editmaterial');
    Route::any('material/edit', 'MaterialController@edit');
    Route::any('addmaterialspec', 'MaterialController@addspec');
    Route::any('materialspec/add', 'MaterialController@specadd');
    Route::any('addmaterialprice', 'MaterialController@addprice');
    Route::any('materialprice/add', 'MaterialController@priceadd');
    /*材料商*/
    Route::any('supplierlist', 'SupplierController@index');
    Route::any('addsupplier', function(){
        return view('addsupplier');
    });
    Route::any('supplier/add', 'SupplierController@add');
    /*装修订单*/
    Route::any('orderlist', 'OrderController@index');
    /*退款申请*/
    Route::any('refundlist', 'RefundController@index');
    Route::any('refund/info/{id}', 'RefundController@info');
    Route::any('refund/process/{id}','RefundController@process');
    Route::any('refund/doprocess','RefundController@doprocess');

});

//支付宝视图接口
Route::any('/alipay/pay', function () {
    return view('alipayapi');
});
//支付宝同步回调接口
Route::any('/alipay/return_url', function () {
    return view('return_url');
});
//支付宝异步回调接口
Route::any('/alipay/notify_url', function () {
    return view('notify_url');
});

Route::group(['prefix' => 'admin', 'namespace' => 'Admin','middleware' => 'web'], function()
{
    Route::any('/', function (){
        return view('login');
    });
    Route::any('login', 'LoginController@login');
});