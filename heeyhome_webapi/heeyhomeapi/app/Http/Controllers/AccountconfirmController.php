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
    public function confirm(){
        $callback=rq('callback');
        $account=rq('account');
        $user =DB::select('select user_id,user_name,user_phone,user_email from hh_user where (user_name=? or user_phone=? or user_email=?)',[$account,$account,$account]);
        if($user){
            $arr = array("code" => "000",
                "data"=> $user[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "117",
                "msg"=> "账号不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}