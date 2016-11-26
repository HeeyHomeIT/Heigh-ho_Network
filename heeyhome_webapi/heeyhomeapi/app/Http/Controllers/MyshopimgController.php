<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/15
 * Time: 14:51
 */

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class MyshopimgController extends Controller
{
    public function upload(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
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
            $is = $file -> move(base_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
            if($is){
                $path=base_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                $insert=DB::insert('insert into hh_shop_img(shop_id,shop_img) values (?,?)',[$shop_id,$path]);
                if($insert){
                    $shop_imgs=DB::select('select shop_img from hh_shop_img where shop_id=?',$shop_id);
                    $arr = array("code" => "000",
                        "msg" => "上传成功",
                        "data"=>array(
                            "shop_id"=>$shop_id,
                            "shop_imgs"=>$shop_imgs
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array("code" => "111",
                        "msg" => "上传失败"
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
    public function setface(){
        $callback=rq('callback');
        $img_id=rq('img_id');
        $shop_id=rq('shop_id');
        if (!$shop_id) {
            $arr = array("code" => "112",
                "msg" => "id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*将该店铺id下的所有图片的is_face字段设置为2*/
        $update=DB::update('update hh_shop_img set is_face=2 where shop_id=?',[$shop_id]);
        /*将传递过来的图片id的is_face字段设置为1*/
        $set=DB::update('update hh_shop_img set is_face=1 where id=?',[$img_id]);
        if($set){
            $img=DB::select('select shop_img from hh_shop_img where id=?',[$img_id]);
            $img_path=$img[0]->shop_img;
            $arr = array("code" => "000",
                "data" => array(
                    "img_id"=>$img_id,
                    "img_path"=>$img_path
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg" => "失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function del(){
        $callback=rq('callback');
        $img_id=rq('img_id');
        if (!$img_id) {
            $arr = array("code" => "112",
                "msg" => "id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $address=DB::delete('delete from hh_shop_img where id=?',[$img_id]);
        if($address){
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