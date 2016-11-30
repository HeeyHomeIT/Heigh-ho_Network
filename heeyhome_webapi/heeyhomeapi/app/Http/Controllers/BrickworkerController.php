<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/30
 * Time: 14:51
 */

namespace App\Http\Controllers;


class BrickworkerController
{
    public function index(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
        $brickworker=DB::select('select hh_brickworker.*,hh_portrait.portrait_img as portrait_img from hh_brickworker left join hh_portrait on hh_portrait.portrait_userid=hh_brickworker.brick_userid where brick_shopid=?',[$shop_id]);
        foreach($brickworker as $key=>$val){
            $sel=DB::select('select * from hh_verify where verify_userid=?',[$val->brick_userid]);
            if($sel){
                $brickworker[$key]->phone=$sel[0]->verify_phone;
                $brickworker[$key]->idcard=$sel[0]->verify_idcard;
                $brickworker[$key]->bankcard=$sel[0]->verify_bankcard;
                $brickworker[$key]->bank=$sel[0]->verify_bank;
            }else{
                $brickworker[$key]->phone=null;
                $brickworker[$key]->idcard=null;
                $brickworker[$key]->bankcard=null;
                $brickworker[$key]->bank=null;
            }
        }
        $arr=array("code"=>"000",
            "data"=>$brickworker
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
        $price8=rq('price8');
        $price9=rq('price9');
        $price10=rq('price10');
        $price11=rq('price11');
        $price12=rq('price12');
        $price13=rq('price13');
        $price14=rq('price14');
        $price15=rq('price15');
        $price16=rq('price16');
        $price17=rq('price17');
        $price18=rq('price18');
        $price19=rq('price19');
        $price20=rq('price20');
        $price21=rq('price21');
        $price22=rq('price22');
        $insert=DB::insert('insert into hh_brickworker(brick_userid,brick_name,brick_sex,brick_age,brick_birthplace,brick_worktime,brick_shopid,brick_price1,brick_price2,brick_price3,brick_price4,brick_price5,brick_price6,brick_price7,brick_price8,brick_price9,brick_price10,brick_price11,brick_price12,brick_price13,brick_price14,brick_price15,brick_price16,brick_price17,brick_price18,brick_price19,brick_price20,brick_price21,brick_price22,) 
                            values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[$userid,$name,$sex,$age,$birthplace,$worktime,$shop_id,$price1,$price2,$price3,$price4,$price5,$price6,$price7,$price8,$price9,$price10,$price11,$price12,$price13,$price14,$price15,$price16,$price17,$price18,$price19,$price20,$price21,$price22]);
        if($insert){
            $update=DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?',[$shop_id]);
            $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$userid,'default.jpg']);
            $card=DB::insert('insert into hh_verify (verify_userid,verify_name,verify_idcard,verify_bankcard,verify_phone,verify_bank) values(?,?,?,?,?,?)',[$userid,$name,$idcard,$bankcard,$phone,$bank]);
            $arr=array("code"=>"000",
                "msg"=>"添加成功",
                "data"=>array(
                    "brick_userid"=>$userid,
                    "brick_name"=>$name,
                    "brick_sex"=>$sex,
                    "brick_age"=>$age,
                    "brick_birthplace"=>$birthplace,
                    "brick_worktime"=>$worktime,
                    "price1"=>$price1,
                    "price2"=>$price2,
                    "price3"=>$price3,
                    "price4"=>$price4,
                    "price5"=>$price5,
                    "price6"=>$price6,
                    "price7"=>$price7,
                    "price8"=>$price8,
                    "price9"=>$price9,
                    "price10"=>$price10,
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
        $price8=rq('price8');
        $price9=rq('price9');
        $price10=rq('price10');
        $price11=rq('price11');
        $price12=rq('price12');
        $price13=rq('price13');
        $price14=rq('price14');
        $price15=rq('price15');
        $price16=rq('price16');
        $price17=rq('price17');
        $price18=rq('price18');
        $price19=rq('price19');
        $price20=rq('price20');
        $price21=rq('price21');
        $price22=rq('price22');
        $update=DB::update('update hh_brickworker set brick_name=?,brick_sex=?,brick_age=?,brick_birthplace=?,brick_worktime=?,brick_price1=?,brick_price2=?,brick_price3=?,brick_price4=?,brick_price5=?,brick_price6=?,brick_price7=?,brick_price8=?,brick_price9=?,brick_price10=?,brick_price11=?,brick_price12=?,brick_price13=?,brick_price14=?,brick_price15=?,brick_price16=?,brick_price17=?,brick_price18=?,brick_price19=?,brick_price20=?,brick_price21=?,brick_price22=? where brick_userid=? ',
            [$name,$sex,$age,$birthplace,$worktime,$price1,$price2,$price3,$price4,$price5,$price6,$price7,$price8,$price9,$price10,$price11,$price12,$price13,$price14,$price15,$price16,$price17,$price18,$price19,$price20,$price21,$price22,$worker_id]);
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
        $delete=DB::delete('delete from hh_brickworker where brick_userid=? ',[$worker_id]);
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