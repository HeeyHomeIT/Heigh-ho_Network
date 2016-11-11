<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    protected $table = 'hh_shop';

    public $timestamps = false;

    protected $primaryKey = 'shop_id';
}
