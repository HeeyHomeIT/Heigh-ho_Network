<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/3
 * Time: 9:57
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class WorkerpricelistController extends Controller
{
    public function index()
    {
        $callback = rq('callback');
        $cate = rq('cate_id');
        $shop_id = rq('shop_id');
        switch ($cate) {
            case 1:
                $cost = DB::select('select service1,service2,service3,service4,service5,service6,service7,service8,service9,service10,service11,service12,service13,service14,service15,service16 from hh_shop_price where shop_id=?', [$shop_id]);
                break;
            case 2:
                $cost = DB::select('select service17,service18 from hh_shop_price where shop_id=?', [$shop_id]);
                break;
            case 3:
                $cost = DB::select('select service19,service20,service21,service22,service23,service24,service25,service26,service27,service28,service29,service30,service31,service32,service33,service34,service35,service36,service37,service38,service39,service40,service41 from hh_shop_price where shop_id=?', [$shop_id]);
                break;
            case 4:
                $cost = DB::select('select service42,service43,service44,service45,service46,service47,service48,service49,service50,service51,service52,service53 from hh_shop_price where shop_id=?', [$shop_id]);
                break;
            case 5:
                $cost = DB::select('select service54,service55,service56,service57,service58,service59,service60,service61,service62,service63 from hh_shop_price where shop_id=?', [$shop_id]);
                break;
            default:
                $arr = array("code" => "117",
                    "msg" => "该分类不存在"
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
        if(!$cost){
            $arr = array("code" => "200",
                "msg" => "店铺价格不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $sel = DB::select('select id,serviceitem from hh_workerprice_serviceitem where workercate=?', [$cate]);
        //dd($sel);
        foreach ($sel as $key => $val) {
            $des = DB::select('select id,servicename,unit from hh_workerprice_list where serviceitem=?', [$val->id]);
            //dd($des);
            foreach ($des as $k => $v) {
                $des[$k]->id = 'service' . $v->id;
                foreach ($cost[0] as $ke => $va) {
                    $des[$k]->cost = $va;
                }
            }
            $sel[$key]->service = $des;
        }
        $arr = array("code" => "000",
            "data" => $sel
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
}