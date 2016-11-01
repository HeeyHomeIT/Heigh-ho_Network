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
        $cardnum=rq('cardnum');
        $realname=rq('realname');
        $key='a055f564286545fd8b2735c63c2f70de';
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "http://apis.haoservice.com/idcard/VerifyIdcard?cardNo=".$cardnum."&realName=".$realname."&key=".$key,
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

    }
}