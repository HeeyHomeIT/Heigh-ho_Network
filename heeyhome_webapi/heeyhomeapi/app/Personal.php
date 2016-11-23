<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    protected $table = 'hh_userinfo';

    public $timestamps = false;

    protected $primaryKey = 'userinfo_userid';
}
