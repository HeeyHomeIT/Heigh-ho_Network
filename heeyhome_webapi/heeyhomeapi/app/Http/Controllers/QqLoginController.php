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
        $qc = new QC();
        $access_token = $qc->qq_callback();
        $openid = $qc->get_openid();
        $qc = new QC($access_token, $openid);
        $ret = $qc->get_user_info();
        $qq_id = $openid;
        $user_nickname = $ret['nickname'];
        $user_head = $ret['figureurl_qq_1'];
        $callback = rq('callback');
        $sql = DB::select('select a.user_id,b.userinfo_nickname from hh_user_third a LEFT OUTER JOIN hh_userinfo b ON a.user_id = b.userinfo_userid where qq_id=? ', [$qq_id]);
        if ($sql) {
            $arr = array("code" => "000",
                "msg" => "登录成功",
                "data" => array("user_id" => $sql[0]->user_id,
                    "userinfo_nickname" => $sql[0]->userinfo_nickname
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array("code" => "111",
                "msg" => "登录失败，需要绑定手机号",
                "data" => array("qq_id" => $qq_id,
                    "user_nickname" => $user_nickname,
                    "user_head" => $user_head
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function bindingQQLogin()
    {
        $qq_id = rq('qq_id');
        $user_phone = rq('phone');
        $callback = rq('callback');
        $captcha = rq('captcha');
        $user_nickname = rq('user_nickname');
        $user_head = rq('user_head');
        /*检查短信验证码*/
        if (!smsverify($user_phone, $captcha)) {
            $arr = array("code" => "118",
                "msg" => "验证失败，短信验证码不正确"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        //查询该手机号用户是否存在
        $sel_user_phone = DB::select('SELECT * FROM hh_user WHERE user_phone = ?',
            [$user_phone]);
        if ($sel_user_phone) {
            $user_id = $sel_user_phone[0]->user_id;
            $into_user_third = DB::insert('INSERT INTO hh_user_third (user_id,qq_id) VALUE (?,?)',
                [$user_id, $qq_id]);
            if ($into_user_third) {
                $sel_user_nickname = DB::select('SELECT userinfo_nickname FROM hh_userinfo WHERE userinfo_userid = ?',
                    [$user_id]);
                if ($sel_user_nickname) {
                    $user_nickname = $sel_user_nickname[0]->userinfo_nickname;
                } else {
                    $user_nickname = $user_phone;
                }
                $arr = array("code" => "000",
                    'data' => array('user_id' => $user_id,
                        'user_phone' => $user_phone,
                        'user_nickname' => $user_nickname
                    ),
                    "msg" => "绑定成功"
                );
                return $callback . "(" . HHJson($arr) . ")";
            } else {
                $arr = array("code" => "198",
                    "msg" => "绑定失败"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else {
            $user_id = create_pid();
            $user_password = HHEncryption(('heeyhome' . $user_phone));
            /*向用户表插入数据*/
            $insert = DB::insert('insert into hh_user(user_id,user_name,user_phone,user_password,user_typeway,user_type) values(?,?,?,?,?,?)', [$user_id, $user_phone, $user_phone, $user_password, 'phone', 1]);
            if ($insert) {
                /*向时间表插入数据，同时向用户信息表插入数据*/
                $reg_time = date('Y-m-d H:i:s', time());
                $time = DB::insert('insert into hh_time(time_userid,reg_time) values(?,?)', [$user_id, $reg_time]);
                $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$user_id, $user_head]);
                $sql = DB::insert('insert into hh_userinfo(userinfo_userid,userinfo_nickname) values(?,?)', [$user_id, $user_nickname]);
                $into_user_third = DB::insert('INSERT INTO hh_user_third (user_id,qq_id) VALUE (?,?)',
                    [$user_id, $qq_id]);
                if ($sql && $into_user_third) {
                    $arr = array(
                        "code" => "000",
                        "msg" => "绑定成功",
                        "data" => array(
                            "user_id" => $user_id,
                            "user_name" => $user_phone,
                            "nickname" => $user_nickname
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array("code" => "111",
                        "msg" => "绑定失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            } else {
                $arr = array("code" => "111",
                    "msg" => "绑定失败"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
    }
}