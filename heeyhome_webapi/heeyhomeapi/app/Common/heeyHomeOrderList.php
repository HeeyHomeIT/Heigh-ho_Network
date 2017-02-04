<?php
/**
 * TODO 嘿吼网订单相关基础操作
 * User: heeyhome
 * Date: 2016/12/1
 * Time: 14:23
 */
use Illuminate\Support\Facades\DB;

//查询订单是否存在
function isOrder($order_id, $user_id)
{
    $order_tbl_isdestroy = DB::select('SELECT order_status FROM hh_order WHERE user_id =  ? AND $order_id = ?',
        [$user_id, $order_id]);
    if ($order_tbl_isdestroy) {
        return true;
    } else {
        return false;
    }
}

//查询订单是否存在
function isOrder_OrderID($order_id)
{
    $order_tbl_isdestroy = DB::select('SELECT order_status FROM hh_order WHERE order_id = ?',
        [$order_id]);
    if ($order_tbl_isdestroy) {
        return true;
    } else {
        return false;
    }
}

function orderPrice($data_list,$shop_id)
{

    $sum = 0;
    return $sum;
}
