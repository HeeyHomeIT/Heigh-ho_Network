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
        $personal=DB::select('select hh_userinfo.*,A.content as cloc_province,B.content as cloc_city,C.content as cloc_district,D.content as chome_province,E.content as chome_city,F.content as chome_district from hh_userinfo 
                            left join hh_dictionary A on hh_userinfo.loc_province = A.dic_id
                            left join hh_dictionary B on hh_userinfo.loc_city = B.dic_id
                            left join hh_dictionary C on hh_userinfo.loc_district = C.dic_id 
                            left join hh_dictionary D on hh_userinfo.home_province = D.dic_id 
                            left join hh_dictionary E on hh_userinfo.home_city = E.dic_id 
                            left join hh_dictionary F on hh_userinfo.home_district = F.dic_id 
                            where userinfo_userid=?',[$user_id]);
            if (!$personal) {
                $arr = array("code" => "114",
                    "msg" => "用户不存在"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }else{
                /*拼接头像图片地址*/
                $personal[0]->userinfo_img='/app/storage/uploads/'.substr($personal[0]->userinfo_img,0,4).'-'.substr($personal[0]->userinfo_img,4,2).'-'.substr($personal[0]->userinfo_img,6,2).'/'.$personal[0]->userinfo_img;
                $arr = array("code" => "000",
                    "data"=> $personal[0]
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
    }
    public function edit()
    {
        $callback = rq('callback');
        $user_id = rq('user_id');
        $userinfo = new Personal();
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
                "msg" => "用户不存在",
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $userinfo_nickname=rq('nickname');
        $usrinfo_sex=rq('sex');
        $userinfo_age=rq('age');
        $userinfo_email=rq('email');
        $userinfo_tel=rq('tel');
        $loc_province=rq('loc_province');
        $loc_city=rq('loc_city');
        $loc_district=rq('loc_district');
        $loc_address=rq('loc_address');
        $home_province=rq('home_province');
        $home_city=rq('home_city');
        $home_district=rq('home_district');
        if($userinfo_nickname) $personal->userinfo_nickname=$userinfo_nickname;
        if($usrinfo_sex) $personal->userinfo_sex=$usrinfo_sex;
        if($userinfo_age) $personal->userinfo_age=$userinfo_age;
        if($userinfo_email) $personal->userinfo_email=$userinfo_email;
        if($userinfo_tel) $personal->userinfo_tel=$userinfo_tel;
        if($loc_province) $personal->loc_province=$loc_province;
        if($loc_city) $personal->loc_city=$loc_city;
        if($loc_district) $personal->loc_district=$loc_district;
        if($loc_address) $personal->loc_province=$loc_address;
        if($home_province) $personal->home_province=$home_province;
        if($home_city) $personal->home_city=$home_city;
        if($home_district) $personal->home_district=$home_district;
        if($personal->save()){
            $arr = array("code" => "000",
                "msg" => "保存成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg" => "保存失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}