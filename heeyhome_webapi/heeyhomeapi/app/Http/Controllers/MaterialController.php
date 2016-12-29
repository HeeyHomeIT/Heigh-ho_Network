<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/25
 * Time: 10:25
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class MaterialController extends Controller
{
    public function cate(){
        $callback=rq('callback');
        $cates=DB::select('select cate_id,cate_name from hh_material_cate');
        if($cates){
            $arr = array("code" => "000",
                "data" => $cates
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function brand(){
        $callback=rq('callback');
        $brands=DB::select('select brand_id,brand_name from hh_material_brand');
        if($brands){
            $arr = array("code" => "000",
                "data" => $brands
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }
    public function materials(){
        $callback=rq('callback');
        $elematerialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=? and if_show=?',[1,1]);
        foreach($elematerialist as $key=>$value) {
            $spec = DB::select('select spec_id,spec_name from hh_material_spec where material_id=?', [$value->material_id]);
            if ($spec) {
                $elematerialist[$key]->spec = $spec;
            }
            $price = DB::select('select spec_id,spec_name from hh_material_spec where material_id=?', [$value->material_id]);
        }
        $brickmaterialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=? and if_show=?',[2,1]);
        foreach($elematerialist as $key=>$value) {
            $spec = DB::select('select spec_id,spec_name from hh_material_spec where material_id=?', [$value->material_id]);
            if ($spec) {
                $elematerialist[$key]->spec = $spec;
            }
            $price = DB::select('select spec_id,spec_name from hh_material_spec where material_id=?', [$value->material_id]);
        }
        $woodmaterialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=? and if_show=?',[3,1]);
        foreach($elematerialist as $key=>$value) {
            $spec = DB::select('select spec_id,spec_name from hh_material_spec where material_id=?', [$value->material_id]);
            if ($spec) {
                $elematerialist[$key]->spec = $spec;
            }
            $price = DB::select('select spec_id,spec_name from hh_material_spec where material_id=?', [$value->material_id]);
        }
        $paintmaterialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=? and if_show=?',[4,1]);
        foreach($elematerialist as $key=>$value) {
            $spec = DB::select('select spec_id,spec_name from hh_material_spec where material_id=?', [$value->material_id]);
            if ($spec) {
                $elematerialist[$key]->spec = $spec;
            }
            $price = DB::select('select spec_id,spec_name from hh_material_spec where material_id=?', [$value->material_id]);
        }
        $arr = array("code" => "000",
            "data" => array("ele"=>$elematerialist,
                "brick"=>$brickmaterialist,
                "wood"=>$woodmaterialist,
                "paint"=>$paintmaterialist
            )
        );
        return $callback . "(" . HHJson($arr) . ")";
    }

}