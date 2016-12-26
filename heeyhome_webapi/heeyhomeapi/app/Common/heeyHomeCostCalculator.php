<?php
/**
 * TODO 成本计算器
 * User: heeyhome
 * Date: 2016/12/23
 * Time: 15:06
 */
use Illuminate\Support\Facades\DB;

function costCalculator_suzhou($area, $room_num, $parlor_num, $bathroom_num, $balcony_num)
{
    $flag = 1;
    if ($area >= 70 && $area <= 80) {
        $flag = 1;
    } else if ($area >= 80 && $area <= 90) {
        $flag = 2;
    } else if ($area >= 90 && $area <= 100) {
        $flag = 3;
    } else if ($area >= 100 && $area <= 110) {
        $flag = 4;
    } else if ($area >= 110 && $area <= 120) {
        $flag = 5;
    } else if ($area >= 120 && $area <= 140) {
        $flag = 6;
    } else if ($area >= 140 && $area <= 160) {
        $flag = 7;
    }
    //人工费用
    $sdrg = sdrg($area);
    $wgrg = wgrg($flag, $area, $room_num, $balcony_num);
    $mgrg = mgrg($flag, $area, $room_num, $balcony_num);
    $yqgrg = yqgrg($flag, $area, $room_num);
    $zgrg = zgrg($flag, $area, $room_num, $balcony_num);
    $rgzj = $sdrg + $wgrg + $mgrg + $yqgrg + $zgrg;
    //辅材费用
    $zdsdcl = zdsdcl($flag, $area);
    $gdsdcl = gdsdcl($flag, $area);
    $wgfc = wgfc($flag, $area, $room_num, $bathroom_num, $balcony_num);
    $mgfc = mgfc($flag, $area, $room_num, $balcony_num);
    $yqcl = yqcl($flag, $area, $room_num, $balcony_num);
    //主材费用
    $czdd = 0;
    $czgd = 0;
    $bc = 0;
    $dls = 0;
    $db = 0;
    $mm = 0;
    $cfym = 0;
    $lyfym = 0;
    $ygym = 0;
    $jcdd = 0;
    $cgsys = 0;
    $zxzj = $rgzj + $zdsdcl + $gdsdcl + $wgfc + $mgfc + $yqcl;
    return array(
        "sdrg" => $sdrg,
        "wgrg" => $wgrg,
        "mgrg" => $mgrg,
        "yqgrg" => $yqgrg,
        "zgrg" => $zgrg,
        "rgzj" => $rgzj,
        "zdsdcl" => $zdsdcl,
        "gdsdcl" => $gdsdcl,
        "wgfc" => $wgfc,
        "mgfc" => $mgfc,
        "yqcl" => $yqcl,
        "czdd" => $czdd,
        "czgd" => $czgd,
        "bc" => $bc,
        "dls" => $dls,
        "db" => $db,
        "mm" => $mm,
        "cfym" => $cfym,
        "lyfym" => $lyfym,
        "ygym" => $ygym,
        "jcdd" => $jcdd,
        "cgsys" => $cgsys,
        "zxzj" => $zxzj
    );
}