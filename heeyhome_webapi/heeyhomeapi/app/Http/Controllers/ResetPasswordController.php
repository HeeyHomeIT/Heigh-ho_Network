<?php
/**
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/28
 * Time: 11:25
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class ResetPasswordController extends Controller
{
    public function  smsreset(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $flag=rq('flag');
        if(rq('phone')) $record_key=rq('phone');
        if(rq('email')) $record_key=rq('email');
        /*检查参数不能为空*/
        if (!(rq('new_password')  && $record_key && $flag)){
            $arr=array("code"=>"112",
                "msg"=>"参数不能为空"
            );
            return $callback."(".HHJson($arr).")";
        }
        /*检查用户和手机号、用户和邮箱是否匹配*/
        if(match($user_id,$record_key))
        {
            /*检查用户和唯一标识符是否匹配*/
            $sql=DB::select('select sms_userid from hh_sms where sms_userid=? and flag=?',[$user_id,$flag]);
            if($sql){
                $new_password=HHEncryption(rq('new_password'));
                $update=DB::update('update hh_user set user_password=? where user_id=?',[$new_password, $user_id]);
                if($update){
                    $arr = array("code" => "000",
                        "msg" => "密码重置成功",
                    );
                    return $callback."(".HHJson($arr).")";
                }else{
                    $arr=array("code"=>"114",
                        "msg"=>"重置失败,用户不存在"
                    );
                    return $callback."(".HHJson($arr).")";
                }
            }else{
                $arr = array("code" => "126",
                    "msg" => "信息不匹配"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
        else{
            $arr = array("code" => "126",
                "msg" => "信息不匹配"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function mbreset(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $new_password=HHEncryption(rq('new_password'));
        $update=DB::update('update hh_user set user_password=? where user_id=?',[$new_password, $user_id]);
        if($update){
            $arr = array("code" => "000",
                "msg" => "密码重置成功",
            );
            return $callback."(".HHJson($arr).")";
        }else{
            $arr=array("code"=>"114",
                "msg"=>"重置失败,用户不存在"
            );
            return $callback."(".HHJson($arr).")";
        }
    }
}