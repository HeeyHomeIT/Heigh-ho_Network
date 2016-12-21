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

    //TODO 生成预算单与结算单
    public function generateActualListAndReckonList()
    {
        $order_id = rq('order_id');
        $callback = rq('callback');
        //查询订单是否存在，存在则去除装修人员id号
        $sel_order_tbl = DB::select('SELECT order_personnel FROM hh_order WHERE order_id = ?',
            [$order_id]);
        if (!$sel_order_tbl) {
            $arr = array(
                "code" => "206",
                "msg" => "订单号错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $order_personnel = $sel_order_tbl[0]->order_personnel;
        //生成预算单与结算单表
        //预算
        $reckon_list_tbl = DB::insert('INSERT INTO hh_order_reckon_list(order_id,order_personnel) VALUES (?,?)',
            [$order_id, $order_personnel]);
        if (!$reckon_list_tbl) {
            $arr = array(
                "code" => "220",
                "msg" => "预算单生成失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //结算
        $actual_list_tbl = DB::insert('INSERT INTO hh_order_actual_list(order_id,order_personnel) VALUES (?,?)',
            [$order_id, $order_personnel]);
        if (!$actual_list_tbl) {
            //清除预算单
            $del_reckon_list_tbl = DB::delete('DELETE FROM hh_order_reckon_list WHERE order_id = ?',
                [$order_id]);
            $arr = array(
                "code" => "221",
                "msg" => "结算单生成失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $arr = array(
            "code" => "000",
            "msg" => "生成成功",
            "data" => ""
        );
        return $callback . "(" . HHJson($arr) . ")";
    }

    //获取预算单结算单字段
    public function getActualDataAndReckonData()
    {
        $callback = rq('callback');
        $arr = array(
            "code" => "000",
            "msg" => "返回预算单字段名成功",
            "data" => array("shuidian_zj" => "水电方面总价（建筑面积）",
                "wagong_rg" => "瓦工人工（建筑面积）",
                "wagong_fztz" => "瓦工方形贴砖（铺贴面积）",
                "wagong_lxtz" => "瓦工菱形贴砖（铺贴面积）",
                "wagong_zbx" => "瓦工走边线（米数）",
                "wagong_fs" => "瓦工防水（涂刷面积）",
                "wagong_zp" => "瓦工找平（找平面积）",
                "wagong_qdq" => "瓦工砌单墙（砌墙面积）",
                "wagong_qmfs" => "瓦工墙面粉刷（粉刷面积）",
                "wagong_flsg" => "瓦工封落水管（根数）",
                "wagogn_qt" => "瓦工其他",
                "mugong_rg" => "木工人工（建筑面积）",
                "mugong_gz_high" => "木工柜子1米以上（投影面积）",
                "mugong_gz_low" => "木工柜子1米以下（长度）",
                "mugong_ct" => "木工抽屉（个数）",
                "mugong_mb" => "木工门板（个数）",
                "mugong_sgbdd_area" => "木工石膏板吊顶（面积）",
                "mugong_sgbdd_num" => "木工石膏板吊顶（张数）",
                "mugong_ftm" => "木工封头门及门套基础（个数）",
                "mugong_clh" => "木工窗帘盒（米数）",
                "mugon_qt" => "木工其他",
                "youqi_rg" => "油漆工人工（建筑面积）",
                "youqi_pwgb" => "油漆工铺网格布（卷数）",
                "youqi_stl" => "油漆工刷涂料（施工面积）",
                "youqi_qt" => "油漆其他",
                "remark" => "备注"
            )
        );
        return $callback . "(" . HHJson($arr) . ")";
    }

    //添加预算单与结算单数据
    public function addActualDataAndReckonData()
    {
        $order_id = rq('order_id');
        $callback = rq('callback');
        $shuidian_zj = rq('shuidian_zj');
        $wagong_rg = rq('wagong_rg');
        $wagong_fztz = rq('wagong_fztz');
        $wagong_lxtz = rq('wagong_lxtz');
        $wagong_zbx = rq('wagong_zbx');
        $wagong_fs = rq('wagong_fs');
        $wagong_zp = rq('wagong_zp');
        $wagong_qdq = rq('wagong_qdq');
        $wagong_qmfs = rq('wagong_qmfs');
        $wagong_flsg = rq('wagong_flsg');
        $wagogn_qt = rq('wagogn_qt');
        $mugong_rg = rq('mugong_rg');
        $mugong_gz_high = rq('mugong_gz_high');
        $mugong_gz_low = rq('mugong_gz_low');
        $mugong_ct = rq('mugong_ct');
        $mugong_mb = rq('mugong_mb');
        $mugong_sgbdd_area = rq('mugong_sgbdd_area');
        $mugong_sgbdd_num = rq('mugong_sgbdd_num');
        $mugong_ftm = rq('mugong_ftm');
        $mugong_clh = rq('mugong_clh');
        $mugon_qt = rq('mugon_qt');
        $youqi_rg = rq('youqi_rg');
        $youqi_pwgb = rq('youqi_pwgb');
        $youqi_stl = rq('youqi_stl');
        $youqi_qt = rq('youqi_qt');
        $remark = rq('remark');
        //查看订单是否存在
        $sel_order_tbl = DB::select('SELECT * FROM hh_order_reckon_list WHERE order_id = ?',
            [$order_id]);
        if (!$sel_order_tbl) {
            $arr = array(
                "code" => "206",
                "msg" => "订单号错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //判断字段是否为空
        if ($shuidian_zj && $wagong_rg && $wagong_fztz && $wagong_lxtz && $wagong_zbx && $wagong_fs && $wagong_zp && $wagong_qdq && $wagong_qmfs && $wagong_flsg && $wagogn_qt && $mugong_rg && $mugong_gz_high && $mugong_gz_low && $mugong_ct && $mugong_mb && $mugong_sgbdd_area && $mugong_sgbdd_num && $mugong_ftm && $mugong_clh && $mugon_qt && $youqi_rg && $youqi_pwgb && $youqi_stl && $youqi_qt && $remark) {
            $arr = array(
                "code" => "223",
                "msg" => "数据不能为空",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //预算
        $reckon_list_tbl = DB::insert('UPDATE hh_order_reckon_list SET shuidian_zj= ? , 
        wagong_rg= ? , wagong_fztz= ? , wagong_lxtz= ? , wagong_zbx= ? , wagong_fs= ? , wagong_zp= ? , wagong_qdq= ? , wagong_qmfs= ? , wagong_flsg= ? , wagogn_qt= ? , 
        mugong_rg= ? , mugong_gz_high= ? , mugong_gz_low= ? , mugong_ct= ? , mugong_mb= ? , mugong_sgbdd_area= ? , mugong_sgbdd_num= ? , mugong_ftm= ? , mugong_clh= ? , mugon_qt= ? , 
        youqi_rg= ? , youqi_pwgb= ? , youqi_stl= ? , youqi_qt= ? , remark = ? WHERE order_id = ?',
            [$shuidian_zj, $wagong_rg, $wagong_fztz, $wagong_lxtz, $wagong_zbx, $wagong_fs, $wagong_zp, $wagong_qdq, $wagong_qmfs, $wagong_flsg, $wagogn_qt,
                $mugong_rg, $mugong_gz_high, $mugong_gz_low, $mugong_ct, $mugong_mb, $mugong_sgbdd_area, $mugong_sgbdd_num, $mugong_ftm, $mugong_clh, $mugon_qt,
                $youqi_rg, $youqi_pwgb, $youqi_stl, $youqi_qt, $remark, $order_id]);
        //结算
        $actual_list_tbl = DB::insert('UPDATE hh_order_actual_list SET shuidian_zj= ? , 
        wagong_rg= ? , wagong_fztz= ? , wagong_lxtz= ? , wagong_zbx= ? , wagong_fs= ? , wagong_zp= ? , wagong_qdq= ? , wagong_qmfs= ? , wagong_flsg= ? , wagogn_qt= ? , 
        mugong_rg= ? , mugong_gz_high= ? , mugong_gz_low= ? , mugong_ct= ? , mugong_mb= ? , mugong_sgbdd_area= ? , mugong_sgbdd_num= ? , mugong_ftm= ? , mugong_clh= ? , mugon_qt= ? , 
        youqi_rg= ? , youqi_pwgb= ? , youqi_stl= ? , youqi_qt= ? , remark = ? WHERE order_id = ?',
            [$shuidian_zj, $wagong_rg, $wagong_fztz, $wagong_lxtz, $wagong_zbx, $wagong_fs, $wagong_zp, $wagong_qdq, $wagong_qmfs, $wagong_flsg, $wagogn_qt,
                $mugong_rg, $mugong_gz_high, $mugong_gz_low, $mugong_ct, $mugong_mb, $mugong_sgbdd_area, $mugong_sgbdd_num, $mugong_ftm, $mugong_clh, $mugon_qt,
                $youqi_rg, $youqi_pwgb, $youqi_stl, $youqi_qt, $remark, $order_id]);
        if ($reckon_list_tbl && $actual_list_tbl) {
            $arr = array(
                "code" => "000",
                "msg" => "插入成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "222",
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
        $shuidian_zj = rq('shuidian_zj');
        $wagong_rg = rq('wagong_rg');
        $wagong_fztz = rq('wagong_fztz');
        $wagong_lxtz = rq('wagong_lxtz');
        $wagong_zbx = rq('wagong_zbx');
        $wagong_fs = rq('wagong_fs');
        $wagong_zp = rq('wagong_zp');
        $wagong_qdq = rq('wagong_qdq');
        $wagong_qmfs = rq('wagong_qmfs');
        $wagong_flsg = rq('wagong_flsg');
        $wagogn_qt = rq('wagogn_qt');
        $mugong_rg = rq('mugong_rg');
        $mugong_gz_high = rq('mugong_gz_high');
        $mugong_gz_low = rq('mugong_gz_low');
        $mugong_ct = rq('mugong_ct');
        $mugong_mb = rq('mugong_mb');
        $mugong_sgbdd_area = rq('mugong_sgbdd_area');
        $mugong_sgbdd_num = rq('mugong_sgbdd_num');
        $mugong_ftm = rq('mugong_ftm');
        $mugong_clh = rq('mugong_clh');
        $mugon_qt = rq('mugon_qt');
        $youqi_rg = rq('youqi_rg');
        $youqi_pwgb = rq('youqi_pwgb');
        $youqi_stl = rq('youqi_stl');
        $youqi_qt = rq('youqi_qt');
        $remark = rq('remark');
        //判断字段是否为空
        if ($shuidian_zj && $wagong_rg && $wagong_fztz && $wagong_lxtz && $wagong_zbx && $wagong_fs && $wagong_zp && $wagong_qdq && $wagong_qmfs && $wagong_flsg && $wagogn_qt && $mugong_rg && $mugong_gz_high && $mugong_gz_low && $mugong_ct && $mugong_mb && $mugong_sgbdd_area && $mugong_sgbdd_num && $mugong_ftm && $mugong_clh && $mugon_qt && $youqi_rg && $youqi_pwgb && $youqi_stl && $youqi_qt && $remark) {
            $arr = array(
                "code" => "223",
                "msg" => "数据不能为空",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //查看订单是否存在
        $sel_order_tbl = DB::select('SELECT * FROM hh_order_actual_list WHERE order_id = ?',
            [$order_id]);
        if (!$sel_order_tbl) {
            $arr = array(
                "code" => "206",
                "msg" => "订单号错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //结算
        $actual_list_tbl = DB::insert('UPDATE hh_order_actual_list SET shuidian_zj= ? , 
        wagong_rg= ? , wagong_fztz= ? , wagong_lxtz= ? , wagong_zbx= ? , wagong_fs= ? , wagong_zp= ? , wagong_qdq= ? , wagong_qmfs= ? , wagong_flsg= ? , wagogn_qt= ? , 
        mugong_rg= ? , mugong_gz_high= ? , mugong_gz_low= ? , mugong_ct= ? , mugong_mb= ? , mugong_sgbdd_area= ? , mugong_sgbdd_num= ? , mugong_ftm= ? , mugong_clh= ? , mugon_qt= ? , 
        youqi_rg= ? , youqi_pwgb= ? , youqi_stl= ? , youqi_qt= ? , remark = ? WHERE order_id = ?',
            [$shuidian_zj, $wagong_rg, $wagong_fztz, $wagong_lxtz, $wagong_zbx, $wagong_fs, $wagong_zp, $wagong_qdq, $wagong_qmfs, $wagong_flsg, $wagogn_qt,
                $mugong_rg, $mugong_gz_high, $mugong_gz_low, $mugong_ct, $mugong_mb, $mugong_sgbdd_area, $mugong_sgbdd_num, $mugong_ftm, $mugong_clh, $mugon_qt,
                $youqi_rg, $youqi_pwgb, $youqi_stl, $youqi_qt, $remark, $order_id]);
        if ($actual_list_tbl) {
            $arr = array(
                "code" => "000",
                "msg" => "插入成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "222",
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