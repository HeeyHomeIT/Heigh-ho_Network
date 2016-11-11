<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Foreman extends Model
{
    protected $table = 'hh_foremaninfo';

    public $timestamps = false;

    protected $primaryKey = 'foremaninfo_userid';
}
