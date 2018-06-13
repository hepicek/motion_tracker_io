<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;
use App\User;
use App\User_List;
use App\List_Item;

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
        $user_lists = User_List::where('owner_id', $current_user_id)->get()->getDictionary();
        // foreach($user_lists as $list) {
        //     $list['items'] = List_Item::where('list_id', $list['id'])->get();
        // }

        foreach($user_lists as $list) {
            $list->items = [];
        }

        $list_items = List_Item::selectRaw('user_list_entries.*, imdb_movie.rating, imdb_movie.year, imdb_movie.imdb_id, imdb_movie.name')
            ->leftJoin('imdb_movie', 'show_id', '=', 'imdb_movie.imdb_id')
            ->whereIn('list_id', array_keys($user_lists))
            ->get()->getDictionary();

        foreach($list_items as $key => $list_item) {
            $array = $user_lists[$list_item->list_id]->items;

            $array[$key] = $list_item;
            $user_lists[$list_item->list_id]->items = $array;


            
            
        }

        return response()->json(['response' => $user_lists], 200);
        // $user_lists, $list_items
    }

    public function storeUserList(Request $request)
    {
        $current_user_id = Auth::id();
        $input = $request->all();
        $input['list_title'] = $request['list_title'];
        $input['owner_id'] = $current_user_id;
        $input['visibility_status_id'] = 1;
        $input['status_id'] = 1;
        $input['status_date'] = date('Y-m-d H:i:s');
        $input['date_created'] = date('Y-m-d H:i:s');

        $new_list = User_List::create($input);

        $success['list_title'] = $new_list->list_title;

        return response()->json(['success'=>$success], 200);
    }
    public function updateUserList(Request $request, $id)
    {
        $user_lists = User_List::findOrFail($id); //->update(['collapsed'=>$request->collapsed]);

        return $user_lists;
    }

    public function destroyUserList(Request $request, $id)
    {
        $user_list = User_List::findOrFail($id);
        $user_list->delete();

        return 204;
    }
}
