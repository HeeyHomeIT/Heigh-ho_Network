<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/8
 * Time: 14:59
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class CollectController extends Controller
{
    public function addimg(){
        $callback=rq('callback');
        $id=rq('id');
        $user_id=rq('user_id');
        $collect_time=date('Y-m-d H:i:s', time());
        if(!($id && $user_id)){
            $arr = array("code" => "112",
                "msg" => "参数不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $insert=DB::insert('insert into hh_imgcollection(user_id,img_id,collect_time) values (?,?,?)',[$user_id,$id,$collect_time]);
        if($insert){
            $arr=array(
                "code"=>"000",
                "msg"=>"收藏成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr=array(
                "code"=>"111",
                "msg"=>"收藏失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function addcostresult(){

    }
}