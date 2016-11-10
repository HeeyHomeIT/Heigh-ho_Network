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
        $messages=DB::select('select hh_userinfo.userinfo_nickname,hh_message.msgtitle,hh_message.msgcontent,hh_message.msgtype,hh_message.sendtime,hh_message.isread,hh_message.isdel from hh_userinfo,hh_message 
                      where hh_userinfo.userinfo_userid=hh_message.senduserid and hh_message.receiveuserid=? and hh_message.isdel=? order by id desc limit ?,?',[$receiveuserid,0,$offset[0],$offset[1]]);
        foreach($messages as $key => $value){
            $content=DB::select('select content from hh_dictionary where dic_id=?',[$value->msgtype]);
            $messages[$key]->msgtype=$content[0]->content;
        }
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
    public function send($title,$content,$type,$touserid){
        $callback=rq('callback');
        $sendtime=date('Y-m-d H:i:s', time());
        $insert=DB::insert('insert into hh_message(msgtitle,msgcontent,msgtype,sendtime,receiveuserid) values(?,?,?,?,?)',$title,$content,$type,$sendtime,$touserid);
        if($insert){
            $arr=array(
                "code"=>"000",
                "msg"=>"发送成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr=array(
                "code"=>"111",
                "msg"=>"发送失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function isnew(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $sel=DB::select('select count(id) as total from hh_message where receiveuserid=? and isread=?',[$user_id,0]);
        if($sel){
            $arr=array(
                "code"=>"000",
                "msg"=>"有新的消息",
                "data"=>array("newmsgtotal"=>$sel[0]->total),
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr=array(
                "code"=>"111",
                "msg"=>"没有新的消息"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function read(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $msgid=rq('msgid');
        $update=DB::update('update hh_message set isread=? ',[1]);
        if($update){
            $arr=array(
                "code"=>"000",
                "msg"=>"标记为已读"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

}