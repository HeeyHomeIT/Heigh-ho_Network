<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/15
 * Time: 13:22
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class CollectshopController extends Controller
{
    public function collect(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $shop_id=rq('shop_id');
        $time=date("Y-m-d H:i:s", time());
        $insert=DB::insert('insert into hh_collection(collect_userid,iscollected_id,collect_time,collect_type) values (?,?,?,?)',[$user_id,$shop_id,$time,'shop']);
        if($insert){
            $arr = array("code" => "000",
                "msg" => "收藏成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg" => "收藏失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function index(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $total=DB::select('select count(id) as total from hh_collection where collect_userid=? and collect_type=?',[$user_id,'shop']);
        $total=$total[0]->total;
        $newpage=new PageController();
        $offset=$newpage->page($total);
        /*收藏表和店铺表两表联查*/
        $select=DB::select('select hh_collection.*,hh_shop.* from hh_collection 
                    left join hh_shop on hh_collection.iscollected_id=hh_shop.shop_id where collect_userid=? and collect_type=? order by collect_time desc limit ?,?',[$user_id,'shop',$offset[0],$offset[1]]);
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