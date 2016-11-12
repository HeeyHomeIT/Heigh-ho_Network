<?php
/**
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/25
 * Time: 13:40
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Response;

class IDCardController extends Controller
{
    public function cardverify(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $name=rq('name');
        $idcard=rq('idcard');
        $bankcard=rq('bankcard');    //银行卡号
        $phone=rq('phone');
        $key='a055f564286545fd8b2735c63c2f70de';
        $captcha=rq('callback');
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
            curl_setopt_array($curl, array(
                CURLOPT_URL => "http://apis.haoservice.com/creditop/BankCardQuery/QryBankCardBy4Element?accountNo=".$bankcard."&name=".$name."&idCardCode=".$idcard."&bankPreMobile=".$phone."&key=".$key,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
            ));

            $response = curl_exec($curl);
            $err = curl_error($curl);
            curl_close($curl);

            if ($err) {
                return "cURL Error #:" . $err;
            } else {
                $array = json_decode($response, true);
                $arr = array('code' => $array['error_code'], 'msg' => $array['result']);
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