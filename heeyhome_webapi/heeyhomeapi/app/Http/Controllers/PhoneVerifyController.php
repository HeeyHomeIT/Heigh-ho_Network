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
    public function send(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $mobile = rq('phone');
        if(!preg_match("/1[3458]{1}\d{9}$/",$mobile)){
            $arr = array("code" => "129",
                "msg" => "手机格式不正确"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查用户和手机号是否匹配*/
        if(match($user_id,$mobile))
        {
            $phone=new SmsController();
            return $phone->sms_send();
        }
        else{
            $arr = array("code" => "126",
                "msg" => "手机号和用户不匹配"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function verify(){
        $callback=rq('callback');
        $captcha=rq('captcha');
        $user_id=rq('user_id');
        $mobile = rq('phone');
        if(!preg_match("/1[3458]{1}\d{9}$/",$mobile)){
                $arr = array("code" => "129",
                    "msg" => "手机格式不正确"
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
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
                $sql = DB::select('select flag from hh_sms where sms_userid=? and record_key=? and sms=?',[$user_id,$mobile,$captcha]);
                if($sql){
                    $arr = array("code" => "000",
                        "data" =>$sql[0]
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