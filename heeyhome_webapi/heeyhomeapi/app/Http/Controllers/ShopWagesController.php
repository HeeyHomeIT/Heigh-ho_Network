<?php
/**
 * 店铺工价
 * User: heeyhome
 * Date: 2017/1/14
 * Time: 10:40
 */

namespace App\Http\Controllers;


use App\Shop;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class ShopWagesController extends Controller
{
    public function getShopWages()
    {
        $shop_id = rq('shop_id');
        $callback = rq('callback');
        $sel_shop_price = DB::select('SELECT * FROM hh_shop_price WHERE shop_id = ? ',
            [$shop_id]);
        if ($sel_shop_price) {
            $shop_price_arr = array(
                "1" => array('1' => $sel_shop_price[0]->service17, '2' => $sel_shop_price[0]->service18),
                "2" => array('1' => $sel_shop_price[0]->service19, '2' => $sel_shop_price[0]->service20,
                    '3' => $sel_shop_price[0]->service21, '4' => $sel_shop_price[0]->service22,
                    '5' => $sel_shop_price[0]->service23, '6' => $sel_shop_price[0]->service24,
                    '7' => $sel_shop_price[0]->service25, '8' => $sel_shop_price[0]->service26,
                    '9' => $sel_shop_price[0]->service27, '10' => $sel_shop_price[0]->service28,
                    '11' => $sel_shop_price[0]->service29, '12' => $sel_shop_price[0]->service30,
                    '13' => $sel_shop_price[0]->service31, '14' => $sel_shop_price[0]->service32,
                    '15' => $sel_shop_price[0]->service33, '16' => $sel_shop_price[0]->service34,
                    '17' => $sel_shop_price[0]->service35, '18' => $sel_shop_price[0]->service36,
                    '19' => $sel_shop_price[0]->service37, '20' => $sel_shop_price[0]->service38,
                    '21' => $sel_shop_price[0]->service39, '22' => $sel_shop_price[0]->service40,
                    '23' => $sel_shop_price[0]->service41),
                "3" => array('1' => $sel_shop_price[0]->service42, '2' => $sel_shop_price[0]->service43,
                    '3' => $sel_shop_price[0]->service44, '4' => $sel_shop_price[0]->service45,
                    '5' => $sel_shop_price[0]->service46, '6' => $sel_shop_price[0]->service47,
                    '7' => $sel_shop_price[0]->service48, '8' => $sel_shop_price[0]->service49,
                    '9' => $sel_shop_price[0]->service50, '10' => $sel_shop_price[0]->service51,
                    '11' => $sel_shop_price[0]->service52, '12' => $sel_shop_price[0]->service53),
                "4" => array('1' => $sel_shop_price[0]->service54, '2' => $sel_shop_price[0]->service55,
                    '3' => $sel_shop_price[0]->service56, '4' => $sel_shop_price[0]->service57,
                    '5' => $sel_shop_price[0]->service58, '6' => $sel_shop_price[0]->service59,
                    '7' => $sel_shop_price[0]->service60, '8' => $sel_shop_price[0]->service61,
                    '9' => $sel_shop_price[0]->service62, '10' => $sel_shop_price[0]->service63),
                "5" => array('1' => $sel_shop_price[0]->service1, '2' => $sel_shop_price[0]->service2,
                    '3' => $sel_shop_price[0]->service3, '4' => $sel_shop_price[0]->service4,
                    '5' => $sel_shop_price[0]->service5, '6' => $sel_shop_price[0]->service6,
                    '7' => $sel_shop_price[0]->service7, '8' => $sel_shop_price[0]->service8,
                    '9' => $sel_shop_price[0]->service9, '10' => $sel_shop_price[0]->service10,
                    '11' => $sel_shop_price[0]->service11, '12' => $sel_shop_price[0]->service12,
                    '13' => $sel_shop_price[0]->service13, '14' => $sel_shop_price[0]->service14,
                    '15' => $sel_shop_price[0]->service15, '16' => $sel_shop_price[0]->service16),
            );
            $arr = array(
                "code" => "000",
                "msg" => "查询成功",
                "data" => $shop_price_arr
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

}