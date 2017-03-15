<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/28
 * Time: 8:47
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class WxLoginController extends Controller
{
    public function wxlogin(){
       $appid = 'wx14540838030ba43a';
       header('location:https://open.weixin.qq.com/connect/qrconnect?appid='.$appid.'&redirect_uri=http://www.heeyhome.com/api/public/wxcallback&response_type=code&scope=snsapi_login&state=state#wechat_redirect');
    }
    public function wxcallback(){
        $callback=rq('callback');
        $code = rq('code');
        $appid = 'wx14540838030ba43a';
        $secret = 'ec25bdb288f587fe5c221f31eb1cf0b2';
        $grant_type = 'authorization_code';
        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx14540838030ba43a&secret=ec25bdb288f587fe5c221f31eb1cf0b2&code=' . $code . '&grant_type=authorization_code';
        $ch = curl_init();
        $array = array();
        /* 设置验证方式 */
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept:text/plain;charset=utf-8', 'Content-Type:application/x-www-form-urlencoded', 'charset=utf-8'));
        /* 设置返回结果为流 */
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        /* 设置超时时间*/
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        /* 设置通信方式 */
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_URL, 'https://api.weixin.qq.com/sns/oauth2/access_token');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('appid' => $appid, 'secret' => $secret, 'code' => $code, 'grant_type' => $grant_type)));
        $array = json_decode(curl_exec($ch), true);
        curl_close($ch);
        $access_token = $array['access_token'];
        $openid = $array['openid'];
        $wx_id = $openid;
        $arr = $this->getwechatuserinfo($access_token, $openid);
        $user_nickname = $arr['nickname'];
        $user_head = $arr['headimgurl'];
        $sql = DB::select('select a.user_id,b.userinfo_nickname from hh_user_third a LEFT OUTER JOIN hh_userinfo b ON a.user_id = b.userinfo_userid where wechat_id=? ', [$wx_id]);
        if($sql){
            $pwd=DB::select('select * from hh_user where user_id=?',[$sql[0]->user_id]);
            /*登录成功返回用户信息*/
            if($pwd[0]->user_type==1){
                $nickname=DB::select('select userinfo_nickname from hh_userinfo where userinfo_userid=?',[$pwd[0]->user_id]);
                if($nickname){
                    $pwd[0]->nickname=$nickname[0]->userinfo_nickname;
                }else{
                    $pwd[0]->nickname = null;
                }

            }
            if($pwd[0]->user_type==2){
                $shop_id=DB::select('select shop_id from hh_shop where shopper_id=?',[$pwd[0]->user_id]);
                $pwd[0]->shop_id=$shop_id[0]->shop_id;
                $nickname=DB::select('select foremaninfo_nickname from hh_foremaninfo where foremaninfo_userid=?',[$pwd[0]->user_id]);
                if($nickname){
                    $pwd[0]->nickname=$nickname[0]->foremaninfo_nickname;
                }else {
                    $pwd[0]->nickname = null;
                }
            }
            if($pwd[0]->user_type==3){
                $nickname=DB::select('select material_supplier_name from hh_material_supplier_info where material_supplier_id=?',[$pwd[0]->user_id]);
                $pwd[0]->nickname=$nickname[0]->material_supplier_name;
            }
            setcookie("userEmail", $pwd[0]->user_email, time()+604800,"/");
            setcookie("userId", $pwd[0]->user_id, time()+604800,"/");
            setcookie("userName", $pwd[0]->user_name, time()+604800,"/");
            setcookie("userNickName", $pwd[0]->nickname, time()+604800,"/");
            setcookie("userPhone", $pwd[0]->user_phone, time()+604800,"/");
            setcookie("userType", $pwd[0]->user_type, time()+604800,"/");
            if ($pwd[0]->user_type == 2) {
                setcookie("userShopId", $pwd[0]->shop_id, time()+604800,"/");
            }
            header('Location:'.'http://www.heeyhome.com');
            // $arr = array("code" => "000",
            //     "msg" => "登录成功",
            //     "data" => array("user_id" => $sql[0]->user_id,
            //         "userinfo_nickname" => $sql[0]->userinfo_nickname
            //     )
            // );
            // return $callback . "(" . HHJson($arr) . ")";
        } else {
            setcookie("wxid", $wx_id, time()+604800,"/");
            header('Location:'.'http://www.heeyhome.com/register.html?#zc');
            // $arr = array("code" => "111",
            //     "msg" => "登录失败，需要绑定手机号",
            //     "data" => array("wx_id" => $wx_id,
            //         "user_nickname" => $user_nickname,
            //         "user_head" => $user_head
            //     )
            // );
            // return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function getwechatuserinfo($access_token, $openid)
    {
        $ch2 = curl_init();
        $arr = array();
        /* 设置验证方式 */
        curl_setopt($ch2, CURLOPT_HTTPHEADER, array('Accept:text/plain;charset=utf-8', 'Content-Type:application/x-www-form-urlencoded', 'charset=utf-8'));
        /* 设置返回结果为流 */
        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
        /* 设置超时时间*/
        curl_setopt($ch2, CURLOPT_TIMEOUT, 10);
        /* 设置通信方式 */
        curl_setopt($ch2, CURLOPT_POST, 1);
        curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch2, CURLOPT_URL, 'https://api.weixin.qq.com/sns/userinfo');
        curl_setopt($ch2, CURLOPT_POSTFIELDS, http_build_query(array('access_token' => $access_token, 'openid' => $openid)));
        $arr = json_decode(curl_exec($ch2), true);
        curl_close($ch2);
        return $arr;
    }
    public function bindingWXLogin()
    {
        $wx_id = rq('wx_id');
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
            $into_user_third = DB::insert('INSERT INTO hh_user_third (user_id,wechat_id) VALUE (?,?)',
                [$user_id,$wx_id]);
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
                $into_user_third = DB::insert('INSERT INTO hh_user_third (user_id,wechat_id) VALUE (?,?)',
                    [$user_id, $wx_id]);
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
    public function wxcallbackphone(){
        $wx_id = rq('openid');
        $user_nickname = rq('nickname');
        $user_head = rq('portrait');
        $sql = DB::select('select a.user_id,b.userinfo_nickname from hh_user_third a LEFT OUTER JOIN hh_userinfo b ON a.user_id = b.userinfo_userid where wechat_id=? ', [$wx_id]);
        if($sql){
            $pwd=DB::select('select * from hh_user where user_id=?',[$sql[0]->user_id]);
            /*登录成功返回用户信息*/
            if($pwd[0]->user_type==1){
                $nickname=DB::select('select userinfo_nickname from hh_userinfo where userinfo_userid=?',[$pwd[0]->user_id]);
                if($nickname){
                    $pwd[0]->nickname=$nickname[0]->userinfo_nickname;
                }else{
                    $pwd[0]->nickname = null;
                }
            }
            if($pwd[0]->user_type==2){
                $shop_id=DB::select('select shop_id from hh_shop where shopper_id=?',[$pwd[0]->user_id]);
                $pwd[0]->shop_id=$shop_id[0]->shop_id;
                $nickname=DB::select('select foremaninfo_nickname from hh_foremaninfo where foremaninfo_userid=?',[$pwd[0]->user_id]);
                if($nickname){
                    $pwd[0]->nickname=$nickname[0]->foremaninfo_nickname;
                }else {
                    $pwd[0]->nickname = null;
                }
            }
            if($pwd[0]->user_type==3){
                $nickname=DB::select('select material_supplier_name from hh_material_supplier_info where material_supplier_id=?',[$pwd[0]->user_id]);
                $pwd[0]->nickname=$nickname[0]->material_supplier_name;
            }
            setcookie("userEmail", $pwd[0]->user_email, time()+604800,"/");
            setcookie("userId", $pwd[0]->user_id, time()+604800,"/");
            setcookie("userName", $pwd[0]->user_name, time()+604800,"/");
            setcookie("userNickName", $pwd[0]->nickname, time()+604800,"/");
            setcookie("userPhone", $pwd[0]->user_phone, time()+604800,"/");
            setcookie("userType", $pwd[0]->user_type, time()+604800,"/");
            if ($pwd[0]->user_type == 2) {
                setcookie("userShopId", $pwd[0]->shop_id, time()+604800,"/");
            }
            header('Location:'.'http://www.heeyhome.com');
        } else {
            setcookie("wxid", $wx_id, time()+604800,"/");
            header('Location:'.'http://www.heeyhome.com/register.html?#zc');
        }
    }
}