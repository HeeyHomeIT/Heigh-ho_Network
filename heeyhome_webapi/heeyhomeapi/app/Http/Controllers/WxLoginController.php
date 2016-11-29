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
       header('location:https://open.weixin.qq.com/connect/qrconnect?appid='.$appid.'&redirect_uri=http://hyu2387760001.my3w.com/wxcallback&response_type=code&scope=snsapi_login&state=state#wechat_redirect');
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
        $user_id = $openid;
        $arr = $this->getwechatuserinfo($access_token, $openid);
        $user_nickname = $arr['nickname'];
        $user_head = $arr['headimgurl'];
        $sql=DB::select('select * from hh_user where user_id=?',[$openid]);
        if($sql){
            $arr=array("code"=>"000",
                "msg"=>"登录成功",
                "data"=>array("user_id"=>$user_id,
                    "user_name"=>$user_nickname,
                    "nickname"=>$user_nickname
                )
            );
            return $callback."(".HHJson($arr).")";
        }
        else {
            $sql2=DB::insert('insert into hh_user(user_id,user_name,user_typeway,user_type)  values(?,?,?,?)',[$user_id,$user_nickname,'wechat',1]);
            if ($sql2) {
                $reg_time=date('Y-m-d H:i:s', time());
                $time = DB::insert('insert into hh_time(time_userid,reg_time) values(?,?)', [$user_id, $reg_time]);
                $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$user_id,$user_head]);
                $sql3 = DB::insert('insert into hh_userinfo(userinfo_userid,userinfo_nickname) values(?,?)',[$user_id,$user_nickname]);
                if ($sql3) {
                    $arr=array("code"=>"000",
                        "msg"=>"登录成功",
                        "data"=>array("user_id"=>$user_id,
                            "user_name"=>$user_nickname,
                            "nickname"=>$user_nickname
                        )
                    );
                    return $callback."(".HHJson($arr).")";
                } else {
                    $arr=array("code"=>"111",
                        "msg"=>"登录失败",
                    );
                    return $callback."(".HHJson($arr).")";
                }
            } else {
                $arr=array("code"=>"111",
                    "msg"=>"登录失败",
                );
                return $callback."(".HHJson($arr).")";
            }
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
}