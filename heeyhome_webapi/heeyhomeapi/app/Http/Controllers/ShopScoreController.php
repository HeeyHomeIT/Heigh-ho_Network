<?php
/**
 * 店铺评分类
 * User: heeyhome
 * Date: 2017/2/20
 * Time: 13:32
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class ShopScoreController extends Controller
{
    function orderOverScore()
    {
        $order_id = rq('order_id');
        $projectquality = rq('projectquality');
        $serviceattitude = rq('serviceattitude');
        $overallmerit = rq('overallmerit');
        $callback = rq('callback');
        if (!($projectquality >= 0 && $serviceattitude >= 0 && $overallmerit >= 0)) {
            $arr = array("code" => "200",
                "data" => "",
                "msg" => "参数错误"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //查询订单是否已经评价
        $sel_order_tbl = DB::select('SELECT is_evaluation,shop_id,order_status FROM hh_order WHERE order_id = ?', [$order_id]);
        if ($sel_order_tbl) {
            if (!($sel_order_tbl[0]->order_status == 6)) {
                $arr = array("code" => "200",
                    "data" => "",
                    "msg" => "订单状态不可评价"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
            if ($sel_order_tbl[0]->is_evaluation == 1) {
                $arr = array("code" => "200",
                    "data" => "",
                    "msg" => "订单已评价，不可重复评价"
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else if ($sel_order_tbl[0]->is_evaluation == 0) {
                $shop_id = $sel_order_tbl[0]->shop_id;
                //查询店铺评价及评价人数
                $sel_shop_score = DB::select('SELECT * FROM hh_score WHERE shop_id = ?', [$shop_id]);
                if ($sel_shop_score) {
                    $shop_projectquality = $sel_shop_score[0]->projectquality;
                    $shop_serviceattitude = $sel_shop_score[0]->serviceattitude;
                    $shop_overallmerit = $sel_shop_score[0]->overallmerit;
                    $shop_person_num = $sel_shop_score[0]->person_num;
                    //评分算法
                    $person_num_sum = 1 + $shop_person_num;
                    $new_shop_projectquality = ($shop_projectquality * ($shop_person_num / $person_num_sum)) + ($projectquality * (1 / $person_num_sum));
                    $new_shop_serviceattitude = ($shop_serviceattitude * ($shop_person_num / $person_num_sum)) + ($serviceattitude * (1 / $person_num_sum));
                    $new_shop_overallmerit = ($shop_overallmerit * ($shop_person_num / $person_num_sum)) + ($overallmerit * (1 / $person_num_sum));
                    //更新店铺评分
                    $upd_shop_score = DB::update('UPDATE hh_score SET projectquality = ?,serviceattitude = ?,overallmerit = ?,person_num = ? WHERE shop_id = ?',
                        [$new_shop_projectquality, $new_shop_serviceattitude, $new_shop_overallmerit, $person_num_sum, $shop_id]);
                    //订单评价更改为已评价
                    $upd_order = DB::update('UPDATE hh_order SET is_evaluation = 1 WHERE order_id = ?',
                        [$order_id]);
                    $arr = array("code" => "000",
                        "data" => "",
                        "msg" => "评分成功"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array("code" => "200",
                        "data" => "",
                        "msg" => "店铺评分数据错误"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }

            } else {
                $arr = array("code" => "200",
                    "data" => "",
                    "msg" => "订单数据错误"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else {
            $arr = array("code" => "200",
                "data" => "",
                "msg" => "订单不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

}