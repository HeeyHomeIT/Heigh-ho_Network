<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/4
 * Time: 15:11
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $receiveuserid=rq('user_id');
        if (!$receiveuserid) {
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $total=DB::select('select count(id) as total from hh_message where receiveuserid=?',[$receiveuserid]);
        $total=$total[0]->total;
        $newpage=new PageController();
        $offset=$newpage->page($total);
        $messages=DB::select('select hh_userinfo.userinfo_nickname,hh_message.msgcontent,hh_message.msgtype,hh_message.sendtime,hh_message.isread,hh_message.isdel from hh_userinfo,hh_message 
                      where hh_userinfo.userinfo_userid=hh_message.senduserid and hh_message.receiveuserid=? order by id desc limit ?,?',[$receiveuserid,$offset[0],$offset[1]]);

        if($messages){
            $arr=array(
                "code"=>"000",
                "data"=>$messages
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr=array(
                "code"=>"117",
                "msg"=>"信息找不到"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function del(){
        $callback=rq('callback');
        $msgid=rq('id');
        if (!$msgid) {
            $arr = array("code" => "112",
                "msg" => "id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $update=DB::update('update hh_message set isdel=? where id=?',[1,$msgid]);
        if($update){
            $arr=array(
                "code"=>"000",
                "msg"=>"删除成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr=array(
                "code"=>"111",
                "msg"=>"删除失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

}