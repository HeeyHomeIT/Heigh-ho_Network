<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/30
 * Time: 14:21
 */

namespace App\Http\Controllers;


class WoodworkerController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
        $woodworker=DB::select('select hh_woodworker.*,hh_portrait.portrait_img as portrait_img from hh_woodworker left join hh_portrait on hh_portrait.portrait_userid=hh_woodworker.wood_userid where wood_shopid=?',[$shop_id]);
        foreach($woodworker as $key=>$val){
            $sel=DB::select('select * from hh_verify where verify_userid=?',[$val->wood_userid]);
            if($sel){
                $woodworker[$key]->phone=$sel[0]->verify_phone;
                $woodworker[$key]->idcard=$sel[0]->verify_idcard;
                $woodworker[$key]->bankcard=$sel[0]->verify_bankcard;
                $woodworker[$key]->bank=$sel[0]->verify_bank;
            }else{
                $woodworker[$key]->phone=null;
                $woodworker[$key]->idcard=null;
                $woodworker[$key]->bankcard=null;
                $woodworker[$key]->bank=null;
            }
        }
        $arr=array("code"=>"000",
            "data"=>$woodworker
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function add(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
        $userid=create_pid();
        $name=rq('name');
        $sex=rq('sex');
        $age=rq('age');
        $birthplace=rq('birthplace');
        $worktime=rq('worktime');     //从业年限
        $idcard=rq('idcard');         //身份证号
        $bankcard=rq('bankcard');    //银行卡号
        $phone=rq('phone');          //手机号
        $bank=rq('bank');            //开户银行
        $price1=rq('price1');
        $price2=rq('price2');
        $price3=rq('price3');
        $price4=rq('price4');
        $price5=rq('price5');
        $price6=rq('price6');
        $price7=rq('price7');
        $insert=DB::insert('insert into hh_woodworker(wood_userid,wood_name,wood_sex,wood_age,wood_birthplace,wood_worktime,wood_shopid,wood_price1,wood_price2,wood_price3,wood_price4,wood_price5,wood_price6,wood_price7) 
                            values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[$userid,$name,$sex,$age,$birthplace,$worktime,$shop_id,$price1,$price2,$price3,$price4,$price5,$price6,$price7]);
        if($insert){
            $update=DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?',[$shop_id]);
            $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$userid,'default.jpg']);
            $card=DB::insert('insert into hh_verify (verify_userid,verify_name,verify_idcard,verify_bankcard,verify_phone,verify_bank) values(?,?,?,?,?,?)',[$userid,$name,$idcard,$bankcard,$phone,$bank]);
            $arr=array("code"=>"000",
                "msg"=>"添加成功",
                "data"=>array(
                    "wood_userid"=>$userid,
                    "wood_name"=>$name,
                    "wood_sex"=>$sex,
                    "wood_age"=>$age,
                    "wood_birthplace"=>$birthplace,
                    "wood_worktime"=>$worktime,
                    "price1"=>$price1,
                    "price2"=>$price2,
                    "price3"=>$price3,
                    "price4"=>$price4,
                    "price5"=>$price5,
                    "price6"=>$price6,
                    "price7"=>$price7,
                    "phone"=>$phone,
                    "idcard"=>$idcard,
                    "bank"=>$bank,
                    "bankcard"=>$bankcard
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr=array("code"=>"111",
                "msg"=>"添加失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function edit(){
        $callback=rq('callback');
        $worker_id=rq('worker_id');
        $name=rq('name');
        $sex=rq('sex');
        $age=rq('age');
        $birthplace=rq('birthplace');
        $worktime=rq('worktime');     //从业年限
        $idcard=rq('idcard');         //身份证号
        $bankcard=rq('bankcard');    //银行卡号
        $phone=rq('phone');          //手机号
        $bank=rq('bank');            //开户银行
        $price1=rq('price1');
        $price2=rq('price2');
        $price3=rq('price3');
        $price4=rq('price4');
        $price5=rq('price5');
        $price6=rq('price6');
        $price7=rq('price7');
        $update=DB::update('update hh_woodworker set wood_name=?,wood_sex=?,wood_age=?,wood_birthplace=?,wood_worktime=?,wood_price1=?,wood_price2=?,wood_price3=?,wood_price4=?,wood_price5=?,wood_price6=?,wood_price7=? where wood_userid=? ',
            [$name,$sex,$age,$birthplace,$worktime,$price1,$price2,$price3,$price4,$price5,$price6,$price7,$worker_id]);
        $update=DB::update('update hh_verify set verify_name=?,verify_idcard=?,verify_bankcard=?,verify_phone=?,verify_bank=? where verify_userid=? ',
            [$name,$idcard,$bankcard,$phone,$bank,$worker_id]);
        if($update){
            $arr=array("code"=>"000",
                "msg"=>"修改成功",
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr=array("code"=>"111",
                "msg"=>"修改失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function del(){
        $callback=rq('callback');
        $worker_id=rq('worker_id');
        $shop_id=rq('shop_id');
        $delete=DB::delete('delete from hh_woodworker where wood_userid=? ',[$worker_id]);
        if($delete){
            $update=DB::update('update hh_shop set shop_workernum=shop_workernum-1 where shop_id=?',[$shop_id]);
            $portrait=DB::delete('delete from hh_portrait where portrait_userid=?',[$worker_id]);
            $verify=DB::delete('delete from hh_verify where verify_userid=?',[$worker_id]);
            $arr=array("code"=>"000",
                "msg"=>"删除成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr=array("code"=>"111",
                "msg"=>"删除失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}