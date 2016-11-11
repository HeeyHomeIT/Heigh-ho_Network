<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    protected $table = 'hh_userinfo';

    public $timestamps = false;

    protected $primaryKey = 'userinfo_userid';
}
