<?php
/**
 * TODO 手机验证接口
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/26
 * Time: 10:14
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class PhoneVerifyController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $sql=DB::select('select userinfo_phone from hh_userinfo where userinfo_userid=?',[$user_id]);
        $arr = array("code" => "000",
            "data" => $sql[0]
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function verify(){
        $callback=rq('callback');
        $captcha=rq('captcha');
        $user_id=rq('user_id');
        $mobile = rq('phone');
        /*检查用户和手机号是否匹配*/
        if (match($user_id, $mobile)) {
            /*检查短信验证码*/
            if (!smsverify($mobile, $captcha)) {
                $arr = array("code" => "118",
                    "msg" => "验证码不正确"
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $dxyzmsj = smsverify($mobile, $captcha);
            }
            if ((strtotime($dxyzmsj) + 1200) > time()) {
                $flag=create_pid();
                $time=date("Y-m-d H:i:s", time());
                $insert=DB::insert('insert into hh_token(userid,flag,time) values(?,?,?)',[$user_id,$flag,$time]);
                if ($insert) {
                    $arr = array("code" => "000",
                        "msg" => "验证成功",
                        "data" => array("flag" => $flag)
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array("code" => "111",
                        "msg" => "验证失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            } else {
                $arr = array("code" => "119",
                    "msg" => "验证码超时"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
        else{
            $arr = array("code" => "126",
                "msg" => "手机和用户不匹配"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}