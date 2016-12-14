<?php
/**
 * TODO 黑名单机制
 * User: heeyhome
 * Date: 2016/10/14
 * Time: 15:03
 */
use Illuminate\Support\Facades\DB;

function searchBalckMan($phone)
{
    /**
     * TODO 查询是否在黑名单中
     */
    $sql=DB::select('select phone from hh_blacklist where phone=?',[$phone]);
    if ($sql) {
        return true;
    } else {
        return false;
    }
}

function addBalckMan($phone, $message)
{
    /**
     * TODO 添加到黑名单中
     */
    $time = date('Y-m-d', time());
    $sql=DB::insert('insert into hh_blacklist (phone,begintime,message,status) values(?,?,?,?)',[$phone,$time,$message,'1']);
    if ($sql) {
        return true;
    } else {
        return false;
    }
}
