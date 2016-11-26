<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/10/14
 * Time: 10:40
 */
function create_pid()
{
    //生成唯一ID——PID
    return md5(uniqid());
}
function rand_number($length=6){
    if($length<1){
        $length=6;
    }
    $min=1;
    for($i=0;$i<$length-1;$i++){
        $min=$min*10;
    }
    $max=$min*10-1;
    return rand($min,$max);
}