<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/10/14
 * Time: 10:40
 */
use Illuminate\Support\Facades\DB;
function create_pid()
{
    //生成唯一ID——PID
    return md5(uniqid());
}
function rand_number($length=6){
    if($length<1){
        $length=6;
    }
    $min=1;
    for($i=0;$i<$length-1;$i++){
        $min=$min*10;
    }
    $max=$min*10-1;
    return rand($min,$max);
}
function personal($user_id){
    $foreman=DB::select('select a.foremaninfo_realname,b.portrait_img from hh_foremaninfo a LEFT OUTER JOIN hh_portrait b ON a.foremaninfo_userid = b.portrait_userid where foremaninfo_userid=? ',[$user_id]);
    if($foreman){
        $arr =array('name'=>$foreman[0]->foremaninfo_realname,
            "portrait"=>$foreman[0]->portrait_img,
                "type"=>6,
            "typename"=>"工长"
        );
        return $arr;
    }
    $mixworker=DB::select('select a.name,b.portrait_img from hh_mixworker a LEFT OUTER JOIN hh_portrait b ON a.userid = b.portrait_userid where userid=? ',[$user_id]);
    if($mixworker){
        $arr =array('name'=>$mixworker[0]->name,
            "portrait"=>$mixworker[0]->portrait_img,
                "type"=>1,
                "typename"=>"杂工"
        );
        return $arr;
    }
    $eleworker=DB::select('select a.name,b.portrait_img from hh_eleworker a LEFT OUTER JOIN hh_portrait b ON a.userid = b.portrait_userid where userid=? ',[$user_id]);
    if($eleworker){
        $arr = array('name'=>$eleworker[0]->name,
            "portrait"=>$eleworker[0]->portrait_img,
                "type"=>2,
            "typename"=>"水电工"
        );
        return $arr;
    }
    $brickworker=DB::select('select a.name,b.portrait_img from hh_brickworker a LEFT OUTER JOIN hh_portrait b ON a.userid = b.portrait_userid where userid=? ',[$user_id]);
    if($brickworker){
        $arr = array('name'=>$brickworker[0]->name,
            "portrait"=>$brickworker[0]->portrait_img,
                "type"=>3,
            "typename"=>"瓦工"
        );
        return $arr;
    }
    $woodworker=DB::select('select a.name,b.portrait_img from hh_woodworker a LEFT OUTER JOIN hh_portrait b ON a.userid = b.portrait_userid where userid=? ',[$user_id]);
    if($woodworker){
        $arr = array('name'=>$woodworker[0]->name,
            "portrait"=>$woodworker[0]->portrait_img,
                "type"=>4,
            "typename"=>"木工"
        );
        return $arr;
    }
    $paintworker=DB::select('select a.name,b.portrait_img from hh_paintworker a LEFT OUTER JOIN hh_portrait b ON a.userid = b.portrait_userid where userid=? ',[$user_id]);
    if($paintworker){
        $arr =array('name'=>$paintworker[0]->name,
            "portrait"=>$paintworker[0]->portrait_img,
                "type"=>5,
            "typename"=>"油漆工"
        );
        return $arr;
    }
}