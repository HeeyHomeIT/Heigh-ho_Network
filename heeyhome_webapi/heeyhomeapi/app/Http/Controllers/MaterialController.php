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
    public function category(){
        $callback=rq('callback');
        $cates=DB::select('select * from hh_materialcate');
        if($cates){
            $arr = array("code" => "000",
                "data" => $cates
            );
            return $callback . "(" . HHJson($arr) . ")";
        }
    }

}