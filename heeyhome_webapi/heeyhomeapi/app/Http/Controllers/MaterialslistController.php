<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/12/16
 * Time: 12:30
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class MaterialslistController extends Controller
{
    public function index(){
        $callback=rq('callback');
        $elematerialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=1');
        foreach($elematerialist as $key=>$value){
            $spec=DB::select('select spec_id,spec_name from hh_material_spec where material_id=?',[$value->material_id]);
            $elematerialist[$key]->spec=$spec;
        }
        $brickmaterialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=2');
        foreach($brickmaterialist as $key=>$value){
            $spec=DB::select('select spec_id,spec_name from hh_material_spec where material_id=?',[$value->material_id]);
            $brickmaterialist[$key]->spec=$spec;
        }
        $woodmaterialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=3');
        foreach($woodmaterialist as $key=>$value){
            $spec=DB::select('select spec_id,spec_name from hh_material_spec where material_id=?',[$value->material_id]);
            $woodmaterialist[$key]->spec=$spec;
        }
        $paintmaterialist=DB::select('select material_id,name,unit,img from hh_material_name where cate_id=3');
        foreach($paintmaterialist as $key=>$value){
            $spec=DB::select('select spec_id,spec_name from hh_material_spec where material_id=?',[$value->material_id]);
            $paintmaterialist[$key]->spec=$spec;
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