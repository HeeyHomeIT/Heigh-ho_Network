<?php
/* * 
 * 功能：支付宝页面跳转同步通知页面
 * 版本：3.3
 * 日期：2012-07-23
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 * 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。

 *************************页面功能说明*************************
 * 该页面可在本机电脑测试
 * 可放入HTML等美化页面的代码、商户业务逻辑程序代码
 * 该页面可以使用PHP开发工具调试，也可以使用写文本函数logResult，该函数已被默认关闭，见alipay_notify_class.php中的函数verifyReturn
 */

require_once("alipay.config.php");
require_once("lib/alipay_notify.class.php");
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <?php
    //计算得出通知验证结果
    $alipayNotify = new AlipayNotify($alipay_config);
    $verify_result = $alipayNotify->verifyReturn();
    if ($verify_result) {//验证成功
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //请在这里加上商户的业务逻辑程序代码

        //——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
        //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表

        //商户订单号

        $out_trade_no = $_GET['out_trade_no'];

        //支付宝交易号

        $trade_no = $_GET['trade_no'];
        $notify_time = $_GET['notify_time'];
        $total_fee = $_GET['total_fee'];

        //交易状态
        $trade_status = $_GET['trade_status'];
        $flag = false;
        $order_pay_step_id = 12;
        if ($_GET['trade_status'] == 'TRADE_FINISHED' || $_GET['trade_status'] == 'TRADE_SUCCESS') {
            //判断该笔订单是否在商户网站中已经做过处理
            //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
            //如果有做过处理，不执行商户的业务程序
        } else {
            echo "trade_status=" . $_GET['trade_status'];
        }

        $sel_order_pay_each_istrue = \Illuminate\Support\Facades\DB::select('SELECT * FROM hh_order_pay_each WHERE pay_id = ? ', [$out_trade_no]);
        if ($sel_order_pay_each_istrue) {
            //更新订单为已支付状态
            $upd_order_pay_each = \Illuminate\Support\Facades\DB::update('UPDATE hh_order_pay_each SET pay_status = 3 WHERE pay_id = ?', [$out_trade_no]);
            $sel_order_pay_each = \Illuminate\Support\Facades\DB::select('SELECT * FROM hh_order_pay_each WHERE pay_id = ?', [$out_trade_no]);
            $order_id = $sel_order_pay_each[0]->order_id;
            //跟新订单已支付金额
            $sel_order_pay = \Illuminate\Support\Facades\DB::select('SELECT * FROM hh_order_pay WHERE order_id = ?', [$order_id]);
            $actual_finish_amount = $sel_order_pay[0]->actual_finish_amount;
            $actual_next_amount = $sel_order_pay[0]->actual_next_amount;
            $order_pay_step = $sel_order_pay[0]->order_pay_step;
            $actual_finish_amount += $total_fee;
            $actual_next_amount -= $total_fee;
            $order_pay_step = 13;
            //获取订单进度
            $sel_order = \Illuminate\Support\Facades\DB::select('SELECT * FROM hh_order WHERE order_id = ?', [$order_id]);
            $order_step = $sel_order[0]->order_step;
            $order_status = $sel_order[0]->order_status;
            $upd_order_pay = \Illuminate\Support\Facades\DB::update('UPDATE hh_order_pay SET actual_finish_amount = ?, actual_next_amount= ?, order_pay_step = ? WHERE order_id = ?',
                [$actual_finish_amount, $actual_next_amount, $order_pay_step, $order_id]);
            if ($order_status == 4) {
                $pay_step = "工长、杂工、水电工预付款";
                $order_status = 5;
                $order_step = 1;
                $order_pay_step_id = 2;
            } else if ($order_status == 5) {
                if ($order_step == 3) {
                    $pay_step = "水电辅材付款";
                    $order_step = 4;
                    $flag = true;
                    $order_pay_step_id = 6;
                }
                if ($order_step == 5) {
                    $pay_step = "瓦工预付款及上阶段结转金额";
                    $order_step = 6;
                    $order_pay_step_id = 3;
                }
                if ($order_step == 7) {
                    $pay_step = "瓦工辅材付款";
                    $order_step = 8;
                    $flag = true;
                    $order_pay_step_id = 7;
                }
                if ($order_step == 9) {
                    $pay_step = "木工预付款及上阶段结转金额";
                    $order_step = 10;
                    $order_pay_step_id = 4;
                }
                if ($order_step == 11) {
                    $pay_step = "木工辅材付款";
                    $order_step = 12;
                    $flag = true;
                    $order_pay_step_id = 8;
                }
                if ($order_step == 13) {
                    $pay_step = "油漆工预付款及上阶段结转金额";
                    $order_step = 14;
                    $order_pay_step_id = 5;
                }
                if ($order_step == 15) {
                    $pay_step = "油漆工辅材付款";
                    $order_step = 16;
                    $flag = true;
                    $order_pay_step_id = 9;
                }
                if ($order_step == 17) {
                    $pay_step = "最终结转金额";
                    $order_status = 6;
                    $order_pay_step_id = 10;
                }
            } else {
                $pay_step = "嘿吼网订单付款";
            }
            //跟新订单进度
            $upd_order = \Illuminate\Support\Facades\DB::update('UPDATE hh_order SET order_status = ?,order_step = ? WHERE order_id = ?', [$order_status, $order_step, $order_id]);
            //查询店铺id
            $sel_shop_id = \Illuminate\Support\Facades\DB::select('SELECT shop_id FROM hh_order WHERE order_id = ?', [$order_id]);
            $shop_id = $sel_shop_id[0]->shop_id;
            //查询店铺接单数
            $sel_shop_volume = \Illuminate\Support\Facades\DB::select('SELECT shop_volume FROM hh_shop WHERE shop_id = ?', [$shop_id]);
            $shop_volume = $sel_shop_volume[0]->shop_volume;
            $shop_volume++;
            //增加店铺接单数
            $upd_shop_volume = \Illuminate\Support\Facades\DB::update('UPDATE hh_shop SET shop_volume = ? WHERE shop_id = ?', [$shop_volume, $shop_id]);
            //——请根据您的业务逻辑来编写程序（以上代码仅作参考）——
            if ($flag) {
                //若为材料单时支付成功逻辑
                $material_id = $out_trade_no;
                //1.更新pay status为3
                $pay_status = \Illuminate\Support\Facades\DB::update('UPDATE hh_order_material SET pay_status = 3 WHERE material_id = ?', [$material_id]);
                //2.找到order id
                $sel_order_id = \Illuminate\Support\Facades\DB::select('SELECT order_id FROM hh_order_material WHERE material_id = ?', [$material_id]);
                //3.找到地址id
                $order_address = \Illuminate\Support\Facades\DB::select('SELECT order_address FROM hh_order WHERE order_id = ? ', [$sel_order_id[0]->order_id]);
                //4.匹配市
                $address = \Illuminate\Support\Facades\DB::select('SELECT province,city,district FROM hh_driveaddress WHERE id =?', [$order_address[0]->order_address]);
                if ($address) {
                    $city = $address[0]->city;
                    $district = $address[0]->district;
                    $e_city = explode('市', $city);
                    $e_dis = explode('区', $district);

                    $isHave = false;
                    for ($i=0; $i < count($e_dis); $i++) { 
                        $sel_area_id = \Illuminate\Support\Facades\DB::select("SELECT distribution_area_id FROM hh_material_distribution_area WHERE distribution_area_name LIKE '%?%' AND distribution_area_name LIKE '%?%'",[$e_city[0]],[$e_dis[$i]]);
                        if ($sel_area_id) {
                            $sel_material_supplier_id = \Illuminate\Support\Facades\DB::select("SELECT material_supplier_id FROM hh_material_supplier_info WHERE distribution_area = ? ", $sel_area_id[0]->distribution_area_id);
                            if ($sel_material_supplier_id) {
                                //5.插入id
                                $upd_supplier_id = \Illuminate\Support\Facades\DB::update('UPDATE hh_order_material SET material_supplier_id = ?', [$sel_material_supplier_id[0]->material_supplier_id]);
                                $isHave = true;
                                break;
                            }
                        }
                    }

                    if (!$isHave) {
                         echo "未找到材料供应商，请联系客服！";
                    }
                }
            }
            $url = 'http://www.heeyhome.com/success_pay.html#/?total=' . $total_fee . '&order_id=' . $order_id . '&pay_step=' . $pay_step . '&pay_time=' . $notify_time . '&order_pay_step_id=' . $order_pay_step_id;
            echo "<meta http-equiv='Refresh' content='1; url=" . $url . "'/>";
        } else {
            echo "验证失败";
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    } else {
        //验证失败
        //如要调试，请看alipay_notify.php页面的verifyReturn函数
        echo "验证失败";
    }
    ?>
    <title>支付宝即时到账交易接口</title>
</head>
<body>
</body>
</html>