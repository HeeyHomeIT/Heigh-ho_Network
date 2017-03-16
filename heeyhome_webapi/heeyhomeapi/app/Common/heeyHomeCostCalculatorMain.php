<?php
/**
 * 主材计算器
 * User: heeyhome
 * Date: 2017/2/13
 * Time: 16:19
 */


function czdd($flag, $b1, $d1, $h1)
{
    switch ($flag) {
        case 1:
            $J1 = $b1 * 0.83;
            $L1 = (2 - $d1) * 9.5;
            $B5 = 14 + $L1 / 9.5 * 1.5;
            $D5 = ($d1 - 1) * 9.5;
            $F5 = 0;
            $H5 = 5.6 + $L1 / 9.5;
            $J5 = 4.5 + $L1 / 9.5 * 1.5;
            $D6 = 4.8 + $L1 / 9.5 * 0.5;
            $F6 = ($h1 - 1) * 3;
            $H6 = $J1 - $B5 - $D5 - $H5 - $J5 - $D6 - $F6 - $F5;
            $L20 = $B5 * 62.5;
            $M20 = $D5 * 62.5;
            $L22 = (($H5 / 2 + 2) * 4.8 - 4) * 28 + $H5 * 33 + ($J5 / 1.8 + 1.8) * 4.8 * 28 + $J5 * 33 + $H6 * 62.5 + (($D6 / 3.2 * 2 + 6.4) * 2.7 - 4.8 - 4) * 28 + $D6 * 33 + abs(1 - $h1) * (($F6 / 2 * 2 + 4) * 2.7 - 5) * 28 + $F6 * 33;
            return $L20 + $M20 + $L22;
        case 2:
            return;
        case 3:
            return;
        case 4:
            return;
        case 5:
            return;
        case 6:
            return;
        case 7:
            return;
    }
}

function czgd()
{
}

function bc()
{
}

function dls()
{
}

function db()
{
}

function mm()
{
}

function cfym()
{
}

function lyfym()
{
}

function ygym()
{
}

function jcdd()
{
}

function cgsys()
{
}

function qz()
{
}