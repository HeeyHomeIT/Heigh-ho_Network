<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/11
 * Time: 9:41
 */

namespace App\Http\Controllers;


use App\Shop;

class ShopController extends Controller
{
    public function index(){

    }
    public function edit(){

        $callback = rq('callback');
        $shop_id = rq('shop_id');
        if (!$shop_id) {
            $arr = array("code" => "112",
                "msg" => "店铺id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $shop=new Shop();
        $shop=$shop->find($shop_id);
        if(!$shop){
            $arr = array("code" => "114",
                "msg" => "店铺不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $shop_name=rq('shop_name');
        $servicetag=rq('servicetag');
        $servicearea=rq('servicearea');
        $shop_address=rq('shop_address');
        $shop_describe=rq('shop_describe');
        if($shop_name) $shop->shop_name=$shop_name;
        if($servicetag) $shop->servicetag=$servicetag;
        if($servicearea) $shop->servicearea=$servicearea;
        if($shop_address) $shop->shop_address=$shop_address;
        if($shop_describe) $shop->shop_describe=$shop_describe;
        if($shop->save()){
            $arr = array("code" => "000",
                "msg" => "保存成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg" => "保存失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}