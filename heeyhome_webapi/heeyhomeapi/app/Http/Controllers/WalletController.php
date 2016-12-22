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
        $bankcard=$bankname.$cardtype.$bankcardno;
        $time=date('Y-m-d H:i:s', time());
        $insert=DB::insert('insert into hh_withdrawapply(apply_userid,money,payment,apply_time)',[$user_id,$money,$bankcard,$time]);
        $arr = array("code" => "000",
            "msg" => "申请提现成功，银行处理中"
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function bill(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        
    }
}