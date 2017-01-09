<?php
/**
 * TODO 发送短信验证接口
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/14
 * Time: 14:17
 */

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class SmsController extends Controller
{
    /*注册短信验证*/
    public function sms_send(){
        $callback=rq('callback');
        $apikey = "b3f36a2994f1a2abda18ab1bda66cf8e"; //apikey(https://www.yunpian.com)登陆官网后获取
        $mobile = rq('phone'); //手机号
        $text = "【嘿吼网】您的验证码为#code#,请不要告诉别人~";
        if(!$mobile){
            $arr = array("code" => "101",
                "msg" => "手机号不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*检查手机格式*/
        if(!preg_match("/^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$/",$mobile)){
            $arr = array("code" => "129",
                "msg" => "手机格式不正确"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if(yzsmsbom($mobile)){
            $ch = curl_init();

            $mobileCode = null;
            $arr = array();
            /* 设置验证方式 */
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept:text/plain;charset=utf-8', 'Content-Type:application/x-www-form-urlencoded', 'charset=utf-8'));
            /* 设置返回结果为流 */
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            /* 设置超时时间*/
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            /* 设置通信方式 */
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            // 取得用户信息
            $json_data = $this->get_user($ch, $apikey);
            $array = json_decode($json_data, true);
            // 发送短信
            //$data = array('text' => $text, 'apikey' => $apikey, 'mobile' => $mobile);
            //$json_data = send($ch, $data);
            //$array = json_decode($json_data, true);
            //echo '<pre>';
            //print_r($array);
            // 发送模板短信
            // 需要对value进行编码
            $mobileCode = rand(100000, 999999);//随机验证码
            $data = array('tpl_id' => '1487876', 'tpl_value' => ('#code#') . '=' . urlencode($mobileCode), 'apikey' => $apikey, 'mobile' => $mobile);
            //print_r($data);
            $json_data = $this->tpl_send($ch, $data);
            $array = json_decode($json_data, true);
            //echo '<pre>';
            if ($array['code'] == '0') {
                $yzmsj = date("Y-m-d H:i:s", time());
                $arr = array('code' => '000',  'msg' => '验证码发送成功','data' => array('phone' => $array['mobile'], "yzmsj" => $yzmsj));
                $sql=DB::insert('insert into hh_sms (record_key,record_type,sms,smstime) values(?,?,?,?)',[$array['mobile'],'phone_verify',$mobileCode,$yzmsj]);
                return $callback . "(" . HHJson($arr) . ")";
            }
            else {
                $arr = array('code' => strval($array['code']), 'msg' => $array['msg']);
                return $callback . "(" . HHJson($arr) . ")";
            }

            // 发送语音验证码
            //$data = array('code' => '9876', 'apikey' => $apikey, 'mobile' => $mobile);
            //$json_data = voice_send($ch, $data);
            //$array = json_decode($json_data, true);
            //echo '<pre>';
            //print_r($array);

            curl_close($ch);

        } else {
            $arr = array('code' => '120',  'msg' => '您的手机号' . $mobile . '发送过于频繁！');
            return $callback . "(" . HHJson($arr) . ")";
        }

    }

    /***************************************************************************************/
    //获得账户
    function get_user($ch, $apikey)
    {
        curl_setopt($ch, CURLOPT_URL, 'https://sms.yunpian.com/v2/user/get.json');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('apikey' => $apikey)));
        return curl_exec($ch);
    }

    function send($ch, $data)
    {
        curl_setopt($ch, CURLOPT_URL, 'https://sms.yunpian.com/v2/sms/single_send.json');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        return curl_exec($ch);
    }

    function tpl_send($ch, $data)
    {
        curl_setopt($ch, CURLOPT_URL, 'https://sms.yunpian.com/v2/sms/tpl_single_send.json');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        return curl_exec($ch);
    }

    function voice_send($ch, $data)
    {
        curl_setopt($ch, CURLOPT_URL, 'http://voice.yunpian.com/v2/voice/send.json');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        return curl_exec($ch);
    }

}