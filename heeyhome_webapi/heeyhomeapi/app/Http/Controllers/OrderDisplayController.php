<?php
/**
 * 订单展示.
 * User: zhulr
 * Date: 2017/1/4
 * Time: 13:58
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class OrderDisplayController extends Controller
{
    //订单详情展示
    public function orderDetailsToShow()
    {
        $callback = rq('callback');
        $order_id = rq('order_id');
        $order=DB::select('select order_step from hh_order where order_id=?',[$order_id]);
        $order_step=$order[0]->order_step;
        $noworder_step=$order_step;
        $select=DB::select('select * from hh_order_detail where order_id=?',[$order_id]);
        foreach($select as $key=>$val){
            $imgs=DB::select('select img_url from hh_order_detail_img where order_detail_id=?',[$val->id]);
            $select[$key]->img=$imgs;
            if($val->order_step==3){
                $material_pay_status=DB::select('select pay_status from hh_order_material where order_id=? and material_type=?',[$order_id,1]);
                $select[$key]->material_pay_status=$material_pay_status[0]->pay_status;
            }
            if($val->order_step==7){
                $material_pay_status=DB::select('select pay_status from hh_order_material where order_id=? and material_type=?',[$order_id,4]);
                $select[$key]->material_pay_status=$material_pay_status[0]->pay_status;
            }
        }
        if($select){
            $arr = array("code" => "000",
                "data" => array('now_order_step'=>$noworder_step,
                    "detail"=>$select
            )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "117",
                "data" => array('now_order_step'=>$noworder_step,
                           "detail"=>$select
                    )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}