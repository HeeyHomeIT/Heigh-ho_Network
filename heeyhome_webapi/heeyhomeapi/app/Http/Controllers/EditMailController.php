<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/12
 * Time: 9:21
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class EditMailController extends Controller
{
    public function verify(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $oldemail=rq('oldemail');
        $captcha=rq('captcha');
        /*检查邮箱匹不匹配*/
        $phone=DB::select('select user_email from hh_user where user_id=? and user_email=?',[$user_id,$oldemail]);
        if($phone){
            /*检查短信验证码*/
            if (!smsverify($oldemail, $captcha)) {
                $arr = array("code" => "118",
                    "msg" => "验证码不正确"
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $dxyzmsj = smsverify($oldemail, $captcha);
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
        }else{
            $arr = array("code" => "126",
                "msg" => "邮箱不匹配"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function edit(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $flag=rq('flag');
        /*检查用户和唯一标识符是否匹配*/
        $sql=DB::select('select id from hh_token where userid=? and flag=?',[$user_id,$flag]);
        if($sql) {
            $newemail=rq('newemail');
            $captcha=rq('captcha');
            /*检查短信验证码*/
            if (!smsverify($newemail, $captcha)) {
                $arr = array("code" => "118",
                    "msg" => "验证码不正确"
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $dxyzmsj = smsverify($newemail, $captcha);
            }
            if ((strtotime($dxyzmsj) + 1200) > time()) {
                $update = DB::update('update hh_user set user_email=? where user_id=?', [$newemail, $user_id]);
                if ($update) {
                    $arr = array("code" => "000",
                        "msg" => "绑定成功",
                        "data"=>array("newemail"=>$newemail)
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array("code" => "111",
                        "msg" => "绑定失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            } else {
                $arr = array("code" => "119",
                    "msg" => "验证码超时"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }else{
            $arr = array("code" => "126",
                "msg" => "信息不匹配"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}