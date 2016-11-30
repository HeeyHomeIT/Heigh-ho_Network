<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/30
 * Time: 13:41
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class PaintworkerController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
        $paintworker=DB::select('select hh_paintworker.*,hh_portrait.portrait_img as portrait_img from hh_paintworker left join hh_portrait on hh_portrait.portrait_userid=hh_paintworker.paint_userid where paint_shopid=?',[$shop_id]);
        foreach($paintworker as $key=>$val){
            $sel=DB::select('select * from hh_verify where verify_userid=?',[$val->paint_userid]);
            if($sel){
                $paintworker[$key]->phone=$sel[0]->verify_phone;
                $paintworker[$key]->idcard=$sel[0]->verify_idcard;
                $paintworker[$key]->backcard=$sel[0]->verify_bankcard;
                $paintworker[$key]->bank=$sel[0]->verify_bank;
            }else{
                $paintworker[$key]->phone=null;
                $paintworker[$key]->idcard=null;
                $paintworker[$key]->backcard=null;
                $paintworker[$key]->bank=null;
            }
        }
        $arr=array("code"=>"000",
            "data"=>$paintworker
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
        $insert=DB::insert('insert into hh_paintworker(paint_userid,paint_name,paint_sex,paint_age,paint_birthplace,paint_worktime,paint_shopid,paint_price1,paint_price2,paint_price3,paint_price4,paint_price5,paint_price6,paint_price7,paint_price8,paint_price9,paint_price10) 
                            values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[$userid,$name,$sex,$age,$birthplace,$worktime,$shop_id,$price1,$price2,$price3,$price4,$price5,$price6,$price7,$price8,$price9,$price10]);
        if($insert){
            $update=DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?',[$shop_id]);
            $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$userid,'default.jpg']);
            $card=DB::insert('insert into hh_verify (verify_userid,verify_name,verify_idcard,verify_bankcard,verify_phone,verify_bank) values(?,?,?,?,?,?)',[$userid,$name,$idcard,$bankcard,$phone,$bank]);
            $arr=array("code"=>"000",
                "msg"=>"添加成功",
                "data"=>array(
                    "paint_userid"=>$userid,
                    "paint_name"=>$name,
                    "paint_sex"=>$sex,
                    "paint_age"=>$age,
                    "paint_birthplace"=>$birthplace,
                    "paint_worktime"=>$worktime,
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
        $update=DB::update('update hh_paintworker set paint_name=?,paint_sex=?,paint_age=?,paint_birthplace=?,paint_worktime=?,paint_price1=?,paint_price2=?,paint_price3=?,paint_price4=?,paint_price5=?,paint_price6=?,paint_price7=?,paint_price8=?,paint_price9=?,paint_price10=? where paint_userid=? ',
            [$name,$sex,$age,$birthplace,$worktime,$price1,$price2,$price3,$price4,$price5,$price6,$price7,$price8,$price9,$price10,$worker_id]);
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
        $delete=DB::delete('delete from hh_paintworker where paint_userid=? ',[$worker_id]);
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