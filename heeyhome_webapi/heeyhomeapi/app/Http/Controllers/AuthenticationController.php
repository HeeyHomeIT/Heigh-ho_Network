<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/30
 * Time: 16:59
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class AuthenticationController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $sel=DB::select('select real_name,idcardno,facephoto,backphoto,isverify from hh_realname where real_userid=?',[$user_id]);
        if($sel){
            if($sel[0]->isverify==0){
                $arr = array("code" => "130",
                    "msg" => "正在审核中"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }else{
                $arr = array("code" => "000",
                    "data" => $sel[0]
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }else{
            $arr = array("code" => "131",
                "msg" => "身份尚未认证"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //return view('img');
    }
    public function cardverify()
    {
        $callback = rq('callback');
        $user_id = rq('user_id');
        $name = rq('name');
        $idcard = rq('idcardno');
        $file=Request::file('face');
        $file2=Request::file('back');
        if(!$user_id){
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if($file->isValid()&&$file2->isValid()){
            /*文件是否上成功*/
            $clientName = $file -> getClientOriginalName();//文件原名
            $entension = $file -> getClientOriginalExtension();//扩展名
            $realPath = $file->getRealPath();   //临时文件的绝对路径
            $type = $file->getClientMimeType();
            $size=$file-> getClientSize();
            $clientName2 = $file2 -> getClientOriginalName();//文件原名
            $entension2 = $file2 -> getClientOriginalExtension();//扩展名
            $realPath2 = $file2->getRealPath();   //临时文件的绝对路径
            $type2 = $file2->getClientMimeType();
            $size2=$file2-> getClientSize();
            //dd($size);
            $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
            $filename2=date('Ymd').md5(rand(999,10000)).'.'.$entension;
            $is = $file -> move(base_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
            $is2 = $file2 -> move(base_path().'/uploads/'.substr($filename2,0,4).'-'.substr($filename2,4,2).'-'.substr($filename2,6,2),$filename2);
            if($is&&$is2){
                /*拼接路径将信息写入数据库*/
                $path=base_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                $path2=base_path().'/uploads/'.substr($filename2,0,4).'-'.substr($filename2,4,2).'-'.substr($filename2,6,2).'/'.$filename2;
                $insert=DB::insert('insert into hh_realname(real_userid,real_name,idcardno,facephoto,backphoto) values(?,?,?,?,?)',[$user_id,$name,$idcard,$path,$path2]);
                $arr = array("code" => "000",
                    "msg" => "上传成功",
                    "data"=>array(
                        "user_id"=>$user_id,
                        "real_name"=>$name,
                        "idcardno"=>$idcard,
                        "facephoto"=>$path,
                        "backphoto"=>$path2
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