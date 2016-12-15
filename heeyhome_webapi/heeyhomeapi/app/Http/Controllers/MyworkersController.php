<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/14
 * Time: 9:42
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class MyworkersController extends Controller
{
    public function cate(){
        $callback=rq('callback');
        $cates=DB::select('select cate_id,category from hh_workercate');
        $arr=array("code"=>"000",
            "data"=>$cates
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function workerlist(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
        $cate=rq('cate_id');
        /*按工种分类查询员工信息 1：杂工 2：水电工 3：瓦工 4：木工 5：油漆工*/
        switch ($cate){
            case 1:
                $mixworker=DB::select('select hh_mixworker.*,hh_portrait.portrait_img as portrait_img from hh_mixworker left join hh_portrait on hh_portrait.portrait_userid=hh_mixworker.userid where shopid=?',[$shop_id]);
                if($mixworker) {
                    $arr = array("code" => "000",
                        "data" => $mixworker
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array("code" => "117",
                        "msg" => "信息不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 2:
                $eleworker=DB::select('select hh_eleworker.*,hh_portrait.portrait_img as portrait_img from hh_eleworker left join hh_portrait on hh_portrait.portrait_userid=hh_eleworker.userid where shopid=?',[$shop_id]);
                if($eleworker) {
                    $arr = array("code" => "000",
                        "data" => $eleworker
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array("code" => "117",
                        "msg" => "信息不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 3:
                $brickworker=DB::select('select hh_brickworker.*,hh_portrait.portrait_img as portrait_img from hh_brickworker left join hh_portrait on hh_portrait.portrait_userid=hh_brickworker.userid where shopid=?',[$shop_id]);
                if($brickworker) {
                    $arr = array("code" => "000",
                        "data" => $brickworker
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array("code" => "117",
                        "msg" => "信息不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 4:
                $woodworker=DB::select('select hh_woodworker.*,hh_portrait.portrait_img as portrait_img from hh_woodworker left join hh_portrait on hh_portrait.portrait_userid=hh_woodworker.userid where shopid=?',[$shop_id]);
                if($woodworker) {
                    $arr = array("code" => "000",
                        "data" => $woodworker
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array("code" => "117",
                        "msg" => "信息不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 5:
                $paintworker=DB::select('select hh_paintworker.*,hh_portrait.portrait_img as portrait_img from hh_paintworker left join hh_portrait on hh_portrait.portrait_userid=hh_paintworker.userid where shopid=?',[$shop_id]);
                if($paintworker) {
                    $arr = array("code" => "000",
                        "data" => $paintworker
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array("code" => "117",
                        "msg" => "信息不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            default:
                $mixworker=DB::select('select hh_mixworker.*,hh_portrait.portrait_img as portrait_img from hh_mixworker left join hh_portrait on hh_portrait.portrait_userid=hh_mixworker.userid where shopid=?',[$shop_id]);
                $eleworker=DB::select('select hh_eleworker.*,hh_portrait.portrait_img as portrait_img from hh_eleworker left join hh_portrait on hh_portrait.portrait_userid=hh_eleworker.userid where shopid=?',[$shop_id]);
                $brickworker=DB::select('select hh_brickworker.*,hh_portrait.portrait_img as portrait_img from hh_brickworker left join hh_portrait on hh_portrait.portrait_userid=hh_brickworker.userid where shopid=?',[$shop_id]);
                $woodworker=DB::select('select hh_woodworker.*,hh_portrait.portrait_img as portrait_img from hh_woodworker left join hh_portrait on hh_portrait.portrait_userid=hh_woodworker.userid where shopid=?',[$shop_id]);
                $paintworker=DB::select('select hh_paintworker.*,hh_portrait.portrait_img as portrait_img from hh_paintworker left join hh_portrait on hh_portrait.portrait_userid=hh_paintworker.userid where shopid=?',[$shop_id]);
                $arr = array("code" => "000",
                    "data" => array('mixworker'=>$mixworker,
                            "eleworker"=>$eleworker,
                            "brickworker"=>$brickworker,
                            "woodworker"=>$woodworker,
                            "paintworker"=>$paintworker
                        )
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
    }
}