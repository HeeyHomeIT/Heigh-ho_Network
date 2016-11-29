<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/14
 * Time: 9:42
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class MyworkersController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $shop_id=rq('shop_id');
        if(!$shop_id){
            $arr=array("code"=>"112",
                "msg"=>"店铺id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        $woodworker=DB::select('select hh_woodworker.*,hh_portrait.portrait_img as portrait_img from hh_woodworker left join hh_portrait on hh_portrait.portrait_userid=hh_woodworker.wood_userid where wood_shopid=?',[$shop_id]);
        $eleworker=DB::select('select hh_eleworker.*,hh_portrait.portrait_img as portrait_img from hh_eleworker left join hh_portrait on hh_portrait.portrait_userid=hh_eleworker.ele_userid where ele_shopid=?',[$shop_id]);
        $brickworker=DB::select('select hh_brickworker.*,hh_portrait.portrait_img as portrait_img from hh_brickworker left join hh_portrait on hh_portrait.portrait_userid=hh_brickworker.brick_userid where brick_shopid=?',[$shop_id]);
        $paintworker=DB::select('select hh_paintworker.*,hh_portrait.portrait_img as portrait_img from hh_paintworker left join hh_portrait on hh_portrait.portrait_userid=hh_paintworker.paint_userid where paint_shopid=?',[$shop_id]);
        $arr=array("code"=>"000",
            "data"=>array("woodworker"=>$woodworker,
                "eleworker"=>$eleworker,
                "brickworker"=>$brickworker,
                "paintworker"=>$paintworker
            )
        );
        return $callback . "(" . HHJson($arr) . ")";
    }
    public function add(){
        $callback=rq('callback');
        $cate=rq('category');
        $shop_id=rq('shop_id');
        $userid=create_pid();
        $name=rq('name');
        $sex=rq('sex');
        $age=rq('age');
        $birthplace=rq('birthplace');
        $worktime=rq('worktime');
        $wages=rq('wages');
        if(!$shop_id){
            $arr=array("code"=>"112",
                "msg"=>"店铺id不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        if(!$cate){
            $arr=array("code"=>"112",
                "msg"=>"工种类别不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*按工种分类插入员工信息 1：木工 2：水电工 3：瓦工 4：油漆工*/
        switch ($cate){
            case 1:
                $insert=DB::insert('insert into hh_woodworker(wood_userid,wood_name,wood_sex,wood_age,wood_birthplace,wood_worktime,wood_wages,wood_shopid) values (?,?,?,?,?,?,?,?)',[$userid,$name,$sex,$age,$birthplace,$worktime,$wages,$shop_id]);
                if($insert){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?',[$shop_id]);
                    $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$userid,'default.jpg']);
                    $arr=array("code"=>"000",
                        "msg"=>"添加成功",
                        "data"=>array(
                            "wood_userid"=>$userid,
                            "wood_name"=>$name,
                            "wood_sex"=>$sex,
                            "wood_age"=>$age,
                            "wood_birthplace"=>$birthplace,
                            "wood_worktime"=>$worktime,
                            "wood_wages"=>$wages
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr=array("code"=>"111",
                        "msg"=>"添加失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 2:
                $insert=DB::insert('insert into hh_eleworker(ele_userid,ele_name,ele_sex,ele_age,ele_birthplace,ele_worktime,ele_wages,ele_shopid) values (?,?,?,?,?,?,?,?)',[$userid,$name,$sex,$age,$birthplace,$worktime,$wages,$shop_id]);
                if($insert){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?',[$shop_id]);
                    $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$userid,'default.jpg']);
                    $arr=array("code"=>"000",
                        "msg"=>"添加成功",
                        "data"=>array(
                            "ele_userid"=>$userid,
                            "ele_name"=>$name,
                            "ele_sex"=>$sex,
                            "ele_age"=>$age,
                            "ele_birthplace"=>$birthplace,
                            "ele_worktime"=>$worktime,
                            "ele_wages"=>$wages
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr=array("code"=>"111",
                        "msg"=>"添加失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 3:
                $insert=DB::insert('insert into hh_brickworker(brick_userid,brick_name,brick_sex,brick_age,brick_birthplace,brick_worktime,brick_wages,brick_shopid) values (?,?,?,?,?,?,?,?)',[$userid,$name,$sex,$age,$birthplace,$worktime,$wages,$shop_id]);
                if($insert){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?',[$shop_id]);
                    $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$userid,'default.jpg']);
                    $arr=array("code"=>"000",
                        "msg"=>"添加成功",
                        "data"=>array(
                            "brick_userid"=>$userid,
                            "brick_name"=>$name,
                            "brick_sex"=>$sex,
                            "brick_age"=>$age,
                            "brick_birthplace"=>$birthplace,
                            "brick_worktime"=>$worktime,
                            "brick_wages"=>$wages
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr=array("code"=>"111",
                        "msg"=>"添加失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 4:
                $insert=DB::insert('insert into hh_paintworker(paint_userid,paint_name,paint_sex,paint_age,paint_birthplace,paint_worktime,paint_wages,paint_shopid) values (?,?,?,?,?,?,?,?)',[$userid,$name,$sex,$age,$birthplace,$worktime,$wages,$shop_id]);
                if($insert){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum+1 where shop_id=?',[$shop_id]);
                    $portrait=DB::insert('insert into hh_portrait(portrait_userid,portrait_img) values(?,?)',[$userid,'default.jpg']);
                    $arr=array("code"=>"000",
                        "msg"=>"添加成功",
                        "data"=>array(
                            "paint_userid"=>$userid,
                            "paint_name"=>$name,
                            "paint_sex"=>$sex,
                            "paint_age"=>$age,
                            "paint_birthplace"=>$birthplace,
                            "paint_worktime"=>$worktime,
                            "paint_wages"=>$wages
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr=array("code"=>"111",
                        "msg"=>"添加失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            default:
                $arr=array("code"=>"117",
                    "msg"=>"该分类不存在"
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function edit(){
        $callback=rq('callback');
        $cate=rq('category');
        $worker_id=rq('worker_id');
        $name=rq('name');
        $sex=rq('sex');
        $age=rq('age');
        $birthplace=rq('birthplace');
        $worktime=rq('worktime');
        $wages=rq('wages');
        if(!$cate){
            $arr=array("code"=>"112",
                "msg"=>"工种类别不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*按工种分类修改员工信息 1：木工 2：水电工 3：瓦工 4：油漆工*/
        switch ($cate){
            case 1:
                $update=DB::update('update hh_woodworker set wood_name=?,wood_sex=?,wood_age=?,wood_birthplace=?,wood_worktime=?,wood_wages=? where wood_userid=? ',
                    [$name,$sex,$age,$birthplace,$worktime,$wages,$worker_id]);
                if($update){
                    $arr=array("code"=>"000",
                        "msg"=>"修改成功",
                        "data"=>array(
                            "wood_userid"=>$worker_id,
                            "wood_name"=>$name,
                            "wood_sex"=>$sex,
                            "wood_age"=>$age,
                            "wood_birthplace"=>$birthplace,
                            "wood_worktime"=>$worktime,
                            "wood_wages"=>$wages
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr=array("code"=>"111",
                        "msg"=>"修改失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 2:
                $update=DB::update('update hh_eleworker set ele_name=?,ele_sex=?,ele_age=?,ele_birthplace=?,ele_worktime=?,ele_wages=? where ele_userid=? ',
                    [$name,$sex,$age,$birthplace,$worktime,$wages,$worker_id]);
                if($update){
                    $arr=array("code"=>"000",
                        "msg"=>"修改成功",
                        "data"=>array(
                            "ele_userid"=>$worker_id,
                            "ele_name"=>$name,
                            "ele_sex"=>$sex,
                            "ele_age"=>$age,
                            "ele_birthplace"=>$birthplace,
                            "ele_worktime"=>$worktime,
                            "ele_wages"=>$wages
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr=array("code"=>"111",
                        "msg"=>"修改失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 3:
                $update=DB::update('update hh_brickworker set brick_name=?,brick_sex=?,brick_age=?,brick_birthplace=?,brick_worktime=?,brick_wages=? where brick_userid=? ',
                    [$name,$sex,$age,$birthplace,$worktime,$wages,$worker_id]);
                if($update){
                    $arr=array("code"=>"000",
                        "msg"=>"修改成功",
                        "data"=>array(
                            "brick_userid"=>$worker_id,
                            "brick_name"=>$name,
                            "brick_sex"=>$sex,
                            "brick_age"=>$age,
                            "brick_birthplace"=>$birthplace,
                            "brick_worktime"=>$worktime,
                            "brick_wages"=>$wages
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr=array("code"=>"111",
                        "msg"=>"修改失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            case 4:
                $update=DB::update('update hh_paintworker set paint_name=?,paint_sex=?,paint_age=?,paint_birthplace=?,paint_worktime=?,paint_wages=? where paint_userid=? ',
                    [$name,$sex,$age,$birthplace,$worktime,$wages,$worker_id]);
                if($update){
                    $arr=array("code"=>"000",
                        "msg"=>"修改成功",
                        "data"=>array(
                            "paint_userid"=>$worker_id,
                            "paint_name"=>$name,
                            "paint_sex"=>$sex,
                            "paint_age"=>$age,
                            "paint_birthplace"=>$birthplace,
                            "paint_worktime"=>$worktime,
                            "paint_wages"=>$wages
                        )
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }else{
                    $arr=array("code"=>"111",
                        "msg"=>"修改失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
                break;
            default:
                $arr=array("code"=>"117",
                    "msg"=>"该分类不存在"
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function del(){
        $callback=rq('callback');
        $cate=rq('category');
        $shop_id=rq('shop_id');
        $worker_id=rq('worker_id');
        if(!$cate){
            $arr=array("code"=>"112",
                "msg"=>"工种类别不能为空"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        /*按工种分类删除员工信息 1：木工 2：水电工 3：瓦工 4：油漆工*/
        switch ($cate){
            case 1:
                $delete=DB::delete('delete from hh_woodworker where wood_userid=? ',[$worker_id]);
                if($delete){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum-1 where shop_id=?',[$shop_id]);
                    $portrait=DB::delete('delete from hh_portrait where portrait_userid=?',[$worker_id]);
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
                $delete=DB::delete('delete from hh_eleworker where ele_userid=? ',[$worker_id]);
                if($delete){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum-1 where shop_id=?',[$shop_id]);
                    $portrait=DB::delete('delete from hh_portrait where portrait_userid=?',[$worker_id]);
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
                $delete=DB::delete('delete from hh_brickworker where brick_userid=? ',[$worker_id]);
                if($delete){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum-1 where shop_id=?',[$shop_id]);
                    $portrait=DB::delete('delete from hh_portrait where portrait_userid=?',[$worker_id]);
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
                $delete=DB::delete('delete from hh_paintworker where paint_userid=? ',[$worker_id]);
                if($delete){
                    $update=DB::update('update hh_shop set shop_workernum=shop_workernum-1 where shop_id=?',[$shop_id]);
                    $portrait=DB::delete('delete from hh_portrait where portrait_userid=?',[$worker_id]);
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
                $arr=array("code"=>"117",
                    "msg"=>"该分类不存在"
                );
                return $callback . "(" . HHJson($arr) . ")";
        }
    }
}