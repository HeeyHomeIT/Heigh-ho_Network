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
        $arr = array("code" => "000",
            "data" => array(
                "area"=>explode(',',$tags[0]->sel_area),
                "housetype"=>explode(',',$tags[0]->sel_housetype),
                "servicetag"=>explode(',',$tags[0]->sel_style)
            )
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function index(){
        $callback=rq('callback');
        $area=rq('area');
        $housetype=rq('housetype');
        $servicetag=rq('servicetag');
        $order=rq('order');
        $where='';
        $para=array(1);
        if($area) {
            switch ($area) {
                case '1':
                    $where .= ' and panorama_area<?';
                    $para[] = 100;
                    break;
                case '2':
                    $where .= ' and panorama_area<=? and panorama_area>=?';
                    $para[] = 120;
                    $para[] = 100;
                    break;
                case '3':
                    $where .= ' and panorama_area<=? and panorama_area>=?';
                    $para[] = 150;
                    $para[] = 120;
                    break;
                default:
                    $where .= "";
                    break;
            }
        }
        if($housetype!=0){
            $tags=DB::select('select sel_housetype from hh_panorama_selectcondition ');
            $tags[0]=explode(',',$tags[0]->sel_housetype);
            $panorama_housetype=$tags[0][$housetype];
            //dd($servicetag);
            $where .= ' and find_in_set(?,panorama_housetype)';
            $para[] = $panorama_housetype;
        }
        if($servicetag!=0){
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
}