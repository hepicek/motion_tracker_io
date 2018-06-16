<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Validator;
use App\User;

class UserController extends Controller
{
    public function userLogin(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }

        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            return response()->json(['success' => $success], 200);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }

    public function userRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:1',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $input['user_status_id'] = 1;
        $input['last_login_date'] = date('Y-m-d H:i:s');
        $input['common_name'] = $input['first_name'];
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['name'] =  $user->first_name . " " . $user->last_name;
        $success['test'] = 'test';
        return response()->json(['success'=>$success], 200);
    }

    public function updateUserDetails(request $request, $id){
        
        if($request->hasFile('image')) {
                
            $file_name = $request->image->getClientOriginalName();
            $file_size = $request->image->getClientSize();
            $request->image->storeAs('public/img', $file_name);
            $user = User::find($id);

            $user->fill([
                'img_url' => 'img/' . $file_name
            ]);
            $user->save();
            
            return 200  ;
        } else {
            $validator = Validator::make($request->all(), [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email',
                'dob' => 'date'
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 401);            
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
}
