<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;
use App\User;
use App\Lists;

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
        $current_user_id = Auth::id();
        $user_lists = Lists::where('owner_id', $current_user_id)->get();
        
        return response()->json(['success' => $user_lists], 200);
    }
}
