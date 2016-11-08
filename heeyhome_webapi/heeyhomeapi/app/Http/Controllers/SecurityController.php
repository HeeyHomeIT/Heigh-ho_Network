<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/5
 * Time: 15:00
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class SecurityController extends Controller
{
    public function questionlist(){
        $callback=rq('callback');
        $question=DB::select('select dic_id,content from hh_dictionary where type=?',['security']);
        if($question){
            $arr=array(
                "code"=>"000",
                "data"=>$question
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function addsecurity(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $question1=rq('question1');
        $answer1=rq('answer1');
        $question2=rq('question2');
        $answer2=rq('answer2');
        $question3=rq('question3');
        $answer3=rq('answer3');
        if (!$user_id) {
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $sql=DB::select('select * from hh_security where userid=?',[$user_id]);
        if($sql){
            $update=DB::update('update hh_security set question1=?,answer1=?,question2=?,answer2=?,question3=?,answer3=? where userid=?',[$question1,$answer1,$question2,$answer2,$question3,$answer3,$user_id]);
            if($update){
                $arr=array(
                    "code"=>"000",
                    "msg"=>"设置成功"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }else{
                $arr=array(
                    "code"=>"111",
                    "msg"=>"设置失败"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }else{
            $insert=DB::insert('insert into hh_security(userid,question1,answer1,question2,answer2,question3,answer3) values (?,?,?,?,?,?,?)',[$user_id,$question1,$answer1,$question2,$answer2,$question3,$answer3]);
            if($insert){
                $arr=array(
                    "code"=>"000",
                    "msg"=>"设置成功"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }else{
                $arr=array(
                    "code"=>"111",
                    "msg"=>"设置失败"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
    }

}