<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/10/25
 * Time: 15:27
 */

namespace App\Http\Controllers;


use App\Driveaddress;
use Illuminate\Support\Facades\DB;

class DriveaddressController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        if(!$user_id){
            $arr = array("code" => "112",
                "msg" => "用户id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $address=DB::select('select * from hh_driveaddress where address_userid=? order by id desc',[$user_id]);
        if($address){
            $arr = array("code" => "000",
                "data"=> $address
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg"=> "未找到信息"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function add(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $receiver=rq('receiver');
        $province=rq('province');
        $city=rq('city');
        $district=rq('district');
        $address=rq('address');
        $zipcode=rq('zipcode');
        $mobile=rq('mobile');
        $default=rq('is_default');
        if(!($user_id && $receiver && $province && $city && $district && $address && $zipcode && $mobile && $default) ){
            $arr = array("code" => "112",
                "msg"=> "参数不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $insert=DB::insert('insert into hh_driveaddress(receiver,province,city,district,address,zipcode,mobile,address_userid,is_default) values (?,?,?,?,?,?,?,?,?)',
            [$receiver,$province,$city,$district,$address,$zipcode,$mobile,$user_id,$default]);
        if($insert){
            $arr = array("code" => "000",
                "msg"=> "添加成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg"=> "添加失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function edit(){
        $callback=rq('callback');
        $address_id=rq('id');
        if (!$address_id) {
            $arr = array("code" => "112",
                "msg" => "id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $driveaddress=new Driveaddress();
        $address=$driveaddress->find($address_id);
        if(!$driveaddress){
            $arr = array("code" => "117",
                "msg" => "地址不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $receiver=rq('receiver');
        $province=rq('province');
        $city=rq('city');
        $district=rq('district');
        $address=rq('address');
        $zipcode=rq('zipcode');
        $mobile=rq('mobile');
        $is_default=rq('is_default');
        if($receiver) $driveaddress->receiver=$receiver;
        if($province) $driveaddress->province=$province;
        if($city) $driveaddress->city=$city;
        if($district) $driveaddress->district=$district;
        if($address) $driveaddress->address=$address;
        if($zipcode) $driveaddress->zipcode=$zipcode;
        if($mobile) $driveaddress->mobile=$mobile;
        if($is_default) $driveaddress->is_default=$is_default;
        if($driveaddress->save()){
            $arr = array("code" => "000",
                "msg" => "修改成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg" => "修改失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function del(){
        $callback=rq('callback');
        $address_id=rq('id');
        if (!$address_id) {
            $arr = array("code" => "112",
                "msg" => "id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $address=DB::delete('delete from hh_driveaddress where id=?',[$address_id]);
        if($address){
            $arr = array("code" => "000",
                "msg" => "删除成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "117",
                "msg" => "删除失败，地址不存在"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function setdefault(){
        $callback=rq('callback');
        $address_id=rq('id');
        $user_id=rq('user_id');
        if (!$address_id) {
            $arr = array("code" => "112",
                "msg" => "id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*将该用户id下的所有收货地址的is_default字段设置为2*/
        $update=DB::update('update hh_driveaddress set is_default=2 where address_userid=?',[$user_id]);
        /*将传递过来的地址id的is_default字段设置为1*/
        $set=DB::update('update hh_driveaddress set is_default=1 where id=?',[$address_id]);
        if($set){
            $arr = array("code" => "000",
                "data" => array(
                    "address_id"=>$address_id
                )
            );
            return $callback . "(" . HHJson($arr) . ")";
        }else{
            $arr = array("code" => "111",
                "msg" => "失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}