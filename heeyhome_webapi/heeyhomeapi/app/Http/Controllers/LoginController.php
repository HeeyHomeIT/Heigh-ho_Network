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
        $user_account=rq('user_account');
        $user_password=rq('user_password');
        /*检查用户名和密码是否为空*/
        if (!($user_account && $user_password)) {
            $arr = array("code" => "112",
                "msg" => "用户名和密码不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查用户名是否存在*/
        $user =DB::select('select user_account from hh_user where user_account=?',[$user_account]);
        if (!$user) {
            $arr = array("code" => "114",
                "msg" => "用户不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查密码是否正确*/
        $user_password=HHEncryption($user_password);
        $pwd=DB::select('select user_account,user_id from hh_user where user_account=? and user_password=?',[$user_account,$user_password]);
        if(!$pwd) {
            $arr = array("code" => "115",
                "msg" => "密码不正确"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            /*登录成功返回用户信息*/
//            session(['user_account'=>$pwd[0]->user_account]);
//            session(['user_id'=>$pwd[0]->user_id]);
            $login_ip=rq('login_ip');
            $login_browser=rq('login_browser');
            $login_way=rq('login_way');
            $login_device=rq('login_device');
            $login_time=date('Y-m-d H:i:s', time());
            $record= DB::insert('insert into hh_loginrecord(user_id,login_time,login_ip,login_browser,login_way,login_device) values(?,?,?,?,?,?)',[$pwd[0]->user_id,$login_time,$login_ip,$login_browser,$login_way,$login_device]);
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
        $worker_account=rq('worker_account');
        $worker_password=rq('worker_password');

        /*检查用户名和密码是否为空*/
        if (!($worker_account && $worker_password)) {
            $arr = array("code" => "112",
                "msg" => "用户名和密码不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查用户名是否存在*/
        $worker =DB::select('select worker_account from hh_worker where worker_account=?',[$worker_account]);
        if (!$worker) {
            $arr = array("code" => "114",
                "msg" => "用户不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查密码是否正确*/
        $worker_password=HHEncryption($worker_password);
        $pwd=DB::select('select worker_account,worker_id from hh_worker where worker_account=? and worker_password=?',[$worker_account,$worker_password]);
        if(!$pwd) {
            $arr = array("code" => "115",
                "msg" => "密码不正确"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            /*登录成功返回用户信息*/
            $arr=array("code"=>"000",
                "msg"=>"登录成功",
                "data"=>$pwd[0]
            );
            return $callback."(".HHJson($arr).")";
        }
    }
}