<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/10/13
 * Time: 16:27
 */
function HHJson($array)
{
    return json_encode($array,JSON_UNESCAPED_UNICODE);
}