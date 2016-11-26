<?php
/**
 *  TODO 发送邮件验证接口
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/27
 * Time: 12:54
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function emailsend(){
        $callback=rq('callback');
        $email=rq('email');
        /*检查邮箱格式*/
        if(!preg_match("/^([a-z0-9+_]|\\-|\\.)+@(([a-z0-9_]|\\-)+\\.)+[a-z]{2,6}\$/i",$email)){
            $arr = array("code" => "128",
                "msg" => "邮箱格式不正确"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }

        $sql=DB::select('select max(smstime) as smstime from hh_sms where record_key=?',[$email]);
        //dd($sql);
        if($sql){
            $lastsendtime=$sql[0]->smstime;
        }else{
            $lastsendtime=0;
        }
        if(time()-strtotime($lastsendtime)<60){
            $arr = array('code' => '127',  'msg' => '每60秒内只能发送一次邮箱验证码，请稍后重试');
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $code=rand_number(6);
            $data=['email'=>$email,'code'=>$code];
            $send=Mail::send('email.template', $data, function ($message) use($data)
            {
                $message ->to($data['email'])->subject('嘿吼网会员邮箱验证');
            });
            if($send){
                $yzmsj = date("Y-m-d H:i:s", time());
                $sql=DB::insert('insert into hh_sms (sms_userid,record_key,record_type,sms,smstime) values(?,?,?,?,?)',[$user_id,$email,'email_verify',$code,$yzmsj]);
                $arr = array('code' => '000',  'msg' => '邮件发送成功，请查收','data' => array('email' =>$email , "yzmsj" => $yzmsj));
                return $callback . "(" . HHJson($arr) . ")";
            }else{
                $arr = array('code' => '111',  'msg' => '邮件发送失败，请重试');
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
    }
}