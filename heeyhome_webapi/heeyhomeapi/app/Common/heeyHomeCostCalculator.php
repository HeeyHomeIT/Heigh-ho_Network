<?php
/**
 * TODO 成本计算器
 * User: heeyhome
 * Date: 2016/12/23
 * Time: 15:06
 */
use Illuminate\Support\Facades\DB;

function costCalculator_suzhou($calculator_arr)
{
    //计算器数据分离
    //基础信息
    $area = $calculator_arr['area'];
    $room_num = $calculator_arr['room_num'];
    $parlor_num = $calculator_arr['parlor_num'];
    $bathroom_num = $calculator_arr['bathroom_num'];
    $balcony_num = $calculator_arr['balcony_num'];
    //其他辅助信息
    $floor = $calculator_arr['floor'];
    $wall = $calculator_arr['wall'];
    $ground_sank = $calculator_arr['ground_sank'];
    //其他基础信息
    //房间分配 TODO 例：array('master'=>'1','second'=>'1','child'=>'1','parent'=>'0','cloakroom'=>'0','study'=>'0')
    $room_distribution = $calculator_arr['room_distribution'];
    if ($room_distribution['master'] != 0) {
        //房间内设计 TODO 例：array('ground'=>'smdb','wardrobe'=>'true','ceiling'=>'true','wallpaper'=>'false','window'=>'true')
        $master_distribution = $calculator_arr['master_distribution'];
        //地面处理方式 TODO 例：实木地板：smdb 强化复合地板：qhfhdb 瓷砖：cz
        $master_ground = $master_distribution['ground'];
        //衣柜制作方式 TODO 例：木工制作衣柜：true 自行购买衣柜：false
        $master_wardrobe = $master_distribution['wardrobe'];
        //木工制作吊顶 TODO 例：需要：true 不需要：false
        $master_ceiling = $master_distribution['ceiling'];
        //墙面铺设墙纸 TODO 例：需要：true 不需要：false
        $master_wallpaper = $master_distribution['wallpaper'];
        //有无飘窗结构 TODO 例：有飘窗：true 没有飘窗：false
        $master_window = $master_distribution['window'];
    }
    if ($room_distribution['second'] != 0) {
        $second_distribution = $calculator_arr['second_distribution'];
        $second_ground = $second_distribution['ground'];
        $second_wardrobe = $second_distribution['wardrobe'];
        $second_ceiling = $second_distribution['ceiling'];
        $second_wallpaper = $second_distribution['wallpaper'];
        $second_window = $second_distribution['window'];
    }
    if ($room_distribution['child'] != 0) {
        $child_distribution = $calculator_arr['child_distribution'];
        $child_ground = $child_distribution['ground'];
        $child_wardrobe = $child_distribution['wardrobe'];
        $child_ceiling = $child_distribution['ceiling'];
        $child_wallpaper = $child_distribution['wallpaper'];
        $child_window = $child_distribution['window'];
        //榻榻米的制作 TODO 例：木工制作榻榻米：true 自行购买榻榻米：false
        $child_tatami = $child_distribution['tatami'];
        //书桌书架选择 TODO 例：木工制作简易书桌书架：true 购买成品书桌书架：false
        $child_desk = $child_distribution['desk'];
    }
    if ($room_distribution['parent'] != 0) {
        $parent_distribution = $calculator_arr['parent_distribution'];
        $parent_ground = $parent_distribution['ground'];
        $parent_wardrobe = $parent_distribution['wardrobe'];
        $parent_ceiling = $parent_distribution['ceiling'];
        $parent_wallpaper = $parent_distribution['wallpaper'];
        $parent_window = $parent_distribution['window'];
    }
    if ($room_distribution['cloakroom'] != 0) {
        $cloakroom_distribution = $calculator_arr['cloakroom_distribution'];
        $cloakroom_ground = $cloakroom_distribution['ground'];
        $cloakroom_wardrobe = $cloakroom_distribution['wardrobe'];
        $cloakroom_ceiling = $cloakroom_distribution['ceiling'];
        $cloakroom_wallpaper = $cloakroom_distribution['wallpaper'];
        $cloakroom_window = $cloakroom_distribution['window'];
    }
    if ($room_distribution['study'] != 0) {
        $study_distribution = $calculator_arr['study_distribution'];
        $study_ground = $study_distribution['ground'];
        $study_ceiling = $study_distribution['ceiling'];
        $study_wallpaper = $study_distribution['wallpaper'];
        $study_window = $study_distribution['window'];
        $study_tatami = $study_distribution['tatami'];
        //书桌书架选择 TODO 例：木工制作简易书桌书柜：true 购买成品书桌书柜：false
        $study_bookcase = $study_distribution['bookcase'];
    }
    //客餐厅
    $parlor_distribution = $calculator_arr['parlor_distribution'];
    $parlor_ground = $parlor_distribution['ground'];
    $parlor_ceiling = $parlor_distribution['ceiling'];
    //鞋柜制作方式 TODO 例：木工制作鞋柜：true 自行购买鞋柜：false
    $parlor_shoebox = $parlor_distribution['shoebox'];
    //酒柜制作方式 TODO 例：木工制作酒柜：true 自行购买酒柜：false
    $parlor_wine_cabinet = $parlor_distribution['wine_cabinet'];
    $parlor_wallpaper = $parlor_distribution['wallpaper'];
    //阳台
    $balcony_distribution = $calculator_arr['balcony_distribution'];
    $balcony_ground = $balcony_distribution['ground'];
    //木工制作吊柜 TODO 例：需要：true 不需要：false
    $balcony_hanging_cabinet = $balcony_distribution['hanging_cabinet'];
    //厨房
    $kitchen_distribution = $calculator_arr['kitchen_distribution'];
    $kitchen_ground = $kitchen_distribution['ground'];
    //木工制作厨柜 TODO 例：需要：true 不需要：false
    $kitchen_cupboard = $kitchen_distribution['cupboard'];

    //是否超出计算面积
    if ($area < 70 || $area > 160) {
        $arr = array(
            "code" => "200",
            "msg" => "参数错误，面积不在计算器计算范围",
            "data" => ""
        );
        return $arr;
    }
    if (($area == null) || ($room_num == null) || ($parlor_num == null) || ($bathroom_num == null) || ($balcony_num == null)) {
        $arr = array(
            "code" => "200",
            "msg" => "参数错误",
            "data" => ""
        );
        return $arr;
    }

    $flag = 1;
//    if ($area >= 70 && $area <= 80) {
//        $flag = 1;
//    } else if ($area >= 80 && $area <= 90) {
//        $flag = 2;
//    } else if ($area >= 90 && $area <= 100) {
//        $flag = 3;
//    } else if ($area >= 100 && $area <= 110) {
//        $flag = 4;
//    } else if ($area >= 110 && $area <= 120) {
//        $flag = 5;
//    } else if ($area >= 120 && $area <= 140) {
//        $flag = 6;
//    } else if ($area >= 140 && $area <= 160) {
//        $flag = 7;
//    }
    //人工费用
    $gzrg = $area * 50;
    $sdrg = sdrg($area);
    $wgrg = wgrg($flag, $area, $room_num, $balcony_num, $parlor_ground);
    $mgrg = mgrg($flag, $area, $room_num, $balcony_num, $kitchen_cupboard);
    $yqgrg = yqgrg($flag, $area, $room_num);
    $zgrg = zgrg($flag, $area, $room_num, $balcony_num);
    $rgzj = $gzrg + $sdrg + $wgrg + $mgrg + $yqgrg + $zgrg;
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
        "gzrg" => $gzrg,
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