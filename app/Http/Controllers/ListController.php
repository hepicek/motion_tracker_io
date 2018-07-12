<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;
use App\User;
use App\User_List;
use App\List_Item;

class ListController extends Controller
{
    use AuthenticatesUsers;

    public function index(Request $request)
    {
        return Auth::id();
    }

    /**
     * Retrieve the user lists from the List Model and then iterate through to retrieve the
     * items for each list.
     * Return the array of lists
     */
    public function getUserLists($current_user_id = null)
    {
        if (!$current_user_id) {
            $current_user_id = Auth::id();
        }

        $user_lists = User_List::where('owner_id', $current_user_id)->get()->getDictionary();


        foreach ($user_lists as $list) {
            $list->items = [];
        }

        $list_items = List_Item::selectRaw('user_list_entries.*, imdb_movie.rating, imdb_movie.year, imdb_movie.imdb_id, imdb_movie.name, imdb_movie.imdb_img, imdb_movie.runTime')
            ->leftJoin('imdb_movie', 'show_id', '=', 'imdb_movie.imdb_id')
            ->whereIn('list_id', array_keys($user_lists))
            ->get()->getDictionary();

        foreach ($list_items as $key => $list_item) {
            $array = $user_lists[$list_item->list_id]->items;

            $array[$key] = $list_item;
            $user_lists[$list_item->list_id]->items = $array;
        }
        return response()->json(['response' => $user_lists], 200);
    }

    /**
     * Create new user list in table
     */
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

        return response()->json(['success' => $success], 200);
    }

    /**
     * Update the name of the user list or the collapsed value
     */
    public function updateUserList(Request $request, $id)
    {
        if ($request->has('collapsed')) {
            $user_list = User_List::findOrFail($id)->update(['collapsed' => $request->collapsed]);

        } elseif ($request->has('list_title')) {
            $user_list = User_List::findOrFail($id)->update(['list_title' => $request->list_title]);
        }

        return $request;
    }

    /**
     * Create a new list item entry in user_list_entries table
     */
    public function storeUserListItem($list_id, $id)
    {
        $listItemInDb = List_Item::where('show_id', $id)->where('list_id', $list_id)->get();
        if (count($listItemInDb) == 0) {
            $input['list_id'] = $list_id;
            $input['show_id'] = $id;
            $newItem = List_Item::create($input);

            return response()->json(['success' => $newItem], 200);
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

    public function getUserTimeWasted($id)
    {
        $user = User::find($id);
        $timeWasted = 0;
        $lists = $user->lists;
        foreach ($lists as $list) {
            $listItems = $list->list_items()->get();

            foreach ($listItems as $item) {
                $movie = $item->movie;
                if ($movie->runTime === null) {
                    $movie->runTime = 0;
                }
                $timeWasted += $movie->runTime;
            }
        }
        return convertToHoursMins($timeWasted);
    }
}

function convertToHoursMins($time)
{
    $minutes = $time;
    $zero = new DateTime('@0');
    $offset = new DateTime('@' . $minutes * 60);
    $diff = $zero->diff($offset);
    return $diff->format('%a Days, %h Hours, %i Minutes');
}

