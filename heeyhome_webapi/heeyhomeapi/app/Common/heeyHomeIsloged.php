<?php
/**
 * Created by PhpStorm.
 * User: pjw
 * Date: 2016/10/18
 * Time: 9:38
 */
/*检测用户是否登录*/
function is_logged_in()
{
    /*如果session中存在user_id就返回user_id，否则返回false*/
    return session('user_id') ?: false;

}