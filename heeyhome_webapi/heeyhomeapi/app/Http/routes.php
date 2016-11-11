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
Route::group(['middleware'=>['web']],function (){

    /*家装百科*/
    Route::any('jzbk/cate', 'HomeEncyclopediaController@showcate');
    Route::any('jzbk/article', 'HomeEncyclopediaController@showarticle');
    Route::any('jzbk/info', 'HomeEncyclopediaController@info');

    /*用户登录*/
    Route::any('login/user_login', 'LoginController@user_login');
    /*工长登录*/
    Route::any('login/gz_login', 'LoginController@gz_login');
    /*用户注册*/
    Route::any('register/user_register', 'RegisterController@user_register');
    /*工长注册*/
    Route::any('register/gz_register', 'RegisterController@gz_register');
    /*发送短信*/
    Route::any('sendsms', 'SmsController@sms_send');
    /*修改密码*/
    Route::any('editpassword', 'EditpasswordController@editpassword');

    /*用户个人资料*/
    Route::any('personal/userinfo', 'UserinfoController@index');
    Route::any('personal/userinfo/change', 'UserinfoController@edit');
    /*用户头像*/
    Route::any('personal/portrait', 'PortraitController@index');
    Route::any('personal/portrait/change', 'PortraitController@fileupload');
    /*登录历史*/
    Route::any('personal/loginhistory', 'GetloginrecordController@index');
    /*确认账号*/
    Route::any('verification/confirm', 'AccountconfirmController@account');
    /*手机验证*/
    Route::any('verification/phoneverify', 'PhoneVerifyController@index');
    Route::any('verification/phoneverify/send', 'PhoneVerifyController@send');
    Route::any('verification/phoneverify/verify', 'PhoneVerifyController@verify');
    /*邮箱验证*/
    Route::any('verification/emailverify', 'EmailVerifyController@index');
    Route::any('verification/emailverify/send', 'EmailVerifyController@send');
    Route::any('verification/emailverify/verify', 'EmailVerifyController@verify');
    /*密保问题验证*/
    Route::any('verification/securityverify', 'SecurityVerifyController@index');
    Route::any('verification/securityverify/verify', 'SecurityVerifyController@verify');
    /*重置密码*/
    /*通过手机邮箱验证重置密码*/
    Route::any('smsresetpassword', 'ResetPasswordController@smsreset');
    /*通过密保问题验证重置密码*/
    Route::any('mbresetpassword', 'ResetPasswordController@mbreset');
    /*获取地址下拉列表*/
    Route::any('address/get_province', 'GetaddressController@get_province');
    Route::any('address/get_city', 'GetaddressController@get_city');
    Route::any('address/get_area', 'GetaddressController@get_area');
    /*收货地址*/
    Route::any('personal/drive_address', 'DriveaddressController@index');
    Route::any('personal/drive_address/add', 'DriveaddressController@add');
    Route::any('personal/drive_address/change', 'DriveaddressController@edit');
    Route::any('personal/drive_address/del', 'DriveaddressController@del');
    /*消息中心*/
    Route::any('personal/message', 'MessageController@index');
    Route::any('personal/message/del', 'MessageController@del');
    Route::any('personal/message/isnew', 'MessageController@isnew');
    Route::any('personal/message/read', 'MessageController@read');
    /*密保问题*/
    Route::any('personal/securitylist', 'SecurityController@questionlist');
    Route::any('personal/security/add', 'SecurityController@addsecurity');
    /*收藏效果图*/
    Route::any('imgcollection/add', 'CollectController@addimg');
    /*收藏成本结果*/
    /*我的店铺*/
    Route::any('personal/myshop', 'ShopController@index');
    Route::any('personal/myshop/add', 'ShopController@add');
    Route::any('personal/myshop/edit', 'ShopController@edit');


});

//Get access_token
Route::post('oauth/access_token', function() {
    return Response::json(Authorizer::issueAccessToken());
});

$api = app('Dingo\Api\Routing\Router');

//Show user info via restful service.
$api->version('v1', ['namespace' => 'App\Http\Controllers'], function ($api) {
    $api->post('auth/login', 'AuthController@authenticate');
});
//Just a test with auth check.
$api->version('v1', ['middleware' => 'api.auth'] , function ($api) {
    $api->get('time', function () {
        return ['now' => microtime(), 'date' => date('Y-M-D',time())];
    });
});

//Route::post('/register', 'Auth\AuthenticateController@register');
Route::get('mail/send','MailController@send');