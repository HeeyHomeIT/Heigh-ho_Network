<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/9
 * Time: 8:39
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class MyCollectionController  extends Controller
{
    public function imgcollection(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        if(!$user_id){
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*效果图和收藏表两表联查*/
        $sel=DB::select('select');
    }
}