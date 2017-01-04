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
        $order_id = rq('order_id');
        $callback = rq('callback');
        //
    }
}