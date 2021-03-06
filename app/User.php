<?php

namespace App;

// use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    //,HasApiTokens
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'common_name', 'email', 'password', 'dob', 'user_status_id', 'date_deactivated', 'img_url', 'last_login_date',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function lists() {
        return $this->hasMany('App\User_List', 'owner_id');
    }
    public function ratings() {
        return $this->hasMany('App\Rating', 'user_id');
    }
    public function listItems() {
        return $this->hasManyThrough('App\List_Item', 'App\User_List');
    }
    public function movies() {
        return $this->hasManyThrough('App\Movie', 'App\User_List');
    }
}
