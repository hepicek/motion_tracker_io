<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;
class ListController extends Controller
{
    use AuthenticatesUsers;
    public function index(Request $request) {
        dd(Auth::id());
        // dd($request);
        // dd(Sentry::getUser()->id);
        return Auth::id();
    }
}
