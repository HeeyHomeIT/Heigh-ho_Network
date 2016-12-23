<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/11
 * Time: 9:41
 */

namespace App\Http\Controllers;


use App\Shop;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class MyshopController extends Controller
{
    public function stylelist(){
        $callback=rq('callback');
        $styles=DB::select('select stylename from hh_shop_style');
        $arr = array("code" => "000",
            "data" => $styles
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function index(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
        if (!$shop_id) {
            $arr = array("code" => "112",
                "msg" => "店铺id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $select=DB::select('select * from hh_shop where shop_id=?',[$shop_id]);
        if($select){
            $img=DB::select('select id,shop_img,is_face from hh_shop_img where shop_id=? order by id desc',[$shop_id]);
            $select[0]->shop_imgs=$img;
            $technics=DB::select('select technics_id,technics_text from hh_shop_technics where shop_id=? order by id desc limit ?,?',[$shop_id,0,2]);
            foreach($technics as $key=>$value){
                $technicsimg=DB::select('select technics_img from hh_technics_img where technics_id=?',[$value->technics_id]);
                $technics[$key]->technics_img=$technicsimg;
            }
            $select[0]->shop_technics=$technics;
            $workcase=DB::select('select case_id,area,housetype,style,timelong,address from hh_workcase where foreman_id=? order by id desc limit ?,?',[$select[0]->shopper_id,0,5]);
            foreach($workcase as $k=>$v){
                 $workcaseimg=DB::select('select case_img from hh_workcase_img where case_id=?',[$v->case_id]);
                 $workcase[$k]->case_img=$workcaseimg;
            }
            $select[0]->workcase=$workcase;
            $select[0]->servicetag=explode(',',$select[0]->servicetag);
            $select[0]->servicearea=explode(',',$select[0]->servicearea);
            $authentication=explode(',',$select[0]->authentication);
            foreach($authentication as $k=>$v){
                switch ($v){
                    case 1: $authentication[$k]='api/public/smrz.png';
                        break;
                    case 2: $authentication[$k]='api/public/bzj.png';
                        break;
                    case 3: $authentication[$k]='api/public/tdbx.png';
                        break;
                    case 4: $authentication[$k]='api/public/bx.png';
                        break;
                    default: $authentication[$k]='';
                        break;
                }
            }
            $select[0]->authentication=$authentication;
            $score=DB::select('select projectquality,serviceattitude,overallmerit from hh_score where shop_id=?',[$shop_id]);
            if($score){
                $select[0]->shop_score=$score[0];
            }else{
                $select[0]->shop_score=array("projectquality"=>10.0,
                    "serviceattitude"=>10.0,
                    "overallmerit"=>10.0
                );
            }
            $collect=DB::select('select count(id) as collectnum from hh_collection where iscollected_id=?',[$shop_id]);
            $select[0]->collectnum=$collect[0]->collectnum;
            $gz_img=DB::select('select portrait_img from hh_portrait where portrait_userid=?',[$select[0]->shopper_id]);
            $select[0]->foremanimg=$gz_img[0]->portrait_img;
            $arr = array("code" => "000",
                "data" => $select[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "114",
                "msg" => "店铺不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
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
        if($servicetag) $shop->servicetag=implode(',',$servicetag);
        if($servicearea) $shop->servicearea=implode(',',$servicearea);
        if($shop_address) $shop->shop_address=$shop_address;
        if($shop_describe) $shop->shop_describe=$shop_describe;
        $shop->save();
        $arr = array("code" => "000",
            "msg"=>"保存成功"
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
}