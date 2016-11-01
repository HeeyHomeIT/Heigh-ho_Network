<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Driveaddress extends Model
{
    protected $table = 'hh_driveaddress';

    public $timestamps = false;

    protected $primaryKey = 'id';
}
