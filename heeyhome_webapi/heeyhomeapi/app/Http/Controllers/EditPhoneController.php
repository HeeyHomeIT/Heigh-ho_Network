<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/11
 * Time: 15:01
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class EditPhoneController extends Controller
{
    public function editphone(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $oldphone=rq('phone');
        $phone=DB::select('select userinfo_phone from hh_userinfo where ');
    }
}