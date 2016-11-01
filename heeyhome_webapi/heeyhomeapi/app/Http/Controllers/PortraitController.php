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
        $personal =DB::select('select userinfo_userid from hh_userinfo where userinfo_userid=?',[$user_id]);
        if (!$personal) {
            $arr = array("code" => "114",
                "msg" => "用户不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $userinfo_img='/app/storage/uploads/'.substr($personal[0]->userinfo_img,0,4).'-'.substr($personal[0]->userinfo_img,4,2).'-'.substr($personal[0]->userinfo_img,6,2).'/'.$personal[0]->userinfo_img;
            $arr = array("code" => "000",
                "data"=> array(
                    "user_id"=>$user_id,
                    "user_img"=>$userinfo_img

                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }

        //return view('img');

    }
//    public function upload(){
//        $callback=rq('callback');
//        $user_id=rq('user_id');
//        $img=rq('img');
//        if(!$user_id){
//            $arr = array("code" => "112",
//                "msg" => "用户id不能为空"
//            );
//            return $callback . "(" . HHJson($arr) . ")";
//        }
//        if(!$img){
//            $arr = array("code" => "121",
//                "msg" => "没有图片被上传"
//            );
//            return $callback . "(" . HHJson($arr) . ")";
//        }
//        $file_name = base64_decode($img);
//        $upfile= date('Ymd').md5(rand(999,10000)).'.jpg';
//        $uppath='/app/storage/uploads/'.substr($upfile,0,4).'-'.substr($upfile,4,2).'-'.substr($upfile,6,2).'/'.$upfile;
//        $data=$file_name;
//        $newfile=fopen($uppath,"w");
//        if($newfile){
//            fwrite($newfile,$data);
//            fclose($newfile);
//        }
//    }

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
            if($size>2*1024*1024) {
                $arr = array("code" => "122",
                    "msg" => "图片上传出错,不能大于2M"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
            $is = $file -> move(app_path().'/storage/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
            if($is){
                $update=DB::update('update hh_userinfo set userinfo_img=? where userinfo_userid=?',[$filename,$user_id]);
                $path='/app/storage/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
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