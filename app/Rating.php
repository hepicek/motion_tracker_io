<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $table = 'mt_ratings';
    protected $guarded = [];

    public function movie() {
        return $this->hasOne('App\Movie', 'imdb_id', 'imdb_id');
    }
}
