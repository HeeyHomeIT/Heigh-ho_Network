<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/3
 * Time: 9:57
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class WorkerpricelistController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $cate=rq('cate_id');
        if(!$cate){
            $arr=array("code"=>"112",
                "msg"=>"工种类别不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $sel=DB::select('select id,serviceitem from hh_workerprice_serviceitem where workercate=?',[$cate]);
        foreach($sel as $key=>$val){
            $price=DB::select('select id,servicename,unit,cost from hh_workerprice_list where serviceitem=?',[$val->id]);
            foreach($price as $k=>$v){
                $price[$k]->id='service'.$v->id;
            }
            $sel[$key]->service=$price;
        }
        $arr=array("code"=>"000",
            "data"=>$sel
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
}