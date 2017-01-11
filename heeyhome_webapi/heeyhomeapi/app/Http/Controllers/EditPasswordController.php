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
    public function smsedit(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $phone=rq('phone');
        $captcha=rq('captcha');
        /*检查手机号码匹不匹配*/
        $isphone=DB::select('select user_phone from hh_user where user_id=? and user_phone=?',[$user_id,$phone]);
        if($phone){
             /*检查短信验证码*/
            if (!smsverify($phone, $captcha)) {
                $arr = array("code" => "118",
                    "msg" => "验证码不正确"
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $dxyzmsj = smsverify($phone, $captcha);
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
                        "msg" => "验证失败",
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
                "msg" => "手机号码不匹配"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function initialpwd(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $oldpassword=rq('oldpassword');
            /*检查原始密码*/
            $user=DB::select('select user_password from hh_user where user_id=?',[$user_id]);
            $old_password=HHEncryption($oldpassword);
            if($old_password==$user[0]->user_password){
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
                        "msg" => "验证失败",
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }else{
                $arr=array("code"=>"115",
                    "msg"=>"原始密码不正确"
                );
                return $callback."(".HHJson($arr).")";
            }
    }
    public function  editpassword(){
        $callback=rq('callback');
        $flag=rq('flag');
        /*检查参数不能为空*/
        if (!(rq('new_password') && $flag)){
            $arr=array("code"=>"112",
                "msg"=>"参数不能为空"
            );
            return $callback."(".HHJson($arr).")";
        }
        /*检查用户和唯一标识符是否匹配*/
        $sql=DB::select('select userid from hh_token where flag=?',[$flag]);
        if($sql) {
            $new_password = HHEncryption(rq('new_password'));
            $update = DB::update('update hh_user set user_password=? where user_id=?', [$new_password, $sql[0]->userid]);
            if ($update) {
                $arr = array("code" => "000",
                    "msg" => "密码修改成功"
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array("code" => "114",
                    "msg" => "修改失败,用户不存在"
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