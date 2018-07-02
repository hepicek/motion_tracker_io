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
        return Auth::id();
    }
    public function getUserLists(Request $request) {
        $current_user_id = Auth::id();
        $user_lists = User_List::where('owner_id', $current_user_id)->get()->getDictionary();


        foreach($user_lists as $list) {
            $list->items = [];
        }

        $list_items = List_Item::selectRaw('user_list_entries.*, imdb_movie.rating, imdb_movie.year, imdb_movie.imdb_id, imdb_movie.name, imdb_movie.imdb_img')
            ->leftJoin('imdb_movie', 'show_id', '=', 'imdb_movie.imdb_id')
            ->whereIn('list_id', array_keys($user_lists))
            ->get()->getDictionary();

        foreach($list_items as $key => $list_item) {
            $array = $user_lists[$list_item->list_id]->items;

            $array[$key] = $list_item;
            $user_lists[$list_item->list_id]->items = $array;
        }
        return response()->json(['response' => $user_lists], 200);
    }

    public function storeUserList(Request $request)
    {
        $current_user_id = Auth::id();
        $input = $request->all();
        $input['list_title'] = $request['list_title'];
        $input['owner_id'] = $current_user_id;
        $input['visibility_status_id'] = 1;
        $input['date_created'] = date('Y-m-d H:i:s');
        $input['collapsed'] = 1;

        $new_list = User_List::create($input);

        $success['list_title'] = $new_list->list_title;

        return response()->json(['success'=>$success], 200);
    }
    public function updateUserList(Request $request, $id)
    {
        if($request->has('collapsed')) {
            $user_list = User_List::findOrFail($id)->update(['collapsed'=>$request->collapsed]);

        } elseif($request->has('list_title')) {
            $user_list = User_List::findOrFail($id)->update(['list_title'=>$request->list_title]);
        }
        
        return $request;
    }

    public function storeUserListItem($list_id, $id)
    {
        $listItemInDb = List_Item::where('show_id', $id)->where('list_id', $list_id)->get();
       if (count($listItemInDb) == 0) {
            $input['list_id'] = $list_id;
            $input['show_id'] = $id;
            $newItem = List_Item::create($input);

           return response()->json(['success'=> $newItem], 200);
        }

        return 'UserList item already in list';
    }

    public function storeUserRating(Request $request)
    {

        $listItemInDb = List_Item::where('show_id', $request[0])->get();
        if (!$listItemInDb->isEmpty()) {
            List_Item::where('show_id', $request[0])->update(['user_rating' => $request[1]]);
            return $request[1];
        }
    return 'not in list';
    }

    public function destroyUserList(Request $request, $id)
    {
        $user_list = User_List::findOrFail($id);
        $user_list->delete();

        return 204;
    }
    public function destroyUserListItem(Request $request, $id)
    {
        $user_list_item = List_Item::findOrFail($id);
        $user_list_item->delete();

        return 204;
    }
}

