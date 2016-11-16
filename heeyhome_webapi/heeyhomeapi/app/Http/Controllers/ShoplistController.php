<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/16
 * Time: 16:17
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class ShoplistController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $select=DB::select('select * from hh_shop');
        if($select){
            foreach($select as $key=>$value){
                $select[$key]->servicetag=explode(',',$value->servicetag);
                $select[$key]->servicearea=explode(',',$value->servicearea);
                $img=DB::select('select shop_img from hh_shop_img where shop_id=? and is_face=1',[$value->shop_id]);
                if($img){
                    $select[$key]->shop_img=$img[0]->shop_img;
                }else{
                    $select[$key]->shop_img=null;
                }
            }
            $arr = array("code" => "000",
                "data" => $select
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "117",
                "msg" => "信息不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}