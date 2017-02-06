<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/14
 * Time: 10:00
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class ShopdetailController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
        $update = DB::update('update hh_shop set shop_scan=shop_scan+1 where shop_id=?', [$shop_id]);
        $shop_info=DB::select('select shopper_id,shop_name,authentication,opentime,servicetag,servicearea,shop_address,shop_describe,shop_workernum from hh_shop where shop_id=?',[$shop_id]);
        $authentication=explode(',',$shop_info[0]->authentication);
        $servicetag=explode(',',$shop_info[0]->servicetag);
        $servicearea=explode(',',$shop_info[0]->servicearea);
        //dd($authentication);
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
        $shop_info[0]->authentication=$authentication;
        $shop_info[0]->servicetag=$servicetag;
        $shop_info[0]->servicearea=$servicearea;
        if($shop_info){
            $shop_img=DB::select('select id,shop_img,is_face from hh_shop_img where shop_id=?',[$shop_id]);
            $shop_info[0]->shop_imgs=$shop_img;
            $shopper_info=DB::select('select a.foremaninfo_realname,a.home_province,a.home_city,a.worktime,a.experience,a.decoratedareas,b.portrait_img from hh_foremaninfo a left join hh_portrait b on b.portrait_userid=a.foremaninfo_userid where a.foremaninfo_userid=?',[$shop_info[0]->shopper_id]);
            $shopper_info[0]->experience=explode(',',$shopper_info[0]->experience);
            $shopper_info[0]->decoratedareas=explode(',',$shopper_info[0]->decoratedareas);
            $ordernum=DB::select('select count(id) as total from hh_order where shop_id=?',[$shop_id]);
            $shopper_info[0]->ordernum=$ordernum[0]->total;
            $shop_info[0]->shopper_info=$shopper_info[0];
            $score=DB::select('select projectquality,serviceattitude,overallmerit from hh_score where shop_id=?',[$shop_id]);
            if($score){
                $shop_info[0]->shop_score=$score[0];
            }else{
                $shop_info[0]->shop_score=array("projectquality"=>10.0,
                                             "serviceattitude"=>10.0,
                                              "overallmerit"=>10.0
                                                 );
            }

            $arr = array("code" => "000",
                "data"=>$shop_info[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg"=>"该店铺不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}