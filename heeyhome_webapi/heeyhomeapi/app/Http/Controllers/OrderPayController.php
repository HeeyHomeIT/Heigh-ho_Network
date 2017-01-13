<?php
/**
 * TODO 订单支付相关操作API
 * User: heeyhome
 * Date: 2016/12/5
 * Time: 16:00
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class OrderPayController extends Controller
{

    //用户退款信息获取
    public function getRefundInfo()
    {
        $order_id = rq('order_id');
        $callback = rq('callback');
        //判断订单状态
        $sel_order_tbl = DB::select('SELECT * FROM hh_order WHERE order_id = ?',
            [$order_id]);
        if ($sel_order_tbl) {
            if ($sel_order_tbl[0]->order_step != 17) {
                $arr = array(
                    "code" => "200",
                    "msg" => "订单未到退款阶段",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
            $sel_pay_each_cj = DB::select('SELECT pay_amount ,pay_id FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                [$order_id, 1, 10]);
            if ($sel_pay_each_cj[0]->pay_amount > 0) {
                $arr = array(
                    "code" => "200",
                    "msg" => "订单结转金额无需退款",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array(
                    "code" => "000",
                    "msg" => "查询成功",
                    "data" => array(
                        "order_id" => $order_id,
                        "order_step" => $sel_order_tbl[0]->order_step,
                        "order_time" => $sel_order_tbl[0]->order_time,
                        "pay_amount" => $sel_pay_each_cj[0]->pay_amount
                    )
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "订单不存在",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}