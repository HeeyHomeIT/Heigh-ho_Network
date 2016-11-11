<?php
/**
 * TODO 修改密码接口
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/18
 * Time: 9:30
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class EditPasswordController extends Controller
{
    public function editpassword(){
        $callback=rq('callback');
        /*检查参数不能为空*/
        if (!(rq('new_password') && rq('old_password') && rq('captcha') && rq('user_phone'))){
            $arr=array("code"=>"112",
                "msg"=>"新密码、原始密码、验证码、手机号不能为空"
            );
            return $callback."(".HHJson($arr).")";
        }
        $user_phone=rq('user_phone');
        $captcha=rq('captcha');
        /*检查短信验证码*/
        if(!smsverify($user_phone,$captcha)){
            $arr=array("code"=>"118",
                "msg"=>"短信验证码不正确"
            );
            return $callback."(".HHJson($arr).")";
        }else{
            $dxyzmsj=smsverify($user_phone,$captcha);
        }
        if ((strtotime($dxyzmsj) + 1200) > time()) {
            /*检查原始密码*/
            $user=DB::select('select user_password from hh_user where user_account=?',[$user_phone]);
            $old_password=HHEncryption(rq('old_password'));
            if(!($old_password==$user[0]->user_password)){
                $arr=array("code"=>"115",
                    "msg"=>"原始密码不正确"
                );
                return $callback."(".HHJson($arr).")";
            }

            $new_password=HHEncryption(rq('new_password'));
            $update=DB::update('update hh_user set user_password=? where user_phone=?',[$new_password,$user_phone]);
            if($update){
                $arr = array("code" => "000",
                    "msg" => "密码修改成功",
                );
                return $callback."(".HHJson($arr).")";
            }else{
                $arr=array("code"=>"114",
                    "msg"=>"修改失败,用户不存在"
                );
                return $callback."(".HHJson($arr).")";
            }
        }else{
            $arr=array("code"=>"119",
                "msg"=>"短信验证码超时"
            );
            return $callback."(".HHJson($arr).")";
        }
    }
}