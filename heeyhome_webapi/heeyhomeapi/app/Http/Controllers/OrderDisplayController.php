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
        $sel_order_step = DB::select('select order_step,order_status from hh_order where order_id=?', [$order_id]);
        if ($sel_order_step) {
            $order_step = $sel_order_step[0]->order_step;
            $order_status = $sel_order_step[0]->order_status;
        } else {
            $arr = array("code" => "200",
                "data" => "",
                "msg" => "订单不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $noworder_step = $order_step;
        $noworder_status = $order_status;
        $woker_who = array();
        $worker_info = array();
        $select = DB::select('select * from hh_order_detail where order_id=?', [$order_id]);
        foreach ($select as $key => $val) {
            $imgs = DB::select('select img_url from hh_order_detail_img where order_detail_id=?', [$val->id]);
            $select[$key]->img = $imgs;
            if ($val->order_step == 3) {
                $material_pay_status = DB::select('select order_material_status from hh_order_material where order_id=? and material_type=?', [$order_id, 1]);
                $select[$key]->material_pay_status = $material_pay_status[0]->order_material_status;
            }
            if ($val->order_step == 7) {
                $material_pay_status = DB::select('select order_material_status from hh_order_material where order_id=? and material_type=?', [$order_id, 3]);
                $select[$key]->material_pay_status = $material_pay_status[0]->order_material_status;
            }
            if ($val->order_step == 11) {
                $material_pay_status = DB::select('select order_material_status from hh_order_material where order_id=? and material_type=?', [$order_id, 4]);
                $select[$key]->material_pay_status = $material_pay_status[0]->order_material_status;
            }
            if ($val->order_step == 15) {
                $material_pay_status = DB::select('select order_material_status from hh_order_material where order_id=? and material_type=?', [$order_id, 5]);
                $select[$key]->material_pay_status = $material_pay_status[0]->order_material_status;
            }
            if($val->order_step == 5){
                $isclick=DB::SELECT('select stage1 from hh_order_actual_isclick where order_id=?',[$order_id]);
                $select[$key]->order_actual_isclick=$isclick[0]->stage1;
            }
            if($val->order_step == 9){
                $isclick=DB::SELECT('select stage2 from hh_order_actual_isclick where order_id=?',[$order_id]);
                $select[$key]->order_actual_isclick=$isclick[0]->stage2;
            }
            if($val->order_step == 13){
                $isclick=DB::SELECT('select stage3 from hh_order_actual_isclick where order_id=?',[$order_id]);
                $select[$key]->order_actual_isclick=$isclick[0]->stage3;
            }
            if($val->order_step == 17){
                $isclick=DB::SELECT('select stage4 from hh_order_actual_isclick where order_id=?',[$order_id]);
                $select[$key]->order_actual_isclick=$isclick[0]->stage4;
            }
            $order_steps = DB::select('select order_step from hh_order_step where step_id=?', [$val->order_step]);
            $select[$key]->order_step = $order_steps[0]->order_step;
        }
        $worker = DB::select('select person1,person2,person3,person4,person5,person6,person7,person8,person9 from hh_order_personnel where order_id=?', [$order_id]);
        if ($worker) {
            if ($worker[0]->person1) {
                $woker_who[] = personal($worker[0]->person1);
            }
            if ($worker[0]->person2) {
                $woker_who[] = personal($worker[0]->person2);
            }
            if ($worker[0]->person3) {
                $woker_who[] = personal($worker[0]->person3);
            }
            if ($worker[0]->person4) {
                $woker_who[] = personal($worker[0]->person4);
            }
            if ($worker[0]->person5) {
                $woker_who[] = personal($worker[0]->person5);
            }
            if ($worker[0]->person6) {
                $woker_who[] = personal($worker[0]->person6);
            }
            if ($worker[0]->person7) {
                $woker_who[] = personal($worker[0]->person7);
            }
            if ($worker[0]->person8) {
                $woker_who[] = personal($worker[0]->person8);
            }
            if ($worker[0]->person9) {
                $woker_who[] = personal($worker[0]->person9);
            }
        }
        //dd($woker_who);
        if ($noworder_step > 2 && $noworder_step <= 6) {
            foreach ($woker_who as $key => $val) {
                if ($val['type'] == 2)
                    $worker_info[0] = $val;
            }
        }
        if ($noworder_step > 6 && $noworder_step <= 10) {
            foreach ($woker_who as $key => $val) {
                if ($val['type'] == 2)
                    $worker_info[0] = $val;
                if ($val['type'] == 3)
                    $worker_info[1] = $val;
            }
        }
        if ($noworder_step > 10 && $noworder_step <= 14) {
            foreach ($woker_who as $key => $val) {
                if ($val['type'] == 2)
                    $worker_info[0] = $val;
                if ($val['type'] == 3)
                    $worker_info[1] = $val;
                if ($val['type'] == 4)
                    $worker_info[2] = $val;
            }
        }
        if ($noworder_step > 14) {
            foreach ($woker_who as $key => $val) {
                if ($val['type'] == 2)
                    $worker_info[0] = $val;
                if ($val['type'] == 3)
                    $worker_info[1] = $val;
                if ($val['type'] == 4)
                    $worker_info[2] = $val;
                if ($val['type'] == 5)
                    $worker_info[3] = $val;
            }
        }
        if ($select) {
            $arr = array("code" => "000",
                "data" => array('now_order_step' => $noworder_step,
                    "noworder_status"=>$noworder_status,
                    "detail" => $select,
                    "worker" => $worker_info
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array("code" => "000",
                "data" => array('now_order_step' => $noworder_step,
                    "noworder_status"=>$noworder_status,
                    "detail" => $select,
                    "worker" => $worker_info
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    
    //获取每个阶段是否已经付款了
    public function getPhasePayStatus() 
    {
        
        $order_id = rq('order_id');
        $order_step = rq('order_step');
        $order_pay_step = rq('order_pay_step');
        $callback = rq('callback');

        if (!$order_pay_step || !$order_step || !$order_id) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }

        $sel_payStatus = DB::SELECT('SELECT pay_status FROM hh_order_pay_each WHERE order_id = ? AND order_step = ? AND order_pay_step = ? ',[$order_id,$order_step,$order_pay_step]);

        if ($sel_payStatus) {
            $arr = array(
                "code" => "000",
                "data" => $sel_payStatus[0]->pay_status
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $code = 1;
            $arr = array(
                "code" => "000",
                "msg" => "数据库没有数据，默认没有付款",
                "data" => $code
            );
            return $callback . "(" . HHJson($arr) . ")";
        }

    }

}