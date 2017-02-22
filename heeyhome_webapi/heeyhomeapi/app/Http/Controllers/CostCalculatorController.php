<?php
/**
 * TODO 成本计算器接口
 * User: zhulr
 * Date: 2016/12/23
 * Time: 14:59
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class CostCalculatorController extends Controller
{

    //成本计算
    public function costCalculator()
    {
        $calculator_json = rq('calculator_json');
        $calculator_arr = json_decode($calculator_json, true);
        $callback = rq('callback');
        $city = $calculator_arr['city'];
        switch ($city) {
            case "苏州市" :
                $arr=costCalculator_suzhou($calculator_arr);
                return $callback . "(" . HHJson($arr) . ")";
            default :
                $arr = array(
                    "code" => "200",
                    "msg" => "暂未开放此城市",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //收藏计算器结果
    public function collectCalculatorResult()
    {
        $user_id = rq('user_id');
        $calculator_result_json = rq('calculator_result_json');
        $calculator_result_arr = json_decode($calculator_result_json, true);
        $callback = rq('callback');
        //分离基础数据
        $city = $calculator_result_arr['city'];
        $area = $calculator_result_arr['area'];
        $room_num = $calculator_result_arr['room_num'];
        $parlor_num = $calculator_result_arr['parlor_num'];
        $bathroom_num = $calculator_result_arr['bathroom_num'];
        $balcony_num = $calculator_result_arr['balcony_num'];
        //户型id初始化数据
        $housetype_id = '0';
        //获取户型id
        $sel_housetype_id = DB::select('SELECT id FROM hh_housetype WHERE room = ? AND parlour = ? AND toilet = ? AND balcony = ?',
            [$room_num, $parlor_num, $bathroom_num, $balcony_num]);
        if ($sel_housetype_id) {
            $housetype_id = $sel_housetype_id[0]->id;
        } else {
            //无户型数据，插入新户型，返回新户型id
            $ins_housetype = DB::insert('INSERT INTO hh_housetype (room ,parlour,toilet,balcony) VALUES (?,?,?,?)',
                [$room_num, $parlor_num, $bathroom_num, $balcony_num]);
            if ($ins_housetype) {
                $sel_housetype_id_tiwce = DB::select('SELECT id FROM hh_housetype WHERE room = ? AND parlour = ? AND toilet = ? AND balcony = ?',
                    [$room_num, $parlor_num, $bathroom_num, $balcony_num]);
                if ($sel_housetype_id_tiwce)
                    $housetype_id = $sel_housetype_id_tiwce[0]->id;
            }
        }
        //分离计算结果数据
        $gzrg = $calculator_result_arr['gzrg'];
        $sdrg = $calculator_result_arr['sdrg'];
        $wgrg = $calculator_result_arr['wgrg'];
        $mgrg = $calculator_result_arr['mgrg'];
        $yqgrg = $calculator_result_arr['yqgrg'];
        $zgrg = $calculator_result_arr['zgrg'];
        $rgzj = $calculator_result_arr['rgzj'];
        $zdsdcl = $calculator_result_arr['zdsdcl'];
        $gdsdcl = $calculator_result_arr['gdsdcl'];
        $wgfc = $calculator_result_arr['wgfc'];
        $mgfc = $calculator_result_arr['mgfc'];
        $yqcl = $calculator_result_arr['yqcl'];
        $czdd = $calculator_result_arr['czdd'];
        $czgd = $calculator_result_arr['czgd'];
        $bc = $calculator_result_arr['bc'];
        $dls = $calculator_result_arr['dls'];
        $db = $calculator_result_arr['db'];
        $mm = $calculator_result_arr['mm'];
        $cfym = $calculator_result_arr['cfym'];
        $lyfym = $calculator_result_arr['lyfym'];
        $ygym = $calculator_result_arr['ygym'];
        $jcdd = $calculator_result_arr['jcdd'];
        $cgsys = $calculator_result_arr['cgsys'];
        $zxzj = $calculator_result_arr['zxzj'];
        //生成计算器结果id
        $mtime = explode(' ', microtime());
        $mtime[0] = ($mtime[0] + 1) * 1000000;
        $str1 = (string)$mtime[1];
        $str2 = substr((string)$mtime[0], 1);
        $str = $str1 . $str2;
        $calculator_results_id = $str;
        $ins_calculator_result = DB::insert('INSERT INTO hh_calculator_results (calculator_results_id,user_id,city,housetype_id,area,gzrg,sdrg,wgrg,mgrg,yqgrg,zgrg,rgzj,zdsdcl,gdsdcl,wgfc,mgfc,yqcl,czzd,czgd,bc,dls,db,mm,cfym,lyfym,ygym,jcdd,cgsys,zxzj)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [$calculator_results_id, $user_id, $city, $housetype_id, $area, $gzrg, $sdrg, $wgrg, $mgrg, $yqgrg, $zgrg, $rgzj, $zdsdcl, $gdsdcl, $wgfc, $mgfc, $yqcl, $czdd, $czgd, $bc, $dls, $db, $mm, $cfym, $lyfym, $ygym, $jcdd, $cgsys, $zxzj]);
        if ($ins_calculator_result) {
            $arr = array(
                "code" => "000",
                "msg" => "收藏成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "收藏失败",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    //获取已收藏的计算器结果
    public function getCalculatorResult()
    {
        $user_id = rq('user_id');
        $calculator_results_id = rq('calculator_results_id');
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
        //有计算结果id则返还单条数据
        if ($calculator_results_id) {
            $sel_calculator_results_tbl_once = DB::select('SELECT a.*,b.* FROM hh_calculator_results a LEFT JOIN hh_housetype b ON a.housetype_id = b.id WHERE a.user_id = ? AND a.calculator_results_id = ? ',
                [$user_id, $calculator_results_id]);
            if ($sel_calculator_results_tbl_once) {
                $arr = array(
                    "code" => "000",
                    "msg" => "查询成功",
                    "data" => $sel_calculator_results_tbl_once[0]
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array(
                    "code" => "200",
                    "msg" => "查询失败，没有数据",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else {
            //返还全部数据
            $sel_calculator_results_tbl = DB::select('SELECT a.*,b.* FROM hh_calculator_results a LEFT JOIN hh_housetype b ON a.housetype_id = b.id WHERE a.user_id = ? ORDER BY a.id LIMIT ?,?',
                [$user_id, $page_start, $limit]);
            $sel_calculator_results_count = DB::select('SELECT COUNT(id) AS cal_count FROM hh_calculator_results WHERE user_id = ?',
                [$user_id]);
            if ($sel_calculator_results_count) {
                $calculator_count = $sel_calculator_results_count[0]->cal_count;
            }
            if ($sel_calculator_results_tbl) {
                $arr = array(
                    "code" => "000",
                    "msg" => "查询成功",
                    "data" => array(
                        "calculator_count" => $calculator_count,
                        "calculator_data" => $sel_calculator_results_tbl
                    )
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array(
                    "code" => "200",
                    "msg" => "查询失败，没有数据",
                    "data" => ""
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
    }

    //删除计算器结果
    public function delCostCalculatorResult()
    {
        $calculator_results_id = rq('calculator_results_id');
        $user_id = rq('user_id');
        $callback = rq('callback');
        $del_cost_calculator_result = DB::delete('DELETE FROM hh_calculator_results WHERE calculator_results_id = ? AND user_id = ?',
            [$calculator_results_id, $user_id]);
        if ($del_cost_calculator_result) {
            $arr = array(
                "code" => "000",
                "msg" => "删除成功",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}