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
    public function verify(){
        $callback=rq('callback');
        $captcha=rq('captcha');
        $mobile = rq('phone');
        /*检查用户和手机号是否匹配*/
        $match=DB::select('select user_id from hh_user where user_phone=?',[$mobile]);
        if ($match) {
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
                $insert=DB::insert('insert into hh_token(userid,flag,time) values(?,?,?)',[$match[0]->user_id,$flag,$time]);
                if ($insert) {
                    $arr = array("code" => "000",
                        "msg" => "验证成功",
                        "data" => array("flag" => $flag,
                        "user_id"=>$match[0]->user_id)
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