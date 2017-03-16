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
            $sel_pay_each_cj = DB::select('SELECT pay_amount ,pay_id FROM hh_order_pay_each WHERE order_id = ? AND order_pay_step = ? AND order_step = ?',
                [$order_id, 10, 17]);
            if (!$sel_pay_each_cj) {
                $arr = array(
                    "code" => "200",
                    "msg" => "查询不到退款信息",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
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
                    $refund_account = "";
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
        $alipay_account = rq('alipay_account');
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
    public function getpayinfo(){
        $callback=rq('callback');
        $pay_type = rq('pay_type');
        $order_id = rq('order_id');
        //支付订单初始数据
        $pay_id = '';
        $pay_name = 'heeyhome网装修订单';
        $pay_amount = 0;
        $pay_mess = '订单支付内容为：';

        //支付详情
        if ($pay_type == 'order') {
            //获取当前订单状态
            $sel_order_step = DB::select('SELECT order_step FROM hh_order WHERE order_id = ?',
                [$order_id]);
            if ($sel_order_step) {
                $order_step = $sel_order_step[0]->order_step;
                //默认订单状态为进行中
                $order_status = 5;
                if ($order_step == 18) {
                    //订单未开工查询订单状态是否为待用户预支付
                    $sel_order_status = DB::select('SELECT order_status FROM hh_order WHERE order_id = ?',
                        [$order_id]);
                    if ($sel_order_status) {
                        $order_status = $sel_order_status[0]->order_status;
                        if ($order_status != 4) {
                            //订单不是为待用户预支付
                            $arr = array(
                                "code" => "112",
                                "msg" => "订单状态不为用户预支付"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                    }
                }
                //查询当前需要支付的金额
                $sel_pay_amount = DB::select('SELECT actual_next_amount FROM hh_order_pay  WHERE order_id = ?',
                    [$order_id]);
                if ($sel_pay_amount) {
                    $actual_next_amount = $sel_pay_amount[0]->actual_next_amount;
                    if ($actual_next_amount <= 0) {
                        //没有用户需要支付的金额
                        $arr = array(
                            "code" => "113",
                            "msg" => "不存在用户需要支付的金额"
                        );
                        return $callback . "(" . HHJson($arr) . ")";
                    } else {
                        //获取需要用户支付的内容
                        //判断订单状态是否为待用户预支付
                        if ($order_status == 4) {
                            //查询工长预支付金额
                            $sel_pay_each_gz = DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                                [$order_id, 1, 1]);
                            if ($sel_pay_each_gz) {
                                $pay_amount = $sel_pay_each_gz[0]->pay_amount;
                                $pay_amount = 2;
                                $pay_each_mess = '1.工长预支付工价为：' . $pay_amount . ';';
                                $pay_mess .= $pay_each_mess;
                            }
                            //查询水电工预支付金额
                            $sel_pay_each_sdg = DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                                [$order_id, 1, 2]);
                            if ($sel_pay_each_gz) {
                                $pay_amount = $sel_pay_each_sdg[0]->pay_amount;
                                $pay_amount = 1;
                                $pay_each_mess = '2.水电工预支付工价为：' . $pay_amount . ';';
                                $pay_mess .= $pay_each_mess;
                            }
                            //查询杂工预支付金额
                            $sel_pay_each_zg = DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                                [$order_id, 1, 11]);
                            if ($sel_pay_each_gz) {
                                $pay_amount = $sel_pay_each_zg[0]->pay_amount;
                                $pay_each_mess = '3.杂工预支付工价为：' . $pay_amount . ';';
                                $pay_mess .= $pay_each_mess;
                            }
                            //查询支付编号,使用同一条编号
                            $sel_pay_id = DB::select('SELECT pay_id FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND (order_pay_step = ? OR order_pay_step = ? OR order_pay_step = ?)',
                                [$order_id, 1, 1, 2, 11]);
                            if ($sel_pay_id) {
                                $pay_id = $sel_pay_id[0]->pay_id;
                            }
                        } else {
                            switch ($order_step) {
                                case 5;
                                    //水电改造完成
                                    $sel_pay_each_wg = DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                                        [$order_id, 1, 3]);
                                    if ($sel_pay_each_wg) {
                                        $pay_amount = $sel_pay_each_wg[0]->pay_amount;
                                        $pay_each_mess = '1.瓦工预支付工价为：' . $pay_amount . ';';
                                        $pay_mess .= $pay_each_mess;
                                    }
                                    break;
                                case 9;
                                    //瓦工改造完成
                                    $sel_pay_each_mg = DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
                                        [$order_id, 1, 4]);
                                    if ($sel_pay_each_mg) {
                                        $pay_amount = $sel_pay_each_mg[0]->pay_amount;
                                        $pay_each_mess = '1.木工预支付工价为：' . $pay_amount . ';';
                                        $pay_mess .= $pay_each_mess;
                                    }
                                    break;
                                case 13;
                                    //木工改造完成
                                    $sel_pay_each_yqg = DB::select('SELECT pay_amount FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
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
                            $sel_pay_each_cj = DB::select('SELECT pay_amount ,pay_id FROM hh_order_pay_each WHERE order_id = ? AND pay_status = ? AND order_pay_step = ?',
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
                    $arr = array(
                        "code" => "114",
                        "msg" => "没有需要支付的订单"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            } else {
                //没有订单
                $arr = array(
                    "code" => "111",
                    "msg" => "订单不存在"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else if ($pay_type == 'material') {
            //进入支付阶段
            $sel_material_tbl = DB::select('SELECT material_id,material_type,material_price FROM hh_order_material WHERE order_id =? AND pay_status = ?',
                [$order_id, 1]);
            if (!$sel_material_tbl) {
                $material_list_arr = json_decode(rq('material_list'), true);
                //获取材料订单id
                $sel_material_tbl = DB::select('SELECT material_id,order_id,material_type FROM hh_order_material WHERE order_id =? AND pay_status = ?',
                    [$order_id, 0]);
                if ($sel_material_tbl) {
                    $material_id = $sel_material_tbl[0]->material_id;
                    $order_id = $sel_material_tbl[0]->order_id;
                    $material_type = $sel_material_tbl[0]->material_type;
                } else {
                    //不存在未支付的订单
                    $arr = array(
                        "code" => "115",
                        "msg" => "不存在未支付的订单"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
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
                    DB::update('UPDATE hh_order_material_list SET choose_flag = ? WHERE material_id = ? AND material_name_id = ?',
                        [1, $material_id, $material_list_arr[$i]]);
                    //获取当前材料金额
                    $sel_aterial_list_data_tbl = DB::select('SELECT price,num FROM hh_material_list_data_view WHERE material_list_id = ? AND id = ?',
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
                    $arr = array(
                        "code" => "111",
                        "msg" => "订单不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                //插入支付表
                DB::insert('INSERT INTO hh_order_pay_each (order_id,pay_id,order_pay_step,order_step,pay_amount,pay_status) VALUES (?,?,?,?,?,?)',
                    [$order_id, $material_id, $order_pay_step, $order_step, $sum, 1]);
                //修改材料表信息
                DB::update('UPDATE hh_order_material SET pay_status = ?,material_price=? WHERE order_id = ? AND material_type = ?',
                    [1, $sum, $order_id, $material_type]);
                $actual_next_amount = $sum;
                DB::update('UPDATE hh_order_pay SET actual_next_amount =?,order_pay_step = ? WHERE order_id = ?', [$actual_next_amount, 12, $order_id]);
            } else {
                $material_id = $sel_material_tbl[0]->material_id;
                $sum = $sel_material_tbl[0]->material_price;
                $material_type = $sel_material_tbl[0]->material_type;
            }
            $pay_id = $material_id;
            $pay_name = "heeyhome网装材料订单";
            $actual_next_amount = $sum;
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
        // 产品类型，无需修改
        $alipay_config['service'] = "create_direct_pay_by_user";
        //合作身份者ID，签约账号，以2088开头由16位纯数字组成的字符串，查看地址：https://openhome.alipay.com/platform/keyManage.htm?keyType=partner
        $alipay_config['partner'] = '2088421351821854';
        //收款支付宝账号，以2088开头由16位纯数字组成的字符串，一般情况下收款账号就是签约账号
        $alipay_config['seller_id'] = $alipay_config['partner'];
        // 支付类型 ，无需修改
        $alipay_config['payment_type'] = "1";
        // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
        //$alipay_config['notify_url'] = "http://www.heeyhome.com/create_direct_pay_by_user-PHP-UTF-8/notify_url.php";
        $alipay_config['notify_url'] = "http://localhost:81/create_direct_pay_by_user-PHP-UTF-8/notify_url.php";

        // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
        //$alipay_config['return_url'] = "http://www.heeyhome.com/create_direct_pay_by_user-PHP-UTF-8/return_url.php";
        $alipay_config['return_url'] = "http://localhost:81/create_direct_pay_by_user-PHP-UTF-8/return_url.php";
        //字符编码格式 目前支持 gbk 或 utf-8
        $alipay_config['input_charset']= strtolower('utf-8');
        $input_charset=trim(strtolower($alipay_config['input_charset']));
        //签名方式
        $alipay_config['sign_type']    = strtoupper('RSA');
        $parameter = array(
            "service" => $alipay_config['service'],
            "partner" => $alipay_config['partner'],
            "seller_id" => $alipay_config['seller_id'],
            "payment_type" => $alipay_config['payment_type'],
            "notify_url" => $alipay_config['notify_url'],
            "return_url" => $alipay_config['return_url'],
            "out_trade_no" => $out_trade_no,
            "subject" => $subject,
            "total_fee" => $total_fee,
            "body" => $body,
            "_input_charset" => $input_charset,

        );
        $arr = array(
            "code" => "000",
            "data" => $parameter
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function payconfirm()
    {
        $callback=rq('callback');
        //商户订单号
        $out_trade_no = rq('out_trade_no');
        //支付宝交易号
        $trade_no = rq('trade_no');
        $notify_time = rq('notify_time');
        $total_fee = rq('total_fee');
        $foreman_flga = false;
        //交易状态
        $trade_status = rq('trade_status');
        if (rq('trade_status') == 'TRADE_FINISHED') {
            //判断该笔订单是否在商户网站中已经做过处理
            //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
            //请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
            //如果有做过处理，不执行商户的业务程序

            //注意：
            //退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知

            //调试用，写文本函数记录程序运行情况是否正常
            //logResult("这里写入想要调试的代码变量值，或其他运行的结果记录");
        } else if (rq('trade_status') == 'TRADE_SUCCESS') {
            //判断该笔订单是否在商户网站中已经做过处理
            //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
            //请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
            //如果有做过处理，不执行商户的业务程序

            //注意：
            //付款完成后，支付宝系统发送该交易状态通知

            //调试用，写文本函数记录程序运行情况是否正常
            //logResult("这里写入想要调试的代码变量值，或其他运行的结果记录");
        }

        $sel_order_pay_each_istrue = DB::select('SELECT * FROM hh_order_pay_each WHERE pay_id = ? AND pay_status = ?', [$out_trade_no, 1]);
        if ($sel_order_pay_each_istrue) {
            //更新订单为已支付状态
            $upd_order_pay_each = DB::update('UPDATE hh_order_pay_each SET pay_status = 3 WHERE pay_id = ?', [$out_trade_no]);
            $sel_order_pay_each = DB::select('SELECT * FROM hh_order_pay_each WHERE pay_id = ?', [$out_trade_no]);
            $order_id = $sel_order_pay_each[0]->order_id;
            //跟新订单已支付金额
            $sel_order_pay = DB::select('SELECT * FROM hh_order_pay WHERE order_id = ?', [$order_id]);
            $actual_finish_amount = $sel_order_pay[0]->actual_finish_amount;
            $actual_next_amount = $sel_order_pay[0]->actual_next_amount;
            $order_pay_step = $sel_order_pay[0]->order_pay_step;
            $actual_finish_amount += $total_fee;
            $actual_next_amount -= $total_fee;
            $order_pay_step = 13;
            //获取订单进度
            $sel_order = DB::select('SELECT * FROM hh_order WHERE order_id = ?', [$order_id]);
            $order_step = $sel_order[0]->order_step;
            $order_status = $sel_order[0]->order_status;
            $upd_order_pay = DB::update('UPDATE hh_order_pay SET actual_finish_amount = ?, actual_next_amount= ?, order_pay_step = ? WHERE order_id = ?',
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
            $upd_order = DB::update('UPDATE hh_order SET order_status = ?,order_step = ? WHERE order_id = ?', [$order_status, $order_step, $order_id]);
            //TODO 工长案例 未完成案例更新为已完成
            if ($order_status == 6) {
                $order_start = \Illuminate\Support\Facades\DB::select('SELECT img_time FROM hh_order_detail WHERE order_id = ? and order_step=?', [$order_id, 1]);
                $order_end = \Illuminate\Support\Facades\DB::select('SELECT img_time FROM hh_order_detail WHERE order_id = ? and order_step=?', [$order_id, 17]);
                $order_timelong = substr($order_start[0]->img_time, 0, 10) . '～' . substr($order_end[0]->img_time, 0, 10);
                $upd_workcase = \Illuminate\Support\Facades\DB::update('UPDATE hh_workcase SET type = ?,timelong=? WHERE case_id = ?', [2, $order_timelong, $order_id]);
            }
            if ($foreman_flga) {
                //查询店铺id
                $sel_shop_id = \Illuminate\Support\Facades\DB::select('SELECT shop_id FROM hh_order WHERE order_id = ?', [$order_id]);
                $shop_id = $sel_shop_id[0]->shop_id;
                //查询店铺接单数
                $sel_shop_volume = \Illuminate\Support\Facades\DB::select('SELECT shop_volume FROM hh_shop WHERE shop_id = ?', [$shop_id]);
                $shop_volume = $sel_shop_volume[0]->shop_volume;
                $shop_volume++;
                //增加店铺接单数
                $upd_shop_volume = \Illuminate\Support\Facades\DB::update('UPDATE hh_shop SET shop_volume = ? WHERE shop_id = ?', [$shop_volume, $shop_id]);
            }
            //TODO 工长钱包收入
            if ($foreman_flga) {
                $sel_order_pay_each = DB::select('SELECT order_id,pay_amount FROM hh_order_pay_each WHERE pay_id = ? AND order_pay_step = ?',
                    [$out_trade_no, 1]);
                $foreman_shopid = DB::select('SELECT shop_id FROM hh_order WHERE order_id = ?',
                    [$sel_order_pay_each[0]->order_id]);
                $foreman_ids = DB::select('SELECT shopper_id FROM hh_shop WHERE shop_id = ?',
                    [$foreman_shopid[0]->shop_id]);
                $foreman_id = $foreman_ids[0]->shopper_id;//工长id
                $foreman_fee = $sel_order_pay_each[0]->pay_amount;//工长收入
                //TODO 抽点
                //$foreman_fee = $foreman_fee * 0.05;
                //总额:total,保证金:deposit,可提现:available_total
                $foreman_wallet = DB::select('SELECT total,deposit FROM hh_wallet_balance WHERE user_id=?',
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
                $upd_wallet = DB::update('UPDATE hh_wallet_balance SET total = ?,available_total = ?,deposit=? WHERE user_id = ?', [$total, $available_total, $deposit, $foreman_id]);
                if ($upd_wallet) {
                    //向钱包明细加入数据
                    $confirm_time = date('Y-m-d H:i:s', time());
                    $insert = DB::insert('insert into hh_wallet_detail(user_id,money,content,time) values(?,?,?,?)', [$foreman_id, '+' . $foreman_fee, '收入-预付款', $confirm_time]);
                    if ($insert) {
                        //发送消息
                        $message = new \App\Http\Controllers\MessageController();
                        $message->send('嘿吼网', '系统消息', '进账提醒' . '用户支付工长预付款', $foreman_id);
                    }
                }
            }
            //判断是否为材料单
            $material_id = $out_trade_no;
            $sel_order_material = DB::select('SELECT * FROM hh_order_material WHERE order_id = ? AND material_id=?', [$order_id, $material_id]);
            if ($sel_order_material) {
                //若为材料单时支付成功逻辑
                //1.更新pay status为3
                $pay_status = DB::update('UPDATE hh_order_material SET pay_status = 3 WHERE material_id = ?', [$material_id]);
                //2.找到地址id
                $sel_order_address_id = DB::select('SELECT order_address FROM hh_order WHERE order_id = ? ', [$order_id]);
                //3.匹配市
                $sel_address = DB::select('SELECT province,city,district FROM hh_driveaddress WHERE id =?', [$sel_order_address_id[0]->order_address]);
                if ($sel_address) {
                    $city = $sel_address[0]->city;
                    $dis = $sel_address[0]->district;
                    $isHave = false;
                    $sel_area_id = DB::select("SELECT distribution_area_id FROM hh_material_distribution_area WHERE distribution_area_name LIKE '%" . $city . "%' AND distribution_area_name LIKE '%" . $dis . "%'",
                        []);
                    if ($sel_area_id) {
                        $sel_material_supplier_id = DB::select("SELECT material_supplier_id FROM hh_material_supplier_info WHERE distribution_area = ? ", [$sel_area_id[0]->distribution_area_id]);
                        if ($sel_material_supplier_id) {
                            //5.插入id
                            $upd_supplier_id = DB::update("UPDATE hh_order_material SET material_supplier_id = '" . $sel_material_supplier_id[0]->material_supplier_id . "' WHERE order_id = ? AND material_id=?", [$order_id, $material_id]);
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
                $material_supplier_ids = DB::select("SELECT material_supplier_id FROM hh_order_material WHERE material_id = ? ", [$material_id]);
                $supplier_id = $material_supplier_ids[0]->material_supplier_id;//材料商id
                $supplier_wallet = DB::select('SELECT total,available_total FROM hh_wallet_balance WHERE user_id=?',
                    [$supplier_id]);
                $total = $supplier_wallet[0]->total + $supplier_fee;
                $available_total = $supplier_wallet[0]->available_total + $supplier_fee;
                $upd_wallet = DB::update('UPDATE hh_wallet_balance SET total = ?,available_total = ? WHERE user_id = ?', [$total, $available_total, $supplier_id]);
                if ($upd_wallet) {
                    //向钱包明细加入数据
                    $confirm_time = date('Y-m-d H:i:s', time());
                    $insert = DB::insert('insert into hh_wallet_detail(user_id,money,content,time) values(?,?,?,?)', [$supplier_id, '+' . $supplier_fee, '收入-材料费用', $confirm_time]);
                    if ($insert) {
                        //发送消息
                        $message = new MessageController();
                        $message->send('嘿吼网', '系统消息', '进账提醒' . '用户支付材料费', $supplier_id);
                    }
                }
            }
            $arr = array(
                "code" => "000",
                "msg" => "成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array(
                "code" => "111",
                "msg" => "没有支付信息"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}