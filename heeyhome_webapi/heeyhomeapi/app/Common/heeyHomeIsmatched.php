<?php
/**
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/26
 * Time: 10:22
 */
use Illuminate\Support\Facades\DB;

function match($id,$sign){

    if(strpos($sign,'@')){
        $sql=DB::select('select id from hh_user where user_id=? and user_email=?',[$id,$sign]);
        if($sql)
            return true;
        else
            return false;
    }else{
        $sql=DB::select('select id from hh_user where user_id=? and user_phone=?',[$id,$sign]);
        if($sql)
            return true;
        else
            return false;
    }
}