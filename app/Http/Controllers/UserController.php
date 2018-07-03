<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Support\Facades\Storage;
use Validator;
use App\User;
use DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        return view('userprofile');
    }

    public function searchUsers($user)
    {
        $userList = [];
        $currentUser = Auth::id();
        $results = User::where('first_name', 'LIKE', '%' . $user . '%')
            ->orWhere('last_name', 'LIKE', '%' . $user . '%')
            ->get();

        foreach($results as $result) {
            $userIDs = [$result['id'], $currentUser];
            $thisuser['first_name'] = $result['first_name'];
            $thisuser['last_name'] = $result['last_name'];
            $thisuser['common_name'] = $result['common_name'];
            $thisuser['img_url'] = $result['img_url'];
            $thisuser['id'] = $result['id'];
            sort($userIDs);    
            $rel = DB::table('relationships')->where([
                ['user_one_id', "=", $userIDs[0]], 
                ['user_two_id', "=", $userIDs[1]]
            ])
                ->get();
            if(count($rel) == 0) {
                $thisuser['relStatus'] = 0;
            } else {
                if($rel[0]->status_id == 1) {
                    $thisuser['relStatus'] = 1;
                }
                else if($rel[0]->action_user_id == Auth::id()) {
                    $thisuser['relStatus'] = 2;
                } else {
                    $thisuser['relStatus'] = 3;
                }
            }
            if($userIDs[0] != $userIDs[1]) $userList[] = $thisuser;
            
        }
        return [$user, $userList];
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
    public function updatePw(Request $request) {
        $user = Auth::user();
        $matches = Hash::check($request->oldPassword, $user->password);
        $newMatch = $request->newPassword == $request->repeatPassword;
        if(strlen($request->newPassword) < 6) {
            return response()->json(['data'=>"Password must be 6 or more characters"], 400);
        }
        elseif(!$matches) {
            return response()->json(['data'=>"Old Password Incorrect"], 400);
        }
        elseif(!$newMatch) {
            return response()->json(['data'=>"New Passwords don't match"], 400);
        } elseif($matches && $newMatch) {
            $user->password = bcrypt($request->newPassword);
            $user->save();
            return "Password Changed Successfully";
        }

    }
}
