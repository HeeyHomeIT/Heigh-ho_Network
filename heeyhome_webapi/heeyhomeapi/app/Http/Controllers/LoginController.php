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
    public function login()
    {
        $callback=rq('callback');
        $user_account=rq('account');
        $user_password=rq('password');
        $type=rq('type');
        /*检查用户名和密码是否为空*/
        if (!($user_account && $user_password)) {
            $arr = array("code" => "112",
                "msg" => "账号和密码不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查账号是否存在*/
        $user =DB::select('select id from hh_user where (user_name=? or user_phone=? or user_email=?) and user_type=?',[$user_account,$user_account,$user_account,$type]);
        if (!$user) {
            $arr = array("code" => "114",
                "msg" => "账号不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查密码是否正确*/
        $user_password=HHEncryption($user_password);
        $pwd=DB::select('select * from hh_user where user_password=? and (user_name=? or user_phone=? or user_email=?) and user_type=?',[$user_password,$user_account,$user_account,$user_account,$type]);
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
            if($login_ip&&$login_browser&&$login_way&&$login_device) {
                $record = DB::insert('insert into hh_loginrecord(user_id,login_time,login_ip,login_browser,login_way,login_device) values(?,?,?,?,?,?)', [$pwd[0]->user_id, $login_time, $login_ip, $login_browser, $login_way, $login_device]);
            }
            /*登录成功返回用户信息*/
            if($pwd[0]->user_type==1){
                $nickname=DB::select('select userinfo_nickname from hh_userinfo where userinfo_userid=?',[$pwd[0]->user_id]);
                $pwd[0]->nickname=$nickname[0]->userinfo_nickname;
            }
            if($pwd[0]->user_type==2){
                $shop_id=DB::select('select shop_id from hh_shop where shopper_id=?',[$pwd[0]->user_id]);
                $pwd[0]->shop_id=$shop_id[0]->shop_id;
                $nickname=DB::select('select foremaninfo_nickname from hh_foremaninfo where foremaninfo_userid=?',[$pwd[0]->user_id]);
                if($nickname){
                    $pwd[0]->nickname=$nickname[0]->foremaninfo_nickname;
                }else {
                    $pwd[0]->nickname = null;
                }
            }
            if($pwd[0]->user_type==3){
                $nickname=DB::select('select material_supplier_name from hh_material_supplier_info where material_supplier_id=?',[$pwd[0]->user_id]);
                $pwd[0]->nickname=$nickname[0]->material_supplier_name;
            }
            $arr=array("code"=>"000",
                "msg"=>"登录成功",
                "data"=>$pwd[0]
            );
            return $callback."(".HHJson($arr).")";
        }
    }
}