<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/14
 * Time: 17:00
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class CollectimgController extends Controller
{
    public function collect(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $panorama_id=rq('panorama_id');
        $sel=DB::select('select id from hh_collection where collect_userid=? and iscollected_id=?',[$user_id,$panorama_id]);
        if($sel){
            $arr = array("code" => "135",
                "msg" => "已经收藏过"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else {
            $time = date("Y-m-d H:i:s", time());
            $insert = DB::insert('insert into hh_collection(collect_userid,iscollected_id,collect_time,collect_type) values (?,?,?,?)', [$user_id, $panorama_id, $time, 'panorama']);
            if ($insert) {
                $update = DB::update('update hh_panorama set collect_num=collect_num+1 where panorama_id=?', [$panorama_id]);
                $arr = array("code" => "000",
                    "msg" => "收藏成功"
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array("code" => "111",
                    "msg" => "收藏失败"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
    }
    public function index(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $total=DB::select('select count(id) as total from hh_collection where collect_userid=? and collect_type=?',[$user_id,'panorama']);
        $total=$total[0]->total;
        $newpage=new PageController();
        $offset=$newpage->page($total);
        /*收藏表和全景图表两表联查*/
        $select=DB::select('select hh_collection.*,hh_panorama.panorama_img as panorama_img,hh_panorama.panorama_url as url from hh_collection 
                    left join hh_panorama on hh_collection.iscollected_id=hh_panorama.panorama_id where collect_userid=? and collect_type=? order by collect_time desc limit ?,?',[$user_id,'panorama',$offset[0],$offset[1]]);
        foreach($select as $key=>$val){
            $select[$key]->total=$total;
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
    public function del(){
        $callback=rq('callback');
        $panorama_id=rq('panorama_id');
        $del=DB::delete('delete from hh_collection where iscollected_id=?',[$panorama_id]);
        if($del){
            $update = DB::update('update hh_panorama set collect_num=collect_num-1 where panorama_id=?', [$panorama_id]);
            $arr = array("code" => "000",
                "msg" => "删除成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "117",
                "msg" => "删除失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}