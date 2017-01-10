<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/10/14
 * Time: 15:01
 */
use Illuminate\Support\Facades\DB;

function yzsmsbom($phone)
{
    $time = date("y-m-d", time());
    //dd($time);
    if (searchBalckMan($phone)) {
        return false;
    } else {
        $sql = DB::select('select frequency from hh_smsbom where phone=? and sendtime=?', [$phone, $time]);
        if ($sql) {
            $frequency = $sql[0]->frequency;
            if ($frequency > 24) {
                addBalckMan($phone, "短信发送过于频繁");
                return false;
            } else {
                $frequency = $frequency + 1;
                $sql = DB::update('update hh_smsbom set frequency=? where phone=? and sendtime=?', [$frequency, $phone, $time]);
                return true;
            }
        } else {
            $sql = DB::insert('insert into hh_smsbom (phone,sendtime,frequency) values(?,?,?)', [$phone, $time, '1']);
            return true;
        }
    }
}