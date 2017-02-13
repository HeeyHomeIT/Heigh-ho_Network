<?php
/**
 * TODO 工长信息接口
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/19
 * Time: 9:53
 */

namespace App\Http\Controllers;


use App\Foreman;
use App\Personal;
use Illuminate\Support\Facades\DB;

class ForemaninfoController extends Controller
{
    public function index(){
        //dd(session('user_id'));
        $callback=rq('callback');
        $foreman_id=rq('foreman_id');
        if(!$foreman_id){
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查用户是否存在*/
        $userinfo=DB::select('select * from hh_foremaninfo where foremaninfo_userid=?',[$foreman_id]);
        if (!$userinfo) {
            $arr = array("code" => "114",
                "msg" => "用户不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $user=DB::select('select user_name,user_phone,user_email from hh_user where user_id=?',[$foreman_id]);
            $realname = DB::select('select real_name from hh_realname where real_userid=?',[$foreman_id]);
            if($user){
                if ($realname) {
                    $userinfo[0]->foremaninfo_realname = $realname[0]->real_name;
                }
                $userinfo[0]->foremaninfo_phone=$user[0]->user_phone;
                $userinfo[0]->foremaninfo_email=$user[0]->user_email;
                $userinfo[0]->user_name=$user[0]->user_name;
                if($user[0]->user_name==$user[0]->user_phone) $userinfo[0]->isedit=1;
                else  $userinfo[0]->isedit=2;
                $userinfo[0]->servicearea=explode(',',$userinfo[0]->servicearea);
                $userinfo[0]->experience=explode(',',$userinfo[0]->experience);
                $userinfo[0]->decoratedareas=explode(',',$userinfo[0]->decoratedareas);
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
        $foreman_id=rq('foreman_id');
        if (!$foreman_id) {
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $personal=new Foreman();
        $personal=$personal->find($foreman_id);
        if(!$personal){
            $arr = array("code" => "114",
                "msg" => "用户不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $foreman_name=rq('name');
        if($foreman_name) $update=DB::update('update hh_user set user_name=? where user_id=?',[$foreman_name,$foreman_id]);
        $foremaninfo_nickname=rq('nickname');
        $foremaninfo_realname=rq('realname');
        $foremaninfo_sex=rq('sex');
        $foremaninfo_age=rq('age');
        $foremaninfo_experience=rq('experience');
        $foremaninfo_decoratedareas=rq('decoratedareas');
        $foremaninfo_worktime=rq('worktime');
        $foremaninfo_servicearea=rq('servicearea');
        $loc_province=rq('loc_province');
        $loc_city=rq('loc_city');
        $loc_district=rq('loc_district');
        $loc_address=rq('loc_address');
        $home_province=rq('home_province');
        $home_city=rq('home_city');
        $home_district=rq('home_district');
        if($foremaninfo_nickname) $personal->foremaninfo_nickname=$foremaninfo_nickname;
        if($foremaninfo_realname) $personal->foremaninfo_realname=$foremaninfo_realname;
        if($foremaninfo_sex) $personal->foremaninfo_sex=$foremaninfo_sex;
        if($foremaninfo_age) $personal->foremaninfo_age=$foremaninfo_age;
        if($foremaninfo_experience) $personal->experience=implode(',',array_filter($foremaninfo_experience));
        if($foremaninfo_decoratedareas) $personal->decoratedareas=implode(',',array_filter($foremaninfo_decoratedareas));
        if($foremaninfo_worktime) $personal->worktime=$foremaninfo_worktime;
        if($foremaninfo_servicearea) $personal->servicearea=implode(',',$foremaninfo_servicearea);
        if($loc_province) $personal->loc_province=$loc_province;
        if($loc_city) $personal->loc_city=$loc_city;
        if($loc_district) $personal->loc_district=$loc_district;
        if($loc_address) $personal->loc_address=$loc_address;
        if($home_province) $personal->home_province=$home_province;
        if($home_city) $personal->home_city=$home_city;
        if($home_district) $personal->home_district=$home_district;
        $personal->save();
            $userinfo=DB::select('select * from hh_foremaninfo where foremaninfo_userid=?',[$foreman_id]);
            $user=DB::select('select user_name,user_phone,user_email from hh_user where user_id=?',[$foreman_id]);
            $userinfo[0]->foremaninfo_name=$user[0]->user_name;
            $userinfo[0]->foremaninfo_phone=$user[0]->user_phone;
            $userinfo[0]->foremaninfo_email=$user[0]->user_email;
            $userinfo[0]->servicearea=explode(',',$userinfo[0]->servicearea);
            $userinfo[0]->experience=explode(',',$userinfo[0]->experience);
            $userinfo[0]->decoratedareas=explode(',',$userinfo[0]->decoratedareas);
            $arr = array("code" => "000",
                "msg" => "保存成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
    }
}