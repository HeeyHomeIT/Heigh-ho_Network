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
    $wardrobe_num = 0;
    $room_ceiling = array(0, 0, 0, 0);
    $ceiling = 0;
    $desk_num = 0;
    $tatami_num = 0;
    $room_wallpaper = array(0, 0, 0, 0);
    $wallpaper = 0;
    $cloakroom_wardrobe = 0;
    $pc = 0;
    $ground_way_cz = array(0, 0, 0, 0);
    $ground_way_num_cz = 0;
    $ground_way_sm = array(0, 0, 0, 0);
    $ground_way_num_sm = 0;
    $ground_way_fh = array(0, 0, 0, 0);
    $ground_way_num_fh = 0;
    $sm_kt = 0;
    $fh_kt = 0;
    $cz_kt = 0;
    $ymjyg = 0;
    $cg = 0;
    $jg = 0;
    $xg = 0;
    $dg = 0;
    if ($room_distribution['master'] != 0) {
        //房间内设计 TODO 例：array('ground'=>'smdb','wardrobe'=>'true','ceiling'=>'true','wallpaper'=>'false','window'=>'true')
        $master_distribution = $calculator_arr['master_distribution'];
        //地面处理方式 TODO 例：实木地板：smdb 强化复合地板：qhfhdb 瓷砖：cz
        $master_ground = $master_distribution['ground'];
        switch ($master_ground) {
            case 'cz':
                $ground_way_cz[$ground_way_num_cz] = 1;
                $ground_way_num_cz++;
                break;
            case 'smdb':
                $ground_way_sm[$ground_way_num_sm] = 1;
                $ground_way_num_sm++;
                break;
            case 'qhfhdb':
                $ground_way_fh[$ground_way_num_fh] = 1;
                $ground_way_num_fh++;
                break;
        }
        //衣柜制作方式 TODO 例：木工制作衣柜：true 自行购买衣柜：false
        $master_wardrobe = $master_distribution['wardrobe'];
        if ($master_wardrobe) $wardrobe_num++;
        //木工制作吊顶 TODO 例：需要：true 不需要：false
        $master_ceiling = $master_distribution['ceiling'];
        if ($master_ceiling) {
            $room_ceiling[$ceiling] = 1;
            $ceiling = $ceiling + 1;
        }
        //墙面铺设墙纸 TODO 例：需要：true 不需要：false
        $master_wallpaper = $master_distribution['wallpaper'];
        if ($master_wallpaper) {
            $room_wallpaper[$wallpaper] = 1;
            $wallpaper = $wallpaper + 1;
        }
        //有无飘窗结构 TODO 例：有飘窗：true 没有飘窗：false
        $master_window = $master_distribution['window'];
        if ($master_window) $pc++;
    }
    if ($room_distribution['second'] != 0) {
        $second_distribution = $calculator_arr['second_distribution'];
        $second_ground = $second_distribution['ground'];
        switch ($second_ground) {
            case 'cz':
                $ground_way_cz[$ground_way_num_cz] = 1;
                $ground_way_num_cz++;
                break;
            case 'smdb':
                $ground_way_sm[$ground_way_num_sm] = 1;
                $ground_way_num_sm++;
                break;
            case 'qhfhdb':
                $ground_way_fh[$ground_way_num_fh] = 1;
                $ground_way_num_fh++;
                break;
        }
        $second_wardrobe = $second_distribution['wardrobe'];
        if ($second_wardrobe) $wardrobe_num++;
        $second_ceiling = $second_distribution['ceiling'];
        if ($second_ceiling) {
            $room_ceiling[$ceiling] = 1;
            $ceiling = $ceiling + 1;
        }
        $second_wallpaper = $second_distribution['wallpaper'];
        if ($second_wallpaper) {
            $room_wallpaper[$wallpaper] = 1;
            $wallpaper = $wallpaper + 1;
        }
        $second_window = $second_distribution['window'];
        if ($second_window) $pc++;
    }
    if ($room_distribution['child'] != 0) {
        $child_distribution = $calculator_arr['child_distribution'];
        $child_ground = $child_distribution['ground'];
        switch ($child_ground) {
            case 'cz':
                $ground_way_cz[$ground_way_num_cz] = 1;
                $ground_way_num_cz++;
                break;
            case 'smdb':
                $ground_way_sm[$ground_way_num_sm] = 1;
                $ground_way_num_sm++;
                break;
            case 'qhfhdb':
                $ground_way_fh[$ground_way_num_fh] = 1;
                $ground_way_num_fh++;
                break;
        }
        $child_wardrobe = $child_distribution['wardrobe'];
        if ($child_wardrobe) $wardrobe_num++;
        $child_ceiling = $child_distribution['ceiling'];
        if ($child_ceiling) {
            $room_ceiling[$ceiling] = 1;
            $ceiling = $ceiling + 1;
        }
        $child_wallpaper = $child_distribution['wallpaper'];
        if ($child_wallpaper) {
            $room_wallpaper[$wallpaper] = 1;
            $wallpaper = $wallpaper + 1;
        }
        $child_window = $child_distribution['window'];
        if ($child_window) $pc++;
        //榻榻米的制作 TODO 例：木工制作榻榻米：true 自行购买榻榻米：false
        $child_tatami = $child_distribution['tatami'];
        if ($child_tatami) $tatami_num++;
        //书桌书架选择 TODO 例：木工制作简易书桌书架：true 购买成品书桌书架：false
        $child_desk = $child_distribution['desk'];
        if ($child_desk) $desk_num++;
    }
    if ($room_distribution['parent'] != 0) {
        $parent_distribution = $calculator_arr['parent_distribution'];
        $parent_ground = $parent_distribution['ground'];
        switch ($parent_ground) {
            case 'cz':
                $ground_way_cz[$ground_way_num_cz] = 1;
                $ground_way_num_cz++;
                break;
            case 'smdb':
                $ground_way_sm[$ground_way_num_sm] = 1;
                $ground_way_num_sm++;
                break;
            case 'qhfhdb':
                $ground_way_fh[$ground_way_num_fh] = 1;
                $ground_way_num_fh++;
                break;
        }
        $parent_wardrobe = $parent_distribution['wardrobe'];
        if ($parent_wardrobe) $wardrobe_num++;
        $parent_ceiling = $parent_distribution['ceiling'];
        if ($parent_ceiling) {
            $room_ceiling[$ceiling] = 1;
            $ceiling = $ceiling + 1;
        }
        $parent_wallpaper = $parent_distribution['wallpaper'];
        if ($parent_wallpaper) {
            $room_wallpaper[$wallpaper] = 1;
            $wallpaper = $wallpaper + 1;
        }
        $parent_window = $parent_distribution['window'];
        if ($parent_window) $pc++;
    }
    if ($room_distribution['cloakroom'] != 0) {
        $cloakroom_distribution = $calculator_arr['cloakroom_distribution'];
        $cloakroom_ground = $cloakroom_distribution['ground'];
        switch ($cloakroom_ground) {
            case 'cz':
                $ground_way_cz[$ground_way_num_cz] = 1;
                $ground_way_num_cz++;
                break;
            case 'smdb':
                $ground_way_sm[$ground_way_num_sm] = 1;
                $ground_way_num_sm++;
                break;
            case 'qhfhdb':
                $ground_way_fh[$ground_way_num_fh] = 1;
                $ground_way_num_fh++;
                break;
        }
        $cloakroom_wardrobe = $cloakroom_distribution['wardrobe'];
        if ($cloakroom_wardrobe) {
            $ymjyg = 1;
        }
        $cloakroom_ceiling = $cloakroom_distribution['ceiling'];
        if ($cloakroom_ceiling) {
            $room_ceiling[$ceiling] = 1;
            $ceiling = $ceiling + 1;
        }
        $cloakroom_wallpaper = $cloakroom_distribution['wallpaper'];
        if ($cloakroom_wallpaper) {
            $room_wallpaper[$wallpaper] = 1;
            $wallpaper = $wallpaper + 1;
        }
        $cloakroom_window = $cloakroom_distribution['window'];
        if ($cloakroom_window) $pc++;
    }
    if ($room_distribution['study'] != 0) {
        $study_distribution = $calculator_arr['study_distribution'];
        $study_ground = $study_distribution['ground'];
        switch ($study_ground) {
            case 'cz':
                $ground_way_cz[$ground_way_num_cz] = 1;
                $ground_way_num_cz++;
                break;
            case 'smdb':
                $ground_way_sm[$ground_way_num_sm] = 1;
                $ground_way_num_sm++;
                break;
            case 'qhfhdb':
                $ground_way_fh[$ground_way_num_fh] = 1;
                $ground_way_num_fh++;
                break;
        }
        $study_ceiling = $study_distribution['ceiling'];
        if ($study_ceiling) {
            $room_ceiling[$ceiling] = 1;
            $ceiling = $ceiling + 1;
        }
        $study_wallpaper = $study_distribution['wallpaper'];
        if ($study_wallpaper) {
            $room_wallpaper[$wallpaper] = 1;
            $wallpaper = $wallpaper + 1;
        }
        $study_window = $study_distribution['window'];
        if ($study_window) $pc++;
        $study_tatami = $study_distribution['tatami'];
        if ($study_tatami) $tatami_num++;
        //书桌书架选择 TODO 例：木工制作简易书桌书柜：true 购买成品书桌书柜：false
        $study_bookcase = $study_distribution['bookcase'];
        if ($study_bookcase) $desk_num++;
    }
    //客餐厅
    $parlor_distribution = $calculator_arr['parlor_distribution'];
    $parlor_ground = $parlor_distribution['ground'];
    switch ($parlor_ground) {
        case 'smdb':
            $sm_kt = 1;
            break;
        case 'qhfhdb':
            $fh_kt = 1;
            break;
        case 'cz':
            $cz_kt = 1;
            break;
    }
    $parlor_ceiling = $parlor_distribution['ceiling'];
    //鞋柜制作方式 TODO 例：木工制作鞋柜：true 自行购买鞋柜：false
    $parlor_shoebox = $parlor_distribution['shoebox'];
    if ($parlor_shoebox)
        $xg = 1;
    //酒柜制作方式 TODO 例：木工制作酒柜：true 自行购买酒柜：false
    $parlor_wine_cabinet = $parlor_distribution['wine_cabinet'];
    if ($parlor_wine_cabinet)
        $jg = 1;
    $parlor_wallpaper = $parlor_distribution['wallpaper'];
    if ($parlor_wallpaper) {
        $kt_qz = 1;
    } else {
        $kt_qz = 0;
    }
    //阳台
    $balcony_distribution = $calculator_arr['balcony_distribution'];
    $balcony_ground = $balcony_distribution['ground'];
    //木工制作吊柜 TODO 例：需要：true 不需要：false
    $balcony_hanging_cabinet = $balcony_distribution['hanging_cabinet'];
    if ($balcony_hanging_cabinet)
        $dg = 1;
    //厨房
    $kitchen_distribution = $calculator_arr['kitchen_distribution'];
    $kitchen_ground = $kitchen_distribution['ground'];
    //木工制作厨柜 TODO 例：需要：true 不需要：false
    $kitchen_cupboard = $kitchen_distribution['cupboard'];
    if ($kitchen_cupboard)
        $cg = 1;
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
    //面积和最大允许房间数、客餐厅、阳台数、卫生间数
    if ($area >= 70 && $area < 80) {
        if (!(($room_num <= 2) && ($parlor_num <= 1) && ($bathroom_num <= 1) && ($balcony_num <= 2))) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误,所填面积最大支持2室1厅1卫2阳台",
                "data" => ""
            );
            return $arr;
        }
    } else if ($area >= 80 && $area < 90) {
        if (!(($room_num <= 3) && ($parlor_num <= 1) && ($bathroom_num <= 1) && ($balcony_num <= 2))) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误,所填面积最大支持3室1厅1卫2阳台",
                "data" => ""
            );
            return $arr;
        }
    } else if ($area >= 90 && $area < 100) {
        if (!(($room_num <= 3) && ($parlor_num <= 1) && ($bathroom_num <= 2) && ($balcony_num <= 3))) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误,所填面积最大支持3室1厅2卫3阳台",
                "data" => ""
            );
            return $arr;
        }
    } else if ($area >= 100 && $area < 110) {
        if (!(($room_num <= 3) && ($parlor_num <= 1) && ($bathroom_num <= 2) && ($balcony_num <= 3))) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误,所填面积最大支持3室1厅2卫3阳台",
                "data" => ""
            );
            return $arr;
        }
    } else if ($area >= 110 && $area < 120) {
        if (!(($room_num <= 3) && ($parlor_num <= 1) && ($bathroom_num <= 2) && ($balcony_num <= 3))) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误,所填面积最大支持3室1厅2卫3阳台",
                "data" => ""
            );
            return $arr;
        }
    } else if ($area >= 120 && $area < 140) {
        if (!(($room_num <= 4) && ($parlor_num <= 1) && ($bathroom_num <= 2) && ($balcony_num <= 3))) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误,所填面积最大支持4室1厅2卫3阳台",
                "data" => ""
            );
            return $arr;
        }
    } else if ($area >= 140 && $area <= 160) {
        if (!(($room_num <= 4) && ($parlor_num <= 1) && ($bathroom_num <= 3) && ($balcony_num <= 3))) {
            $arr = array(
                "code" => "200",
                "msg" => "参数错误,所填面积最大支持4室1厅3卫3阳台",
                "data" => ""
            );
            return $arr;
        }
    } else {
        $arr = array(
            "code" => "200",
            "msg" => "参数错误，面积不在计算器计算范围",
            "data" => ""
        );
        return $arr;
    }
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
    $gzrg = $area * 50;
    $sdrg = sz_sdrg($area);
    $wgrg = sz_wgrg($flag, $area, $room_num, $balcony_num, $bathroom_num, $parlor_ground, $balcony_ground, $kitchen_ground,$ground_way_fh[0],$ground_way_fh[1],$ground_way_fh[2],$ground_way_fh[3],$fh_kt);
    $mgrg = sz_mgrg($flag, $area, $room_num, $balcony_num, $bathroom_num, $kitchen_cupboard, $wardrobe_num, $cloakroom_wardrobe, $room_ceiling[0], $room_ceiling[1], $room_ceiling[2], $room_ceiling[3], $parlor_ceiling, $desk_num, $tatami_num, $parlor_shoebox, $parlor_wine_cabinet, $balcony_hanging_cabinet);
    $yqgrg = sz_yqgrg($flag, $area, $room_num, $bathroom_num);
    $zgrg = sz_zgrg($flag, $area, $room_num, $balcony_num, $bathroom_num, $wall);
    $rgzj = $gzrg + $sdrg + $wgrg + $mgrg + $yqgrg + $zgrg;
    //辅材费用
    $zdsdcl = sz_zdsdcl($flag, $area);
    $gdsdcl = sz_gdsdcl($flag, $area);
    $wgfc = sz_wgfc($flag, $area, $room_num, $bathroom_num, $balcony_num, $ground_sank,$ground_way_fh[0],$ground_way_fh[1],$ground_way_fh[2],$ground_way_fh[3]);
    $mgfc = sz_mgfc($flag, $area, $room_num, $balcony_num, $bathroom_num);
    $yqcl = sz_yqcl($flag, $area, $room_num, $bathroom_num);
    //主材费用
    $czdd = sz_czdd($flag, $area, $room_num, $bathroom_num, $balcony_num, $ground_way_cz[0], $ground_way_cz[1], $ground_way_cz[2], $ground_way_cz[3], $cz_kt);
    $czgd = sz_czgd($flag, $area, $room_num, $bathroom_num, $balcony_num, $ground_way_cz[0], $ground_way_cz[1], $ground_way_cz[2], $ground_way_cz[3], $cz_kt);
    $bc = sz_bc($flag,$cg, ($wardrobe_num - 1), $desk_num, $desk_num, $desk_num, $cloakroom_wardrobe, 1, $jg, $xg, $dg);
    $dls = sz_dls($room_num, $pc);
    $db = sz_db($flag, $area, $room_num, $balcony_num, $bathroom_num, $sm_kt, $ground_way_sm[0], $ground_way_sm[1], $ground_way_sm[2], $ground_way_sm[3], $fh_kt, $ground_way_fh[0], $ground_way_fh[1], $ground_way_fh[2], $ground_way_fh[3]);
    $mm = sz_mm($room_num, $bathroom_num);
    $cfym = sz_cfym();
    $lyfym = sz_lyfym();
    $ygym = sz_ygym($ymjyg);
    $jcdd = sz_jcdd($flag, $room_num, $bathroom_num);
    $cgsys = sz_cgsys($flag);
    $qz = sz_qz($flag, $area, $room_num, $bathroom_num, $balcony_num, $room_wallpaper[0], $room_wallpaper[1], $room_wallpaper[2], $room_wallpaper[3], $kt_qz);
    $zxzj = $rgzj + $zdsdcl + $wgfc + $mgfc + $yqcl;
    $arr = array(
        "code" => "000",
        "msg" => "",
        "data" => array(
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
            "qz" => $qz,
            "zxzj" => $zxzj
        )
    );
    return $arr;
}