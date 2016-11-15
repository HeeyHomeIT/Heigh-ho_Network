<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/14
 * Time: 17:00
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class CollectimgController extends Controller
{
    public function collect(){
        $callback=rq('callback');
        $user_id=rq('user_id');
        $panorama_id=rq('panorama_id');
        $insert=DB::insert('');
    }
}