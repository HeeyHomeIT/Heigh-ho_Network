<?php
/**
 * TODO 材料订单
 * User: heeyhome
 * Date: 2016/12/1
 * Time: 17:23
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class OrderMaterialController extends Controller
{
    //生成材料订单
    public function generateOrderMaterial()
    {
        /* 返回当前的毫秒时间戳(16位) */
        $mtime = explode(' ', microtime());
        $mtime[0] = ($mtime[0] + 1) * 1000000;
        $str1 = (string)$mtime[1];
        $str2 = substr((string)$mtime[0], 1);
        $str = $str1 . $str2;
        $order_id = rq('order_id');
        $material_type = rq('material_type');
        $callback = rq('callback');
        $material_json = rq('material_arr');
        $material_arr = json_decode($material_json, true);
        $material_arr_keys = array_keys($material_arr); //返回所有键名
        $material_arr_values = array_values($material_arr); //返回所有键值
        $count = count($material_arr_keys);
        $sel_order = DB::select('SELECT * FROM hh_order WHERE order_id = ?',
            [$order_id]);
        if (!$sel_order) {
            $arr = array(
                "code" => "203",
                "msg" => "订单不存在",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $sel_material_tbl = DB::select('SELECT * FROM hh_order_material WHERE order_id = ? AND material_type = ?',
            [$order_id, $material_type]);
        //查询材料订单是否存在
        if ($sel_material_tbl) {
            return 1;
            $material_id = $sel_material_tbl[0]->material_id;
            for ($i = 0; $i < $count; $i++) {

                //查询单条材料是否存在
                $sel_material_echo_tbl = DB::select('SELECT * FROM hh_order_material_list WHERE material_name_id = ? AND material_id = ?',
                    [$material_arr_keys[$i], $material_id]);
                if ($sel_material_echo_tbl) {
                    //更新单条数据
                    DB::update('UPDATE hh_order_material_list SET material_name_id = ? , material_num = ? WHERE material_id = ?',
                        [$material_arr_keys[$i], $material_arr_values[$i], $material_id]);
                } else {
                    $sel_isexist_material = DB::select('SELECT * FROM hh_materials WHERE id = ?',
                        [$material_arr_keys[$i]]);
                    //验证材料是否存在
                    if ($sel_isexist_material) {
                        //插入单条数据
                        DB::insert('INSERT INTO hh_order_material_list (material_id,list_id,material_name_id,material_num) VALUES (?,?,?,?)',
                            [$material_id, $material_id, $material_arr_keys[$i], $material_arr_values[$i]]);
                    }
                }
            }
            $material_type_chn = '';
            $sel = DB::select('SELECT material_type FROM hh_order_material_type WHERE material_type_id = ?',
                [$material_type]);
            if ($sel) {
                $material_type_chn = $sel[0]->material_type;
            }
            $arr = array(
                "code" => "000",
                "msg" => "材料订单已经修改成功",
                "data" => array(
                    "order_id" => $order_id,
                    "material_id" => $material_id,
                    "material_type" => $order_id,
                    "material_type" => $material_type,
                    "material_type_chn" => $material_type_chn,
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            return 2;
            //生成需要的数据
            $material_id = $str;
            $material_list = $material_id;
            $pay_status = 0;
            $order_material_status = 1;
            //插入到材料订单总表
            $ins_material_tbl = DB::insert('INSERT INTO hh_order_material (order_id,material_id,material_type,material_list,pay_status,order_material_status) VALUES (?,?,?,?,?,?)',
                [$order_id, $material_id, $material_type, $material_list, $pay_status, $order_material_status]);
            if ($ins_material_tbl) {
                for ($i = 0; $i < $count; $i++) {
                    DB::insert('INSERT INTO hh_order_material_list (material_id,list_id,material_name_id,material_num) VALUES (?,?,?,?)',
                        [$material_id, $material_id, $material_arr_keys[$i], $material_arr_values[$i]]);
                }
                $material_type_chn = '';
                $sel = DB::select('SELECT material_type FROM hh_order_material_type WHERE material_type_id = ?',
                    [$material_type]);
                if ($sel) {
                    $material_type_chn = $sel[0]->material_type;
                }
                $arr = array(
                    "code" => "000",
                    "msg" => "材料订单已经生成",
                    "data" => array(
                        "order_id" => $order_id,
                        "material_id" => $material_id,
                        "material_type" => $order_id,
                        "material_type" => $material_type,
                        "material_type_chn" => $material_type_chn,
                    )
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array(
                    "code" => "301",
                    "msg" => "订单生成失败",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
    }

    //获取材料单列表
    public function getMaterialList()
    {
        $user_id = rq('user_id');
        $order_id = rq('order_id');
        $material_supplier_id = rq('material_supplier_id');
        $callback = rq('callback');
        //判断来源
        if ($material_supplier_id)
            $sel_material_user = DB::select('SELECT * FROM hh_material_list_view WHERE material_supplier_id = ?',
                [$material_supplier_id]);
        else if ($user_id)
            $sel_material_user = DB::select('SELECT * FROM hh_material_list_view WHERE user_id = ?',
                [$user_id]);
        else if ($order_id)
            $sel_material_user = DB::select('SELECT * FROM hh_material_list_view WHERE order_id = ?',
                [$order_id]);
        else {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误,获取列表失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if ($sel_material_user) {
            $arr = array(
                "code" => "000",
                "msg" => "查询成功",
                "data" => $sel_material_user
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

//TODO 获取材料订单数据
    public function getOrderMaterial()
    {
        $order_material_id = rq('order_material_id');
        $material_type = rq('material_type');
        $callback = rq('callback');
        if ($material_type) {
            //查询材料订单是否存在
            $sel_material_tbl = DB::select('SELECT * FROM hh_order_material WHERE order_material_id = ? AND material_type= ?',
                [$order_material_id, $material_type]);
            if ($sel_material_tbl) {
                $material_id = $sel_material_tbl[0]->sel_material_id;
                $sel_material_list_tbl = DB::select('' .
                    []);
            } else {
                $arr = array(
                    "code" => "203",
                    "msg" => "订单不存在",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else {

        }

    }

    public function getOrderMaterialCount()
    {
        $callback = rq('callback');
        $material_supplier_id = rq('material_supplier_id');
        if ($material_supplier_id) {
            $orderList = DB::select('SELECT order_material_status FROM hh_order_material where material_supplier_id = ?', [$material_supplier_id]);
            $unfinishCount = 0;
            $ingCount = 0;
            $finishCount = 0;


            foreach ($orderList as $key => $value) {
                $status = $value->order_material_status;
                if ($status == 3) {
                    $finishCount++;
                } else if ($status == 2) {
                    $ingCount++;
                } else if ($status == 1) {
                    $unfinishCount++;
                }
            }

            $arr = array(
                "code" => "000",
                "data" => array("unfinishCount" => $unfinishCount, "ingCount" => $ingCount, "finishCount" => $finishCount)
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "203",
                "msg" => "材料商不存在",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    public function materialOrderByStatus()
    {
        $callback = rq('callback');
        $material_supplier_id = rq('material_supplier_id');
        $status = rq('status');

        if ($status == 1 || $status == 2 || $status == 3) {
            $sel_material_user = DB::select('SELECT * FROM hh_material_list_view WHERE material_supplier_id = ? AND order_material_status =?',
                [$material_supplier_id, $status]);
            if ($sel_material_user) {
                $arr = array(
                    "code" => "000",
                    "data" => $sel_material_user
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array(
                    "code" => "117",
                    "msg" => "订单不存在",
                );
                return $callback . "(" . HHJson($arr) . ")";
            }

        } else {
            $arr = array(
                "code" => "203",
                "msg" => "状态错误",
            );
            return $callback . "(" . HHJson($arr) . ")";
        }


    }

    //用户材料订单数据获取
    public function getMaterialListData()
    {
        $order_id = rq('order_id');
        $material_type = rq('material_type');
        $callback = rq('callback');
        //获取材料订单id
        $sel_material_id = DB::select('SELECT material_id FROM hh_order_material WHERE order_id = ? AND material_type = ?',
            [$order_id, $material_type]);
        if ($sel_material_id) {
            $material_id = $sel_material_id[0]->material_id;
            //查询材料单列表数据视图
            $sel_material_list_data_view_0 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 0',
                [$material_id]);
            $sel_material_list_data_view_1 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 1',
                [$material_id]);
            $sel_material_list_data_view_2 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 2',
                [$material_id]);
            $sel_material_list_data_view_3 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 3',
                [$material_id]);
            $sel_material_list_data_view_4 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 4',
                [$material_id]);
            $sel_material_list_data_view_5 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 5 ',
                [$material_id]);
            $sel_material_list_data_view_6 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 6',
                [$material_id]);
            $sel_material_list_data_view_8 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 8',
                [$material_id]);
            if ($sel_material_list_data_view_0) {
                $arr_0 = $sel_material_list_data_view_0;
            } else {
                $arr_0 = "";
            }
            if ($sel_material_list_data_view_1) {
                $arr_1 = $sel_material_list_data_view_1;
            } else {
                $arr_1 = "";
            }
            if ($sel_material_list_data_view_2) {
                $arr_2 = $sel_material_list_data_view_2;
            } else {
                $arr_2 = "";
            }
            if ($sel_material_list_data_view_3) {
                $arr_3 = $sel_material_list_data_view_3;
            } else {
                $arr_3 = "";
            }
            if ($sel_material_list_data_view_4) {
                $arr_4 = $sel_material_list_data_view_4;
            } else {
                $arr_4 = "";
            }
            if ($sel_material_list_data_view_5) {
                $arr_5 = $sel_material_list_data_view_5;
            } else {
                $arr_5 = "";
            }
            if ($sel_material_list_data_view_6) {
                $arr_6 = $sel_material_list_data_view_6;
            } else {
                $arr_6 = "";
            }
            if ($sel_material_list_data_view_8) {
                $arr_8 = $sel_material_list_data_view_8;
            } else {
                $arr_8 = "";
            }
            $arr = array(
                "code" => "000",
                "msg" => "材料单数据",
                "data" => array('无品牌' => $arr_0,
                    '公元优家' => $arr_1,
                    '伟星管业' => $arr_2,
                    '上海熊猫' => $arr_3,
                    '昆山长江线' => $arr_4,
                    '泰山牌' => $arr_5,
                    '拉法基牌' => $arr_6,
                    '公元PVC' => $arr_8,)
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "订单不存在",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}