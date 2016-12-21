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

    //生成订单支付表
    public function generateOrderPay()
    {
        $order_id = rq('order_id');
        $callback = rq('callback');

    }
}