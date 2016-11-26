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
    public function gettags(){
        $callback=rq('callback');
        $serviceareas=DB::select('select servicearea from hh_servicearea');
        $workernum=DB::select('select flag,workernum from hh_shop_workernum');
        $servicetags=DB::select('select stylename from hh_shop_style');
        $shoptime=DB::select('select shop_time from hh_shop_time');
        $arr = array("code" => "000",
            "data" => array(
                "servicearea"=>$serviceareas,
                "workernum"=>$workernum,
                "servicetag"=>$servicetags,
            )
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function index(){
        $callback=rq('callback');
        $servicearea=rq('servicearea');
        $workernum=rq('workernum');
        $servicetag=rq('servicetag');
        $where='';
        $para=array(1);
        if($servicearea) {
            $where.='and find_in_set(?,servicearea)';
            $para[]=$servicearea;
        }
        if($servicetag){
            $where.='and find_in_set(?,servicetag)';
            $para[]=$servicetag;
        }
        if($workernum){
            switch ($workernum){
                case 'a':
                    $where.='and shop_workernum<?';
                    $para[]=4;
                    break;
                case 'b':
                    $where.='and shop_workernum<=? and shop_workernum>=?';
                    $para[]=6;
                    $para[]=4;
                    break;
                case 'c':
                    $where.='and shop_workernum<=? and shop_workernum>=?';
                    $para[]=10;
                    $para[]=7;
                    break;
                case 'd':
                    $where='and shop_workernum>?';
                    $para[]=10;
                    break;
            }
        }
        $select=DB::select('select * from hh_shop where shop_status=? '.$where,$para);
        if($select){
            foreach($select as $key=>$value){
                $select[$key]->servicetag=explode(',',$value->servicetag);
                $select[$key]->servicearea=explode(',',$value->servicearea);
                $img=DB::select('select shop_img from hh_shop_img where shop_id=? and is_face=?',[$value->shop_id,1]);
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