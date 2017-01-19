<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/3
 * Time: 9:28
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class WorkerController extends Controller
{
    public function workerinfo()
    {
        $callback = rq('callback');
        $cate = rq('cate_id');
        $worker_id = rq('worker_id');
        if (!$cate) {
            $arr = array("code" => "112",
                "msg" => "工种类别不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        switch ($cate) {
            case 1:
                $worker = DB::select('select hh_mixworker.*,hh_portrait.portrait_img as portrait_img from hh_mixworker left join hh_portrait on hh_portrait.portrait_userid=hh_mixworker.userid where userid=?', [$worker_id]);
                $sel = DB::select('select id,serviceitem from hh_workerprice_serviceitem where workercate=?', [$cate]);
                $cost = DB::select('select service1,service2,service3,service4,service5,service6,service7,service8,service9,service10,service11,service12,service13,service14,service15,service16 from hh_workerprice where worker_id=?', [$worker_id]);
                foreach ($sel as $key => $val) {
                    $price = DB::select('select id,servicename,unit,cost from hh_workerprice_list where serviceitem=?', [$val->id]);
                    $i = $price[0]->id;
                    foreach ($price as $k => $v) {
                        $service = 'service' . $i;
                        $price[$k]->cost = $cost[0]->$service;
                        $i++;
                        $price[$k]->id='service'.$v->id;
                    }
                    $sel[$key]->service = $price;
                }
                if ($worker) {
                    $worker[0]->pricelist = $sel;
                    $arr = array("code" => "000",
                        "data" => $worker[0]
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array("code" => "117",
                        "msg" => "信息不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 2:
                $worker = DB::select('select hh_eleworker.*,hh_portrait.portrait_img as portrait_img from hh_eleworker left join hh_portrait on hh_portrait.portrait_userid=hh_eleworker.userid where userid=?', [$worker_id]);
                $sel = DB::select('select id,serviceitem from hh_workerprice_serviceitem where workercate=?', [$cate]);
                $cost = DB::select('select service17,service18 from hh_workerprice where worker_id=?', [$worker_id]);
                foreach ($sel as $key => $val) {
                    $price = DB::select('select id,servicename,unit,cost from hh_workerprice_list where serviceitem=?', [$val->id]);
                    $i = $price[0]->id;
                    foreach ($price as $k => $v) {
                        $service = 'service' . $i;
                        $price[$k]->cost = $cost[0]->$service;
                        $i++;
                        $price[$k]->id='service'.$v->id;
                    }
                    $sel[$key]->service = $price;
                }
                if ($worker) {
                    $worker[0]->pricelist = $sel;
                    $arr = array("code" => "000",
                        "data" => $worker[0]
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array("code" => "117",
                        "msg" => "信息不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 3:
                $worker = DB::select('select hh_brickworker.*,hh_portrait.portrait_img as portrait_img from hh_brickworker left join hh_portrait on hh_portrait.portrait_userid=hh_brickworker.userid where userid=?', [$worker_id]);
                $sel = DB::select('select id,serviceitem from hh_workerprice_serviceitem where workercate=?', [$cate]);
                $cost = DB::select('select service19,service20,service21,service22,service23,service24,service25,service26,service27,service28,service29,service30,service31,service32,service33,service34,service35,service36,service37,service38,service39,service40,service41 from hh_workerprice where worker_id=?', [$worker_id]);
                foreach ($sel as $key => $val) {
                    $price = DB::select('select id,servicename,unit,cost from hh_workerprice_list where serviceitem=?', [$val->id]);
                    $i = $price[0]->id;
                    foreach ($price as $k => $v) {
                        $service = 'service' . $i;
                        $price[$k]->cost = $cost[0]->$service;
                        $i++;
                        $price[$k]->id='service'.$v->id;
                    }
                    $sel[$key]->service = $price;
                }
                if ($worker) {
                    $worker[0]->pricelist = $sel;
                    $arr = array("code" => "000",
                        "data" => $worker[0]
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array("code" => "117",
                        "msg" => "信息不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 4:
                $worker = DB::select('select hh_woodworker.*,hh_portrait.portrait_img as portrait_img from hh_woodworker left join hh_portrait on hh_portrait.portrait_userid=hh_woodworker.userid where userid=?', [$worker_id]);
                $sel = DB::select('select id,serviceitem from hh_workerprice_serviceitem where workercate=?', [$cate]);
                $cost = DB::select('select service42,service43,service44,service45,service46,service47,service48,service49,service50,service51,service52,service53 from hh_workerprice where worker_id=?', [$worker_id]);
                foreach ($sel as $key => $val) {
                    $price = DB::select('select id,servicename,unit,cost from hh_workerprice_list where serviceitem=?', [$val->id]);
                    $i = $price[0]->id;
                    foreach ($price as $k => $v) {
                        $service = 'service' . $i;
                        $price[$k]->cost = $cost[0]->$service;
                        $i++;
                        $price[$k]->id='service'.$v->id;
                    }
                    $sel[$key]->service = $price;
                }
                if ($worker) {
                    $worker[0]->pricelist = $sel;
                    $arr = array("code" => "000",
                        "data" => $worker[0]
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array("code" => "117",
                        "msg" => "信息不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 5:
                $worker = DB::select('select hh_paintworker.*,hh_portrait.portrait_img as portrait_img from hh_paintworker left join hh_portrait on hh_portrait.portrait_userid=hh_paintworker.userid where userid=?', [$worker_id]);
                $sel = DB::select('select id,serviceitem from hh_workerprice_serviceitem where workercate=?', [$cate]);
                $cost = DB::select('select service54,service55,service56,service57,service58,service59,service60,service61,service62,service63 from hh_workerprice where worker_id=?', [$worker_id]);
                foreach ($sel as $key => $val) {
                    $price = DB::select('select id,servicename,unit,cost from hh_workerprice_list where serviceitem=?', [$val->id]);
                    $i = $price[0]->id;
                    foreach ($price as $k => $v) {
                        $service = 'service' . $i;
                        $price[$k]->cost = $cost[0]->$service;
                        $i++;
                        $price[$k]->id='service'.$v->id;
                    }
                    $sel[$key]->service = $price;
                }
                if ($worker) {
                    $worker[0]->pricelist = $sel;
                    $arr = array("code" => "000",
                        "data" => $worker[0]
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                } else {
                    $arr = array("code" => "117",
                        "msg" => "信息不存在"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            default:
                $arr = array("code" => "117",
                    "msg" => "该分类不存在"
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
    }

    public function add()
    {
        $callback = rq('callback');
        $shop_id = rq('shop_id');
        $cate = rq('cate_id');
        $userid = create_pid();
        $name = rq('name');
        $sex = rq('sex');
        $age = rq('age');
        $birthplace = rq('birthplace');
        $worktime = rq('worktime');     //从业年限
        $idcard = rq('idcard');         //身份证号
        $bankname = rq('bankname');    //开户行
        $bankcard = rq('bankcard');    //银行卡号
        $phone = rq('phone');          //手机号
        $file=Request::file('myfile');
        if (!$cate) {
            $arr = array("code" => "112",
                "msg" => "工种类别不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }

        $host = "http://jisubank4.market.alicloudapi.com";
        $path = "/bankcardverify4/verify";
        $method = "GET";
        $appcode = "e52017c3b93f46588f93c5745141249d";
        $headers = array();
        array_push($headers, "Authorization:APPCODE " . $appcode);
        $querys = "bankcard=".$bankcard."&idcard=".$idcard."&mobile=".$phone."&realname=".$name;
        $url = $host . $path . "?" . $querys;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_FAILONERROR, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $json_data =curl_exec($curl);
        $array = json_decode($json_data, true);
        //var_dump($json_data);
        if ($array['status'] == '0') {
            if($array['result']['verifystatus']==0) {
                /*按工种分类插入员工信息 1：杂工 2：水电工 3：瓦工 4：木工 5：油漆工*/
                switch ($cate) {
                    case 1:
                        $service1 = rq('service1');
                        $service2 = rq('service2');
                        $service3 = rq('service3');
                        $service4 = rq('service4');
                        $service5 = rq('service5');
                        $service6 = rq('service6');
                        $service7 = rq('service7');
                        $service8 = rq('service8');
                        $service9 = rq('service9');
                        $service10 = rq('service10');
                        $service11 = rq('service11');
                        $service12 = rq('service12');
                        $service13 = rq('service13');
                        $service14 = rq('service14');
                        $service15 = rq('service15');
                        $service16 = rq('service16');
                        $insert = DB::insert('insert into hh_mixworker(userid,name,sex,age,birthplace,worktime,shopid,phone,idcard,bankname,bankcard) 
                            values (?,?,?,?,?,?,?,?,?,?,?)', [$userid, $name, $sex, $age, $birthplace, $worktime, $shop_id, $phone, $idcard, $bankname, $bankcard]);
                        $update = DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?', [$shop_id]);
                        /*头像*/
                        $clientName = $file -> getClientOriginalName();//文件原名
                        $entension = $file -> getClientOriginalExtension();//扩展名
                        $realPath = $file->getRealPath();   //临时文件的绝对路径
                        $type = $file->getClientMimeType();
                        $size=$file-> getClientSize();
                        //dd($size);
                        $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
                        /*上传图片大小不能超过2M*/
                        if($size>4*1024*1024) {
                            $arr = array("code" => "123",
                                "msg" => "图片上传出错,不能大于4M"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                        $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
                        if($is){
                            $path='api/public/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                            $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$userid, $path]);
                        }else{
                            $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$userid, 'api/public/default.jpg']);
                        }
                        $price = DB::insert('insert into hh_workerprice(worker_id,service1,service2,service3,service4,service5,service6,service7,service8,service9,service10,service11,service12,service13,service14,service15,service16) 
                               values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [$userid, $service1, $service2, $service3, $service4, $service5, $service6, $service7, $service8, $service9, $service10, $service11, $service12, $service13, $service14, $service15, $service16]);
                        if ($price) {
                            $arr = array("code" => "000",
                                "msg" => "添加成功"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        } else {
                            $arr = array("code" => "111",
                                "msg" => "添加失败"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                        break;
                    case 2:
                        $service17 = rq('service17');
                        $service18 = rq('service18');
                        $insert = DB::insert('insert into hh_eleworker(userid,name,sex,age,birthplace,worktime,shopid,phone,idcard,bankname,bankcard) 
                            values (?,?,?,?,?,?,?,?,?,?,?)', [$userid, $name, $sex, $age, $birthplace, $worktime, $shop_id, $phone, $idcard, $bankname, $bankcard]);
                        $update = DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?', [$shop_id]);
                        /*头像*/
                        $clientName = $file -> getClientOriginalName();//文件原名
                        $entension = $file -> getClientOriginalExtension();//扩展名
                        $realPath = $file->getRealPath();   //临时文件的绝对路径
                        $type = $file->getClientMimeType();
                        $size=$file-> getClientSize();
                        //dd($size);
                        $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
                        /*上传图片大小不能超过2M*/
                        if($size>4*1024*1024) {
                            $arr = array("code" => "123",
                                "msg" => "图片上传出错,不能大于4M"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                        $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
                        if($is){
                            $path='api/public/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                            $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$userid, $path]);
                        }else{
                            $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$userid, 'api/public/default.jpg']);
                        }
                        $price = DB::insert('insert into hh_workerprice(worker_id,service17,service18) 
                               values(?,?,?)', [$userid, $service17, $service18]);
                        if ($price) {
                            $arr = array("code" => "000",
                                "msg" => "添加成功"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        } else {
                            $arr = array("code" => "111",
                                "msg" => "添加失败"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                        break;
                    case 3:
                        $service19 = rq('service19');
                        $service20 = rq('service20');
                        $service21 = rq('service21');
                        $service22 = rq('service22');
                        $service23 = rq('service23');
                        $service24 = rq('service24');
                        $service25 = rq('service25');
                        $service26 = rq('service26');
                        $service27 = rq('service27');
                        $service28 = rq('service28');
                        $service29 = rq('service29');
                        $service30 = rq('service30');
                        $service31 = rq('service31');
                        $service32 = rq('service32');
                        $service33 = rq('service33');
                        $service34 = rq('service34');
                        $service35 = rq('service35');
                        $service36 = rq('service36');
                        $service37 = rq('service37');
                        $service38 = rq('service38');
                        $service39 = rq('service39');
                        $service40 = rq('service40');
                        $service41 = rq('service41');
                        $insert = DB::insert('insert into hh_brickworker(userid,name,sex,age,birthplace,worktime,shopid,phone,idcard,bankname,bankcard) 
                            values (?,?,?,?,?,?,?,?,?,?,?)', [$userid, $name, $sex, $age, $birthplace, $worktime, $shop_id, $phone, $idcard, $bankname, $bankcard]);
                        $update = DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?', [$shop_id]);
                        /*头像*/
                        $clientName = $file -> getClientOriginalName();//文件原名
                        $entension = $file -> getClientOriginalExtension();//扩展名
                        $realPath = $file->getRealPath();   //临时文件的绝对路径
                        $type = $file->getClientMimeType();
                        $size=$file-> getClientSize();
                        //dd($size);
                        $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
                        /*上传图片大小不能超过2M*/
                        if($size>4*1024*1024) {
                            $arr = array("code" => "123",
                                "msg" => "图片上传出错,不能大于4M"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                        $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
                        if($is){
                            $path='api/public/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                            $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$userid, $path]);
                        }else{
                            $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$userid, 'api/public/default.jpg']);
                        }
                        $price = DB::insert('insert into hh_workerprice(worker_id,service19,service20,service21,service22,service23,service24,service25,service26,service27,service28,service29,service30,service31,service32,service33,service34,service35,service36,service37,service38,service39,service40,service41) 
                               values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [$userid, $service19, $service20, $service21, $service22, $service23, $service24, $service25, $service26, $service27, $service28, $service29, $service30,
                            $service31, $service32, $service33, $service34, $service35, $service36, $service37, $service38, $service39, $service40, $service41]);
                        if ($price) {
                            $arr = array("code" => "000",
                                "msg" => "添加成功"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        } else {
                            $arr = array("code" => "111",
                                "msg" => "添加失败"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                    case 4:
                        $service42 = rq('service42');
                        $service43 = rq('service43');
                        $service44 = rq('service44');
                        $service45 = rq('service45');
                        $service46 = rq('service46');
                        $service47 = rq('service47');
                        $service48 = rq('service48');
                        $service49 = rq('service49');
                        $service50 = rq('service50');
                        $service51 = rq('service51');
                        $service52 = rq('service52');
                        $service53 = rq('service53');
                        $insert = DB::insert('insert into hh_woodworker(userid,name,sex,age,birthplace,worktime,shopid,phone,idcard,bankname,bankcard) 
                            values (?,?,?,?,?,?,?,?,?,?,?)', [$userid, $name, $sex, $age, $birthplace, $worktime, $shop_id, $phone, $idcard, $bankname, $bankcard]);
                        $update = DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?', [$shop_id]);
                        /*头像*/
                        $clientName = $file -> getClientOriginalName();//文件原名
                        $entension = $file -> getClientOriginalExtension();//扩展名
                        $realPath = $file->getRealPath();   //临时文件的绝对路径
                        $type = $file->getClientMimeType();
                        $size=$file-> getClientSize();
                        //dd($size);
                        $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
                        /*上传图片大小不能超过2M*/
                        if($size>4*1024*1024) {
                            $arr = array("code" => "123",
                                "msg" => "图片上传出错,不能大于4M"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                        $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
                        if($is){
                            $path='api/public/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                            $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$userid, $path]);
                        }else{
                            $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$userid, 'api/public/default.jpg']);
                        }
                        $price = DB::insert('insert into hh_workerprice(worker_id,service42,service43,service44,service45,service46,service47,service48,service49,service50,service51,service52,service53) 
                               values(?,?,?,?,?,?,?,?,?,?,?,?,?)', [$userid, $service42, $service43, $service44, $service45, $service46, $service47, $service48, $service49, $service50, $service51, $service52, $service53]);
                        if ($price) {
                            $arr = array("code" => "000",
                                "msg" => "添加成功"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        } else {
                            $arr = array("code" => "111",
                                "msg" => "添加失败"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                        break;
                    case 5:
                        $service54 = rq('service54');
                        $service55 = rq('service55');
                        $service56 = rq('service56');
                        $service57 = rq('service57');
                        $service58 = rq('service58');
                        $service59 = rq('service59');
                        $service60 = rq('service60');
                        $service61 = rq('service61');
                        $service62 = rq('service62');
                        $service63 = rq('service63');
                        $insert = DB::insert('insert into hh_paintworker(userid,name,sex,age,birthplace,worktime,shopid,phone,idcard,bankname,bankcard) 
                            values (?,?,?,?,?,?,?,?,?,?,?)', [$userid, $name, $sex, $age, $birthplace, $worktime, $shop_id, $phone, $idcard, $bankname, $bankcard]);
                        $update = DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?', [$shop_id]);
                        /*头像*/
                        $clientName = $file -> getClientOriginalName();//文件原名
                        $entension = $file -> getClientOriginalExtension();//扩展名
                        $realPath = $file->getRealPath();   //临时文件的绝对路径
                        $type = $file->getClientMimeType();
                        $size=$file-> getClientSize();
                        //dd($size);
                        $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
                        /*上传图片大小不能超过2M*/
                        if($size>4*1024*1024) {
                            $arr = array("code" => "123",
                                "msg" => "图片上传出错,不能大于4M"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                        $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
                        if($is){
                            $path='api/public/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                            $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$userid, $path]);
                        }else{
                            $portrait = DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)', [$userid, 'api/public/default.jpg']);
                        }
                        $price = DB::insert('insert into hh_workerprice(worker_id,service54,service55,service56,service57,service58,service59,service60,service61,service62,service63) 
                               values(?,?,?,?,?,?,?,?,?,?,?)', [$userid, $service54, $service55, $service56, $service57, $service58, $service59, $service60, $service61, $service62, $service63]);
                        if ($price) {
                            $arr = array("code" => "000",
                                "msg" => "添加成功"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        } else {
                            $arr = array("code" => "111",
                                "msg" => "添加失败"
                            );
                            return $callback . "(" . HHJson($arr) . ")";
                        }
                        break;
                    default:
                        $arr = array("code" => "117",
                            "msg" => "该分类不存在"
                        );
                        return $callback . "(" . HHJson($arr) . ")";
                }

            }else{
                $arr = array('code' => '130', 'msg' => $array['result']['verifymsg']);
                return $callback . "(" . HHJson($arr) . ")";
            }
        }
        else {
            $arr = array('code' => $array['status'], 'msg' => $array['msg']);
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

    public function edit()
    {
        $callback = rq('callback');
        $cate = rq('cate_id');
        $worker_id = rq('worker_id');
        $name = rq('name');
        $sex = rq('sex');
        $age = rq('age');
        $birthplace = rq('birthplace');
        $worktime = rq('worktime');     //从业年限
        $idcard = rq('idcard');         //身份证号
        $bankname = rq('bankname');    //开户行
        $bankcard = rq('bankcard');    //银行卡号
        $phone = rq('phone');          //手机号
        /*按工种分类修改员工信息 1：木工 2：水电工 3：瓦工 4：油漆工*/
        switch ($cate) {
            case 1:
                $service1 = rq('service1');
                $service2 = rq('service2');
                $service3 = rq('service3');
                $service4 = rq('service4');
                $service5 = rq('service5');
                $service6 = rq('service6');
                $service7 = rq('service7');
                $service8 = rq('service8');
                $service9 = rq('service9');
                $service10 = rq('service10');
                $service11 = rq('service11');
                $service12 = rq('service12');
                $service13 = rq('service13');
                $service14 = rq('service14');
                $service15 = rq('service15');
                $service16 = rq('service16');
                $worker = DB::update('update hh_mixworker set name=?,sex=?,age=?,birthplace=?,worktime=?,phone=?,idcard=?,bankname=?,bankcard=? where userid=? ',
                    [$name, $sex, $age, $birthplace, $worktime, $phone, $idcard, $bankname, $bankcard, $worker_id]);
                $price = DB::update('update hh_workerprice set service1=?,service2=?,service3=?,service4=?,service5=?,service6=?,service7=?,service8=?,service9=?,service10=?,service11=?,service12=?,service13=?,service14=?,service15=?,service16=? where worker_id=? ',
                    [$service1, $service2, $service3, $service4, $service5, $service6, $service7, $service8, $service9, $service10, $service11, $service12, $service13, $service14, $service15, $service16, $worker_id]);
                $arr = array("code" => "000",
                    "msg" => "修改成功",
                );
                return $callback . "(" . HHJson($arr) . ")";
                break;
            case 2:
                $service17 = rq('service17');
                $service18 = rq('service18');
                $worker = DB::update('update hh_eleworker set name=?,sex=?,age=?,birthplace=?,worktime=?,phone=?,idcard=?,bankname=?,bankcard=? where userid=? ',
                    [$name, $sex, $age, $birthplace, $worktime, $phone, $idcard, $bankname, $bankcard, $worker_id]);
                $price = DB::update('update hh_workerprice set service17=?,service18=? where worker_id=? ',
                    [$service17, $service18, $worker_id]);
                $arr = array("code" => "000",
                    "msg" => "修改成功",
                );
                return $callback . "(" . HHJson($arr) . ")";
                break;
            case 3:
                $service19 = rq('service19');
                $service20 = rq('service20');
                $service21 = rq('service21');
                $service22 = rq('service22');
                $service23 = rq('service23');
                $service24 = rq('service24');
                $service25 = rq('service25');
                $service26 = rq('service26');
                $service27 = rq('service27');
                $service28 = rq('service28');
                $service29 = rq('service29');
                $service30 = rq('service30');
                $service31 = rq('service31');
                $service32 = rq('service32');
                $service33 = rq('service33');
                $service34 = rq('service34');
                $service35 = rq('service35');
                $service36 = rq('service36');
                $service37 = rq('service37');
                $service38 = rq('service38');
                $service39 = rq('service39');
                $service40 = rq('service40');
                $service41 = rq('service41');
                $worker = DB::update('update hh_brickworker set name=?,sex=?,age=?,birthplace=?,worktime=?,phone=?,idcard=?,bankname=?,bankcard=? where userid=? ',
                    [$name, $sex, $age, $birthplace, $worktime, $phone, $idcard, $bankname, $bankcard, $worker_id]);
                $price = DB::update('update hh_workerprice set service19=?,service20=?,service21=?,service22=?,service23=?,service24=?,service25=?,service26=?,service27=?,service28=?,service29=?,service30=?,service31=?,service32=?,service33=?,service34=?,service35=?,service36=?,service37=?,service38=?,service39=?,service40=?,service41=? where worker_id=? ',
                    [$service19, $service20, $service21, $service22, $service23, $service24, $service25, $service26, $service27, $service28, $service29, $service30, $service31, $service32, $service33, $service34, $service35, $service36, $service37, $service38, $service39, $service40, $service41, $worker_id]);

                $arr = array("code" => "000",
                    "msg" => "修改成功",
                );
                return $callback . "(" . HHJson($arr) . ")";
                break;
            case 4:
                $service42 = rq('service42');
                $service43 = rq('service43');
                $service44 = rq('service44');
                $service45 = rq('service45');
                $service46 = rq('service46');
                $service47 = rq('service47');
                $service48 = rq('service48');
                $service49 = rq('service49');
                $service50 = rq('service50');
                $service51 = rq('service51');
                $service52 = rq('service52');
                $service53 = rq('service53');
                $worker = DB::update('update hh_woodworker set name=?,sex=?,age=?,birthplace=?,worktime=?,phone=?,idcard=?,bankname=?,bankcard=? where userid=? ',
                    [$name, $sex, $age, $birthplace, $worktime, $phone, $idcard, $bankname, $bankcard, $worker_id]);
                $price = DB::update('update hh_workerprice set service42=?,service43=?,service44=?,service45=?,service46=?,service47=?,service48=?,service49=?,service50=?,service51=?,service52=?,service53=? where worker_id=? ',
                    [$service42, $service43, $service44, $service45, $service46, $service47, $service48, $service49, $service50, $service51, $service52, $service53, $worker_id]);

                    $arr = array("code" => "000",
                        "msg" => "修改成功",
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                break;
            case 5:
                $service54 = rq('service54');
                $service55 = rq('service55');
                $service56 = rq('service56');
                $service57 = rq('service57');
                $service58 = rq('service58');
                $service59 = rq('service59');
                $service60 = rq('service60');
                $service61 = rq('service61');
                $service62 = rq('service62');
                $service63 = rq('service63');
                $worker = DB::update('update hh_paintworker set name=?,sex=?,age=?,birthplace=?,worktime=?,phone=?,idcard=?,bankname=?,bankcard=? where userid=? ',
                    [$name, $sex, $age, $birthplace, $worktime, $phone, $idcard, $bankname, $bankcard, $worker_id]);
                $price = DB::update('update hh_workerprice set service54=?,service55=?,service56=?,service57=?,service58=?,service59=?,service60=?,service61=?,service62=?,service63=? where worker_id=? ',
                    [$service54, $service55, $service56, $service57, $service58, $service59, $service60, $service61, $service62, $service63, $worker_id]);

                    $arr = array("code" => "000",
                        "msg" => "修改成功",
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                break;
            default:
                $arr = array("code" => "117",
                    "msg" => "该分类不存在"
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
    }

    public function del()
    {
        $callback = rq('callback');
        $cate = rq('cate_id');
        $worker_id = rq('worker_id');
        $shop_id = rq('shop_id');
        /*按工种分类删除员工信息 1：木工 2：水电工 3：瓦工 4：油漆工*/
        switch ($cate) {
            case 1:
                $delete=DB::delete('delete from hh_mixworker where userid=? ',[$worker_id]);
                if($delete){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum-1 where shop_id=?',[$shop_id]);
                    $portrait=DB::delete('delete from hh_portrait where portrait_userid=?',[$worker_id]);
                    $verify=DB::delete('delete from hh_workerprice where worker_id=?',[$worker_id]);
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
                break;
            case 2:
                $delete=DB::delete('delete from hh_eleworker where userid=? ',[$worker_id]);
                if($delete){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum-1 where shop_id=?',[$shop_id]);
                    $portrait=DB::delete('delete from hh_portrait where portrait_userid=?',[$worker_id]);
                    $verify=DB::delete('delete from hh_workerprice where worker_id=?',[$worker_id]);
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
                break;
            case 3:
                $delete=DB::delete('delete from hh_brickworker where userid=? ',[$worker_id]);
                if($delete){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum-1 where shop_id=?',[$shop_id]);
                    $portrait=DB::delete('delete from hh_portrait where portrait_userid=?',[$worker_id]);
                    $verify=DB::delete('delete from hh_workerprice where worker_id=?',[$worker_id]);
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
                break;
            case 4:
                $delete=DB::delete('delete from hh_woodworker where userid=? ',[$worker_id]);
                if($delete){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum-1 where shop_id=?',[$shop_id]);
                    $portrait=DB::delete('delete from hh_portrait where portrait_userid=?',[$worker_id]);
                    $verify=DB::delete('delete from hh_workerprice where worker_id=?',[$worker_id]);
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
                break;
            case 5:
                $delete=DB::delete('delete from hh_paintworker where userid=? ',[$worker_id]);
                if($delete){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum-1 where shop_id=?',[$shop_id]);
                    $portrait=DB::delete('delete from hh_portrait where portrait_userid=?',[$worker_id]);
                    $verify=DB::delete('delete from hh_workerprice where worker_id=?',[$worker_id]);
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
                break;
            default:
                $arr = array("code" => "117",
                    "msg" => "该分类不存在"
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
    }
}