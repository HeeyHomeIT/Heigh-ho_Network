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
        $cate_id=rq('cate_id');
        $brand=array();
        $brands=DB::select('select DISTINCT hh_materials.brand_id,hh_material_brand.brand_name from hh_materials left join hh_material_brand on hh_material_brand.brand_id=hh_materials.brand_id where hh_materials.cate_id=?',[$cate_id]);
        foreach($brands as $key=>$val){
            if($val->brand_id){
                $brand[]=$brands[$key];
            }
        }
            if($brand){
                $arr = array("code" => "000",
                    "data" => $brand
                );
                return $callback . "(" . HHJson($arr) . ")";
            }else {

                $arr = array("code" => "111",
                    "msg" => "该材料分类下没有品牌"
                );
                return $callback . "(" . HHJson($arr) . ")";
            }
    }
    public function materials(){
        $callback=rq('callback');
        $brand_id=rq('brand_id');
        $cate_id=rq('cate_id');
        $where='';
        $para=array($cate_id,1);
        if($brand_id){
            $where=' and brand_id=?';
            $para[]=$brand_id;
        }
        $elematerialist=DB::select('select * from hh_materials_material_name_view where cate_id=? and if_show=?'.$where,$para);
        foreach ($elematerialist as $key=>$val){
            $specs=DB::select('select DISTINCT hh_materials.spec_id,hh_material_spec.spec_name from hh_materials left join hh_material_spec on hh_material_spec.spec_id=hh_materials.spec_id where hh_materials.material_id=?',[$val->material_id]);
            if($specs[0]->spec_id==0)
                $elematerialist[$key]->spec=array();
            else
                $elematerialist[$key]->spec=$specs;
            $price=DB::SELECT('select DISTINCT price from hh_materials where material_id=?',[$val->material_id]);
            $elematerialist[$key]->price=$price;
        }
        $arr = array("code" => "000",
            "data" => $elematerialist
        );
        return $callback . "(" . HHJson($arr) . ")";
    }

}