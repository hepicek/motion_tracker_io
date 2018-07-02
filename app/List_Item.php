<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class List_Item extends Model
{
    protected $table = 'user_list_entries';
    protected $guarded = [];
    public $timestamps = false;

    public function User_List() {
        return $this->belongsTo('App\User_List');
    }
    public function movie() {
        return $this->hasOne('App\Movie', 'imdb_id', 'show_id');
    }
}
