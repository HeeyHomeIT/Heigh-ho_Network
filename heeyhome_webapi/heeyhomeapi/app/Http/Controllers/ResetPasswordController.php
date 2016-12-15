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
    public function  resetpassword(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $flag=rq('flag');
        /*检查参数不能为空*/
        if (!(rq('new_password') && $flag)){
            $arr=array("code"=>"112",
                "msg"=>"参数不能为空"
            );
            return $callback."(".HHJson($arr).")";
        }
        /*检查用户和唯一标识符是否匹配*/
        $sql=DB::select('select id from hh_token where userid=? and flag=?',[$user_id,$flag]);
        if($sql) {
            $new_password = HHEncryption(rq('new_password'));
            $update = DB::update('update hh_user set user_password=? where user_id=?', [$new_password, $user_id]);
            if ($update) {
                $arr = array("code" => "000",
                    "msg" => "密码重置成功"
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array("code" => "114",
                    "msg" => "重置失败"
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