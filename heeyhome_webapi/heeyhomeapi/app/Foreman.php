<?php
/**
 * Created by PhpStorm.
 * User: heeyhome
 * Date: 2016/11/15
 * Time: 11:32
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Foreman extends Model
{
    protected $table = 'hh_foremaninfo';

    public $timestamps = false;

    protected $primaryKey = 'foremaninfo_userid';
}