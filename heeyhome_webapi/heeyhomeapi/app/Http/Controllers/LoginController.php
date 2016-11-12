<?php
/**
 * TODO 登录接口
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/13
 * Time: 12:53
 */
namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    public function user_login()
    {
        $callback=rq('callback');
        $user_account=rq('account');
        $user_password=rq('password');
        /*检查用户名和密码是否为空*/
        if (!($user_account && $user_password)) {
            $arr = array("code" => "112",
                "msg" => "账号和密码不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查账号是否存在*/
        $user =DB::select('select id from hh_user where user_name=? or user_phone=? or user_email=?',[$user_account,$user_account,$user_account]);
        if (!$user) {
            $arr = array("code" => "114",
                "msg" => "账号不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查密码是否正确*/
        $user_password=HHEncryption($user_password);
        $pwd=DB::select('select * from hh_user where user_password=? and (user_name=? or user_phone=? or user_email=?)',[$user_password,$user_account,$user_account,$user_account]);
        if(!$pwd) {
            $arr = array("code" => "115",
                "msg" => "密码不正确"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{

//            session(['user_account'=>$pwd[0]->user_account]);
//            session(['user_id'=>$pwd[0]->user_id]);
            $login_ip=rq('login_ip');
            $login_browser=rq('login_browser');
            $login_way=rq('login_way');
            $login_device=rq('login_device');
            $login_time=date('Y-m-d H:i:s', time());
            $record= DB::insert('insert into hh_loginrecord(user_id,login_time,login_ip,login_browser,login_way,login_device) values(?,?,?,?,?,?)',[$pwd[0]->user_id,$login_time,$login_ip,$login_browser,$login_way,$login_device]);
            /*登录成功返回用户信息*/
            $arr=array("code"=>"000",
                "msg"=>"登录成功",
                "data"=>$pwd[0]
            );
            return $callback."(".HHJson($arr).")";
        }
    }
    public function gz_login()
    {
        $callback=rq('callback');
        $worker_account=rq('account');
        $worker_password=rq('password');

        /*检查用户名和密码是否为空*/
        if (!($worker_account && $worker_password)) {
            $arr = array("code" => "112",
                "msg" => "用户名和密码不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查账号是否存在*/
        $worker =DB::select('select id from hh_foreman where foreman_name=? or foreman_phone=? or foreman_email=?',[$worker_account,$worker_account,$worker_account]);
        if (!$worker) {
            $arr = array("code" => "114",
                "msg" => "账号不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查密码是否正确*/
        $worker_password=HHEncryption($worker_password);
        $pwd=DB::select('select * from hh_foreman where foreman_password=? and (foreman_name=? or foreman_phone=? or foreman_email=?)',[$worker_password,$worker_account,$worker_account,$worker_account]);
        if(!$pwd) {
            $arr = array("code" => "115",
                "msg" => "密码不正确"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $login_ip=rq('login_ip');
            $login_browser=rq('login_browser');
            $login_way=rq('login_way');
            $login_device=rq('login_device');
            $login_time=date('Y-m-d H:i:s', time());
            $record= DB::insert('insert into hh_loginrecord(user_id,login_time,login_ip,login_browser,login_way,login_device) values(?,?,?,?,?,?)',[$pwd[0]->foreman_id,$login_time,$login_ip,$login_browser,$login_way,$login_device]);
            /*登录成功返回用户信息*/
            $arr=array("code"=>"000",
                "msg"=>"登录成功",
                "data"=>$pwd[0]
            );
            return $callback."(".HHJson($arr).")";
        }
    }
}