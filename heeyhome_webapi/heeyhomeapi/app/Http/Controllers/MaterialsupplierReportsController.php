<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2017/1/19
 * Time: 15:49
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class MaterialsupplierReportsController extends Controller
{
    public function monthlyReport()
    {
        $material_supplier_id = rq('material_supplier_id');
        $month = rq('month');
        $callback = rq('callback');
        $monthly = substr($month, 0, 4) . "-" . substr($month, 4, 2);
        $where = '';
        if ($month) {
            $where .= ' AND material_time LIKE "' . $monthly . '%"';
        }
        $sel_order_material_1 = DB::select('SELECT SUM(material_price) AS material_price FROM hh_order_material WHERE material_supplier_id = ? AND pay_status = ? AND material_type = ?' . $where,
            [$material_supplier_id, 3, 1]);
        $sel_order_material_2 = DB::select('SELECT SUM(material_price) AS material_price FROM hh_order_material WHERE material_supplier_id = ? AND pay_status = ? AND material_type = ?' . $where,
            [$material_supplier_id, 3, 2]);
        $sel_order_material_3 = DB::select('SELECT SUM(material_price) AS material_price FROM hh_order_material WHERE material_supplier_id = ? AND pay_status = ? AND material_type = ?' . $where,
            [$material_supplier_id, 3, 3]);
        $sel_order_material_4 = DB::select('SELECT SUM(material_price) AS material_price FROM hh_order_material WHERE material_supplier_id = ? AND pay_status = ? AND material_type = ?' . $where,
            [$material_supplier_id, 3, 4]);
        $sel_order_material_5 = DB::select('SELECT SUM(material_price) AS material_price FROM hh_order_material WHERE material_supplier_id = ? AND pay_status = ? AND material_type = ?' . $where,
            [$material_supplier_id, 3, 5]);
        if ($sel_order_material_1[0]->material_price == "") $sel_order_material_1[0]->material_price = 0;
        if ($sel_order_material_2[0]->material_price == "") $sel_order_material_2[0]->material_price = 0;
        if ($sel_order_material_3[0]->material_price == "") $sel_order_material_3[0]->material_price = 0;
        if ($sel_order_material_4[0]->material_price == "") $sel_order_material_4[0]->material_price = 0;
        if ($sel_order_material_5[0]->material_price == "") $sel_order_material_5[0]->material_price = 0;
        $arr = array(
            "code" => "000",
            "msg" => "查询成功",
            "data" => array(
                '1' => $sel_order_material_1[0]->material_price,
                '2' => $sel_order_material_2[0]->material_price,
                '3' => $sel_order_material_3[0]->material_price,
                '4' => $sel_order_material_4[0]->material_price,
                '5' => $sel_order_material_5[0]->material_price,
            )
        );
        return $callback . "(" . HHJson($arr) . ")";
    }

}