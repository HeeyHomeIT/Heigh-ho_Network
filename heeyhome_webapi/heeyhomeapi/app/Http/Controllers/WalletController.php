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

    }
    public function mycards(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $cards=DB::select('select bankcardno,bankname,cardtype,banklogo from hh_bankcard where bank_userid=?',[$user_id]);
        if($cards){
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
        $bankcard='银行卡'.$bankcardno;
        $time=date('Y-m-d H:i:s', time());
        $is=DB::select('select id from hh_bankcard where bank_userid=? and bankcardno=?',[$user_id,$bankcardno]);
        if($is){
            $insert=DB::insert('insert into hh_withdrawapply(apply_userid,money,payment,apply_time) values(?,?,?,?)',[$user_id,$money,$bankcard,$time]);
            $arr = array("code" => "000",
                "msg" => "申请提现成功，银行处理中"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg" => "申请提现失败，该银行卡未绑定"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function bill(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $month=rq('month');
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
}