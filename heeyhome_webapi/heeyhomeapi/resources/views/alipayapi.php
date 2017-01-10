<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>支付宝即时到账交易接口接口</title>
</head>
<?php
/* *
 * 功能：即时到账交易接口接入页
 * 版本：3.4
 * 修改日期：2016-03*08
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 * 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。

 *************************注意*****************
 
 *如果您在接口集成过程中遇到问题，可以按照下面的途径来解决
 *1、开发文档中心（https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.KvddfJ&treeId=62&articleId=103740&docType=1）
 *2、商户帮助中心（https://cshall.alipay.com/enterprise/help_detail.htm?help_id=473888）
 *3、支持中心（https://support.open.alipay.com/alipay/support/index.htm）

 *如果想使用扩展功能,请按文档要求,自行添加到parameter数组即可。
 **********************************************
 */

require_once("alipay.config.php");
require_once("lib/alipay_submit.class.php");

/**************************请求参数**************************/

$pay_type = $_POST ['pay_type'];
$order_id = $_POST ['order_id'];
//支付订单初始数据
$pay_id = '';
$pay_name = 'heeyhome网装修订单';
$pay_amount = 0;
$pay_mess = '订单支付内容为：';
//支付详情
if ($pay_type == 'order') {
//获取当前订单状态
    $sel_order_step = \Illuminate\Support\Facades\DB::select('SELECT order_step FROM hh_order WHERE order_id = ?',
        [$order_id]);
    if ($sel_order_step) {
        $order_step = $sel_order_step[0]->order_step;
        //默认订单状态为进行中
        $order_status = 5;
        if ($order_step == 18) {
            //订单未开工查询订单状态是否为待用户预支付
            $sel_order_status = \Illuminate\Support\Facades\DB::select('SELECT order_status FROM hh_order WHERE order_id = ?',
                [$order_id]);
            if ($sel_order_status) {
                $order_status = $sel_order_status[0]->order_status;
                if ($order_status != 4) {
                    //订单不是为待用户预支付
                    return;
                }
            } else {
                return;
            }
        }
        //查询当前需要支付的金额
        $sel_pay_amount = \Illuminate\Support\Facades\DB::select('SELECT actual_next_amount FROM hh_order_pay  WHERE order_id = ?',
            [$order_id]);
        if ($sel_pay_amount) {
            $actual_next_amount = $sel_pay_amount[0]->actual_next_amount;
            if ($actual_next_amount <= 0) {
                //没有用户需要支付的金额
                return;
            } else {
                //获取需要用户支付的内容
                //判断订单状态是否为待用户预支付
                if ($order_status == 4) {
                    //查询工长预支付金额
                    $sel_pay_each_gz = \Illuminate\Support\Facades\DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                        [$order_id, 1, 1]);
                    if ($sel_pay_each_gz) {
                        $pay_amount = $sel_pay_each_gz[0]->pay_amount;
                        $pay_each_mess = '1.工长预支付工价为：' . $pay_amount . ';';
                        $pay_mess .= $pay_each_mess;
                    }
                    //查询水电工预支付金额
                    $sel_pay_each_sdg = \Illuminate\Support\Facades\DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                        [$order_id, 1, 2]);
                    if ($sel_pay_each_gz) {
                        $pay_amount = $sel_pay_each_sdg[0]->pay_amount;
                        $pay_each_mess = '2.水电工预支付工价为：' . $pay_amount . ';';
                        $pay_mess .= $pay_each_mess;
                    }
                    //查询杂工预支付金额
                    $sel_pay_each_zg = \Illuminate\Support\Facades\DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                        [$order_id, 1, 11]);
                    if ($sel_pay_each_gz) {
                        $pay_amount = $sel_pay_each_zg[0]->pay_amount;
                        $pay_each_mess = '3.杂工预支付工价为：' . $pay_amount . ';';
                        $pay_mess .= $pay_each_mess;
                    }
                    //查询支付编号,使用同一条编号
                    $sel_pay_id = \Illuminate\Support\Facades\DB::select('SELECT pay_id FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND (order_pay_step = ? OR order_pay_step = ? OR order_pay_step = ?)',
                        [$order_id, 1, 1, 2, 11]);
                    if ($sel_pay_id) {
                        $pay_id = $sel_pay_id[0]->pay_id;
                    }
                } else {
                    switch ($order_step) {
                        case 5;
                            //水电改造完成
                            $sel_pay_each_wg = \Illuminate\Support\Facades\DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                                [$order_id, 1, 3]);
                            if ($sel_pay_each_wg) {
                                $pay_amount = $sel_pay_each_wg[0]->pay_amount;
                                $pay_each_mess = '1.瓦工预支付工价为：' . $pay_amount . ';';
                                $pay_mess .= $pay_each_mess;
                            }
                            break;
                        case 9;
                            //瓦工改造完成
                            $sel_pay_each_mg = \Illuminate\Support\Facades\DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                                [$order_id, 1, 4]);
                            if ($sel_pay_each_mg) {
                                $pay_amount = $sel_pay_each_mg[0]->pay_amount;
                                $pay_each_mess = '1.木工预支付工价为：' . $pay_amount . ';';
                                $pay_mess .= $pay_each_mess;
                            }
                            break;
                        case 13;
                            //木工改造完成
                            $sel_pay_each_yqg = \Illuminate\Support\Facades\DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                                [$order_id, 1, 5]);
                            if ($sel_pay_each_yqg) {
                                $pay_amount = $sel_pay_each_yqg[0]->pay_amount;
                                $pay_each_mess = '1.油漆工预支付工价为：' . $pay_amount . ';';
                                $pay_mess .= $pay_each_mess;
                            }
                            break;
                        case 17;
                            //油漆工改造完成
                            break;
                    }
                    //查询补差价
                    $sel_pay_each_cj = \Illuminate\Support\Facades\DB::select('SELECT pay_amount ,pay_id FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                        [$order_id, 1, 10]);
                    if ($sel_pay_each_cj) {
                        $pay_amount = $sel_pay_each_cj[0]->pay_amount;
                        $pay_each_mess = '2.上阶段结转金额：' . $pay_amount . ';';
                        $pay_mess .= $pay_each_mess;
                        $pay_id = $sel_pay_each_cj[0]->pay_id;
                    }
                }
            }
        } else {
            //没有需要支付的订单
            return;
        }
    } else {
        //没有订单
        return;
    }
} else if ($pay_type == 'material') {
    $material_list_arr = json_decode($_POST['material_list'], true);
    //获取材料订单id
    $sel_material_tbl = \Illuminate\Support\Facades\DB::select('SELECT material_id,order_id,material_type FROM hh_order_material WHERE order_id =? AND pay_status = ?',
        [$order_id, 0]);
    if ($sel_material_tbl) {
        $material_id = $sel_material_tbl[0]->material_id;
        $order_id = $sel_material_tbl[0]->order_id;
        $material_type = $sel_material_tbl[0]->material_type;
    } else {
        //不存在未支付的订单
        return;
    }
    //默认状态为辅材支付
    $order_pay_step = 12;
    switch ($material_type) {
        case 1:
            $order_pay_step = 6;
            break;
        case 3:
            $order_pay_step = 7;
            break;
        case 4:
            $order_pay_step = 8;
            break;
        case 5:
            $order_pay_step = 9;
            break;
    }
    //确定材料单用户所选材料
    $count = count($material_list_arr);
    $i = 0;
    $sum = 0.00;
    while ($i < $count) {
        \Illuminate\Support\Facades\DB::update('UPDATE hh_order_material_list SET choose_flag = ? WHERE material_id = ? AND material_name_id = ?',
            [$material_id, $material_list_arr[$i]]);
        //获取当前材料金额
        $sel_aterial_list_data_tbl = \Illuminate\Support\Facades\DB::select('SELECT price,num FROM hh_material_list_data_view WHERE material_list_id = ? AND id = ?',
            [$material_id, $material_list_arr[$i]]);
        $sum += ($sel_aterial_list_data_tbl[0]->price * $sel_aterial_list_data_tbl[0]->num);
        $i++;
    }
    //查询订单状态
    $sel_order_step = DB::select('SELECT order_step FROM hh_order WHERE order_id = ?',
        [$order_id]);
    if ($sel_order_step) {
        $order_step = $sel_order_step[0]->order_step;
    } else {
        return;
    }
    //插入支付表
    \Illuminate\Support\Facades\DB::insert('INSERT INTO hh_order_pay_each (order_id,pay_id,order_pay_step,order_step,pay_amount,pay_status) VALUES ?,?,?,?,?,?',
        [$order_id, $material_id, $order_pay_step, $order_step, $sum, 1]);
    //进入支付阶段
    $sel_material_tbl = \Illuminate\Support\Facades\DB::select('SELECT material_id,material_type,material_price FROM hh_order_material WHERE order_id =? AND pay_status = ?',
        [$order_id, 1]);
    if ($sel_material_tbl) {
        $pay_id = $sel_material_tbl[0]->material_id;
        $pay_name = "heeyhome网装材料订单";
        $pay_amount = $sel_material_tbl[0]->material_price;
        $material_type = $sel_material_tbl[0]->material_type;
        switch ($material_type) {
            case 1:
                $pay_mess .= '1.水电辅材';
                break;
            case 2:
                $pay_mess .= '1.木工辅材';
                break;
            case 3:
                $pay_mess .= '1.瓦工辅材';
                break;
            case 4:
                $pay_mess .= '1.油漆工辅材';
                break;
        }
    } else {
        //不存在未支付的订单
        return;
    }
}

//商户订单号，商户网站订单系统中唯一订单号，必填
$out_trade_no = $pay_id;
//订单名称，必填
$subject = $pay_name;
//付款金额，必填
$total_fee = $actual_next_amount;
//商品描述，可空
$body = $pay_mess;

/************************************************************/

//构造要请求的参数数组，无需改动
$parameter = array(
    "service" => $alipay_config['service'],
    "partner" => $alipay_config['partner'],
    "seller_id" => $alipay_config['seller_id'],
    "payment_type" => $alipay_config['payment_type'],
    "notify_url" => $alipay_config['notify_url'],
    "return_url" => $alipay_config['return_url'],

    "anti_phishing_key" => $alipay_config['anti_phishing_key'],
    "exter_invoke_ip" => $alipay_config['exter_invoke_ip'],
    "out_trade_no" => $out_trade_no,
    "subject" => $subject,
    "total_fee" => $total_fee,
    "body" => $body,
    "_input_charset" => trim(strtolower($alipay_config['input_charset']))
    //其他业务参数根据在线开发文档，添加参数.文档地址:https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.kiX33I&treeId=62&articleId=103740&docType=1
    //如"参数名"=>"参数值"

);

//建立请求
//$alipaySubmit = new AlipaySubmit($alipay_config);
//$html_text = $alipaySubmit->buildRequestForm($parameter, "get", "确认");
//echo $html_text;

?>
</body>
</html>