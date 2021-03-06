<?php
/**
 * TODO 用户头像接口
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/19
 * Time: 12:57
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class PortraitController extends Controller
{
    public function index()
    {
        $callback=rq('callback');
        $user_id=rq('user_id');
        if(!$user_id){
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查用户是否存在*/
        $personal =DB::select('select portrait_img from hh_portrait where portrait_userid=?',[$user_id]);
        if (!$personal) {
            $arr = array("code" => "114",
                "msg" => "用户不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "000",
                "data"=> array(
                    "user_id"=>$user_id,
                    "user_img"=>$personal[0]->portrait_img
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function fileupload(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $file=Request::file('myfile');
        if(!$user_id){
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
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
            /*上传图片大小不能超过2M*/
            if($size>4*1024*1024) {
                $arr = array("code" => "123",
                    "msg" => "图片上传出错,不能大于4M"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
            $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
            if($is){
                $path='api/public/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                $update=DB::update('update hh_portrait set portrait_img=? where portrait_userid=?',[$path,$user_id]);
                $arr = array("code" => "000",
                    "msg" => "上传成功",
                    "data"=>array(
                        "user_id"=>$user_id,
                        "path"=>$path
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
            $arr = array("code" => "122",
                "msg" => "图片上传出错"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}