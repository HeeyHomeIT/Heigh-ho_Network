<?php
/**
 * TODO 材料订单
 * User: heeyhome
 * Date: 2016/12/1
 * Time: 17:23
 */
namespace App\Http\Controllers;

use ClassPreloader\Parser\DirVisitor;
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
            $material_id = $sel_material_tbl[0]->material_id;
            for ($i = 0; $i < $count; $i++) {
                //查询单条材料是否存在
                $sel_material_echo_tbl = DB::select('SELECT * FROM hh_order_material_list WHERE material_name_id = ? AND material_id = ?',
                    [$material_arr_keys[$i], $material_id]);
                if ($sel_material_echo_tbl) {
                    //更新单条数据
                    if ($material_arr_values[$i] > 0 || $material_arr_values[$i] != "" || $material_arr_values[$i] != "0") {
                        DB::update('UPDATE hh_order_material_list SET material_num = ? WHERE material_id = ? AND material_name_id = ?',
                            [$material_arr_values[$i], $material_id, $material_arr_keys[$i]]);
                    } else {
                        DB::delete('DELETE FROM hh_order_material_list WHERE material_name_id = ? AND material_id = ?', [$material_arr_keys[$i], $material_id]);
                    }
                } else {
                    $sel_isexist_material = DB::select('SELECT * FROM hh_materials WHERE id = ?',
                        [$material_arr_keys[$i]]);
                    //验证材料是否存在
                    if ($sel_isexist_material) {
                        //插入单条数据
                        DB::insert('INSERT INTO hh_order_material_list (material_id,material_name_id,material_num) VALUES (?,?,?)',
                            [$material_id, $material_arr_keys[$i], $material_arr_values[$i]]);
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
                    if ($material_arr_values[$i] > 0 || $material_arr_values[$i] != "" || $material_arr_values[$i] != "0") {
                        DB::insert('INSERT INTO hh_order_material_list (material_id,material_name_id,material_num) VALUES (?,?,?)',
                            [$material_id, $material_arr_keys[$i], $material_arr_values[$i]]);
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
        //判断来源
        if ($material_supplier_id)
            $sel_material_user = DB::select('SELECT * FROM hh_material_list_view WHERE material_supplier_id = ? AND pay_status = ? LIMIT ?,?',
                [$material_supplier_id, 3, $page_start, $limit]);
        else if ($user_id)
            $sel_material_user = DB::select('SELECT * FROM hh_material_list_view WHERE user_id = ?',
                [$user_id]);
        else if ($order_id)
            $sel_material_user = DB::select('SELECT * FROM hh_material_list_view WHERE order_id = ?',
                [$order_id]);
        else {
            $arr = array(
                "code" => "200",
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

    //获取材料订单数据
    public function getOrderMaterial()
    {
        $material_id = rq('material_id');
        $callback = rq('callback');
        $sel_material_user = DB::select('SELECT * FROM hh_material_list_view WHERE order_material_id = ?',
            [$material_id]);
        $sel_material_list_tbl = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ?',
            [$material_id]);
        if ($sel_material_user) {
            $arr_user = array("basic_info" => $sel_material_user[0]);
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "没有订单",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if ($sel_material_user) {
            $arr_data = array("material_info" => $sel_material_list_tbl);
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "没有订单",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $data = array_merge($arr_user, $arr_data);
        $arr = array(
            "code" => "000",
            "msg" => "查询成功",
            "data" => $data
        );
        return $callback . "(" . HHJson($arr) . ")";
    }

    //材料商更新材料单状态为去配送中
    public function changeMaterialStatus()
    {
        $material_id = rq('material_id');
        $callback = rq('callback');
        $upd_material_type = DB::update('UPDATE hh_order_material SET order_material_status = ? WHERE material_id = ? AND pay_status = ?',
            [2, $material_id, 3]);
        if ($upd_material_type) {
            $arr = array(
                "code" => "000",
                "msg" => "更新成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "更新失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //获取待配送 正在配送 已经完成的订单数量  
    public function getOrderMaterialCount()
    {
        $callback = rq('callback');
        $material_supplier_id = rq('material_supplier_id');
        if ($material_supplier_id) {
            $orderList = DB::select('SELECT order_material_status FROM hh_order_material where material_supplier_id = ? AND pay_status = ?', [$material_supplier_id, 3]);
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

    //获取待配送 正在配送 已经完成的订单
    public function materialOrderByStatus()
    {
        $callback = rq('callback');
        $material_supplier_id = rq('material_supplier_id');
        $status = rq('status');

        if ($status == 1 || $status == 2 || $status == 3) {
            $sel_material_user = DB::select('SELECT * FROM hh_material_list_view WHERE material_supplier_id = ? AND order_material_status =? AND pay_status = ?',
                [$material_supplier_id, $status, 3]);
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
        if (!$material_type) {
            //获取订单当前状态
            $material_type = 0;
            $sel_order_step = DB::select('SELECT order_step FROM hh_order where order_id = ?',
                [$order_id]);
            if ($sel_order_step) {
                $order_step = $sel_order_step[0]->order_step;
                switch ($order_step) {
                    case 3;
                        $material_type = 1;
                        break;
                    case 7;
                        $material_type = 3;
                        break;
                    case 11;
                        $material_type = 4;
                        break;
                    case 15;
                        $material_type = 5;
                        break;
                }
            }
        }
        //获取材料订单id
        $sel_material_id = DB::select('SELECT material_id FROM hh_order_material WHERE order_id = ? AND material_type = ?',
            [$order_id, $material_type]);
        if ($sel_material_id) {
            $material_id = $sel_material_id[0]->material_id;
            //查询材料单列表数据视图
            $sel_material_list_data_view_0 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 0 ORDER BY material_id',
                [$material_id]);
            $sel_material_list_data_view_1 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 1 ORDER BY material_id',
                [$material_id]);
            $sel_material_list_data_view_2 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 2 ORDER BY material_id',
                [$material_id]);
            $sel_material_list_data_view_3 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 3 ORDER BY material_id',
                [$material_id]);
            $sel_material_list_data_view_4 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 4 ORDER BY material_id',
                [$material_id]);
            $sel_material_list_data_view_5 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 5 ORDER BY material_id',
                [$material_id]);
            $sel_material_list_data_view_6 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 6 ORDER BY material_id',
                [$material_id]);
            $sel_material_list_data_view_8 = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 8 ORDER BY material_id',
                [$material_id]);
            if ($sel_material_list_data_view_0) {
                $arr_0 = $sel_material_list_data_view_0;
                //按品牌名分组
                $sel_material_list_by_name = DB::select('SELECT material_id,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 0 GROUP BY material_id',
                    [$material_id]);
                $sel_material_list_by_name_num = DB::select('SELECT count(a.id) AS num FROM (SELECT material_id as id ,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 0 GROUP BY material_id) a ',
                    [$material_id]);
                if ($sel_material_list_by_name) {
                    $num = $sel_material_list_by_name_num[0]->num;
                    for ($i = 0; $i < $num; $i++) {
                        $sel_material_list_by_name_each = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 0 AND material_id = ? ',
                            [$material_id, $sel_material_list_by_name[$i]->material_id]);
                        $arr_name_0[$i] = array("name" => $sel_material_list_by_name[$i]->material_name,
                            "img" => $sel_material_list_by_name[$i]->material_img,
                            "data" => $sel_material_list_by_name_each);
                    }
                }
            } else {
                $arr_name_0 = "";
            }
            if ($sel_material_list_data_view_1) {
                $arr_1 = $sel_material_list_data_view_1;
                //按品牌名分组
                $sel_material_list_by_name = DB::select('SELECT material_id,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 1 GROUP BY material_id',
                    [$material_id]);
                $sel_material_list_by_name_num = DB::select('SELECT count(a.id) AS num FROM (SELECT material_id as id ,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 1 GROUP BY material_id) a ',
                    [$material_id]);
                if ($sel_material_list_by_name) {
                    $num = $sel_material_list_by_name_num[0]->num;
                    for ($i = 0; $i < $num; $i++) {
                        $sel_material_list_by_name_each = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 1 AND material_id = ? ',
                            [$material_id, $sel_material_list_by_name[$i]->material_id]);
                        $arr_name_1[$i] = array("name" => $sel_material_list_by_name[$i]->material_name,
                            "img" => $sel_material_list_by_name[$i]->material_img,
                            "data" => $sel_material_list_by_name_each);
                    }
                }
            } else {
                $arr_name_1 = "";
            }
            if ($sel_material_list_data_view_2) {
                $arr_2 = $sel_material_list_data_view_2;
                //按品牌名分组
                $sel_material_list_by_name = DB::select('SELECT material_id,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 2 GROUP BY material_id',
                    [$material_id]);
                $sel_material_list_by_name_num = DB::select('SELECT count(a.id) AS num FROM (SELECT material_id as id ,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 2 GROUP BY material_id) a ',
                    [$material_id]);
                if ($sel_material_list_by_name) {
                    $num = $sel_material_list_by_name_num[0]->num;
                    for ($i = 0; $i < $num; $i++) {
                        $sel_material_list_by_name_each = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 2 AND material_id = ? ',
                            [$material_id, $sel_material_list_by_name[$i]->material_id]);
                        $arr_name_2[$i] = array("name" => $sel_material_list_by_name[$i]->material_name,
                            "img" => $sel_material_list_by_name[$i]->material_img,
                            "data" => $sel_material_list_by_name_each);
                    }
                }
            } else {
                $arr_name_2 = "";
            }
            if ($sel_material_list_data_view_3) {
                $arr_3 = $sel_material_list_data_view_3;
                //按品牌名分组
                $sel_material_list_by_name = DB::select('SELECT count(a.id) AS num FROM (SELECT material_id as id ,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 3 GROUP BY material_id) a ',
                    [$material_id]);
                $sel_material_list_by_name_num = DB::select('SELECT count(img) AS num FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 3 ',
                    [$material_id]);
                if ($sel_material_list_by_name) {
                    $num = $sel_material_list_by_name_num[0]->num;
                    for ($i = 0; $i < $num; $i++) {
                        $sel_material_list_by_name_each = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 3 AND material_id = ? ',
                            [$material_id, $sel_material_list_by_name[$i]->material_id]);
                        $arr_name_3[$i] = array("name" => $sel_material_list_by_name[$i]->material_name,
                            "img" => $sel_material_list_by_name[$i]->material_img,
                            "data" => $sel_material_list_by_name_each);
                    }
                }
            } else {
                $arr_name_3 = "";
            }
            if ($sel_material_list_data_view_4) {
                $arr_4 = $sel_material_list_data_view_4;
                //按品牌名分组
                $sel_material_list_by_name = DB::select('SELECT material_id,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 4 GROUP BY material_id',
                    [$material_id]);
                $sel_material_list_by_name_num = DB::select('SELECT count(a.id) AS num FROM (SELECT material_id as id ,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 4 GROUP BY material_id) a ',
                    [$material_id]);
                if ($sel_material_list_by_name) {
                    $num = $sel_material_list_by_name_num[0]->num;
                    for ($i = 0; $i < $num; $i++) {
                        $sel_material_list_by_name_each = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 4 AND material_id = ? ',
                            [$material_id, $sel_material_list_by_name[$i]->material_id]);
                        $arr_name_4[$i] = array("name" => $sel_material_list_by_name[$i]->material_name,
                            "img" => $sel_material_list_by_name[$i]->material_img,
                            "data" => $sel_material_list_by_name_each);
                    }
                }
            } else {
                $arr_name_4 = "";
            }
            if ($sel_material_list_data_view_5) {
                $arr_5 = $sel_material_list_data_view_5;
                //按品牌名分组
                $sel_material_list_by_name = DB::select('SELECT material_id,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 5 GROUP BY material_id',
                    [$material_id]);
                $sel_material_list_by_name_num = DB::select('SELECT count(a.id) AS num FROM (SELECT material_id as id ,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 5 GROUP BY material_id) a ',
                    [$material_id]);
                if ($sel_material_list_by_name) {
                    $num = $sel_material_list_by_name_num[0]->num;
                    for ($i = 0; $i < $num; $i++) {
                        $sel_material_list_by_name_each = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 5 AND material_id = ? ',
                            [$material_id, $sel_material_list_by_name[$i]->material_id]);
                        $arr_name_5[$i] = array("name" => $sel_material_list_by_name[$i]->material_name,
                            "img" => $sel_material_list_by_name[$i]->material_img,
                            "data" => $sel_material_list_by_name_each);
                    }
                }
            } else {
                $arr_name_5 = "";
            }
            if ($sel_material_list_data_view_6) {
                $arr_6 = $sel_material_list_data_view_6;
                //按品牌名分组
                $sel_material_list_by_name = DB::select('SELECT material_id,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 6 GROUP BY material_id',
                    [$material_id]);
                $sel_material_list_by_name_num = DB::select('SELECT count(a.id) AS num FROM (SELECT material_id as id ,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 6 GROUP BY material_id) a ',
                    [$material_id]);
                if ($sel_material_list_by_name) {
                    $num = $sel_material_list_by_name_num[0]->num;
                    for ($i = 0; $i < $num; $i++) {
                        $sel_material_list_by_name_each = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 6 AND material_id = ? ',
                            [$material_id, $sel_material_list_by_name[$i]->material_id]);
                        $arr_name_6[$i] = array("name" => $sel_material_list_by_name[$i]->material_name,
                            "img" => $sel_material_list_by_name[$i]->material_img,
                            "data" => $sel_material_list_by_name_each);
                    }
                }
            } else {
                $arr_name_6 = "";
            }
            if ($sel_material_list_data_view_8) {
                $arr_8 = $sel_material_list_data_view_8;
                //按品牌名分组
                $sel_material_list_by_name = DB::select('SELECT material_id,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 8 GROUP BY material_id',
                    [$material_id]);
                $sel_material_list_by_name_num = DB::select('SELECT count(a.id) AS num FROM (SELECT material_id as id ,name AS material_name,img AS material_img FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 8 GROUP BY material_id) a ',
                    [$material_id]);
                if ($sel_material_list_by_name) {
                    $num = $sel_material_list_by_name_num[0]->num;
                    for ($i = 0; $i < $num; $i++) {
                        $sel_material_list_by_name_each = DB::select('SELECT * FROM hh_material_list_data_view WHERE material_list_id = ? AND brand_id = 8 AND material_id = ? ',
                            [$material_id, $sel_material_list_by_name[$i]->material_id]);
                        $arr_name_8[$i] = array("name" => $sel_material_list_by_name[$i]->material_name,
                            "img" => $sel_material_list_by_name[$i]->material_img,
                            "data" => $sel_material_list_by_name_each);
                    }
                }
            } else {
                $arr_name_8 = "";
            }
            $counter = 1;
            $one = array();
            $two = array();
            $thr = array();
            $for = array();
            $fiv = array();
            if ($arr_name_0 != "") {
                $one = array($counter => array("无品牌" => $arr_name_0));
                $counter++;
            }
            if ($arr_name_1 != "" && $arr_name_2 != "") {
                $two = array(array('公元优家' => $arr_name_1,
                    '伟星管业' => $arr_name_2));
                $counter++;
            } else if ($arr_name_1 != "") {
                $two = array($counter => array("公元优家" => $arr_name_1));
                $counter++;
            } else if ($arr_name_2 != "") {
                $two = array($counter => array("伟星管业" => $arr_name_2));
                $counter++;
            }
            if ($arr_name_3 != "" && $arr_name_4 != "") {
                $thr = array(array('上海熊猫' => $arr_name_3,
                    '昆山长江线' => $arr_name_4));
                $counter++;
            } else if ($arr_name_3 != "") {
                $thr = array($counter => array("上海熊猫" => $arr_name_3));
                $counter++;
            } else if ($arr_name_4 != "") {
                $thr = array($counter => array("昆山长江线" => $arr_name_4));
                $counter++;
            }
            if ($arr_name_5 != "" && $arr_name_6 != "") {
                $for = array(array('泰山牌' => $arr_name_5,
                    '拉法基牌' => $arr_name_6));
                $counter++;
            } else if ($arr_name_5 != "") {
                $for = array($counter => array("泰山牌" => $arr_name_5));
                $counter++;
            } else if ($arr_name_6 != "") {
                $for = array($counter => array("拉法基牌" => $arr_name_6));
                $counter++;
            }
            if ($arr_name_8 != "") {
                $fiv = array($counter => array("公元PVC" => $arr_name_8));
                $counter++;
            }
            //查询材料订单是否进入支付阶段 默认为未进入
            $pay_status = 0;
            $sel_material_tbl = DB::select('SELECT pay_status FROM hh_order_material WHERE material_id =?',
                [$material_id]);
            if ($sel_material_tbl) {
                $pay_status = $sel_material_tbl[0]->pay_status;
            }
            $pay_status_arr = array("order_pay_type" => $pay_status);
            $arr = array(
                "code" => "000",
                "msg" => "材料单数据",
                "data" => array_merge($one, $two, $thr, $for, $fiv, $pay_status_arr)
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

    //用户确认材料单
    public function chooseMaterialByUser()
    {

    }

    //用户确认材料单线下购买
    public function outMaterialByUser()
    {
        $order_id = rq('order_id');
        $callback = rq('callback');
        //进入支付阶段
        $sel_material_tbl = DB::select('SELECT material_id,material_type,material_price FROM hh_order_material WHERE order_id =? AND pay_status = ?',
            [$order_id, 0]);
        if ($sel_material_tbl) {
            $material_id = $sel_material_tbl[0]->material_id;
            //修改材料表信息
            $upd_material_tbl = DB::update('UPDATE hh_order_material SET pay_status = ?,material_price=? WHERE material_id = ?',
                [3, 0, $material_id]);
            if ($upd_material_tbl) {
                $arr = array(
                    "code" => "000",
                    "msg" => "成功",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array(
                    "code" => "200",
                    "msg" => "失败",
                    "data" => ""
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

    //进度提交材料
    public function progressOrderMaterial()
    {
        /* 返回当前的毫秒时间戳(16位) */
        $mtime = explode(' ', microtime());
        $mtime[0] = ($mtime[0] + 1) * 1000000;
        $str1 = (string)$mtime[1];
        $str2 = substr((string)$mtime[0], 1);
        $str = $str1 . $str2;
        $order_id = rq('order_id');
        

        $order_step_result = DB::SELECT('SELECT order_step FROM hh_order WHERE order_id = ?',[$order_id]);
        if (!$order_step_result) {
            $arr = array(
                "code" => "203",
                "msg" => "订单不存在",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $order_step = $order_step_result[0]->order_step;
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
                        DB::insert('INSERT INTO hh_order_material_list (material_id,material_name_id,material_num) VALUES (?,?,?)',
                            [$material_id, $material_arr_keys[$i], $material_arr_values[$i]]);
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
                    DB::insert('INSERT INTO hh_order_material_list (material_id,material_name_id,material_num) VALUES (?,?,?)',
                        [$material_id, $material_arr_keys[$i], $material_arr_values[$i]]);
                }
                $material_type_chn = '';
                $sel = DB::select('SELECT material_type FROM hh_order_material_type WHERE material_type_id = ?',
                    [$material_type]);
                if ($sel) {
                    $material_type_chn = $sel[0]->material_type;
                }
                $step = $order_step+1;
                $result = DB::update('UPDATE hh_order SET order_step = ? WHERE order_id = ?', [$step, $order_id]);
                $arr = array(
                    "code" => "000",
                    "msg" => "材料订单已经生成",
                    "data" => array(
                        "order_id" => $order_id,
                        "material_id" => $material_id,
                        "material_type" => $order_id,
                        "material_type" => $material_type,
                        "material_type_chn" => $material_type_chn,
                        "order_step" => $step,
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

}