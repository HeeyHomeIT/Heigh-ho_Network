<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/3
 * Time: 17:06
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class GetloginrecordController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        if (!$user_id) {
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $sql=DB::select('select login_time,login_ip,login_browser,login_way,login_device from hh_loginrecord where user_id=?',[$user_id]);
        if($sql){
            $arr=array(
                "code"=>"000",
                "data"=>$sql
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr=array(
                "code"=>"117",
                "msg"=>"信息不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }

    }
}