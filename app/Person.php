<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $guarded = [];
    protected $table = 'imdb_person';
    protected $primaryKey = 'imdb_id';
    public $timestamps = false;

    public function Movies() {
        return $this->hasMany('App\Movie', 'imdb_move_has_person', 'imdb_person_id', 'imdb_movie_id');
    }

    public function Persons()
    {
        return $this->belongsToMany('App\Movie', 'imdb_movie_has_person', 'imdb_person_id', 'imdb_movie_id');
    }

}
