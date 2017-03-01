<?php
/* *
 * 功能：支付宝服务器异步通知页面
 * 版本：3.3
 * 日期：2012-07-23
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 * 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。


 *************************页面功能说明*************************
 * 创建该页面文件时，请留心该页面文件中无任何HTML代码及空格。
 * 该页面不能在本机电脑测试，请到服务器上做测试。请确保外部可以访问该页面。
 * 该页面调试工具请使用写文本函数logResult，该函数已被默认关闭，见alipay_notify_class.php中的函数verifyNotify
 * 如果没有收到该页面返回的 success 信息，支付宝会在24小时内按一定的时间策略重发通知
 */

require_once("alipay.config.php");
require_once("lib/alipay_notify.class.php");

//计算得出通知验证结果
$alipayNotify = new AlipayNotify($alipay_config);
$verify_result = $alipayNotify->verifyNotify();

if ($verify_result) {//验证成功
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //请在这里加上商户的业务逻辑程序代


    //——请根据您的业务逻辑来编写程序（以下代码仅作参考）——

    //获取支付宝的通知返回参数，可参考技术文档中服务器异步通知参数列表

    //商户订单号

    $out_trade_no = $_POST['out_trade_no'];

    //支付宝交易号

    $trade_no = $_POST['trade_no'];
    $notify_time = $_REQUEST['notify_time'];
    $total_fee = $_REQUEST['total_fee'];
    $foreman_flga = false;
    //交易状态
    $trade_status = $_POST['trade_status'];
    if ($_POST['trade_status'] == 'TRADE_FINISHED') {
        //判断该笔订单是否在商户网站中已经做过处理
        //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
        //请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
        //如果有做过处理，不执行商户的业务程序

        //注意：
        //退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知

        //调试用，写文本函数记录程序运行情况是否正常
        //logResult("这里写入想要调试的代码变量值，或其他运行的结果记录");
    } else if ($_POST['trade_status'] == 'TRADE_SUCCESS') {
        //判断该笔订单是否在商户网站中已经做过处理
        //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
        //请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
        //如果有做过处理，不执行商户的业务程序

        //注意：
        //付款完成后，支付宝系统发送该交易状态通知

        //调试用，写文本函数记录程序运行情况是否正常
        //logResult("这里写入想要调试的代码变量值，或其他运行的结果记录");
    }

    $sel_order_pay_each_istrue = \Illuminate\Support\Facades\DB::select('SELECT * FROM hh_order_pay_each WHERE pay_id = ? AND pay_status = ?', [$out_trade_no,1]);
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
            $order_status = 5;
            $order_step = 1;
            $foreman_flga = true;
        } else if ($order_status == 5) {
            if ($order_step == 3) {
                $order_step = 4;
            } else if ($order_step == 5) {
                $order_step = 6;
            } else if ($order_step == 7) {
                $order_step = 8;
            } else if ($order_step == 9) {
                $order_step = 10;
            } else if ($order_step == 11) {
                $order_step = 12;
            } else if ($order_step == 13) {
                $order_step = 14;
            } else if ($order_step == 15) {
                $order_step = 16;
            } else if ($order_step == 17) {
                $order_status = 6;
            }
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
        //TODO 工长钱包收入
        if ($foreman_flga) {
            $sel_order_pay_each = \Illuminate\Support\Facades\DB::select('SELECT order_id,pay_amount FROM hh_order_pay_each WHERE pay_id = ? AND order_pay_step = ?',
                [$out_trade_no, 1]);
            $foreman_shopid = \Illuminate\Support\Facades\DB::select('SELECT shop_id FROM hh_order WHERE order_id = ?',
                [$sel_order_pay_each[0]->order_id]);
            $foreman_ids = \Illuminate\Support\Facades\DB::select('SELECT shopper_id FROM hh_shop WHERE shop_id = ?',
                [$foreman_shopid[0]->shop_id]);
            $foreman_id = $foreman_ids[0]->shopper_id;//工长id
            $foreman_fee = $sel_order_pay_each[0]->pay_amount;//工长收入
            //TODO 抽点
            //$foreman_fee = $foreman_fee * 0.05;
            //总额:total,保证金:deposit,可提现:available_total
            $foreman_wallet = \Illuminate\Support\Facades\DB::select('SELECT total,deposit FROM hh_wallet_balance WHERE user_id=?',
                [$foreman_id]);
            $deposit_flag_fee = 0;
            if ($foreman_wallet[0]->deposit < 8000) {
                if (abs($foreman_wallet[0]->deposit - 8000) >= 1000) {
                    if ($foreman_fee > 1000) {
                        $deposit_flag_fee = 1000;
                    } else {
                        $deposit_flag_fee = $foreman_fee;
                    }
                } else {
                    if ($foreman_fee >= (8000 - $foreman_wallet[0]->deposit)) {
                        $deposit_flag_fee = 8000 - $foreman_wallet[0]->deposit;
                    } else {
                        $deposit_flag_fee = $foreman_fee;
                    }
                }
            }
            $total = $foreman_wallet[0]->total + $foreman_fee;
            $deposit = $foreman_wallet[0]->deposit + $deposit_flag_fee;
            $available_total = $total - $deposit;
            $upd_wallet = \Illuminate\Support\Facades\DB::update('UPDATE hh_wallet_balance SET total = ?,available_total = ?,deposit=? WHERE user_id = ?', [$total, $available_total, $deposit, $foreman_id]);
            if ($upd_wallet) {
                //向钱包明细加入数据
                $confirm_time = date('Y-m-d H:i:s', time());
                $insert = \Illuminate\Support\Facades\DB::insert('insert into hh_wallet_detail(user_id,money,content,time) values(?,?,?,?)', [$foreman_id, '+' . $foreman_fee, '收入-预付款', $confirm_time]);
                if ($insert) {
                    //发送消息
                    $message = new \App\Http\Controllers\MessageController();
                    $message->send('嘿吼网', '系统消息', '进账提醒' . '用户支付工长预付款', $foreman_id);
                }
            }
        }
        //判断是否为材料单
        $material_id = $out_trade_no;
        $sel_order_material = \Illuminate\Support\Facades\DB::select('SELECT * FROM hh_order_material WHERE order_id = ? AND material_id=?', [$order_id, $material_id]);
        if ($sel_order_material) {
            //若为材料单时支付成功逻辑
            //1.更新pay status为3
            $pay_status = \Illuminate\Support\Facades\DB::update('UPDATE hh_order_material SET pay_status = 3 WHERE material_id = ?', [$material_id]);
            //2.找到地址id
            $sel_order_address_id = \Illuminate\Support\Facades\DB::select('SELECT order_address FROM hh_order WHERE order_id = ? ', [$order_id]);
            //3.匹配市
            $sel_address = \Illuminate\Support\Facades\DB::select('SELECT province,city,district FROM hh_driveaddress WHERE id =?', [$sel_order_address_id[0]->order_address]);
            if ($sel_address) {
                $city = $sel_address[0]->city;
                $dis = $sel_address[0]->district;
                $isHave = false;
                $sel_area_id = \Illuminate\Support\Facades\DB::select("SELECT distribution_area_id FROM hh_material_distribution_area WHERE distribution_area_name LIKE '%".$city."%' AND distribution_area_name LIKE '%".$dis."%'",
                    []);
                if ($sel_area_id) {
                    $sel_material_supplier_id = \Illuminate\Support\Facades\DB::select("SELECT material_supplier_id FROM hh_material_supplier_info WHERE distribution_area = ? ", [$sel_area_id[0]->distribution_area_id]);
                    if ($sel_material_supplier_id) {
                        //5.插入id
                        $upd_supplier_id = \Illuminate\Support\Facades\DB::update("UPDATE hh_order_material SET material_supplier_id = '" . $sel_material_supplier_id[0]->material_supplier_id . "' WHERE order_id = ? AND material_id=?", [$order_id, $material_id]);
                        $isHave = true;
                    }
                }
                if (!$isHave) {
                    echo "false";
                }
            }
            //TODO 材料商钱包收入
            $supplier_fee = $total_fee;
            //TODO 抽点
            //$supplier_fee = $supplier_fee * 0.05;
            $material_supplier_ids = \Illuminate\Support\Facades\DB::select("SELECT material_supplier_id FROM hh_order_material WHERE material_id = ? ", $material_id);
            $supplier_id = $material_supplier_ids[0]->material_supplier_id;//材料商id
            $supplier_wallet = \Illuminate\Support\Facades\DB::select('SELECT total,available_total FROM hh_wallet_balance WHERE user_id=?',
                [$supplier_id]);
            $total = $supplier_wallet[0]->total + $supplier_fee;
            $available_total = $supplier_wallet[0]->available_total + $supplier_fee;
            $upd_wallet = \Illuminate\Support\Facades\DB::update('UPDATE hh_wallet_balance SET total = ?,available_total = ? WHERE user_id = ?', [$total, $available_total, $supplier_id]);
            if ($upd_wallet) {
                //向钱包明细加入数据
                $confirm_time = date('Y-m-d H:i:s', time());
                $insert = \Illuminate\Support\Facades\DB::insert('insert into hh_wallet_detail(user_id,money,content,time) values(?,?,?,?)', [$supplier_id, '+' . $supplier_fee, '收入-材料费用', $confirm_time]);
                if ($insert) {
                    //发送消息
                    $message = new \App\Http\Controllers\MessageController();
                    $message->send('嘿吼网', '系统消息', '进账提醒' . '用户支付材料费', $supplier_id);
                }
            }
        }
        echo "success";        //请不要修改或删除
    } else {
        echo "success";        //请不要修改或删除
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
} else {
    //验证失败
    echo "fail";

//调试用，写文本函数记录程序运行情况是否正常
//logResult("这里写入想要调试的代码变量值，或其他运行的结果记录");
}
?>