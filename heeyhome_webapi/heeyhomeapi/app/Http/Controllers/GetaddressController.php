<?php
/**
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/21
 * Time: 16:16
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class GetaddressController extends Controller
{
    public function get_province(){
        $callback=rq('callback');
        /*加载所有的省份*/
        $sql=DB::select('select dic_id,content from hh_dictionary where type=?',['province']);
        if($sql){
            $arr=array(
                "code"=>"000",
                "data"=>$sql
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function get_city(){
        $callback=rq('callback');
        $pid=rq('parent_id');
        $cid=substr($pid,0,3);
        $child=DB::select('select dic_id,content from hh_dictionary where dic_id like ? and type=?',[$cid.'%','city']);
        if($child){
            $arr=array(
                "code"=>"000",
                "data"=>$child
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function get_area(){
        $callback=rq('callback');
        $pid=rq('parent_id');
        $cid=substr($pid,0,3);
        $child=DB::select('select dic_id,content from hh_dictionary where dic_id like ? and type=?',[$cid.'%','area']);
        if($child){
            $arr=array(
                "code"=>"000",
                "data"=>$child
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

}