<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/10/13
 * Time: 15:13
 */
function HHEncryption($mess){
    //三次单向加密
    return substr(md5(md5(crypt($mess, "hh"))),0,16);
}