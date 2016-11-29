<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/23
 * Time: 9:29
 */

namespace App\Http\Controllers;


use App\API\QC;
use Illuminate\Support\Facades\DB;


class QqLoginController extends Controller
{

    public function qqlogin(){
        $qc=new QC();
        $qc->qq_login();
    }
    public function qqcallback(){
        $qc=new QC();
        $access_token=$qc->qq_callback();
        $openid=$qc->get_openid();
        $qc=new QC($access_token,$openid);
        $ret=$qc->get_user_info();
        $user_id = $openid;
        $user_nickname = $ret['nickname'];
        $user_head = $ret['figureurl_qq_1'];
        $callback=rq('callback');
        $sql=DB::select('select id from hh_user where user_id=?',[$user_id]);
        if($sql){
            $arr=array("code"=>"000",
                "msg"=>"登录成功",
                "data"=>array("user_id"=>$user_id,
                    "user_name"=>$user_nickname,
                    "nickname"=>$user_nickname
                    )
            );
            return $callback."(".HHJson($arr).")";
        } else {
            $sql2=DB::insert('insert into hh_user(user_id,user_name,user_typeway,user_type)  values(?,?,?,?)',[$user_id,$user_nickname,'qq',1]);
            if($sql2){
                /*向时间表插入数据，同时向用户信息表插入数据*/
                $reg_time=date('Y-m-d H:i:s', time());
                $time = DB::insert('insert into hh_time(time_userid,reg_time) values(?,?)', [$user_id, $reg_time]);
                $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$user_id,$user_head]);
                $sql3 = DB::insert('insert into hh_userinfo(userinfo_userid,userinfo_nickname) values(?,?)',[$user_id,$user_nickname]);
                if($sql3){
                    $arr=array("code"=>"000",
                        "msg"=>"登录成功",
                        "data"=>array("user_id"=>$user_id,
                            "user_name"=>$user_nickname,
                            "nickname"=>$user_nickname
                        )
                    );
                    return $callback."(".HHJson($arr).")";
                }else{
                    $arr=array("code"=>"111",
                        "msg"=>"登录失败",
                    );
                    return $callback."(".HHJson($arr).")";
                }
            }else{
                $arr=array("code"=>"111",
                    "msg"=>"登录失败",
                );
                return $callback."(".HHJson($arr).")";
            }
        }
    }
}