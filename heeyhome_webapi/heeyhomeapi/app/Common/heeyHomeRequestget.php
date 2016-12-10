<?php

/**
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/13
 * Time: 13:26
 */
use Illuminate\Support\Facades\Request;

function rq($key = null, $default = null)
{
    if (!$key) return Request::all();
    return Request::input($key, $default);
}
