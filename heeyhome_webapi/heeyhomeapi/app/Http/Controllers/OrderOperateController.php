<?php
/**
 * TODO 订单操作
 * User: heeyhome
 * Date: 2016/11/30
 * Time: 14:01
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class OrderOperateController extends Controller
{

    //生成预算单
    public function generateActualListAndReckonList()
    {
        $order_id = rq('order_id');
        $list_data_json = rq('list_data_json');
        //存在list数据
        if ($list_data_json) {
            $list_data_arr = json_decode($list_data_json, true);
            $list_data_exist = true;
        } else {
            $list_data_exist = false;
        }
        $callback = rq('callback');
        //查询订单是否存在，存在则获取装修人员id号
        $sel_order_tbl = DB::select('SELECT order_personnel FROM hh_order WHERE order_id = ?',
            [$order_id]);
        if (!$sel_order_tbl) {
            $arr = array(
                "code" => "200",
                "msg" => "订单号错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $order_personnel = $sel_order_tbl[0]->order_personnel;
        //查询预算单是否存在
        $sel_order_tbl = DB::select('SELECT * FROM hh_order_reckon_list WHERE order_id = ? AND order_personnel = ?',
            [$order_id, $order_personnel]);
        if ($sel_order_tbl) {
            $arr = array(
                "code" => "200",
                "msg" => "预算单已经存在",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //生成预算单与结算单表
        //预算
        if ($list_data_exist) {
            $reckon_list_tbl = DB::insert('INSERT INTO hh_order_reckon_list(order_id,order_personnel,service1,service2,service3,service4,service5,service6,service7,service8,
service9,service10,service11,service12,service13,service14,service15,service16,service17,service18,service19,service20,service21,service22,service23,service24,service25,service26,
service27,service28,service29,service30,service31,service32,service33,service34,service35,service36,service37,service38,service39,service40,service41,service42,service43,service44,
service45,service46,service47,service48,service49,service50,service51,service52,service53,service54,service55,service56,service57,service58,service59,service60,service61,service62,
service63,is_available) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [$order_id, $order_personnel, $list_data_arr[0], $list_data_arr[1], $list_data_arr[2], $list_data_arr[3], $list_data_arr[4], $list_data_arr[5], $list_data_arr[6],
                    $list_data_arr[7], $list_data_arr[8], $list_data_arr[9], $list_data_arr[10], $list_data_arr[11], $list_data_arr[12], $list_data_arr[13], $list_data_arr[14],
                    $list_data_arr[15], $list_data_arr[16], $list_data_arr[17], $list_data_arr[18], $list_data_arr[19], $list_data_arr[20], $list_data_arr[21], $list_data_arr[22],
                    $list_data_arr[23], $list_data_arr[24], $list_data_arr[25], $list_data_arr[26], $list_data_arr[27], $list_data_arr[28], $list_data_arr[29], $list_data_arr[30],
                    $list_data_arr[31], $list_data_arr[32], $list_data_arr[33], $list_data_arr[34], $list_data_arr[35], $list_data_arr[36], $list_data_arr[37], $list_data_arr[38],
                    $list_data_arr[39], $list_data_arr[40], $list_data_arr[41], $list_data_arr[42], $list_data_arr[43], $list_data_arr[44], $list_data_arr[45], $list_data_arr[46],
                    $list_data_arr[47], $list_data_arr[48], $list_data_arr[49], $list_data_arr[50], $list_data_arr[51], $list_data_arr[52], $list_data_arr[53], $list_data_arr[54],
                    $list_data_arr[55], $list_data_arr[56], $list_data_arr[57], $list_data_arr[58], $list_data_arr[59], $list_data_arr[60], $list_data_arr[61], $list_data_arr[62], 1]);
            if (!$reckon_list_tbl) {
                $arr = array(
                    "code" => "200",
                    "msg" => "预算单生成失败",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else {
            $reckon_list_tbl = DB::insert('INSERT INTO hh_order_reckon_list(order_id,order_personnel,is_available) VALUES (?,?,?)',
                [$order_id, $order_personnel, 1]);
            if (!$reckon_list_tbl) {
                $arr = array(
                    "code" => "200",
                    "msg" => "预算单生成失败",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
        //结算
        if ($list_data_exist) {
            $reckon_list_tbl = DB::insert('INSERT INTO hh_order_actual_list(order_id,order_personnel,service1,service2,service3,service4,service5,service6,service7,service8,
service9,service10,service11,service12,service13,service14,service15,service16,service17,service18,service19,service20,service21,service22,service23,service24,service25,service26,
service27,service28,service29,service30,service31,service32,service33,service34,service35,service36,service37,service38,service39,service40,service41,service42,service43,service44,
service45,service46,service47,service48,service49,service50,service51,service52,service53,service54,service55,service56,service57,service58,service59,service60,service61,service62,
service63,is_available) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [$order_id, $order_personnel, $list_data_arr[0], $list_data_arr[1], $list_data_arr[2], $list_data_arr[3], $list_data_arr[4], $list_data_arr[5], $list_data_arr[6],
                    $list_data_arr[7], $list_data_arr[8], $list_data_arr[9], $list_data_arr[10], $list_data_arr[11], $list_data_arr[12], $list_data_arr[13], $list_data_arr[14],
                    $list_data_arr[15], $list_data_arr[16], $list_data_arr[17], $list_data_arr[18], $list_data_arr[19], $list_data_arr[20], $list_data_arr[21], $list_data_arr[22],
                    $list_data_arr[23], $list_data_arr[24], $list_data_arr[25], $list_data_arr[26], $list_data_arr[27], $list_data_arr[28], $list_data_arr[29], $list_data_arr[30],
                    $list_data_arr[31], $list_data_arr[32], $list_data_arr[33], $list_data_arr[34], $list_data_arr[35], $list_data_arr[36], $list_data_arr[37], $list_data_arr[38],
                    $list_data_arr[39], $list_data_arr[40], $list_data_arr[41], $list_data_arr[42], $list_data_arr[43], $list_data_arr[44], $list_data_arr[45], $list_data_arr[46],
                    $list_data_arr[47], $list_data_arr[48], $list_data_arr[49], $list_data_arr[50], $list_data_arr[51], $list_data_arr[52], $list_data_arr[53], $list_data_arr[54],
                    $list_data_arr[55], $list_data_arr[56], $list_data_arr[57], $list_data_arr[58], $list_data_arr[59], $list_data_arr[60], $list_data_arr[61], $list_data_arr[62], 1]);
            if (!$reckon_list_tbl) {
                //清除预算单
                $del_reckon_list_tbl = DB::delete('DELETE FROM hh_order_reckon_list WHERE order_id = ?',
                    [$order_id]);
                $arr = array(
                    "code" => "000",
                    "msg" => "结算单生成失败",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else {
            $actual_list_tbl = DB::insert('INSERT INTO hh_order_actual_list(order_id,order_personnel,is_available) VALUES (?,?,?)',
                [$order_id, $order_personnel, 1]);
            if (!$actual_list_tbl) {
                //清除预算单
                $del_reckon_list_tbl = DB::delete('DELETE FROM hh_order_reckon_list WHERE order_id = ?',
                    [$order_id]);
                $arr = array(
                    "code" => "200",
                    "msg" => "结算单生成失败",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
        $arr = array(
            "code" => "000",
            "msg" => "生成成功",
            "data" => ""
        );
        return $callback . "(" . HHJson($arr) . ")";
    }

    public function getActualDataAndReckonData()
    {
        $shop_id = rq('shop_id');
        $callback = rq('callback');
        $sel_worker_service = DB::select('SELECT * FROM hh_worker_service_view');
        if ($sel_worker_service) {
            $arr = array(
                "code" => "000",
                "msg" => "获取成功",
                "data" => $sel_worker_service
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "获取失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //获取预算单结算单字段(分类)
    public function getActualDataAndReckonDataList()
    {
        $shop_id = rq('shop_id');
        $callback = rq('callback');
        $sel_worker_service1 = DB::select('SELECT id,servicename,unit,cost FROM hh_worker_service_view WHERE category = ? AND serviceitem = ?', ['杂工', '基础改造']);
        $sel_worker_service2 = DB::select('SELECT id,servicename,unit,cost FROM hh_worker_service_view WHERE category = ? AND serviceitem = ?', ['水电工', '水电改造']);
        $sel_worker_service3 = DB::select('SELECT id,servicename,unit,cost FROM hh_worker_service_view WHERE category = ? AND serviceitem = ?', ['瓦工', '贴砖']);
        $sel_worker_service4 = DB::select('SELECT id,servicename,unit,cost FROM hh_worker_service_view WHERE category = ? AND serviceitem = ?', ['瓦工', '砌墙']);
        $sel_worker_service5 = DB::select('SELECT id,servicename,unit,cost FROM hh_worker_service_view WHERE category = ? AND serviceitem = ?', ['瓦工', '粉刷']);
        $sel_worker_service6 = DB::select('SELECT id,servicename,unit,cost FROM hh_worker_service_view WHERE category = ? AND serviceitem = ?', ['木工', '家具制作（免漆板）']);
        $sel_worker_service7 = DB::select('SELECT id,servicename,unit,cost FROM hh_worker_service_view WHERE category = ? AND serviceitem = ?', ['木工', '吊顶、隔墙']);
        $sel_worker_service8 = DB::select('SELECT id,servicename,unit,cost FROM hh_worker_service_view WHERE category = ? AND serviceitem = ?', ['木工', '杂项']);
        $sel_worker_service9 = DB::select('SELECT id,servicename,unit,cost FROM hh_worker_service_view WHERE category = ? AND serviceitem = ?', ['油漆工', '天花墙面乳胶漆']);
        $sel_worker_service0 = DB::select('SELECT id,servicename,unit,cost FROM hh_worker_service_view WHERE category = ? AND serviceitem = ?', ['油漆工', '木质油漆工程']);
        if ($sel_worker_service1 && $sel_worker_service2 && $sel_worker_service3 && $sel_worker_service4 && $sel_worker_service5 && $sel_worker_service6 && $sel_worker_service7 && $sel_worker_service8 && $sel_worker_service9) {
            $data = array(
                "1" => array(
                    "name" => "杂工",
                    "data_list" => $zadata = array(
                        array(
                            "name" => "基础改造",
                            "data_list" => $sel_worker_service1)
                    )),
                "2" => array(
                    "name" => "水电工",
                    "data_list" => $zadata = array(
                        array(
                            "name" => "水电改造",
                            "data_list" => $sel_worker_service2)
                    )),
                "3" => array(
                    "name" => "瓦工",
                    "data_list" => $zadata = array(
                        array(
                            "name" => "贴砖",
                            "data_list" => $sel_worker_service3),
                        array(
                            "name" => "砌墙",
                            "data_list" => $sel_worker_service4),
                        array(
                            "name" => "粉刷",
                            "data_list" => $sel_worker_service5)
                    )),
                "4" => array(
                    "name" => "木工",
                    "data_list" => $zadata = array(
                        array(
                            "name" => "家具制作（免漆板）",
                            "data_list" => $sel_worker_service6),
                        array(
                            "name" => "吊顶、隔墙",
                            "data_list" => $sel_worker_service7),
                        array(
                            "name" => "杂项",
                            "data_list" => $sel_worker_service8)
                    )),
                "5" => array(
                    "name" => "油漆工",
                    "data_list" => $zadata = array(
                        array(
                            "name" => "天花墙面乳胶漆",
                            "data_list" => $sel_worker_service9),
                        array(
                            "name" => "木质油漆工程",
                            "data_list" => $sel_worker_service0)
                    )),
            );
            $arr = array(
                "code" => "000",
                "msg" => "获取成功",
                "data" => $data
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "获取失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //添加预算单数据
    public function addActualDataAndReckonData()
    {
        $order_id = rq('order_id');
        $callback = rq('callback');
        $list_data_json = rq('list_data_json');
        $list_data_arr = json_decode($list_data_json, true);
        $remark = rq('remark');
        //查看订单是否存在
        $sel_order_tbl = DB::select('SELECT * FROM hh_order_reckon_list WHERE order_id = ?',
            [$order_id]);
        if (!$sel_order_tbl) {
            $arr = array(
                "code" => "200",
                "msg" => "订单号错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //判断字段是否为空
        if (count($list_data_arr) < 63) {
            $arr = array(
                "code" => "200",
                "msg" => "缺少数据",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //获取当前时间转化为mysql时间戳格式
        $timenow = strtotime(date('Y-m-d H:i:s', time()));
        //预算
        $reckon_list_tbl = DB::insert('UPDATE hh_order_reckon_list SET service1 = ? ,service2 = ? ,service3 = ? ,service4 = ? ,
service5 = ? ,service6 = ? ,service7 = ? ,service8 = ? ,service9 = ? ,service10 = ? ,service11 = ? ,service12 = ? ,service13 = ? ,service14 = ? ,service15 = ? ,
service16 = ? ,service17 = ? ,service18 = ? ,service19 = ? ,service20 = ? ,service21 = ? ,service22 = ? ,service23 = ? ,service24 = ? ,service25 = ? ,service26 = ? ,
service27 = ? ,service28 = ? ,service29 = ? ,service30 = ? ,service31 = ? ,service32 = ? ,service33 = ? ,service34 = ? ,service35 = ? ,service36 = ? ,service37 = ? ,
service38 = ? ,service39 = ? ,service40 = ? ,service41 = ? ,service42 = ? ,service43 = ? ,service44 = ? ,service45 = ? ,service46 = ? ,service47 = ? ,service48 = ? ,
service49 = ? ,service50 = ? ,service51 = ? ,service52 = ? ,service53 = ? ,service54 = ? ,service55 = ? ,service56 = ? ,service57 = ? ,service58 = ? ,service59 = ? ,
service60 = ? ,service61 = ? ,service62 = ? ,service63 = ? ,is_available = ? ,remark = ? WHERE order_id = ?)',
            [$list_data_arr[0], $list_data_arr[1], $list_data_arr[2], $list_data_arr[3], $list_data_arr[4], $list_data_arr[5], $list_data_arr[6], $list_data_arr[7],
                $list_data_arr[8], $list_data_arr[9], $list_data_arr[10], $list_data_arr[11], $list_data_arr[12], $list_data_arr[13], $list_data_arr[14], $list_data_arr[15],
                $list_data_arr[16], $list_data_arr[17], $list_data_arr[18], $list_data_arr[19], $list_data_arr[20], $list_data_arr[21], $list_data_arr[22], $list_data_arr[23],
                $list_data_arr[24], $list_data_arr[25], $list_data_arr[26], $list_data_arr[27], $list_data_arr[28], $list_data_arr[29], $list_data_arr[30], $list_data_arr[31],
                $list_data_arr[32], $list_data_arr[33], $list_data_arr[34], $list_data_arr[35], $list_data_arr[36], $list_data_arr[37], $list_data_arr[38], $list_data_arr[39],
                $list_data_arr[40], $list_data_arr[41], $list_data_arr[42], $list_data_arr[43], $list_data_arr[44], $list_data_arr[45], $list_data_arr[46], $list_data_arr[47],
                $list_data_arr[48], $list_data_arr[49], $list_data_arr[50], $list_data_arr[51], $list_data_arr[52], $list_data_arr[53], $list_data_arr[54], $list_data_arr[55],
                $list_data_arr[56], $list_data_arr[57], $list_data_arr[58], $list_data_arr[59], $list_data_arr[60], $list_data_arr[61], $list_data_arr[62], 0, $remark, $order_id]);
        //结算
        $actual_list_tbl = DB::insert('UPDATE hh_order_actual_list SET service1 = ? ,service2 = ? ,service3 = ? ,service4 = ? ,
service5 = ? ,service6 = ? ,service7 = ? ,service8 = ? ,service9 = ? ,service10 = ? ,service11 = ? ,service12 = ? ,service13 = ? ,service14 = ? ,service15 = ? ,
service16 = ? ,service17 = ? ,service18 = ? ,service19 = ? ,service20 = ? ,service21 = ? ,service22 = ? ,service23 = ? ,service24 = ? ,service25 = ? ,service26 = ? ,
service27 = ? ,service28 = ? ,service29 = ? ,service30 = ? ,service31 = ? ,service32 = ? ,service33 = ? ,service34 = ? ,service35 = ? ,service36 = ? ,service37 = ? ,
service38 = ? ,service39 = ? ,service40 = ? ,service41 = ? ,service42 = ? ,service43 = ? ,service44 = ? ,service45 = ? ,service46 = ? ,service47 = ? ,service48 = ? ,
service49 = ? ,service50 = ? ,service51 = ? ,service52 = ? ,service53 = ? ,service54 = ? ,service55 = ? ,service56 = ? ,service57 = ? ,service58 = ? ,service59 = ? ,
service60 = ? ,service61 = ? ,service62 = ? ,service63 = ? ,is_available = ? ,remark = ? ,update_time = ? WHERE order_id = ?)',
            [$list_data_arr[0], $list_data_arr[1], $list_data_arr[2], $list_data_arr[3], $list_data_arr[4], $list_data_arr[5], $list_data_arr[6], $list_data_arr[7],
                $list_data_arr[8], $list_data_arr[9], $list_data_arr[10], $list_data_arr[11], $list_data_arr[12], $list_data_arr[13], $list_data_arr[14], $list_data_arr[15],
                $list_data_arr[16], $list_data_arr[17], $list_data_arr[18], $list_data_arr[19], $list_data_arr[20], $list_data_arr[21], $list_data_arr[22], $list_data_arr[23],
                $list_data_arr[24], $list_data_arr[25], $list_data_arr[26], $list_data_arr[27], $list_data_arr[28], $list_data_arr[29], $list_data_arr[30], $list_data_arr[31],
                $list_data_arr[32], $list_data_arr[33], $list_data_arr[34], $list_data_arr[35], $list_data_arr[36], $list_data_arr[37], $list_data_arr[38], $list_data_arr[39],
                $list_data_arr[40], $list_data_arr[41], $list_data_arr[42], $list_data_arr[43], $list_data_arr[44], $list_data_arr[45], $list_data_arr[46], $list_data_arr[47],
                $list_data_arr[48], $list_data_arr[49], $list_data_arr[50], $list_data_arr[51], $list_data_arr[52], $list_data_arr[53], $list_data_arr[54], $list_data_arr[55],
                $list_data_arr[56], $list_data_arr[57], $list_data_arr[58], $list_data_arr[59], $list_data_arr[60], $list_data_arr[61], $list_data_arr[62], 1, $remark, $timenow, $order_id]);
        if ($reckon_list_tbl && $actual_list_tbl) {
            $arr = array(
                "code" => "000",
                "msg" => "插入成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "插入失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //修改结算单数据
    public function updateActualData()
    {
        $order_id = rq('order_id');
        $callback = rq('callback');
        $list_data_json = rq('list_data_json');
        $list_data_arr = json_decode($list_data_json, true);
        $remark = rq('remark');
        //查看订单是否存在
        $sel_order_tbl = DB::select('SELECT * FROM hh_order_reckon_list WHERE order_id = ?',
            [$order_id]);
        if (!$sel_order_tbl) {
            $arr = array(
                "code" => "200",
                "msg" => "订单号错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //判断字段是否为空
        if (count($list_data_arr) < 63) {
            $arr = array(
                "code" => "200",
                "msg" => "缺少数据",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //获取当前时间转化为mysql时间戳格式
        $timenow = strtotime(date('Y-m-d H:i:s', time()));
        //判断订单步骤 控制结算单更改字段
        //获取订单步骤
        $sel_order_step = DB::select('SELECT order_step FROM hh_order WHERE order_id = ?',
            [$order_id]);
        if ($sel_order_step) {
            $order_step = $sel_order_step[0]->order_step;
            switch ($order_step) {
                case 5:
                    //杂工及水电工结算单数据修改
                    $actual_list_tbl = DB::insert('UPDATE hh_order_actual_list SET service1 = ? ,service2 = ? ,service3 = ? ,service4 = ? ,
service5 = ? ,service6 = ? ,service7 = ? ,service8 = ? ,service9 = ? ,service10 = ? ,service11 = ? ,service12 = ? ,service13 = ? ,service14 = ? ,service15 = ? ,
service16 = ? ,service17 = ? ,service18 = ? ,remark = ? ,update_time = ? WHERE order_id = ?)',
                        [$list_data_arr[0], $list_data_arr[1], $list_data_arr[2], $list_data_arr[3], $list_data_arr[4], $list_data_arr[5], $list_data_arr[6], $list_data_arr[7],
                            $list_data_arr[8], $list_data_arr[9], $list_data_arr[10], $list_data_arr[11], $list_data_arr[12], $list_data_arr[13], $list_data_arr[14], $list_data_arr[15],
                            $list_data_arr[16], $list_data_arr[17], $remark, $timenow, $order_id]);
                    break;
                case 9:
                    //瓦工结算单数据修改
                    $actual_list_tbl = DB::insert('UPDATE hh_order_actual_list SET service19 = ? ,service20 = ? ,service21 = ? ,service22 = ? ,service23 = ? ,service24 = ? ,service25 = ? ,service26 = ? ,
service27 = ? ,service28 = ? ,service29 = ? ,service30 = ? ,service31 = ? ,service32 = ? ,service33 = ? ,service34 = ? ,service35 = ? ,service36 = ? ,service37 = ? ,
service38 = ? ,service39 = ? ,service40 = ? ,service41 = ? ,remark = ? ,update_time = ? WHERE order_id = ?)',
                        [$list_data_arr[18], $list_data_arr[19], $list_data_arr[20], $list_data_arr[21], $list_data_arr[22], $list_data_arr[23],
                            $list_data_arr[24], $list_data_arr[25], $list_data_arr[26], $list_data_arr[27], $list_data_arr[28], $list_data_arr[29], $list_data_arr[30], $list_data_arr[31],
                            $list_data_arr[32], $list_data_arr[33], $list_data_arr[34], $list_data_arr[35], $list_data_arr[36], $list_data_arr[37], $list_data_arr[38], $list_data_arr[39],
                            $list_data_arr[40], $remark, $timenow, $order_id]);
                    break;
                case 13:
                    //木工结算单数据修改
                    $actual_list_tbl = DB::insert('UPDATE hh_order_actual_list SET service42 = ? ,service43 = ? ,service44 = ? ,service45 = ? ,service46 = ? ,service47 = ? ,service48 = ? ,
service49 = ? ,service50 = ? ,service51 = ? ,service52 = ? ,service53 = ? ,remark = ? ,update_time = ? WHERE order_id = ?)',
                        [$list_data_arr[41], $list_data_arr[42], $list_data_arr[43], $list_data_arr[44], $list_data_arr[45], $list_data_arr[46], $list_data_arr[47],
                            $list_data_arr[48], $list_data_arr[49], $list_data_arr[50], $list_data_arr[51], $list_data_arr[52], $remark, $timenow, $order_id]);
                    break;
                case 17:
                    $actual_list_tbl = DB::insert('UPDATE hh_order_actual_list SET service54 = ? ,service55 = ? ,service56 = ? ,service57 = ? ,service58 = ? ,service59 = ? ,
service60 = ? ,service61 = ? ,service62 = ? ,service63 = ? ,remark = ? ,update_time = ? WHERE order_id = ?)',
                        [$list_data_arr[53], $list_data_arr[54], $list_data_arr[55],
                            $list_data_arr[56], $list_data_arr[57], $list_data_arr[58], $list_data_arr[59], $list_data_arr[60], $list_data_arr[61], $list_data_arr[62], $remark, $timenow, $order_id]);
                    break;
                default:
                    $arr = array(
                        "code" => "200",
                        "msg" => "订单当前状态无法修改结算单",
                        "data" => ""
                    );
                    return $callback . "(" . HHJson($arr) . ")";
            }
        }
        //结算
//        $actual_list_tbl = DB::insert('UPDATE hh_order_actual_list SET service1 = ? ,service2 = ? ,service3 = ? ,service4 = ? ,
//service5 = ? ,service6 = ? ,service7 = ? ,service8 = ? ,service9 = ? ,service10 = ? ,service11 = ? ,service12 = ? ,service13 = ? ,service14 = ? ,service15 = ? ,
//service16 = ? ,service17 = ? ,service18 = ? ,service19 = ? ,service20 = ? ,service21 = ? ,service22 = ? ,service23 = ? ,service24 = ? ,service25 = ? ,service26 = ? ,
//service27 = ? ,service28 = ? ,service29 = ? ,service30 = ? ,service31 = ? ,service32 = ? ,service33 = ? ,service34 = ? ,service35 = ? ,service36 = ? ,service37 = ? ,
//service38 = ? ,service39 = ? ,service40 = ? ,service41 = ? ,service42 = ? ,service43 = ? ,service44 = ? ,service45 = ? ,service46 = ? ,service47 = ? ,service48 = ? ,
//service49 = ? ,service50 = ? ,service51 = ? ,service52 = ? ,service53 = ? ,service54 = ? ,service55 = ? ,service56 = ? ,service57 = ? ,service58 = ? ,service59 = ? ,
//service60 = ? ,service61 = ? ,service62 = ? ,service63 = ? ,is_available = ? ,remark = ? ,update_time = ? WHERE order_id = ?)',
//            [$list_data_arr[0], $list_data_arr[1], $list_data_arr[2], $list_data_arr[3], $list_data_arr[4], $list_data_arr[5], $list_data_arr[6], $list_data_arr[7],
//                $list_data_arr[8], $list_data_arr[9], $list_data_arr[10], $list_data_arr[11], $list_data_arr[12], $list_data_arr[13], $list_data_arr[14], $list_data_arr[15],
//                $list_data_arr[16], $list_data_arr[17], $list_data_arr[18], $list_data_arr[19], $list_data_arr[20], $list_data_arr[21], $list_data_arr[22], $list_data_arr[23],
//                $list_data_arr[24], $list_data_arr[25], $list_data_arr[26], $list_data_arr[27], $list_data_arr[28], $list_data_arr[29], $list_data_arr[30], $list_data_arr[31],
//                $list_data_arr[32], $list_data_arr[33], $list_data_arr[34], $list_data_arr[35], $list_data_arr[36], $list_data_arr[37], $list_data_arr[38], $list_data_arr[39],
//                $list_data_arr[40], $list_data_arr[41], $list_data_arr[42], $list_data_arr[43], $list_data_arr[44], $list_data_arr[45], $list_data_arr[46], $list_data_arr[47],
//                $list_data_arr[48], $list_data_arr[49], $list_data_arr[50], $list_data_arr[51], $list_data_arr[52], $list_data_arr[53], $list_data_arr[54], $list_data_arr[55],
//                $list_data_arr[56], $list_data_arr[57], $list_data_arr[58], $list_data_arr[59], $list_data_arr[60], $list_data_arr[61], $list_data_arr[62], $remark, $timenow, $order_id]);
        if ($actual_list_tbl) {
            $arr = array(
                "code" => "000",
                "msg" => "插入成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "插入失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //查询预算与结算单数据
    public function searchActualDataAndReckonData()
    {
        $order_id = rq('order_id');
        $callback = rq('callback');
        $sel_reckon_list = DB::select('SELECT * FROM hh_order_reckon_list WHERE order_id = ?', [$order_id]);
        $sel_actual_list = DB::select('SELECT * FROM hh_order_actual_list WHERE order_id = ?', [$order_id]);
        if ($sel_reckon_list && $sel_actual_list) {
            //按阶段隐藏结算单数据
            //查询订单阶段
            $sel_order_tbl = DB::select('SELECT order_step FROM hh_order WHERE order_id = ?', [$order_id]);
            if ($sel_order_tbl) $order_step = $sel_order_tbl[0]->order_step;
            //隐藏结算单数据
            if ($order_step < 17) {
                $sel_actual_list[0]->service63 = "";
                $sel_actual_list[0]->service62 = "";
                $sel_actual_list[0]->service61 = "";
                $sel_actual_list[0]->service60 = "";
                $sel_actual_list[0]->service59 = "";
                $sel_actual_list[0]->service58 = "";
                $sel_actual_list[0]->service57 = "";
                $sel_actual_list[0]->service56 = "";
                $sel_actual_list[0]->service55 = "";
                $sel_actual_list[0]->service54 = "";
                if ($order_step < 13) {
                    $sel_actual_list[0]->service53 = "";
                    $sel_actual_list[0]->service52 = "";
                    $sel_actual_list[0]->service51 = "";
                    $sel_actual_list[0]->service50 = "";
                    $sel_actual_list[0]->service49 = "";
                    $sel_actual_list[0]->service48 = "";
                    $sel_actual_list[0]->service47 = "";
                    $sel_actual_list[0]->service46 = "";
                    $sel_actual_list[0]->service45 = "";
                    $sel_actual_list[0]->service44 = "";
                    $sel_actual_list[0]->service43 = "";
                    $sel_actual_list[0]->service42 = "";
                    if ($order_step < 9) {
                        $sel_actual_list[0]->service41 = "";
                        $sel_actual_list[0]->service40 = "";
                        $sel_actual_list[0]->service39 = "";
                        $sel_actual_list[0]->service38 = "";
                        $sel_actual_list[0]->service37 = "";
                        $sel_actual_list[0]->service36 = "";
                        $sel_actual_list[0]->service35 = "";
                        $sel_actual_list[0]->service34 = "";
                        $sel_actual_list[0]->service33 = "";
                        $sel_actual_list[0]->service32 = "";
                        $sel_actual_list[0]->service31 = "";
                        $sel_actual_list[0]->service20 = "";
                        $sel_actual_list[0]->service29 = "";
                        $sel_actual_list[0]->service28 = "";
                        $sel_actual_list[0]->service27 = "";
                        $sel_actual_list[0]->service26 = "";
                        $sel_actual_list[0]->service25 = "";
                        $sel_actual_list[0]->service24 = "";
                        $sel_actual_list[0]->service23 = "";
                        $sel_actual_list[0]->service22 = "";
                        $sel_actual_list[0]->service21 = "";
                        $sel_actual_list[0]->service20 = "";
                        $sel_actual_list[0]->service19 = "";
                        if ($order_step < 5) {
                            $sel_actual_list[0]->service18 = "";
                            $sel_actual_list[0]->service17 = "";
                            $sel_actual_list[0]->service16 = "";
                            $sel_actual_list[0]->service15 = "";
                            $sel_actual_list[0]->service14 = "";
                            $sel_actual_list[0]->service13 = "";
                            $sel_actual_list[0]->service12 = "";
                            $sel_actual_list[0]->service11 = "";
                            $sel_actual_list[0]->service10 = "";
                            $sel_actual_list[0]->service9 = "";
                            $sel_actual_list[0]->service8 = "";
                            $sel_actual_list[0]->service7 = "";
                            $sel_actual_list[0]->service6 = "";
                            $sel_actual_list[0]->service5 = "";
                            $sel_actual_list[0]->service4 = "";
                            $sel_actual_list[0]->service3 = "";
                            $sel_actual_list[0]->service2 = "";
                            $sel_actual_list[0]->service1 = "";
                        }
                    }
                }
            }

            $data = array(
                "1" => array("name" => "预算单数据", "data_list" => $sel_reckon_list
                ),
                "2" => array("name" => "结算单数据", "data_list" => $sel_actual_list
                )
            );
            $arr = array(
                "code" => "000",
                "data" => $data
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "查询失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //生成订单纠纷表
    public function generateOrderCandd()
    {
        $order_id = rq('order_id');
        $callback = rq('callback');
        //查询订单中的user_id
        $order_tbl_sel = DB::select('SELECT user_id FROM hh_order WHERE order_id = ?',
            [$order_id]);
        if ($order_tbl_sel) {
            $user_id = $order_tbl_sel[0]->user_id;
            $candd_id = $order_id;
            //查询是否存在未完成的当前订单所生成的投诉纠纷订单
            $order_candd_repeat_tbl = DB::select('SELECT * FROM hh_order WHERE candd_id = ? AND is_finish = ?',
                [$candd_id, 0]);
            if ($order_candd_repeat_tbl) {
                //TODO 节点
                $content = $order_candd_repeat_tbl[0]->content;
                $process_result = $order_candd_repeat_tbl[0]->process_result;
                $arr = array(
                    "code" => "210",
                    "msg" => "订单纠纷生成失败，存在未解决的订单纠纷",
                    "data" => array("content" => $content,
                        "process_result" => $process_result
                    )
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
            $order_candd_tbl = DB::insert('INSERT INTO hh_order_candd(candd_id, order_id, user_id, is_finish) VALUES(?,?,?,?)',
                [$candd_id, $order_id, $user_id, 0]);
            if ($order_candd_tbl) {
                $arr = array(
                    "code" => "000",
                    "msg" => "订单纠纷已生成",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array(
                    "code" => "207",
                    "msg" => "订单纠纷生成失败",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else {
            $arr = array(
                "code" => "206",
                "msg" => "订单号错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //插入纠纷数据
    public function intoOrderCandd()
    {
        $candd_id = rq('candd_id');
        $callback = rq('callback');
        $content = rq('content');
        $candd_tbl_into = DB::update('UPDATE hh_order_candd SET content = ? WHERE candd_id = ?',
            [$content, $candd_id]);
        if ($candd_tbl_into) {
            $arr = array(
                "code" => "000",
                "msg" => "成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "211",
                "msg" => "失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //插入纠纷解决方式数据
    public function intoOrderCanddResult()
    {
        $candd_id = rq('candd_id');
        $callback = rq('callback');
        $process_result = rq('process_result');
        $candd_tbl_into = DB::update('UPDATE hh_order_candd SET process_result = ? WHERE candd_id = ?',
            [$process_result, $candd_id]);
        if ($candd_tbl_into) {
            $arr = array(
                "code" => "000",
                "msg" => "成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "211",
                "msg" => "失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //更改纠纷订单状态为已解决
    public function changeOrderCanddFinish()
    {
        $candd_id = rq('candd_id');
        $callback = rq('callback');
        $candd_tbl_into = DB::update('UPDATE hh_order_candd SET is_finish = ? WHERE candd_id = ?',
            [1, $candd_id]);
        if ($candd_tbl_into) {
            $arr = array(
                "code" => "000",
                "msg" => "成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "211",
                "msg" => "失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //TODO 生成装修人员订单
    public function generateOrderWorker()
    {
        $order_id = rq('order_id');
        $callback = rq('callback');
        $order_personnel_array = rq('personnel_array');
        if (count($order_personnel_array) > 9) {
            $arr = array(
                "code" => "209",
                "msg" => "订单施工人员过多，请勿超过9位",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $i = 0;
        //遍历数组
        foreach ($order_personnel_array as $pa[$i]) {
            $i++;
        }
        //至多9名员工，不足补空
        while ($i < 10) {
            $pa[$i] = '';
            $i++;
        }
        if (!isOrder_OrderID($order_id)) {
            $arr = array(
                "code" => "206",
                "msg" => "订单号错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $order_personnel = $order_id;
        $order_personnel_tbl = DB::insert('INSERT INTO hh_order_personnel(personnel_id, order_id) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
            [$order_personnel, $order_id, $pa[0], $pa[1], $pa[2], $pa[3], $pa[4], $pa[5], $pa[6], $pa[7], $pa[8], $pa[9]]);
        if ($order_personnel_tbl) {
            $arr = array(
                "code" => "000",
                "msg" => "人员表生成成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "208",
                "msg" => "人员表生成失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

}