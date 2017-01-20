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
        $technics=DB::select('select id,technics_id,technics_text from hh_shop_technics where shop_id=? order by id desc',[$shop_id]);
        foreach($technics as $key=>$val){
            $imgs=DB::select('select img_id,technics_img from hh_technics_img where technics_id=? order by img_id desc',[$val->technics_id]);
            $technics[$key]->technics_img=$imgs;
        }
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
        $technics_id=rand_number(6);
        $count = rq('count');
        $files = array();
        if ($count) {
            for ($i=0; $i < $count; $i++) { 
                $fileName = "myfile".$i;
                if(!Request::hasFile($fileName)){
                $arr = array("code" => "121",
                    "msg" => "没有图片被上传"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
                $files[$i] = Request::file($fileName);
            }
        } else {
            $myfile=Request::file('myfile');

            if(!Request::hasFile('myfile')){
                $arr = array("code" => "121",
                    "msg" => "没有图片被上传"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }

            if (! is_array($myfile)) {
                $files = [$myfile];
            } else {
                $files = $myfile;
            }
        }
        //dd($files);
        if(!$shop_id){
            $arr = array("code" => "112",
                "msg" => "店铺id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        
        $isvalid=true;
        foreach($files as $file){
            if(!$file->isValid()){
                $isvalid=false;
            }
        }
        //dd($isvalid);
        if($isvalid){
            //dd($files);
            $case=DB::insert('insert into hh_shop_technics(technics_id,technics_text,shop_id) values(?,?,?)',[$technics_id,$technics_text,$shop_id]);
            $ifinsert=false;
            foreach($files as $key=>$file){
                $clientName = $file -> getClientOriginalName();//文件原名
                $entension = $file -> getClientOriginalExtension();//扩展名
                $realPath = $file->getRealPath();   //临时文件的绝对路径
                $type = $file->getClientMimeType();
                $size=$file-> getClientSize();
                $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
                $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
                if($is){
                    $path='api/public/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                    $insert=DB::insert('insert into hh_technics_img(technics_id,technics_img) values (?,?)',[$technics_id,$path]);
                    if($insert){
                        $ifinsert=true;
                    }else{
                        $ifinsert=false;
                    }
                }else{
                    $arr = array("code" => "131",
                        "msg" => "上传失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }
            if($ifinsert){
                $arr = array("code" => "000",
                    "msg" => "添加成功"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }else{
                $arr = array("code" => "111",
                    "msg" => "添加失败"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
    }else{
            $arr = array("code" => "132",
                "msg" => "上传的文件无效"
            );
            return $callback . "(" . HHJson($arr) . ")";
         }
    }


    public function del(){
        $callback=rq('callback');
        $technics_id=rq('technics_id');
        $del=DB::delete('delete from hh_shop_technics where technics_id=?',[$technics_id]);
        if($del){
            $delimgs=DB::delete('delete from hh_technics_img where technics_id=?',[$technics_id]);
            $arr = array("code" => "000",
                "msg" => "删除成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        else{
            $arr = array("code" => "111",
                "msg" => "删除失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function edit(){
        $callback=rq('callback');
        $technics_text=rq('describe');
        $technics_id=rq('technics_id');
        $imgs_id=rq('img_id');
        if($imgs_id)
            foreach ($imgs_id as $key => $val) {
                DB::delete('delete from hh_technics_img where img_id=?', [$val]);
            }
        $count = rq('count');
        $files = array();
        if ($count) {
            for ($i=0; $i < $count; $i++) {
                $fileName = "myfile".$i;
                if(!Request::hasFile($fileName)){
                    $arr = array("code" => "121",
                        "msg" => "没有图片被上传"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                $files[$i] = Request::file($fileName);
            }
            $isvalid=true;
            foreach($files as $file){
                if(!$file->isValid()){
                    $isvalid=false;
                }
            }
            if($isvalid){
                $ifinsert=false;
                foreach($files as $key=>$file){
                    $clientName = $file -> getClientOriginalName();//文件原名
                    $entension = $file -> getClientOriginalExtension();//扩展名
                    $realPath = $file->getRealPath();   //临时文件的绝对路径
                    $type = $file->getClientMimeType();
                    $size=$file-> getClientSize();
                    $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
                    $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
                    if($is){
                        $path='api/public/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                        $insert=DB::insert('insert into hh_technics_img(technics_id,technics_img) values (?,?)',[$technics_id,$path]);
                        if($insert){
                            $ifinsert=true;
                        }else{
                            $ifinsert=false;
                        }
                    }else{
                        $arr = array("code" => "131",
                            "msg" => "图片上传失败"
                        );
                        return $callback . "(" . HHJson($arr) . ")";
                    }
                }
            }else{
                $arr = array("code" => "132",
                    "msg" => "上传的图片无效"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
        DB::UPDATE('update hh_shop_technics set technics_text=? where technics_id=?',[$technics_text,$technics_id]);
        $arr = array("code" => "000",
            "msg" => "修改成功"
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
}