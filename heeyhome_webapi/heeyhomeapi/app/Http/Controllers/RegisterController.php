<?php
/**
 * TODO 注册接口
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/13
 * Time: 15:43
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    public function user_register(){
        $callback=rq('callback');
        $user_account =rq('phone');
        $user_password = rq('user_password');
        $captcha=rq('captcha');
        /*检查用户名和密码是否为空*/
        if (!($user_account && $user_password && $captcha)) {
            $arr = array("code" => "112",
                "msg" => "用户名、密码、验证码均不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查短信验证码*/
        if(!smsverify($user_account,$captcha)){
            $arr=array("code"=>"118",
                "msg"=>"注册失败，短信验证码不正确"
            );
            return $callback."(".HHJson($arr).")";
        }else{
            $dxyzmsj=smsverify($user_account,$captcha);
        }
        if ((strtotime($dxyzmsj) + 1200) > time()) {
            /*检查账户是否已存在*/
            $sql=DB::select('select user_id from hh_user where user_account=?',[$user_account]);
            if($sql){
                $arr=array("code"=>"113",
                    "msg"=>"注册失败，用户已存在"
                );
                return $callback."(".HHJson($arr).")";
            }

            $user_id = create_pid();
            $user_password = HHEncryption($user_password);
            /*向用户表插入数据*/
            $insert = DB::insert('insert into hh_user(user_id,user_account,user_password) values(?,?,?)', [$user_id, $user_account, $user_password]);
            if ($insert) {
                /*向时间表插入数据，同时向用户信息表插入数据*/
                $reg_time=date('Y-m-d H:i:s', time());
                $time = DB::insert('insert into hh_time(time_userid,reg_time) values(?,?)', [$user_id, $reg_time]);
                $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$user_id,'default.jpg']);
                $sql = DB::insert('insert into hh_userinfo(userinfo_userid,userinfo_nickname,userinfo_phone) values(?,?,?)',[$user_id,$user_account,$user_account]);
                if($sql){
                    $arr=array(
                        "code"=>"000",
                        "msg"=>"注册成功",
                        "data"=>array(
                            "user_id"=>$user_id,
                            "user_account"=>$user_account,
                            "user_nickname"=>$user_account
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr=array("code"=>"111",
                        "msg"=>"注册失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }else{
                $arr=array("code"=>"111",
                    "msg"=>"注册失败"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }else{
            $arr=array("code"=>"119",
                "msg"=>"注册失败，短信验证码超时"
                );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function gz_register(){
        $callback=rq('callback');
        $foreman_account =rq('account');
        $foreman_password = rq('password');
        /*检查用户名和密码是否为空*/
        if (!($foreman_account && $foreman_password)) {
            $arr = array("code" => "112",
                "msg" => "用户名、密码不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查账户是否已存在*/
        $sql=DB::select('select foreman_id from hh_foreman where foreman_account=?',[$foreman_account]);
        if($sql){
            $arr=array("code"=>"113",
                "msg"=>"注册失败，用户已存在"
            );
            return $callback."(".HHJson($arr).")";
        }
        $foreman_id = create_pid();
        $foreman_password = HHEncryption($foreman_password);
        /*向工长表插入数据*/
        $insert = DB::insert('insert into hh_foreman(foreman_id,foreman_account,foreman_password) values(?,?,?)', [$foreman_id, $foreman_account, $foreman_password]);
        if ($insert) {
            /*向时间表插入数据*/
            $reg_time=date('Y-m-d H:i:s', time());
            $time = DB::insert('insert into hh_time(time_userid,reg_time) values(?,?)', [$foreman_id, $reg_time]);
            /*向工长信息表插入数据*/
            $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$foreman_id,'default.jpg']);
            $sql = DB::insert('insert into hh_foremaninfo(foremaninfo_userid,foremaninfo_nickname) values(?,?)',[$foreman_id,$foreman_account]);
            /*向店铺表插入*/
            $shop_id=rand_number(10);
            $shop = DB::insert('insert into hh_shop(shop_id,shopper_id,opentime) values(?,?,?)',[$shop_id,$foreman_id,$reg_time]);
            if($shop){
                $arr=array(
                    "code"=>"000",
                    "msg"=>"注册成功",
                    "data"=>array(
                        "foreman_id"=>$foreman_id,
                        "foreman_account"=>$foreman_account,
                        "foreman_nickname"=>$foreman_account
                    )
                );
                return $callback . "(" . HHJson($arr) . ")";
            }else{
                $arr=array("code"=>"111",
                    "msg"=>"注册失败"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }else{
            $arr=array("code"=>"111",
                "msg"=>"注册失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}