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
        $servicearea=explode(',',$tags[0]->sel_area);
        array_unshift($servicearea,'服务区域');
        $workernum=explode(',',$tags[0]->sel_worker_num);
        array_unshift($workernum,'工人数量');
        $servicetag=explode(',',$tags[0]->sel_style);
        array_unshift($servicetag,'擅长风格');
        $shopage=explode(',',$tags[0]->sel_shop_age);
        array_unshift($shopage,'店铺年限');
        $arr = array("code" => "000",
            "data" => array(
                "servicearea"=>$servicearea,
                "workernum"=>$workernum,
                "servicetag"=>$servicetag,
                "shopage"=>$shopage
            )
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function index(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $servicearea=rq('servicearea');
        $workernum=rq('workernum');
        $servicetag=rq('servicetag');
        $shopage=rq('shopage');
        $order=rq('order');
        $where='';
        $para=array(1);
        if(($servicearea!=0)&&($servicearea!=1)) {
            $servicearea=$servicearea-1;
            $tags=DB::select('select sel_area from hh_shop_selectcondition ');
            $tags[0]=explode(',',$tags[0]->sel_area);
            $servicearea=$tags[0][$servicearea];
            $where.=' and find_in_set(?,servicearea)';
            $para[]=$servicearea;
        }
        if(($servicetag!=0)&&($servicetag!=1)){
            $servicetag=$servicetag-1;
            $tags=DB::select('select sel_style from hh_shop_selectcondition ');
            $tags[0]=explode(',',$tags[0]->sel_style);
            $servicetag=$tags[0][$servicetag];
                //dd($servicetag);
                $where .= ' and find_in_set(?,servicetag)';
                $para[] = $servicetag;
        }
        if($workernum){
            switch ($workernum){
                case '2':
                    $where.=' and shop_workernum<?';
                    $para[]=4;
                    break;
                case '3':
                    $where.=' and shop_workernum<=? and shop_workernum>=?';
                    $para[]=6;
                    $para[]=4;
                    break;
                case '4':
                    $where.=' and shop_workernum<=? and shop_workernum>=?';
                    $para[]=10;
                    $para[]=7;
                    break;
                case '5':
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
                case '2':
                    $where.=' and opentime<=? and opentime>=?';
                    $para[]=date("Y-m-d", strtotime("-1 year"));
                    $para[]=date("Y-m-d", strtotime("-2 year"));
                    break;
                case '3':
                    $where.=' and opentime<=? and opentime>=?';
                    $para[]=date("Y-m-d", strtotime("-3 year"));
                    $para[]=date("Y-m-d", strtotime("-5 year"));
                    break;
                case '4':
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
                    $order=' order by id desc';
                    break;
                case '1':
                    $order=' order by shop_volume desc';
                    break;
                case '2':
                    $order=' order by shop_point desc';
                    break;
                default:
                    $order=' order by id desc';
                    break;
            }
        }else{
                  $order=' order by id desc';
        }
        $total=DB::select('select count(id) as total from hh_shop where shop_status=? '.$where,$para);
        $total=$total[0]->total;
        $newpage=new PageController();
        $offset=$newpage->page($total);
        $limit=' limit '.$offset[0].','.$offset[1];
        $select=DB::select('select * from hh_shop where shop_status=? '.$where.$order.$limit,$para);
        if($select){
            foreach($select as $key=>$value){
                $select[$key]->servicetag=explode(',',$value->servicetag);
                $select[$key]->servicearea=explode(',',$value->servicearea);
                $authentication=explode(',',$value->authentication);
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
                $select[$key]->authentication=$authentication;
                $select[$key]->total=$total;
                $img=DB::select('select shop_img from hh_shop_img where shop_id=? and is_face=?',[$value->shop_id,1]);
                if($img){
                    $select[$key]->shop_img=$img[0]->shop_img;
                }else{
                    $select[$key]->shop_img=null;
                }
                $sel=DB::select('select id from hh_collection where collect_userid=? and iscollected_id=?',[$user_id,$value->shop_id]);
                if($sel){
                    $select[$key]->iscollected=1;
                }else{
                    $select[$key]->iscollected=0;
                }
                $score=DB::select('select projectquality,serviceattitude,overallmerit from hh_score where shop_id=?',[$value->shop_id]);
                if($score){
                    $select[$key]->shop_score=$score[0];
                }else{
                    $select[$key]->shop_score=array("projectquality"=>10.0,
                        "serviceattitude"=>10.0,
                        "overallmerit"=>10.0
                    );
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