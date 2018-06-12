<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User_List extends Model
{
    protected $table = 'user_lists';

    public function List_Items() {
        return $this->hasMany('App\List_Item');
    }
}
