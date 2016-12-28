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
        //基础信息
        $city = $calculator_arr['city'];
        $area = $calculator_arr['area'];
        $room_num = $calculator_arr['room_num'];
        $parlor_num = $calculator_arr['parlor_num'];
        $bathroom_num = $calculator_arr['bathroom_num'];
        $balcony_num = $calculator_arr['balcony_num'];
        //其他辅助信息
        $floor = $calculator_arr['floor'];
        $wall = $calculator_arr['wall'];
        $ground_sank = $calculator_arr['ground_sank'];
        //其他基础信息
        //房间分配 TODO 例：array('master'=>'1','second'=>'1','child'=>'1','parent'=>'0','cloakroom'=>'0','study'=>'0')
        $room_distribution = $calculator_arr['room_distribution'];
        if ($room_distribution['master'] != 0) {
            //房间内设计 TODO 例：array('ground'=>'smdb','wardrobe'=>'true','ceiling'=>'true','wallpaper'=>'false','window'=>'true')
            $master_distribution = $calculator_arr['master_distribution'];
            //地面处理方式 TODO 例：实木地板：smdb 强化复合地板：qhfhdb 瓷砖：cz
            $master_ground = $master_distribution['ground'];
            //衣柜制作方式 TODO 例：木工制作衣柜：true 自行购买衣柜：false
            $master_wardrobe = $master_distribution['wardrobe'];
            //木工制作吊顶 TODO 例：需要：true 不需要：false
            $master_ceiling = $master_distribution['ceiling'];
            //墙面铺设墙纸 TODO 例：需要：true 不需要：false
            $master_wallpaper = $master_distribution['wallpaper'];
            //有无飘窗结构 TODO 例：有飘窗：true 没有飘窗：false
            $master_window = $master_distribution['window'];
        }
        if ($room_distribution['second'] != 0) {
            $second_distribution = $calculator_arr['second_distribution'];
            $second_ground = $second_distribution['ground'];
            $second_wardrobe = $second_distribution['wardrobe'];
            $second_ceiling = $second_distribution['ceiling'];
            $second_wallpaper = $second_distribution['wallpaper'];
            $second_window = $second_distribution['window'];
        }
        if ($room_distribution['child'] != 0) {
            $child_distribution = $calculator_arr['child_distribution'];
            $child_ground = $child_distribution['ground'];
            $child_wardrobe = $child_distribution['wardrobe'];
            $child_ceiling = $child_distribution['ceiling'];
            $child_wallpaper = $child_distribution['wallpaper'];
            $child_window = $child_distribution['window'];
            //榻榻米的制作 TODO 例：木工制作榻榻米：true 自行购买榻榻米：false
            $child_tatami = $child_distribution['tatami'];
            //书桌书架选择 TODO 例：木工制作简易书桌书架：true 购买成品书桌书架：false
            $child_desk = $child_distribution['desk'];
        }
        if ($room_distribution['parent'] != 0) {
            $parent_distribution = $calculator_arr['parent_distribution'];
            $parent_ground = $parent_distribution['ground'];
            $parent_wardrobe = $parent_distribution['wardrobe'];
            $parent_ceiling = $parent_distribution['ceiling'];
            $parent_wallpaper = $parent_distribution['wallpaper'];
            $parent_window = $parent_distribution['window'];
        }
        if ($room_distribution['cloakroom'] != 0) {
            $cloakroom_distribution = $calculator_arr['cloakroom_distribution'];
            $cloakroom_ground = $cloakroom_distribution['ground'];
            $cloakroom_wardrobe = $cloakroom_distribution['wardrobe'];
            $cloakroom_ceiling = $cloakroom_distribution['ceiling'];
            $cloakroom_wallpaper = $cloakroom_distribution['wallpaper'];
            $cloakroom_window = $cloakroom_distribution['window'];
        }
        if ($room_distribution['study'] != 0) {
            $study_distribution = $calculator_arr['study_distribution'];
            $study_ground = $study_distribution['ground'];
            $study_ceiling = $study_distribution['ceiling'];
            $study_wallpaper = $study_distribution['wallpaper'];
            $study_window = $study_distribution['window'];
            $study_tatami = $study_distribution['tatami'];
            //书桌书架选择 TODO 例：木工制作简易书桌书柜：true 购买成品书桌书柜：false
            $study_bookcase = $study_distribution['bookcase'];
        }
        //客餐厅
        $parlor_distribution = $calculator_arr['parlor_distribution'];
        $parlor_ground = $parlor_distribution['ground'];
        $parlor_ceiling = $parlor_distribution['ceiling'];
        //鞋柜制作方式 TODO 例：木工制作鞋柜：true 自行购买鞋柜：false
        $parlor_shoebox = $parlor_distribution['shoebox'];
        //酒柜制作方式 TODO 例：木工制作酒柜：true 自行购买酒柜：false
        $parlor_wine_cabinet = $parlor_distribution['wine_cabinet'];
        $parlor_wallpaper = $parlor_distribution['wallpaper'];
        //阳台
        $balcony_distribution = $calculator_arr['balcony_distribution'];
        $balcony_ground = $balcony_distribution['ground'];
        //木工制作吊柜 TODO 例：需要：true 不需要：false
        $balcony_hanging_cabinet = $balcony_distribution['hanging_cabinet'];
        //厨房
        $kitchen_distribution = $calculator_arr['kitchen_distribution'];
        $kitchen_ground = $kitchen_distribution['ground'];
        //木工制作厨柜 TODO 例：需要：true 不需要：false
        $kitchen_cupboard = $kitchen_distribution['cupboard'];
        //是否超出计算面积
        if ($area < 70 || $area > 160) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误，面积不在计算器计算范围",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if (!($city != null) && ($area != null) && ($room_num != null) && ($parlor_num != null) && ($bathroom_num != null) && ($balcony_num != null)) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误",
                "data" => ""
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        switch ($city) {
            case "苏州市" :
                $arr = array(
                    "code" => "000",
                    "msg" => "计算成功",
                    "data" => costCalculator_suzhou($area, $room_num, $parlor_num, $bathroom_num, $balcony_num)
                );
                return $callback . "(" . HHJson($arr) . ")";
                break;
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
            $sel_calculator_results_count = DB::select('SELECT COUNT(id) AS cal_count FROM hh_calculator_results WHERE a.user_id = ?',
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
}