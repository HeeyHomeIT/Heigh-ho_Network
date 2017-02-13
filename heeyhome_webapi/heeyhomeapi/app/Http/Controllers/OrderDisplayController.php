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
        if($order)
        $order_step=$order[0]->order_step;
        $noworder_step=$order_step;
        $woker_who=array();
        $worker_info=array();
        $select=DB::select('select * from hh_order_detail where order_id=?',[$order_id]);
        foreach($select as $key=>$val){
            $imgs=DB::select('select img_url from hh_order_detail_img where order_detail_id=?',[$val->id]);
            $select[$key]->img=$imgs;
            if($val->order_step==3){
                $material_pay_status=DB::select('select order_material_status from hh_order_material where order_id=? and material_type=?',[$order_id,1]);
                $select[$key]->material_pay_status=$material_pay_status[0]->order_material_status;
            }
            if($val->order_step==7){
                $material_pay_status=DB::select('select order_material_status from hh_order_material where order_id=? and material_type=?',[$order_id,4]);
                $select[$key]->material_pay_status=$material_pay_status[0]->order_material_status;
            }
            if($val->order_step==11){
                $material_pay_status=DB::select('select order_material_status from hh_order_material where order_id=? and material_type=?',[$order_id,3]);
                $select[$key]->material_pay_status=$material_pay_status[0]->order_material_status;
            }
            if($val->order_step==15){
                $material_pay_status=DB::select('select order_material_status from hh_order_material where order_id=? and material_type=?',[$order_id,5]);
                $select[$key]->material_pay_status=$material_pay_status[0]->order_material_status;
            }
            $order_steps=DB::select('select order_step from hh_order_step where step_id=?',[$val->order_step]);
            $select[$key]->order_step=$order_steps[0]->order_step;
        }
            $worker = DB::select('select person1,person2,person3,person4,person5,person6,person7,person8,person9 from hh_order_personnel where order_id=?', [$order_id]);
            if ($worker) {
                if ($worker[0]->person1) {
                    $woker_who[]=personal($worker[0]->person1);
                }
                if ($worker[0]->person2) {
                    $woker_who[]=personal($worker[0]->person2);
                }
                if ($worker[0]->person3) {
                    $woker_who[]=personal($worker[0]->person3);
                }
                if ($worker[0]->person4) {
                    $woker_who[]=personal($worker[0]->person4);
                }
                if ($worker[0]->person5) {
                    $woker_who[]=personal($worker[0]->person5);
                }
                if ($worker[0]->person6) {
                    $woker_who[]=personal($worker[0]->person6);
                }
                if ($worker[0]->person7) {
                    $woker_who[]=personal($worker[0]->person7);
                }
                if ($worker[0]->person8) {
                    $woker_who[]= personal($worker[0]->person8);
                }
                if ($worker[0]->person9) {
                    $woker_who[]=personal($worker[0]->person9);
                }
            }
            //dd($woker_who);
        if($noworder_step>=2&&$noworder_step<6){
            foreach($woker_who as $key=>$val){
                if($val['type']==2)
                    $worker_info[0]=$val;
            }
        }
        if($noworder_step>=6&&$noworder_step<10){
            foreach($woker_who as $key=>$val){
                if($val['type']==2)
                    $worker_info[0]=$val;
                if($val['type']==3)
                    $worker_info[1]=$val;
            }
        }
        if($noworder_step>=10&&$noworder_step<14){
            foreach($woker_who as $key=>$val){
                if($val['type']==2)
                    $worker_info[0]=$val;
                if($val['type']==3)
                    $worker_info[1]=$val;
                if($val['type']==4)
                    $worker_info[2]=$val;
            }
        }
        if($noworder_step>=14)
        {
            foreach($woker_who as $key=>$val){
                if($val['type']==2)
                    $worker_info[0]=$val;
                if($val['type']==3)
                    $worker_info[1]=$val;
                if($val['type']==4)
                    $worker_info[2]=$val;
                if($val['type']==5)
                    $worker_info[3]=$val;
            }
        }
        if($select){
            $arr = array("code" => "000",
                     "data" => array('now_order_step'=>$noworder_step,
                     "detail"=>$select,
                         "worker"=>$worker_info
                   )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "000",
                     "data" => array('now_order_step'=>$noworder_step,
                         "detail"=>$select,
                         "worker"=>$worker_info
                    )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}