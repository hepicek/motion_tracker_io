<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $guarded = [];
    protected $table = 'imdb_person';
    protected $primaryKey = 'imdb_id';
    public $timestamps = false;

}
