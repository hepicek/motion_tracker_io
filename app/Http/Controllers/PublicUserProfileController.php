<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class PublicUserProfileController extends Controller
{
    public function index()
    {
        return view('userpublicprofile');
    }

    public function userDetails($id)
    {
       return User::find($id)->toArray();
    }

}
