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
    Route::any('register', 'RegisterController@user_register');
    /*发送短信*/
    Route::any('sendsms', 'SmsController@sms_send');
    /*修改密码*/
    Route::any('editpassword', 'PasswordController@edit_password');

    /*strat用户个人中心*/
    /*用户个人资料*/
    Route::any('personal/userinfo', 'UserinfoController@index');
    Route::any('personal/userinfo/change', 'UserinfoController@edit');
    /*用户头像*/
    Route::any('personal/portrait', 'PortraitController@index');
    Route::any('personal/portrait/change', 'PortraitController@fileupload');
    /*登录历史*/
    Route::any('personal/loginhistory', 'GetloginrecordController@index');
    /*手机验证*/
    Route::any('getbackpassword/phoneverify', 'PhoneVerifyController@index');
    Route::any('getbackpassword/phoneverify/send', 'PhoneVerifyController@send');
    Route::any('getbackpassword/phoneverify/verify', 'PhoneVerifyController@verify');
    /*邮箱验证*/
    Route::any('getbackpassword/emailverify', 'EmailVerifyController@index');
    Route::any('getbackpassword/emailverify/send', 'EmailVerifyController@send');
    Route::any('getbackpassword/emailverify/verify', 'EmailVerifyController@verify');
    /*重置密码*/
    Route::any('resetpassword', 'ResetPasswordController@reset_password');
    /*获取地址列表*/
    Route::any('address/get_province', 'GetaddressController@get_province');
    Route::any('address/get_city', 'GetaddressController@get_city');
    Route::any('address/get_area', 'GetaddressController@get_area');
    /*收货地址*/
    Route::any('personal/drive_address', 'DriveaddressController@index');
    Route::any('personal/drive_address/add', 'DriveaddressController@add');
    Route::any('personal/drive_address/change', 'DriveaddressController@edit');
    Route::any('personal/drive_address/del', 'DriveaddressController@del');
    /*end用户个人中心*/

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