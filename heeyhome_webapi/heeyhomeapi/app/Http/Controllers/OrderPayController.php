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
            if ($sel_pay_each_cj[0]->pay_amount >= 0) {
                $arr = array(
                    "code" => "200",
                    "msg" => "订单结转金额无需退款",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                //查询用户退款状态
                $sel_refund_info = DB::select('SELECT * FROM hh_refund_info WHERE order_id = ?',
                    [$order_id]);
                if ($sel_refund_info) {
                    $refund_status = $sel_refund_info[0]->refund_status;
                    $refund_account = $sel_refund_info[0]->refund_account;
                } else {
                    $refund_status = 0;
                }
                $arr = array(
                    "code" => "000",
                    "msg" => "查询成功",
                    "data" => array(
                        "order_id" => $order_id,
                        "order_step" => $sel_order_tbl[0]->order_step,
                        "order_time" => $sel_order_tbl[0]->order_time,
                        "pay_amount" => $sel_pay_each_cj[0]->pay_amount,
                        "refund_status" => $refund_status,
                        "refund_account" => $refund_account
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

    //提交用户退款信息
    public function subRefundInfo()
    {
        $order_id = rq('order_id');
        $alipay_account = ('alipay_account');
        //默认退款账户类型为支付宝
        $account_type = 1;
        $callback = rq('callback');
        //查询退款金额
        $sel_pay_each_cj = DB::select('SELECT pay_amount ,pay_id FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
            [$order_id, 1, 10]);
        if ($sel_pay_each_cj[0]->pay_amount >= 0) {
            $arr = array(
                "code" => "200",
                "msg" => "订单结转金额无需退款",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $pay_amount = $sel_pay_each_cj[0]->pay_amount;
        }
        $refund_amount = abs($pay_amount);
        $refund_account = $alipay_account;
        $refund_submit_time = date('Y-m-d H:i:s', time());
        $ins_refund_info = DB::insert('INSERT INTO hh_refund_info (order_id,refund_submit_time,refund_amount,refund_status,refund_account,account_type) VALUES (?,?,?,?,?,?)',
            [$order_id, $refund_submit_time, $refund_amount, 1, $refund_account, $account_type]);
        if ($ins_refund_info) {
            $arr = array(
                "code" => "000",
                "msg" => "提交退款信息成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "提交退款信息失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

}