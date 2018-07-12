<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User_List extends Model
{
    protected $table = 'user_lists';

    protected $guarded = [];

    public $timestamps = false;


    public function list_items() {
        return $this->hasMany('App\List_Item', 'list_id');
    }
    public function movies() {
        return $this->hasManyThrough('App\Movie', 'App\List_item', 'show_id', 'imdb_id', 'id', 'id');
    }
}
