<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Support\Facades\Storage;
use Validator;
use App\User;

class UserController extends Controller
{

    public function index()
    {
        return view('userprofile');
    }


    public function updateUserDetails(request $request, $id)
    {

        if ($request->hasFile('image')) {

            $file_name = $request->image->getClientOriginalName();
            $file_size = $request->image->getClientSize();
            $request->image->storeAs('public/img/user_profile_img', $file_name);
            $user = User::find($id);

            $user->fill([
                'img_url' => 'img/user_profile_img/' . $file_name
            ]);
            $user->save();

            return 200;
        } else {
            $validator = Validator::make($request->all(), [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email',
                'dob' => 'date'
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }
            $user = User::find($id);

            $user->fill([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'dob' => $request->input('dob'),
                'common_name' => $request->input('common_name'),
            ]);
            $user->save();

            return 200;
        }
    }

    public function userDetails()
    {
        $current_user = User::find(Auth::id());
        return response()->json(['success' => $current_user], 200);
    }

    public function destroyUserPhoto(Request $request)
    {
        $photoImagePath = User::find(Auth::id())->img_url;
        $user = User::find(Auth::id());
        if ($photoImagePath !== 'img/user_profile_img/placeholder.png') {
            $user->fill([
                'img_url' => 'img/user_profile_img/placeholder.png'
            ]);
            $user->save();
            Storage::delete('public/' . $photoImagePath);
            return 200;
        }
            return 'No image to delete';
    }
}
