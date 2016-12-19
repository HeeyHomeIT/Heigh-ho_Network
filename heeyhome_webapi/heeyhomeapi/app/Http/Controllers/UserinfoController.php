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
            $user=DB::select('select user_phone,user_email from hh_user where user_id=?',[$user_id]);
            if($user){
                $userinfo[0]->userinfo_phone=$user[0]->user_phone;
                $userinfo[0]->userinfo_email=$user[0]->user_email;
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
            $userinfo=DB::select('select * from hh_userinfo where userinfo_userid=?',[$user_id]);
            $user=DB::select('select user_phone,user_email from hh_user where user_id=?',[$user_id]);
            $userinfo[0]->userinfo_name=$user[0]->user_name;
            $userinfo[0]->userinfo_phone=$user[0]->user_phone;
            $userinfo[0]->userinfo_email=$user[0]->user_email;
            $arr = array("code" => "000",
                "msg" => "保存成功",
                "data"=>$userinfo[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
    }
}