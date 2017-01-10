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
        $callback = rq('callback');
        $app_key = "23539060";
        $app_secret = "cd9664aa70af1768dde5b1f99266dfbd";
        $mobileCode = rand(100000, 999999);//随机验证码
        $mobile = rq('phone'); //手机号
        if (!$mobile) {
            $arr = array("code" => "101",
                "msg" => "手机号不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if(yzsmsbom($mobile)){
            $request_paras = array(
                'ParamString' => '{"code":"'.urlencode($mobileCode).'"}',
                'RecNum' => $mobile,
                'SignName' => '嘿吼网',
                'TemplateCode' => 'SMS_39210314'
            );
            $request_host = "http://sms.market.alicloudapi.com";
            $request_uri = "/singleSendSms";
            $request_method = "GET";
            $info = "";
            $content = $this->do_get($app_key, $app_secret, $request_host, $request_uri, $request_method, $request_paras, $info);
            $array = json_decode($content, true);
            if ($array['success']) {
                $yzmsj = date("Y-m-d H:i:s", time());
                $arr = array('code' => '000',  'msg' => '验证码发送成功','data' => array('phone' => $mobile, "yzmsj" => $yzmsj));
                $sql=DB::insert('insert into hh_sms (record_key,record_type,sms,smstime) values(?,?,?,?)',[$mobile,'phone_verify',$mobileCode,$yzmsj]);
                return $callback . "(" . HHJson($arr) . ")";
            }
            else {
                $arr = array('code' => '122', 'msg' => "60s内只能发送一次");
                return $callback . "(" . HHJson($arr) . ")";
            }
        } else {
            $arr = array('code' => '120',  'msg' => '您的手机号' . $mobile . '发送过于频繁！');
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function do_get($app_key, $app_secret, $request_host, $request_uri, $request_method, $request_paras, &$info) {
        ksort($request_paras);
        $request_header_accept = "application/json;charset=utf-8";
        $content_type = "";
        $headers = array(
            'X-Ca-Key' => $app_key,
            'Accept' => $request_header_accept
        );
        ksort($headers);
        $header_str = "";
        $header_ignore_list = array('X-CA-SIGNATURE', 'X-CA-SIGNATURE-HEADERS', 'ACCEPT', 'CONTENT-MD5', 'CONTENT-TYPE', 'DATE');
        $sig_header = array();
        foreach($headers as $k => $v) {
            if(in_array(strtoupper($k), $header_ignore_list)) {
                continue;
            }
            $header_str .= $k . ':' . $v . "\n";
            array_push($sig_header, $k);
        }
        $url_str = $request_uri;
        $para_array = array();
        foreach($request_paras as $k => $v) {
            array_push($para_array, $k .'='. $v);
        }
        if(!empty($para_array)) {
            $url_str .= '?' . join('&', $para_array);
        }
        $content_md5 = "";
        $date = "";
        $sign_str = "";
        $sign_str .= $request_method ."\n";
        $sign_str .= $request_header_accept."\n";
        $sign_str .= $content_md5."\n";
        $sign_str .= "\n";
        $sign_str .= $date."\n";
        $sign_str .= $header_str;
        $sign_str .= $url_str;

        $sign = base64_encode(hash_hmac('sha256', $sign_str, $app_secret, true));
        $headers['X-Ca-Signature'] = $sign;
        $headers['X-Ca-Signature-Headers'] = join(',', $sig_header);
        $request_header = array();
        foreach($headers as $k => $v) {
            array_push($request_header, $k .': ' . $v);
        }

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $request_host . $url_str);
        //curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $request_header);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $ret = curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);
        return $ret;
    }

}