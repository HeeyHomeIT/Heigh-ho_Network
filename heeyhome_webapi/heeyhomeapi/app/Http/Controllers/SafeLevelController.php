<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/19
 * Time: 12:57
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class SafeLevelController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $score=0.0;
        $idcard=DB::select('select idcardno from hh_realname where real_userid=? and isverify=?',[$user_id,1]);
        if($idcard){
            $score=$score+4.0;
        }
        $pwd=DB::select('select user_password from hh_user where user_id=?',[$user_id]);
        if($pwd[0]->user_password!=null){
            $score=$score+2.0;
        }
        $phone=DB::select('select user_phone from hh_user where user_id=?',[$user_id]);
        if($phone[0]->user_phone!=null){
            $score=$score+2.0;
        }
        $email=DB::select('select user_email from hh_user where user_id=?',[$user_id]);
        if($email[0]->user_email!=null){
            $score=$score+2.0;
        }
        $arr = array("code" => "000",
            "data" => array("score"=>number_format($score,2))
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
}