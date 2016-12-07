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
        $tags=DB::select('select * from hh_shop_selectcondition');
        $arr = array("code" => "000",
            "data" => array(
                "servicearea"=>explode(',',$tags[0]->sel_area),
                "workernum"=>explode(',',$tags[0]->sel_worker_num),
                "servicetag"=>explode(',',$tags[0]->sel_style),
                "shopage"=>explode(',',$tags[0]->sel_shop_age)
            )
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function index(){
        $callback=rq('callback');
        $servicearea=rq('servicearea');
        $workernum=rq('workernum');
        $servicetag=rq('servicetag');
        $shopage=rq('shopage');
        $order=rq('order');
        $where='';
        $para=array(1);
        if($servicearea!=0) {
            $tags=DB::select('select sel_area from hh_shop_selectcondition ');
            $tags[0]=explode(',',$tags[0]->sel_area);
            $servicearea=$tags[0][$servicearea];
            $where.=' and find_in_set(?,servicearea)';
            $para[]=$servicearea;
        }
        if($servicetag!=0){
            $tags=DB::select('select sel_style from hh_shop_selectcondition ');
            $tags[0]=explode(',',$tags[0]->sel_style);
            $servicetag=$tags[0][$servicetag];
                //dd($servicetag);
                $where .= ' and find_in_set(?,servicetag)';
                $para[] = $servicetag;
        }
        if($workernum){
            switch ($workernum){
                case '1':
                    $where.=' and shop_workernum<?';
                    $para[]=4;
                    break;
                case '2':
                    $where.=' and shop_workernum<=? and shop_workernum>=?';
                    $para[]=6;
                    $para[]=4;
                    break;
                case '3':
                    $where.=' and shop_workernum<=? and shop_workernum>=?';
                    $para[]=10;
                    $para[]=7;
                    break;
                case '4':
                    $where=' and shop_workernum>?';
                    $para[]=10;
                    break;
                default:
                    $where.="";
                    break;
            }
        }
        if($shopage){
            switch ($shopage){
                case '1':
                    $where.=' and opentime<=? and opentime>=?';
                    $para[]=date("Y-m-d", strtotime("-1 year"));
                    $para[]=date("Y-m-d", strtotime("-2 year"));
                    break;
                case '2':
                    $where.=' and opentime<=? and opentime>=?';
                    $para[]=date("Y-m-d", strtotime("-3 year"));
                    $para[]=date("Y-m-d", strtotime("-5 year"));
                    break;
                case '3':
                    $where.=' and opentime<?';
                    $para[]=date("Y-m-d", strtotime("-5 year"));
                    break;
                default:
                    $where.="";
                    break;
            }
        }
        if($order){
            switch ($order){
                case '0':
                    $order='';
                    break;
                case '1':
                    $order=' order by shop_volume desc';
                    break;
                case '2':
                    $order=' order by shop_point desc';
                    break;
                default:
                    $order='';
                    break;
            }
        }
        $total=DB::select('select count(id) as total from hh_shop where shop_status=? '.$where.$order,$para);
        $total=$total[0]->total;
        $newpage=new PageController();
        $offset=$newpage->page($total);
        $limit=' limit '.$offset[0].','.$offset[1];
        $select=DB::select('select * from hh_shop where shop_status=? '.$where.$order.$limit,$para);
        if($select){
            foreach($select as $key=>$value){
                $select[$key]->servicetag=explode(',',$value->servicetag);
                $select[$key]->servicearea=explode(',',$value->servicearea);
                $select[$key]->authentication=explode(',',$value->authentication);
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