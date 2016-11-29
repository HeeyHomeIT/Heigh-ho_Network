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
        //$to 表示收件人地址 $subject 表示邮件标题 $body表示邮件正文
        $mail             = new \PHPMailer(); //new一个PHPMailer对象出来
        $mail->CharSet ="UTF-8";//设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
        $mail->IsSMTP(); // 设定使用SMTP服务
        //$mail->SMTPDebug  = 1;                     // 启用SMTP调试功能
        // 1 = errors and messages
        // 2 = messages only
        $mail->SMTPAuth   = true;                  // 启用 SMTP 验证功能
        $mail->SMTPSecure = "tls";                 // 安全协议，可以注释掉
        $mail->Host       = 'smtp.exmail.qq.com';      // SMTP 服务器
        $mail->Port       = 25;                   // SMTP服务器的端口号
        $mail->Username   = 'service@heeyhome.com';  // SMTP服务器用户名，PS：我乱打的
        $mail->Password   = 'A1b2c3';            // SMTP服务器密码
        $mail->SetFrom('service@heeyhome.com', '嘿吼网');
        //$mail->AddReplyTo('xxx@xxx.xxx','who');
        $mail->Subject    = '嘿吼网会员邮箱验证';
        $mail->AltBody    = 'To view the message, please use an HTML compatible email viewer!'; // optional, comment out and test
        $address = $email;
        $mail->AddAddress($address, '');
        //$mail->AddAttachment("images/phpmailer.gif");      // attachment
        $sql=DB::select('select max(smstime) as smstime from hh_sms where record_key=?',[$email]);
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
            $body='<table width="700" border="0" align="center" cellspacing="0" style="width:700px;">
            <tbody><tr><td><div style="width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;">
            <tbody><tr><td width="210"></td></tr></tbody>
            </table>
            </div>
            <div style="width:680px;padding:0 10px;margin:0 auto;">
                <div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;">
                    <strong style="display:block;margin-bottom:15px;">
                        亲爱的会员：
                        <br><br>您好！
                    </strong>
                    <strong style="display:block;margin-bottom:15px;">
                        您当前正在进行邮箱身份验证，请在页面的邮箱验证码输入框中输入此次验证码：
                        <span style="color:#f60;font-size: 24px"><span style="border-bottom: 1px dashed rgb(204, 204, 204); z-index: 1; position: static;"  onclick="return false;" >'.$code.'</span></span>，验证码的有效时间为20分钟，请在有效时间内完成验证。
                    </strong>
                </div>
                <div style="margin-bottom:30px;">
                    <small style="display:block;margin-bottom:20px;font-size:12px;">
                        <p style="color:#747474;">
                            注意：此操作可能会修改您的密码、登录邮箱或绑定手机。如非本人操作，请及时登录并修改密码以保证帐户安全
                            <br>（工作人员不会向你索取此验证码，请勿泄漏！)
                        </p>
                    </small>
                </div>
            </div>
            <div style="width:700px;margin:0 auto;">
                <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                    <p>此为系统邮件，请勿回复<br>
                        请保管好您的邮箱，避免账号被他人盗用
                    </p>
                    <p>苏州嗨吼网络科技有限公司</p>
                </div>
            </div>
        </td>
    </tr>
    </tbody>
</table>';
            $mail->MsgHTML($body);
        }
        if(!$mail->Send()) {
            $arr = array('code' => '111',  'msg' => '邮件发送失败，请重试');
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $yzmsj = date("Y-m-d H:i:s", time());
            $sql=DB::insert('insert into hh_sms (record_key,record_type,sms,smstime) values(?,?,?,?)',[$email,'email_verify',$code,$yzmsj]);
            $arr = array('code' => '000',  'msg' => '邮件发送成功，请查收','data' => array('email' =>$email , "yzmsj" => $yzmsj));
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}