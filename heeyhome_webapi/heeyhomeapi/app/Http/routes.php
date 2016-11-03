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



Route::any('jzbk/cate', 'HomeEncyclopediaController@showcate');
Route::any('jzbk/article', 'HomeEncyclopediaController@showarticle');
Route::any('jzbk/info', 'HomeEncyclopediaController@info');

Route::any('login/user_login', 'LoginController@user_login');

Route::any('login/gz_login', 'LoginController@gz_login');

Route::any('register', 'RegisterController@user_register');

Route::any('sendsms', 'SmsController@sms_send');

Route::any('editpassword', 'PasswordController@edit_password');


Route::any('resetpassword', 'ResetPasswordController@reset_password');


Route::any('personal/userinfo', 'UserinfoController@index');
Route::any('personal/userinfo/change', 'UserinfoController@edit');

Route::any('getbackpassword/phoneverify', 'PhoneVerifyController@index');
Route::any('getbackpassword/phoneverify/send', 'PhoneVerifyController@send');
Route::any('getbackpassword/phoneverify/verify', 'PhoneVerifyController@verify');
Route::any('getbackpassword/emailverify', 'EmailVerifyController@index');
Route::any('getbackpassword/emailverify/send', 'EmailVerifyController@send');
Route::any('getbackpassword/emailverify/verify', 'EmailVerifyController@verify');

Route::any('personal/portrait', 'PortraitController@index');
Route::any('personal/portrait/change', 'PortraitController@fileupload');


Route::any('address/get_province', 'GetaddressController@get_province');
Route::any('address/get_city', 'GetaddressController@get_city');
Route::any('address/get_area', 'GetaddressController@get_area');

Route::any('personal/drive_address', 'DriveaddressController@index');
Route::any('personal/drive_address/add', 'DriveaddressController@add');
Route::any('personal/drive_address/change', 'DriveaddressController@edit');
Route::any('personal/drive_address/del', 'DriveaddressController@del');
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