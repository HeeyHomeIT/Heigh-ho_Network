<?php
/**
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/20
 * Time: 12:35
 */
use Illuminate\Support\Facades\DB;
function smsverify($record_key,$captcha){
    /*检查验证码*/
    $sql=DB::select('select sms,smstime from hh_sms where sms=? and record_key=?',[$captcha,$record_key]);
    if(!$sql){
        return false;
    }else
        return $sql[0]->smstime;
}