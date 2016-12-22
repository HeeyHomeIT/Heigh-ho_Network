<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/1
 * Time: 14:00
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class BankCardController extends Controller
{
    public function getname(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $sel=DB::select('select real_name,idcardno from hh_realname where real_userid=? and isverify',[$user_id,1]);
        if($sel){
            $name=$sel[0]->real_name;
            $arr = array("code" => "000",
                "data" => array(
                    "user_id"=>$user_id,
                    "realname"=>$name,
                    "idcardno"=>$sel[0]->idcardno
                    )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "133",
                "msg" => "还没有进行实名身份认证"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function getcardtype(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $realname=rq('realname');
        $idcardno=rq('idcardno');
        $bankcardno=rq('bankcardno');
        $host = "http://jisuyhkgsd.market.alicloudapi.com";
        $path = "/bankcard/query";
        $method = "GET";
        $appcode = "e52017c3b93f46588f93c5745141249d";
        $headers = array();
        array_push($headers, "Authorization:APPCODE " . $appcode);
        $querys = "bankcard=".$bankcardno;
        $bodys = "";
        $url = $host . $path . "?" . $querys;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_FAILONERROR, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $json_data =curl_exec($curl);
        $array = json_decode($json_data, true);
        //dd($array);
        if($array['status']==0){
                if($array['result']['iscorrect']==0) {
                    $bankname = $array['result']['bank'];
                    $cardtype = $array['result']['type'];
                    $banklogo = $array['result']['logo'];
                    $arr = array('code' => '000', 'data' => array("user_id" => $user_id, "idcardno" => $idcardno, "bankcardno" => $bankcardno, "realname" => $realname, "bankname" => $bankname, "cardtype" => $cardtype,"banklogo"=>$banklogo));
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr = array('code' => '200', 'msg' => '银行卡校验不正确');
                    return $callback . "(" . HHJson($arr) . ")";
                }
        }else{
            $arr = array('code' => $array['status'], 'msg' => $array['msg']);
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function cardverify(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $name=rq('realname');
        $idcard=rq('idcardno');
        $bankcard=rq('bankcardno');    //银行卡号
        $bankname=rq('bankname');
        $cardtype=rq('cardtype');
        $phone=rq('phone');
        $captcha=rq('captcha');
        $banklogo=rq('banklogo');
        $host = "http://jisubank4.market.alicloudapi.com";
        $path = "/bankcardverify4/verify";
        $method = "GET";
        $appcode = "e52017c3b93f46588f93c5745141249d";
        $headers = array();
        array_push($headers, "Authorization:APPCODE " . $appcode);
        $querys = "bankcard=".$bankcard."&idcard=".$idcard."&mobile=".$phone."&realname=".$name;
        $url = $host . $path . "?" . $querys;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_FAILONERROR, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
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

            $json_data =curl_exec($curl);
            $array = json_decode($json_data, true);
            //var_dump($json_data);
            if ($array['status'] == '0') {
                if($array['result']['verifystatus']==0) {
                    $sql=DB::insert('insert into hh_bankcard (bank_userid,realname,bankcardno,bindphone,bankname,cardtype,banklogo) values(?,?,?,?,?,?,?)',[$user_id,$name,$bankcard,$phone,$bankname,$cardtype,$banklogo]);
                    $arr = array('code' => '000', 'msg' => '银行卡添加成功', 'data' => array("bankcard" => $bankcard, "realname" => $name,"phone"=>$phone,"bankname"=>$bankname,"cardtype"=>$cardtype));
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