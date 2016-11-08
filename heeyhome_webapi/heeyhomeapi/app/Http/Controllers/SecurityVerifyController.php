<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/7
 * Time: 8:52
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class SecurityVerifyController extends Controller
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
        $question=DB::select('select hh_security.question1,hh_security.question2,hh_security.question3,A.content as cquestion1,B.content as cquestion2,C.content as cquestion3 from hh_security 
                        left join hh_dictionary A on hh_security.question1 = A.dic_id
                        left join hh_dictionary B on hh_security.question2 = B.dic_id
                        left join hh_dictionary C on hh_security.question3 = C.dic_id 
                        where userid=?',[$user_id]);
        if($question){
            $arr = array("code" => "000",
                "data" => $question
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "117",
                "msg" => "信息不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function verify(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $answer1=rq('answer1');
        $answer2=rq('answer2');
        $answer3=rq('answer3');
        $sql=DB::select('select userid from hh_security where userid=? and answer1=? and answer2=? and answer3=?',[$user_id,$answer1,$answer2,$answer3]);
        if($sql){
            $arr = array("code" => "000",
                "msg" => "验证成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg" => "验证失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }

    }

}