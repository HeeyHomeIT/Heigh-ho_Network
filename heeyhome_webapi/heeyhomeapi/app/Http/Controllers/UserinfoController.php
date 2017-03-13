<?php
/**
 * TODO 用户信息接口
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/19
 * Time: 9:53
 */

namespace App\Http\Controllers;


use App\Personal;
use Illuminate\Support\Facades\DB;

class UserinfoController extends Controller
{
    public function index(){
        //dd(session('user_id'));
        $callback=rq('callback');
            $user_id=rq('user_id');
            if(!$user_id){
                $arr = array("code" => "112",
                    "msg" => "用户id不能为空"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        /*检查用户是否存在*/
        $userinfo=DB::select('select * from hh_userinfo where userinfo_userid=?',[$user_id]);
        if (!$userinfo) {
            $arr = array("code" => "114",
                "msg" => "用户不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $user=DB::select('select user_name,user_phone,user_email from hh_user where user_id=?',[$user_id]);
            if($user){
                $userinfo[0]->user_name=$user[0]->user_name;
                $userinfo[0]->userinfo_phone=$user[0]->user_phone;
                $userinfo[0]->userinfo_email=$user[0]->user_email;
                if($user[0]->user_name==$user[0]->user_phone) $userinfo[0]->isedit=1;
                else  $userinfo[0]->isedit=2;
                $arr = array("code" => "000",
                    "data"=> $userinfo[0]
                );
                return $callback . "(" . HHJson($arr) . ")";
            }else{
                $arr = array("code" => "114",
                    "msg" => "用户不存在"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
    }
    public function edit()
    {
        $callback = rq('callback');
        $user_id = rq('user_id');
        if (!$user_id) {
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $personal=new Personal();
        $personal=$personal->find($user_id);
        if(!$personal){
            $arr = array("code" => "114",
                "msg" => "用户不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $user_name=rq('name');
        if($user_name) $update=DB::update('update hh_user set user_name=? where user_id=?',[$user_name,$user_id]);
        $userinfo_nickname=rq('nickname');
        $userinfo_realname=rq('realname');
        $userinfo_sex=rq('sex');
        $userinfo_age=rq('age');
        $loc_province=rq('loc_province');
        $loc_city=rq('loc_city');
        $loc_district=rq('loc_district');
        $loc_address=rq('loc_address');
        $home_province=rq('home_province');
        $home_city=rq('home_city');
        $home_district=rq('home_district');
        if($userinfo_nickname) $personal->userinfo_nickname=$userinfo_nickname;
        if($userinfo_realname) $personal->userinfo_realname=$userinfo_realname;
        if($userinfo_sex) $personal->userinfo_sex=$userinfo_sex;
        if($userinfo_age) $personal->userinfo_age=$userinfo_age;
        if($loc_province) $personal->loc_province=$loc_province;
        if($loc_city) $personal->loc_city=$loc_city;
        if($loc_district) $personal->loc_district=$loc_district;
        if($loc_address) $personal->loc_address=$loc_address;
        if($home_province) $personal->home_province=$home_province;
        if($home_city) $personal->home_city=$home_city;
        if($home_district) $personal->home_district=$home_district;
        $personal->save();
            $arr = array("code" => "000",
                "msg" => "保存成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
    }

    public function userCollectionNumber () 
    {
        $callback=rq('callback');
        $user_id=rq('user_id');
        if(!$user_id){
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $vr = DB::select('select count(id) as vrCount from hh_collection where collect_userid=? and collect_type=?',[$user_id,'panorama']);
        $shop = DB::select('select count(id) as shopCount from hh_collection where collect_userid=? and collect_type=?',[$user_id,'shop']);
        $cost = DB::select('SELECT COUNT(id) AS costCount FROM hh_calculator_results WHERE user_id = ? AND isdel=?',[$user_id,0]);

        $arr = array("code" => "000",
                "data" => array("vr"=>$vr[0]->vrCount,"cost"=>$cost[0]->costCount,"shop"=>$shop[0]->shopCount)
            );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function suggest(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $content=rq('content');
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
        $isvalid=true;
        foreach($files as $file){
            if(!$file->isValid()){
                $isvalid=false;
            }
        }
        if($isvalid) {
            $case = DB::insert('insert into hh_suggestions(user_id,text) values(?,?)', [$user_id, $content]);
            if ($case) {
                $case_sel = DB::select('select id from hh_suggestion where user_id=? and text=?', [$user_id, $content]);
                $ifinsert = false;
                foreach ($files as $key => $file) {
                    $clientName = $file->getClientOriginalName();//文件原名
                    $entension = $file->getClientOriginalExtension();//扩展名
                    $realPath = $file->getRealPath();   //临时文件的绝对路径
                    $type = $file->getClientMimeType();
                    $size = $file->getClientSize();
                    $filename = date('Ymd') . md5(rand(999, 10000)) . '.' . $entension;
                    $is = $file->move(public_path() . '/uploads/' . substr($filename, 0, 4) . '-' . substr($filename, 4, 2) . '-' . substr($filename, 6, 2), $filename);
                    if ($is) {
                        $path = 'api/public/uploads/' . substr($filename, 0, 4) . '-' . substr($filename, 4, 2) . '-' . substr($filename, 6, 2) . '/' . $filename;
                        $insert = DB::insert('insert into hh_suggestions_img(suggestions_id,img) values (?,?)', [$case_sel[0]->id, $path]);
                        if ($insert) {
                            $ifinsert = true;
                        } else {
                            $ifinsert = false;
                        }
                    } else {
                        $arr = array("code" => "131",
                            "msg" => "上传失败"
                        );
                        return $callback . "(" . HHJson($arr) . ")";
                    }
                }
                if ($ifinsert) {
                    $arr = array("code" => "000",
                        "msg" => "提交成功"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array("code" => "111",
                        "msg" => "提交失败，请稍后重试"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }else {
                $arr = array("code" => "111",
                    "msg" => "提交失败，请稍后重试"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }else {
                $arr = array("code" => "132",
                    "msg" => "上传的文件无效"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
    }
}