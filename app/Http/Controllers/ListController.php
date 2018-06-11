<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
class ListController extends Controller
{
    public function index() {
        dd(Auth::id());
        dd(Sentry::getUser()->id);
        return Auth::id();
    }
}
