<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;
use App\User;
class ListController extends Controller
{
    use AuthenticatesUsers;
    public function index(Request $request) {
        dd(Auth::id());
        // dd($request);
        // dd(Sentry::getUser()->id);
        return Auth::id();
    }
    public function getUserLists(Request $request) {
        $current_user = User::find(Auth::id());
        return response()->json(['success' => $current_user], 200);
    }
}
