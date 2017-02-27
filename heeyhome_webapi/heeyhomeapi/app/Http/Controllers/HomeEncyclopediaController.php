<?php
/**
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/11/1
 * Time: 14:38
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class HomeEncyclopediaController extends Controller
{
    public function showcate(){
        $callback=rq('callback');
        $cates = DB::select('select id,cate_name,cate_describe from hh_jzbkcate order by sort asc ');
        //dd($cates);
        if($cates){
            $arr=array(
                "code"=>"000",
                "data"=>$cates
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function showarticle(){
        $callback=rq('callback');
        $cate_id=rq('cate_id');
        if (!$cate_id) {
            $arr = array("code" => "112",
                "msg" => "cate_id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $total=DB::select('select count(id) as total from hh_jzbkarticle where cate_id=?',[$cate_id]);
        $total=$total[0]->total;
        $newpage=new PageController();
        $offset=$newpage->page($total);
        //dd($offset);
        $articles = DB::select('select id,article_title,article_content,img,add_time,scan from hh_jzbkarticle where cate_id=? order by sort asc limit ?,?',[$cate_id,$offset[0],$offset[1]]);
        $articles[0]->total=$total;
        //print_r($articles);
        if($articles){
            $arr=array(
                "code"=>"000",
                "data"=>$articles
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function info(){

        $callback=rq('callback');
        $article_id=rq('id');
        if (!$article_id) {
            $arr = array("code" => "112",
                "msg" => "id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $articles = DB::select('select id,article_title,article_content,scan from hh_jzbkarticle where id=?',[$article_id]);
        if($articles){
            $arr=array(
                "code"=>"000",
                "data"=>$articles[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function scan(){
        $callback=rq('callback');
        $article_id=rq('id');
        $update=DB::UPDATE('update hh_jzbkarticle set scan=scan+1 where id=?',[$article_id]);
        $select=DB::select('select scan from hh_jzbkarticle where id=?',[$article_id]);
        if($select){
            $arr = array("code" => "000",
                "data" => $select[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}