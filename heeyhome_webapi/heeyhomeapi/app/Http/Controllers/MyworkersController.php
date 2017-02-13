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
                $total=DB::select('select count(id) as total from hh_mixworker where shopid=?',[$shop_id]);
                $total=$total[0]->total;
                $newpage=new PageController();
                $offset=$newpage->page($total);
                $mixworker=DB::select('select hh_mixworker.*,hh_portrait.portrait_img as portrait_img from hh_mixworker left join hh_portrait on hh_portrait.portrait_userid=hh_mixworker.userid where shopid=? order by id desc limit ?,?',[$shop_id,$offset[0],$offset[1]]);
                if($mixworker) {
                    foreach($mixworker as $key=>$val){
                        $ordernum=DB::select('select count(id) as total from hh_order_personnel where person1=? or person2=? or person3=? or person4=? or person5=? or person6=? or person7=? or person8=? or person9=?',[$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid]);
                        $mixworker[$key]->ordernum=$ordernum[0]->total;
                    }
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
                $total=DB::select('select count(id) as total from hh_eleworker where shopid=?',[$shop_id]);
                $total=$total[0]->total;
                $newpage=new PageController();
                $offset=$newpage->page($total);
                $eleworker=DB::select('select hh_eleworker.*,hh_portrait.portrait_img as portrait_img from hh_eleworker left join hh_portrait on hh_portrait.portrait_userid=hh_eleworker.userid where shopid=?',[$shop_id]);
                if($eleworker) {
                    foreach($eleworker as $key=>$val){
                        $ordernum=DB::select('select count(id) as total from hh_order_personnel where person1=? or person2=? or person3=? or person4=? or person5=? or person6=? or person7=? or person8=? or person9=?',[$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid]);
                        $eleworker[$key]->ordernum=$ordernum[0]->total;
                    }
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
                $total=DB::select('select count(id) as total from hh_brickworker where shopid=?',[$shop_id]);
                $total=$total[0]->total;
                $newpage=new PageController();
                $offset=$newpage->page($total);
                $brickworker=DB::select('select hh_brickworker.*,hh_portrait.portrait_img as portrait_img from hh_brickworker left join hh_portrait on hh_portrait.portrait_userid=hh_brickworker.userid where shopid=?',[$shop_id]);
                if($brickworker) {
                    foreach($brickworker as $key=>$val){
                        $ordernum=DB::select('select count(id) as total from hh_order_personnel where person1=? or person2=? or person3=? or person4=? or person5=? or person6=? or person7=? or person8=? or person9=?',[$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid]);
                        $brickworker[$key]->ordernum=$ordernum[0]->total;
                    }
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
                $total=DB::select('select count(id) as total from hh_woodworker where shopid=?',[$shop_id]);
                $total=$total[0]->total;
                $newpage=new PageController();
                $offset=$newpage->page($total);
                $woodworker=DB::select('select hh_woodworker.*,hh_portrait.portrait_img as portrait_img from hh_woodworker left join hh_portrait on hh_portrait.portrait_userid=hh_woodworker.userid where shopid=?',[$shop_id]);
                if($woodworker) {
                    foreach($woodworker as $key=>$val){
                        $ordernum=DB::select('select count(id) as total from hh_order_personnel where person1=? or person2=? or person3=? or person4=? or person5=? or person6=? or person7=? or person8=? or person9=?',[$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid]);
                        $woodworker[$key]->ordernum=$ordernum[0]->total;
                    }
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
                $total=DB::select('select count(id) as total from hh_paintworker where shopid=?',[$shop_id]);
                $total=$total[0]->total;
                $newpage=new PageController();
                $offset=$newpage->page($total);
                $paintworker=DB::select('select hh_paintworker.*,hh_portrait.portrait_img as portrait_img from hh_paintworker left join hh_portrait on hh_portrait.portrait_userid=hh_paintworker.userid where shopid=?',[$shop_id]);
                if($paintworker) {
                    foreach($paintworker as $key=>$val){
                        $ordernum=DB::select('select count(id) as total from hh_order_personnel where person1=? or person2=? or person3=? or person4=? or person5=? or person6=? or person7=? or person8=? or person9=?',[$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid]);
                        $paintworker[$key]->ordernum=$ordernum[0]->total;
                    }
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
                foreach($mixworker as $key=>$val){
                    $mixworker[$key]->cate_id=1;
                    $ordernum=DB::select('select count(id) as total from hh_order_personnel where person1=? or person2=? or person3=? or person4=? or person5=? or person6=? or person7=? or person8=? or person9=?',[$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid]);
                    $mixworker[$key]->ordernum=$ordernum[0]->total;
                }
                $eleworker=DB::select('select hh_eleworker.*,hh_portrait.portrait_img as portrait_img from hh_eleworker left join hh_portrait on hh_portrait.portrait_userid=hh_eleworker.userid where shopid=?',[$shop_id]);
                foreach($eleworker as $key=>$val){
                    $eleworker[$key]->cate_id=2;
                    $ordernum=DB::select('select count(id) as total from hh_order_personnel where person1=? or person2=? or person3=? or person4=? or person5=? or person6=? or person7=? or person8=? or person9=?',[$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid]);
                    $eleworker[$key]->ordernum=$ordernum[0]->total;
                }
                $brickworker=DB::select('select hh_brickworker.*,hh_portrait.portrait_img as portrait_img from hh_brickworker left join hh_portrait on hh_portrait.portrait_userid=hh_brickworker.userid where shopid=?',[$shop_id]);
                foreach($brickworker as $key=>$val){
                    $brickworker[$key]->cate_id=3;
                    $ordernum=DB::select('select count(id) as total from hh_order_personnel where person1=? or person2=? or person3=? or person4=? or person5=? or person6=? or person7=? or person8=? or person9=?',[$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid]);
                    $brickworker[$key]->ordernum=$ordernum[0]->total;
                }
                $woodworker=DB::select('select hh_woodworker.*,hh_portrait.portrait_img as portrait_img from hh_woodworker left join hh_portrait on hh_portrait.portrait_userid=hh_woodworker.userid where shopid=?',[$shop_id]);
                foreach($woodworker as $key=>$val){
                    $woodworker[$key]->cate_id=4;
                    $ordernum=DB::select('select count(id) as total from hh_order_personnel where person1=? or person2=? or person3=? or person4=? or person5=? or person6=? or person7=? or person8=? or person9=?',[$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid]);
                    $woodworker[$key]->ordernum=$ordernum[0]->total;
                }
                $paintworker=DB::select('select hh_paintworker.*,hh_portrait.portrait_img as portrait_img from hh_paintworker left join hh_portrait on hh_portrait.portrait_userid=hh_paintworker.userid where shopid=?',[$shop_id]);
                foreach($paintworker as $key=>$val){
                    $paintworker[$key]->cate_id=5;
                    $ordernum=DB::select('select count(id) as total from hh_order_personnel where person1=? or person2=? or person3=? or person4=? or person5=? or person6=? or person7=? or person8=? or person9=?',[$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid,$val->userid]);
                    $paintworker[$key]->ordernum=$ordernum[0]->total;
                }
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