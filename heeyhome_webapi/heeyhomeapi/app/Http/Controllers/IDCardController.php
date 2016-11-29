<?php
/**
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/25
 * Time: 13:40
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class IDCardController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $sel=DB::select('select * from hh_verify where verify_userid=?',[$user_id]);
        if($sel){
            $arr = array("code" => "000",
                "data" => $sel[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg" => "身份尚未认证"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function cardverify(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $name=rq('name');
        $idcard=rq('idcard');
        $bankcard=rq('bankcard');    //银行卡号
        $phone=rq('phone');
        $key='a055f564286545fd8b2735c63c2f70de';
        $captcha=rq('captcha');
        $host = "http://jisubank4.market.alicloudapi.com";
        $path = "/bankcardverify4/verify";
        $method = "GET";
        $appcode = "e52017c3b93f46588f93c5745141249d";
        $headers = array();
        array_push($headers, "Authorization:APPCODE " . $appcode);
        $querys = "bankcard=".$bankcard."&idcard=".$idcard."&mobile=".$phone."&realname=".$name;
        $url = $host . $path . "?" . $querys;
        /*检查短信验证码*/
        if (!smsverify($phone, $captcha)) {
            $arr = array("code" => "118",
                "msg" => "验证码不正确"
            );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $dxyzmsj = smsverify($phone, $captcha);
        }
        if ((strtotime($dxyzmsj) + 1200) > time()) {
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($curl, CURLOPT_FAILONERROR, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//            curl_setopt($curl, CURLOPT_HEADER, true);
            if (1 == strpos("$".$host, "https://"))
            {
                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            }
            $json_data =curl_exec($curl);
            $array = json_decode($json_data, true);
            //var_dump($json_data);
            if ($array['status'] == '0') {
                if($array['result']['verifystatus']==0) {
                    $sql=DB::insert('insert into hh_verify (verify_userid,verify_name,verify_idcard,verify_bankcard,verify_phone) values(?,?,?,?,?)',[$user_id,$name,$idcard,$bankcard,$phone]);
                    $arr = array('code' => '000', 'msg' => '信息校验成功', 'data' => array("bankcard" => $bankcard, "realname" => $name,"idcard"=>$idcard,"mobile"=>$phone));
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array('code' => '111', 'msg' => $array['result']['verifymsg'], 'data' => array("bankcard" => $bankcard, "realname" => $name,"idcard"=>$idcard,"mobile"=>$phone));
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }
            else {
                $arr = array('code' => $array['status'], 'msg' => $array['msg']);
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else {
            $arr = array("code" => "119",
                "msg" => "验证码超时"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}