<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/19
 * Time: 9:51
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class WalletController extends Controller
{
    public function index(){
        $callback = rq('callback');
        $user_id = rq('user_id');
        $money = DB::select('select total,available_total from hh_wallet_balance where user_id =?',[$user_id]);
        if ($money) {
            $arr = array("code" => "000",
                    "data" =>$money[0] //这里肯定返回一个的，不取第一个的话，ios这边会返回一个数组里面包含一个字典
                );
            return $callback . "(" . HHJson($arr) . ")";
        } else {
            $arr = array("code" => "117",
                    "msg" => "没有金额"
                );
            return $callback . "(" . HHJson($arr) . ")";
        }

    }
    public function mycards(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $cards=DB::select('select bankcardno,bankname,cardtype,banklogo from hh_bankcard where bank_userid=?',[$user_id]);
        if($cards){
            foreach ($cards as $key=>$val){
                $bankkey=DB::select('select bankkey from hh_bank where bankname=?',[$val->bankname]);
                $cards[$key]->bankkey=$bankkey[0]->bankkey;
            }
            $arr = array("code" => "000",
                "data"=>$cards
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "131",
                "msg"=>"未添加银行卡"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function apply(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $money=rq('money');
        $bankcardno=rq('bankcardno');
        $bankname=rq('bankname');
        $cardtype=rq('cardtype');
        $bankcard=$bankname.$bankcardno;
        $isapply=DB::select('select process_type from hh_withdrawapply where apply_userid=?',[$user_id]);
        if($isapply) {
            if($isapply[0]->process_type){
                $process_type=true;
            }else{
                $process_type = false;
            }
        }
        else{
            $process_type=true;
        }
        if($process_type){
            $select=DB::select('select id from hh_wallet_balance where available_total>=? and user_id=?',[$money,$user_id]);
            if($select) {
                $time = date('Y-m-d H:i:s', time());
                $is = DB::select('select id from hh_bankcard where bank_userid=? and bankcardno=?', [$user_id, $bankcardno]);
                if ($is) {
                    $insert = DB::insert('insert into hh_withdrawapply(apply_userid,money,payment,apply_time) values(?,?,?,?)', [$user_id, $money, $bankcard, $time]);
                    $arr = array("code" => "000",
                        "msg" => "申请提现成功，银行处理中"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array("code" => "111",
                        "msg" => "申请提现失败，该银行卡未绑定"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }else{
                $arr = array("code" => "131",
                    "msg" => "申请提现失败，余额不足"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }else{
            $arr = array("code" => "132",
                "msg" => "申请提现失败，有提现尚未处理"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function bill(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $month=rq('month');
        $month=substr($month,0,4)."-".substr($month,4,2);
        //dd($month);
        $where='';
        $para[]=$user_id;
        $para[]=0;
        if($month) {
            $where.=' and time like "'.$month.'%"';
        }
        $total=DB::select('select count(id) as total from hh_wallet_detail where user_id=? and isdel=?'.$where,$para);
        $total=$total[0]->total;
        $newpage=new PageController();
        $offset=$newpage->page($total);
        $limit=' limit '.$offset[0].','.$offset[1];
        $select=DB::select('select * from hh_wallet_detail where user_id=? and isdel=?'.$where.$limit,$para);
        if($select){
            foreach($select as $key=>$val){
                $select[$key]->total=$total;
            }
            $arr = array("code" => "000",
                "data" => $select
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "117",
                "msg" => "信息不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function del(){
        $callback=rq('callback');
        $id=rq('id');
        $delete=DB::update('update hh_wallet_detail set isdel=? where id=?',[1,$id]);
        $arr = array("code" => "000",
            "msg" => "删除成功"
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function materialer(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $today=date('Y-m-d', time());
        $ttotal=DB::select('select sum(money) as total from hh_wallet_detail where user_id=? and time like "'.$today.'%"',[$user_id]);
        if($ttotal){
            $todaytotal=$ttotal[0]->total;
        }else{
            $todaytotal=0;
        }
        $money = DB::select('select total,available_total from hh_wallet_balance where user_id =?',[$user_id]);
        $total=$money[0]->total;
        $available_total=$money[0]->available_total;
        $isapply=DB::select('select process_type from hh_withdrawapply where apply_userid=?',[$user_id]);
        if($isapply) {
                if($isapply[0]->process_type){
                    $process_type=true;
                }else{
                    $process_type = false;
                }
        }
        else{
            $process_type=true;
        }
        $arr = array("code" => "000",
            "data" => array("total"=>$total,
                "todaytotal"=>floatval($todaytotal),
                "available_total"=>$available_total,
            "process_type"=>$process_type),
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
}