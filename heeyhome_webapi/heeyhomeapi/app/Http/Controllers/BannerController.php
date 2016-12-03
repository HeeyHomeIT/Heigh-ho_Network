<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/3
 * Time: 13:56
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class BannerController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $banners=DB::select('select * from hh_banner');
        if($banners){
            $arr=array("code"=>"000",
                "data"=>$banners
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr=array("code"=>"111",
                "msg"=>"失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}