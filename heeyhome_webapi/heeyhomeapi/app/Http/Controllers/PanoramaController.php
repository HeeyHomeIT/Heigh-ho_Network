<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/3
 * Time: 18:17
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class PanoramaController extends Controller
{
    public function gettags(){
        $callback=rq('callback');
        $tags=DB::select('select * from hh_panorama_selectcondition');
        $area=explode(',',$tags[0]->sel_area);
        array_unshift($area,'建筑面积');
        $housetype=explode(',',$tags[0]->sel_housetype);
        array_unshift($housetype,'户型');
        $servicearea=explode(',',$tags[0]->sel_style);
        array_unshift($servicearea,'装修风格');
        $arr = array("code" => "000",
            "data" => array(
                "area"=>$area,
                "housetype"=>$housetype,
                "servicetag"=>$servicearea
            )
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function index(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $area=rq('area');
        $housetype=rq('housetype');
        $servicetag=rq('servicetag');
        $order=rq('order');
        $where='';
        $para=array(1);
        if($area) {
            switch ($area) {
                case '2':
                    $where .= ' and panorama_area<?';
                    $para[] = 100;
                    break;
                case '3':
                    $where .= ' and panorama_area<=? and panorama_area>=?';
                    $para[] = 120;
                    $para[] = 100;
                    break;
                case '4':
                    $where .= ' and panorama_area<=? and panorama_area>=?';
                    $para[] = 150;
                    $para[] = 120;
                    break;
                default:
                    $where .= "";
                    break;
            }
        }
        if(($housetype!=1)&&($housetype!=0)){
            $housetype=$housetype-1;
            $tags=DB::select('select sel_housetype from hh_panorama_selectcondition ');
            $tags[0]=explode(',',$tags[0]->sel_housetype);
            $panorama_housetype=$tags[0][$housetype];
            //dd($servicetag);
            $where .= ' and find_in_set(?,panorama_housetype)';
            $para[] = $panorama_housetype;
        }
        if(($servicetag!=1)&&($servicetag!=0)){
            $servicetag=$servicetag-1;
            $tags=DB::select('select sel_style from hh_panorama_selectcondition ');
            $tags[0]=explode(',',$tags[0]->sel_style);
            $panorama_style=$tags[0][$servicetag];
            $where .= ' and find_in_set(?,panorama_style)';
            $para[] = $panorama_style;
        }
        if($order){
            switch ($order){
                case '0':
                    $order=' order by panorama_id desc';
                    break;
                case '1':
                    $order=' order by scan_num desc';
                    break;
                case '2':
                    $order=' order by like_num desc';
                    break;
                case '3':
                    $order=' order by collect_num desc';
                    break;
                default:
                    $order=' order by panorama_id desc';
                    break;
            }
        }else{
            $order=' order by panorama_id desc';
        }
        $total=DB::select('select count(panorama_id) as total from hh_panorama where panorama_status=? '.$where,$para);
        $total=$total[0]->total;
        $newpage=new PageController();
        $offset=$newpage->page($total);
        $limit=' limit '.$offset[0].','.$offset[1];
        $select=DB::select('select * from hh_panorama where panorama_status=? '.$where.$order.$limit,$para);
        foreach($select as $key=>$val){
            $select[$key]->total=$total;
            $sel=DB::select('select id from hh_collection where collect_userid=? and iscollected_id=?',[$user_id,$val->panorama_id]);
            if($sel){
                $select[$key]->iscollected=1;
            }else{
                $select[$key]->iscollected=0;
            }
        }
        if($select){
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
    public function like(){
        $callback=rq('callback');
        $panorama_id=rq('panorama_id');
        $update=DB::UPDATE('update hh_panorama set like_num=like_num+1 where panorama_id=?',[$panorama_id]);
        $select=DB::select('select like_num from hh_panorama where panorama_id=?',[$panorama_id]);
        if($select){
            $arr = array("code" => "000",
                "data" => $select[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function scan(){
        $callback=rq('callback');
        $panorama_id=rq('panorama_id');
        $update=DB::UPDATE('update hh_panorama set scan_num=scan_num+1 where panorama_id=?',[$panorama_id]);
        $select=DB::select('select scan_num from hh_panorama where panorama_id=?',[$panorama_id]);
        if($select){
            $arr = array("code" => "000",
                "data" => $select[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    public function recommand() {
        $callback=rq('callback');
        $vrArr = array();

        $select= DB::select('select * from hh_panorama where panorama_status= 1 and panorama_area< 100 order by collect_num desc limit 2 ');
        array_push($vrArr, $select[0]);

        $select2=DB::select('select * from hh_panorama where panorama_status= 1 and panorama_area<=120 and panorama_area>=100 order by collect_num desc limit 2');
        array_push($vrArr, $select2[0]);

        $select3=DB::select('select * from hh_panorama where panorama_status= 1 and panorama_area<=150 and panorama_area>=120 order by collect_num desc limit 2');
        array_push($vrArr, $select3[0]);

        $arr = array("code" => "000",
                "data" => $vrArr
            );
            return $callback . "(" . HHJson($arr) . ")";
    }
}