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
    /*家装百科*/
    Route::any('jzbk/cate', 'HomeEncyclopediaController@showcate');
    Route::any('jzbk/article', 'HomeEncyclopediaController@showarticle');
    Route::any('jzbk/info', 'HomeEncyclopediaController@info');

    /*登录*/
    Route::any('login/login', 'LoginController@login');
    /*qq第三方登录*/
    Route::any('qqlogin', 'QqLoginController@qqlogin');
    Route::any('qqcallback', 'QqLoginController@qqcallback');
    /*wechat第三方登录*/
    Route::any('wxlogin', 'WxLoginController@wxlogin');
    Route::any('wxcallback', 'WxLoginController@wxcallback');
    /*用户注册*/
    Route::any('register/user_register', 'RegisterController@user_register');
    /*工长注册*/
    Route::any('register/gz_register', 'RegisterController@gz_register');
    /*发送短信*/
    Route::any('sendsms', 'SmsController@sms_send');
    /*发送邮箱*/
    Route::any('sendmail', 'MailController@emailsend');
    /*修改密码*/
    Route::any('editpassword', 'EditpasswordController@editpassword');

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
    /*确认账号*/
    Route::any('verification/confirm', 'AccountconfirmController@confirm');
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
    Route::any('personal/message/isnew', 'MessageController@isnew');
    Route::any('personal/message/read', 'MessageController@read');
    /*收藏全景图*/
    Route::any('panorama/collect', 'CollectimgController@collect');
    /*收藏成本结果*/

    /*收藏店铺*/
    Route::any('shop/collect', 'CollectshopController@collect');
    /*我的店铺*/
    Route::any('personal/myshop/stylelist', 'MyshopController@stylelist');
    Route::any('personal/myshop', 'MyshopController@index');
    Route::any('personal/myshop/change', 'MyshopController@edit');
    /*上传店铺图片*/
    Route::any('personal/myshop/uploadimg', 'ShopimgController@upload');
    Route::any('personal/myshop/imgsetface', 'ShopimgController@setface');
    Route::any('personal/myshop/del', 'ShopimgController@del');
    /*添加店铺工艺*/
    Route::any('personal/myshop/technics', 'MyshoptechnicsController@add');
    /*身份认证*/
    Route::any('personal/safe/cardverify', 'IDCardController@cardverify');
    /*绑定手机*/
    Route::any('personal/safe/phoneverify', 'EditPhoneController@verify');
    Route::any('personal/safe/phonechange', 'EditPhoneController@edit');
    /*绑定邮箱*/
    Route::any('personal/safe/emailverify', 'EditMailController@verify');
    Route::any('personal/safe/emailchange', 'EditMailController@edit');
    /*我的员工*/
    Route::any('personal/myworkers', 'MyworkersController@index');
    Route::any('personal/myworkers/add', 'MyworkersController@add');
    Route::any('personal/myworkers/change', 'MyworkersController@edit');
    Route::any('personal/myworkers/del', 'MyworkersController@del');
    /*我的收藏-全景图*/
    Route::any('personal/collection/panorama', 'CollectimgController@index');
    /*我的收藏-店铺*/
    Route::any('personal/collection/shop', 'CollectshopController@index');
    /*我的收藏-删除*/
    Route::any('personal/collection/del', 'CollectshopController@del');
    /*店铺列表*/
    Route::any('shoplist/gettags', 'ShoplistController@gettags');
    Route::any('shoplist', 'ShoplistController@index');
    /*材料商申请价格变动*/
    Route::any('material/category', 'MaterialController@category');

});
