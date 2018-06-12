<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $table = 'imdb_movie';
    protected $primaryKey = 'imdb_id';
    public $timestamps = false;

    public function List_Item() {
        return $this->belongsToMany('App\List_Item');
    }
}
