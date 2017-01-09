<?php
/**
 * TODO 订单接口
 * Created by PhpStorm.
 * User: zhulr
 * Date: 2016/11/14
 * Time: 10:37
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    /*创建订单*/
    public function orderProduce()
    {
        /* 返回当前的毫秒时间戳(16位) */
        $mtime = explode(' ', microtime());
        $mtime[0] = ($mtime[0] + 1) * 1000000;
        $str1 = (string)$mtime[1];
        $str2 = substr((string)$mtime[0], 1);
        $str = $str1 . $str2;
        /* 获取后台数据库需要的数据 */
        $callback = rq('callback');
        $user_id = rq('user_id');
        $shop_id = rq('shop_id');
        $order_address = rq('address_id');
        $calculator_result_id = rq('calculator_result_id');
        $time_json = rq('time');
        if ($time_json) {
            $time_arr = json_decode($time_json, true);
            $time_count = count($time_arr);
            $time_flag = true;
        }
        if (!$time_flag || $time_count < 1) {
            $arr = array(
                "code" => "210",
                "msg" => "缺少预约时间",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $worker_json = rq('worker');
        //判断是否约定工人
        if ($time_json) {
            $worker_arr = json_decode($worker_json, true);
            $worker_count = count($worker_arr);
            $worker_flag = true;
        }
        /* 判断订单是否重复*/
        $order_tbl_isrepeat = DB::select('SELECT order_id,order_time FROM hh_order WHERE user_id =  ? AND shop_id = ? AND order_address = ? AND calculator_result_id = ? AND order_status != ? ',
            [$user_id, $shop_id, $order_address, $calculator_result_id, 7]);
        if ($order_tbl_isrepeat) {
            $order_id = $order_tbl_isrepeat[0]->order_id;
            $arr = array(
                "code" => "202",
                "msg" => "订单已重复存在",
                "data" => array(
                    "order_id" => $order_id,
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /* 生成需要的数据 */
        $order_id = $str;
        //订单相关的id都与订单号相同
        $order_personnel = $order_id; //装修人员表id
        $candd_id = $order_id; //投诉纠纷表id
        $material_id = $order_id; //材料列表id
        /* 插入数据库 */
        /* 订单表 */
        $order_status = 1;//8:工长店铺取消 7:已取消 6:已完成 5:订单进行中 4:待用户预支付 3:待上门量房 2:待预约 1:待确认
        $order_step = 18;//未开工
        $pay_status = 0;//0:订单未产生需要支付环节 1:待支付 2:支付失败 3:支付成功
        $reckon_list = $order_id;
        $actual_list = $order_id;
        $order_tbl = DB::insert('INSERT INTO hh_order(order_id,user_id,shop_id,order_address,order_status,order_step,pay_status,order_candd,order_personnel,material_id,calculator_result_id,reckon_list,actual_list) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [$order_id, $user_id, $shop_id, $order_address, $order_status, $order_step, $pay_status, $candd_id, $order_personnel, $material_id, $calculator_result_id, $reckon_list, $actual_list]);
        if ($order_tbl) {
            $order_status_tbl = DB::select('SELECT order_status FROM hh_order_status WHERE order_status_id = ?',
                [$order_status]);
            $order_status_cont = $order_status_tbl[0]->order_status;
            $order_step_tbl = DB::select('SELECT order_step FROM hh_order_step WHERE step_id = ?',
                [$order_step]);
            $order_step_cont = $order_step_tbl[0]->order_step;
            if ($time_flag) {
                if ($time_count == 1) {
                    $ins_order_reservation_time = DB::insert('INSERT INTO hh_order_reservation_time (order_id,reservation_time1) VALUES (?,?)',
                        [$order_id, $time_arr[0]]);
                } else if ($time_count == 2) {
                    $ins_order_reservation_time = DB::insert('INSERT INTO hh_order_reservation_time (order_id,reservation_time1,reservation_time2) VALUES (?,?,?)',
                        [$order_id, $time_arr[0], $time_arr[1]]);
                }
            }
            if ($worker_flag) {
                $i = 0;
                //遍历数组
                foreach ($worker_arr as $pa[$i]) {
                    $i++;
                };
                //至多9名员工，不足补空
                while ($i < 10) {
                    $pa[$i] = '';
                    $i++;
                };
                $order_personnel_tbl = DB::insert('INSERT INTO hh_order_personnel(personnel_id, order_id, person1, person2, person3, person4, person5, person6, person7, person8, person9) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
                    [$order_personnel, $order_id, $pa[0], $pa[1], $pa[2], $pa[3], $pa[4], $pa[5], $pa[6], $pa[7], $pa[8], $pa[9]]);
            }
            $order_tbl_isrepeat = DB::select('SELECT order_id,order_time FROM hh_order WHERE user_id =  ? AND shop_id = ? AND order_address = ? AND calculator_result_id = ? AND order_status != ? ',
                [$user_id, $shop_id, $order_address, $calculator_result_id, 7]);
            $order_time = $order_tbl_isrepeat[0]->order_time;
            $arr = array(
                "code" => "000",
                "msg" => "订单生成成功",
                "data" => array(
                    "order_id" => $order_id,
                    "user_id" => $user_id,
                    "shop_id" => $shop_id,
                    "order_time" => $order_time,
                    "order_status_id" => $order_status,
                    "order_status" => $order_status_cont,
                    "order_step_id" => $order_step,
                    "order_step" => $order_step_cont
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "201",
                "data" => "",
                "msg" => "订单生成失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    /*确认订单*/
    public function orderConfirm() 
    {
        $order_id = rq('order_id');
        $callback = rq('callback');
        $user_id = rq('user_id');
        $confirm_time = rq('confirm_time');

        $order_tbl_isdestroy = DB::select('SELECT order_status FROM hh_order WHERE user_id =  ? AND order_id = ?',
            [$user_id, $order_id]);
        if ($order_tbl_isdestroy) {
            $order_status = $order_tbl_isdestroy[0]->order_status;
            if ($order_status == 1 || $order_status == 2) { 
                $selectTime = DB::select('select confirm_time from hh_order_reservation_time where confirm_time = ?',[$confirm_time]);

                $changeOrder_status = DB::update('update hh_order set order_status = 3 where user_id=? and order_id=?',[$user_id,$order_id]);
                if ($changeOrder_status) {
                    if ($selectTime[0]->confirm_time == $confirm_time) {
                        $arr = array(
                            "code" => "000",
                            "msg" => "确认成功"
                        );
                        return $callback . "(" . HHJson($arr) . ")";
                    } else {
                        $changeTime = DB::update('update hh_order_reservation_time set confirm_time = ? where order_id = ?',[$confirm_time,$order_id]);
                        if ($changeTime) {
                            $arr = array(
                                "code" => "000",
                                "msg" => "确认成功"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        } else {
                            $arr = array(
                                "code" => "206",
                                "msg" => "修改失败"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                    }
                    
                } else {
                    $arr = array(
                        "code" => "204",
                        "msg" => "修改失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }

            } else {
                $arr = array(
                "code" => "203",
                "msg" => "订单不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
            }
        } else {
            $arr = array(
                "code" => "205",
                "msg" => "订单不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }

    }

    /*取消订单*/
    public function orderDestroy()
    {
        $order_id = rq('order_id');
        $user_id = rq('user_id');
        $callback = rq('callback');
        /*查询订单是否存在*/
        $order_tbl_isdestroy = DB::select('SELECT order_status FROM hh_order WHERE user_id =  ? AND order_id = ?',
            [$user_id, $order_id]);
        if ($order_tbl_isdestroy) {
            $order_status = $order_tbl_isdestroy[0]->order_status;
            /*判断订单是否取消状态*/
            if ($order_status == 7) {
                $arr = array(
                    "code" => "100",
                    "msg" => "订单已取消",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                /*取消订单操作*/
                $order_tbl = DB::update('UPDATE hh_order SET order_status = ? WHERE order_id = ? AND user_id = ?',
                    [7, $order_id, $user_id]);
                if ($order_tbl) {
                    $arr = array(
                        "code" => "000",
                        "msg" => "订单已取消",
                        "data" => ""
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array(
                        "code" => "204",
                        "msg" => "订单取消失败",
                        "data" => ""
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }
        } else {
            $arr = array(
                "code" => "203",
                "msg" => "订单不存在",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    /*订单列表（用户）*/
    public function orderListUser()
    {
        $user_id = rq('user_id');
        $page = ceil(rq('page'));
        $limit = ceil(rq('limit'));
        if (!$page) {
            $page = 1;
        }
        if (!$limit) {
            $limit = 20;
        }
        $callback = rq('callback');
        $page_start = ($page - 1) * $limit;
        $order_tbl_list = DB::select('SELECT * FROM hh_order_user_view WHERE user_id = ? LIMIT ?,?',
            [$user_id, $page_start, $limit]);
        foreach($order_tbl_list as $key=>$val){
            $order_step_ch=DB::select('select order_step from hh_order_step where step_id=?',[$val->order_step]);
            $order_tbl_list[$key]->order_step_ch=$order_step_ch[0]->order_step;
            $order_status_ch=DB::select('select order_status from hh_order_status where order_status_id=?',[$val->order_status]);
            $order_tbl_list[$key]->order_status_ch=$order_status_ch[0]->order_status;
            $portrait=DB::SELECT('select portrait_img from hh_portrait where portrait_userid=?',[$val->user_id]);
            $order_tbl_list[$key]->user_portrait=$portrait[0]->portrait_img;
        }
        $order_tbl_count = DB::select('SELECT COUNT(id) AS order_count FROM hh_order_user_view WHERE user_id = ?',
            [$user_id]);
        $order_count = $order_tbl_count[0]->order_count;
        if ($order_tbl_list) {
            $arr = array("code" => "000",
                "data" => array("order_list" => $order_tbl_list,
                    "order_count" => $order_count
                ),
                "msg" => "查询成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "205",
                "msg" => "没有订单",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    /*订单列表（店铺）*/
    public function orderListFeroman()
    {
        //店铺ID
        $shop_id = rq('shop_id');
        //工长ID
        $user_id = rq('user_id');
        $page = ceil(rq('page'));
        $limit = ceil(rq('limit'));
        if (!$page) {
            $page = 1;
        }
        if (!$limit) {
            $limit = 20;
        }
        $callback = rq('callback');
        $page_start = ($page - 1) * $limit;
        //根据工长ID获取店铺ID
        if ($user_id && $shop_id == null) {
            $shop_tbl_shop_id = DB::select('SELECT shop_id FROM hh_shop WHERE shopper_id = ?',
                [$user_id]);
            if ($shop_tbl_shop_id) {
                $shop_id = $shop_tbl_shop_id[0]->shop_id;
            } else {
                $arr = array(
                    "code" => "205",
                    "msg" => "店铺ID输入错误",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
        $order_tbl_list = DB::select('SELECT * FROM hh_order_new_view WHERE shop_id = ? ORDER BY order_time LIMIT ?,?',
            [$shop_id, $page_start, $limit]);
        foreach($order_tbl_list as $key=>$val){
            $portrait=DB::SELECT('select portrait_img from hh_portrait where portrait_userid=?',[$val->user_id]);
            $order_tbl_list[$key]->user_portrait=$portrait[0]->portrait_img;
        }
        $order_tbl_count = DB::select('SELECT COUNT(id) AS order_count FROM hh_order_view WHERE shop_id = ?',
            [$shop_id]);
        $order_count = $order_tbl_count[0]->order_count;
        if ($order_tbl_list) {
            $arr = array("code" => "000",
                "data" => array("order_list" => $order_tbl_list,
                    "order_count" => $order_count
                ),
                "msg" => "查询成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "205",
                "msg" => "没有订单",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //订单状态步骤查询
    public function orderStatusSel()
    {
        $user_id = rq('user_id');
        $order_id = rq('order_id');
        $callback = rq('callback');
        $sql_order_status = DB::select('SELECT * FROM hh_order_status_view WHERE user_id = ? AND order_id = ? ',
            [$user_id, $order_id]);
        if ($sql_order_status) {
            $order_status_id = $sql_order_status[0]->order_status_id;
            if ($sql_order_status[0]->confirm_time == 1) {
                $reservation_time = $sql_order_status[0]->reservation_time1;
            } else if ($sql_order_status[0]->confirm_time == 2) {
                $reservation_time = $sql_order_status[0]->reservation_time2;
            }
            if ($sql_order_status[0]->order_status_id == 1) {
                $order_confirmation_time = "";
                $reservation_time = "";
            } elseif ($order_status_id != 7 || $order_status_id != 8) {
                $order_confirmation_time = $sql_order_status[0]->order_confirmation_time;
            }
            $data = array(
                "order_id" => $sql_order_status[0]->order_id,
                "order_time" => $sql_order_status[0]->order_time,
                "order_confirmation_time" => $order_confirmation_time,
                "reservation_time" => $reservation_time,
                "order_status_id" => $order_status_id,
                "order_step_id" => $sql_order_status[0]->order_step_id,
                "order_status" => $sql_order_status[0]->order_status,
                "order_step" => $sql_order_status[0]->order_step,
            );
            $arr = array(
                "code" => "000",
                "msg" => "查询成功",
                "data" => $data
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "没有订单",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //查询或添加装修风格
    public function addHouseStyle()
    {
        $house_style = rq('house_style');
        $order_id = rq('order_id');
        $callback = rq('callback');
        if ($house_style == "") {
            //查询是否已有装修风格
            $sel_order_house_style = DB::select('SELECT house_style FROM hh_order WHERE order_id = ? ', [$order_id]);
            if (!$sel_order_house_style) {
                $arr = array(
                    "code" => "200",
                    "msg" => "订单号错误",
                    "data" => ""
                );
            } else {
                $house_style = $sel_order_house_style[0]->house_style;
                $arr = array(
                    "code" => "000",
                    "msg" => "查询成功",
                    "data" => array(
                        "订单号" => $order_id,
                        "装修风格" => $house_style
                    )
                );
            }
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            //查询是否已有装修风格
            $sel_order_house_style = DB::select('SELECT house_style FROM hh_order WHERE order_id = ? ', [$order_id]);
            if (!$sel_order_house_style) {
                $arr = array(
                    "code" => "200",
                    "msg" => "订单号错误",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                if ($sel_order_house_style[0]->house_style == "") {
                    $ins_order_house_style = DB::update('UPDATE hh_order SET house_style = ? WHERE order_id = ? ', [$house_style, $order_id]);
                    if ($ins_order_house_style) {
                        $arr = array(
                            "code" => "000",
                            "msg" => "添加成功",
                            "data" => ""
                        );
                    } else {
                        $arr = array(
                            "code" => "200",
                            "msg" => "添加失败",
                            "data" => ""
                        );
                    }
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array(
                        "code" => "200",
                        "msg" => "已有装修风格",
                        "data" => ""
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }
        }
    }

    public function appointment() 
    {
        $callback = rq('callback');
        $order_id = rq('order_id');
        $appointmentTime = DB::select('select * from hh_order_reservation_time where order_id = ?',[$order_id]);
        if ($appointmentTime) {
                $arr = array(
                "code" => "000",
                "data" => $appointmentTime[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                 "msg" => "没有时间"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }

    }
    
}