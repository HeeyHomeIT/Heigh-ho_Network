<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/2
 * Time: 15:53
 */

namespace App\Http\Controllers;


class PageController extends Controller
{
    public function page($total){
        $limit = rq('limit')?rq('limit'):5;
        $page = rq('page')?rq('page'):1;     // 获取页码
        $amount = ceil( $total / $limit );    //总记录数/每页显示数，取整
        $amount = max(1,$amount);
        $page = max($page,1);
        $page = min($page,$amount);
        $offset =(int) ($page-1)*$limit;   // 计算偏移量
        return array($offset,(int)$limit);
    }
}