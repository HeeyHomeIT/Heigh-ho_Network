<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/3
 * Time: 18:06
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class MyworkcaseController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $foreman_id=rq('foreman_id');
        $type=rq('type');
        $where=' and (type=1 or type=2)';
        if($type){
            switch ($type){
                case 1: $where=' and type=1';
                    break;
                case 2: $where=' and type=2';
                    break;
                case 3: $where=' and type=3';
            }
        }
        $total=DB::select('select count(id) as total from hh_workcase where foreman_id=?'.$where,[$foreman_id]);
        $total=$total[0]->total;
        $newpage=new PageController();
        $offset=$newpage->page($total);
        $select=DB::select('select * from hh_workcase  where foreman_id=?'.$where.' order by id desc limit ?,?',[$foreman_id,$offset[0],$offset[1]]);
        foreach($select as $key=>$val){
            $imgs=DB::select('select img_id,case_img from hh_workcase_img where case_id=?',[$val->case_id]);
            $select[$key]->img=$imgs;
            $select[$key]->total=$total;
            if($val->type==2){
                 $order=DB::select('select order_step from hh_order where order_id=?',[$val->case_id]);
                 $select[$key]->order_step=$order[0]->order_step;
            }
            if($val->type==3){
                $order=DB::select('select order_step from hh_order where order_id=?',[$val->case_id]);
                $select[$key]->order_step=$order[0]->order_step;
            }
        }
        if($select){
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
       //return view('img');
    }
    public function add(){
        $callback=rq('callback');
        $foreman_id=rq('foreman_id');
        $housetype=rq('housetype');
        $style=rq('style');
        $area=rq('area');
        $timelong=rq('timelong');
        $address=rq('address');
        $case_id=rand_number(5);

        $count = rq('count');
        $files = array();
        if ($count) {
            for ($i=0; $i < $count; $i++) { 
                $fileName = "myfile".$i;
                if(!Request::hasFile($fileName)){
                $arr = array("code" => "121",
                    "msg" => "没有图片被上传"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
                $files[$i] = Request::file($fileName);
            }
        } else {
            $myfile=Request::file('myfile');

            if(!Request::hasFile('myfile')){
                $arr = array("code" => "121",
                    "msg" => "没有图片被上传"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }

            if (! is_array($myfile)) {
                $files = [$myfile];
            } else {
                $files = $myfile;
            }
        }

        // $files=Request::file('myfile');
        // if(!Request::hasFile('myfile')){
        //     $arr = array("code" => "121",
        //         "msg" => "没有图片被上传"
        //     );
        //     return $callback . "(" . HHJson($arr) . ")";
        // }
        // if (! is_array($files)) {
        //     $files = [$files];
        // }
        //dd($files);
        $isvalid=true;
        foreach($files as $file){
            if(!$file->isValid()){
                $isvalid=false;
            }
        }
        if($isvalid){
            $case=DB::insert('insert into hh_workcase(case_id,foreman_id,area,housetype,style,timelong,address,type) values(?,?,?,?,?,?,?,?)',[$case_id,$foreman_id,$area,$housetype,$style,$timelong,$address,1]);
            $ifinsert=false;
            foreach($files as $key=>$file){
                $clientName = $file -> getClientOriginalName();//文件原名
                $entension = $file -> getClientOriginalExtension();//扩展名
                $realPath = $file->getRealPath();   //临时文件的绝对路径
                $type = $file->getClientMimeType();
                $size=$file-> getClientSize();
                $filename=date('Ymd').md5(rand(999,10000)).'.'.$entension;
                $is = $file -> move(public_path().'/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2),$filename);
                if($is){
                    $path='api/public/uploads/'.substr($filename,0,4).'-'.substr($filename,4,2).'-'.substr($filename,6,2).'/'.$filename;
                    $insert=DB::insert('insert into hh_workcase_img(case_id,case_img) values (?,?)',[$case_id,$path]);
                    if($insert){
                        $ifinsert=true;
                    }else{
                        $ifinsert=false;
                    }
                }else{
                    $arr = array("code" => "131",
                        "msg" => "上传失败"
                    );
                    return $callback . "(" . HHJson($arr) . ")";
                }
            }
            if($ifinsert){
                $arr = array("code" => "000",
                    "msg" => "添加成功"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }else{
                $arr = array("code" => "111",
                    "msg" => "添加失败"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
        }else{
            $arr = array("code" => "132",
                "msg" => "上传的文件无效"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function del(){
        $callback=rq('callback');
        $case_id=rq('case_id');
        $del=DB::delete('delete from hh_workcase where case_id=?',[$case_id]);
        if($del){
            $delimgs=DB::delete('delete from hh_workcase_img where case_id=?',[$case_id]);
            $arr = array("code" => "000",
                "msg" => "删除成功"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
        else{
            $arr = array("code" => "111",
                "msg" => "删除失败"
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function like(){
        $callback=rq('callback');
        $case_id=rq('case_id');
        $update=DB::UPDATE('update hh_workcase set like_num=like_num+1 where case_id=?',[$case_id]);
        $select=DB::select('select like_num from hh_workcase where case_id=?',[$case_id]);
        if($select){
            $arr = array("code" => "000",
                "data" => $select[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function scan(){
        $callback=rq('callback');
        $case_id=rq('case_id');
        $update=DB::UPDATE('update hh_workcase set scan_num=scan_num+1 where case_id=?',[$case_id]);
        $select=DB::select('select scan_num from hh_workcase where case_id=?',[$case_id]);
        if($select){
            $arr = array("code" => "000",
                "data" => $select[0]
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
}