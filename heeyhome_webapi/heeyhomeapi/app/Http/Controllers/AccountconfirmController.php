<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/8
 * Time: 10:07
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class AccountconfirmController extends Controller
{
    public function account(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $account=rq('account');
        $user=DB::select('select user_account from hh_user where user_id=? and user_account=?',[$user_id,$account]);
        if(!$user){
            $userinfo=DB::select('select userinfo_nickname from hh_userinfo where userinfo_userid=? and (userinfo_phone=? or userinfo_email=?)',[$user_id,$account,$account]);
            if($userinfo){
                $arr = array("code" => "000",
                    "data"=> ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }else{
                $arr = array("code" => "111",
                    "data"=> ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }else{
            $arr = array("code" => "000",
                "data"=> ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}