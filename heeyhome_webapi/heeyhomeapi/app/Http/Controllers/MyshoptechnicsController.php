<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/25
 * Time: 16:54
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;


class MyshoptechnicsController extends  Controller
{
    public function index(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
        $technics=DB::select('select id,technics_text,technics_img from hh_shop_technics where shop_id=? order by id desc',[$shop_id]);
        if($technics){
            $arr = array("code" => "000",
                "data" => $technics
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "117",
                "msg" => "信息不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function add(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
        $technics_text=rq('describe');
        $file=Request::file('myfile');
        if(!$shop_id){
            $arr = array("code" => "112",
                "msg" => "店铺id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if(!Request::hasFile('myfile')){
            $arr = array("code" => "121",
                "msg" => "没有图片被上传"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if($file->isValid()){
            /*文件是否上成功*/
            $clientName = $file -> getClientOriginalName();//文件原名
            $entension = $file -> getClientOriginalExtension();//扩展名
            $realPath = $file->getRealPath();   //临时文件的绝对路径
            $type = $file->getClientMimeType();
            $size=$file-> getClientSize();
            //dd($size);
            $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
            /*上传图片大小不能超过4M*/
            if($size>4*1024*1024) {
                $arr = array("code" => "122",
                    "msg" => "图片上传出错,不能大于4M"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
            $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
            if($is){
                $path=public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                $insert=DB::insert('insert into hh_shop_technics(shop_id,technics_text,technics_img) values (?,?,?)',[$shop_id,$technics_text,$path]);
                if($insert){
                    $shop_technics=DB::select('select technics_text,technics_img from hh_shop_technics where shop_id=?',$shop_id);
                    $arr = array("code" => "000",
                        "msg" => "添加成功",
                        "data"=>$shop_technics
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array("code" => "111",
                        "msg" => "添加失败",
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }else{
                $arr = array("code" => "111",
                    "msg" => "上传失败"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }else{
            $arr = array("code" => "122",
                "msg" => "图片上传出错"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function del(){
        $callback=rq('callback');
        $technic_id=rq('id');
        $del=DB::delete('delete from hh_shop_technics where id=?',$technic_id);
        if($del){
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