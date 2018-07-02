<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use DB;
use App\User;
use Carbon;
use App\Movie;

class RelationshipsController extends Controller
{
    protected function getRecentActivity($id, & $array) {
        $user = User::find($id);
        $user_name = $user->first_name . ' ' . $user->last_name . ' (' . $user->common_name .')';
        $lists = $user->lists;
        foreach($lists as $list) {
            $list_title = $list->list_title;

            $listItems = $list->list_items()
                ->where('created_at', '>=', Carbon::now()->subDays(5)->toDateTimeString())
                ->get();
            foreach($listItems as $item) {
                $movie = $item->movie;
                $array[] = [
                    'user_name' => $user_name,
                    'user_img' => $user->img_url,
                    'list_title' => $list_title,
                    'movie_title' => $movie->name,
                    'movie_year' => $movie->year,
                    'date' => $item->created_at
                ];
            }
        }
        return $array;
    }
    public function pendingRelationships() {
        $pendingRequests = [];
        $pendingRels =  DB::table('relationships')->where(
            function($query) {
                $query->where('user_one_id', '=', Auth::id())
                ->where('action_user_id', '<>', Auth::id())
                ->where('status_id', '=', 2);
            })
            ->orWhere(
                function($query) {
                    $query->where('user_two_id', '=', Auth::id())
                    ->where('action_user_id', '<>', Auth::id())
                    ->where('status_id', '=', 2);
                }
            )->get();
            foreach($pendingRels as $rel) {
                $otherUserId = $rel->user_one_id == Auth::id() ? $rel->user_two_id : $rel->user_one_id;
                $otherUser = User::find($otherUserId);

                $pendingRequests[] = [
                   'first_name' =>  $otherUser->first_name,
                   'last_name' => $otherUser->last_name,
                   'common_name' => $otherUser->common_name,
                   'id' => $otherUser->id,
                   'action_date' => $rel->action_date,
                   'img_url' => $otherUser->img_url
                ];
               
            };
            
        return $pendingRequests;
    }
    public function getRelationships() {
        $friends = [];
        $relationships = DB::table('relationships')
            ->where(function($query) {
                $query->where('user_one_id', '=', Auth::id())
                ->where('status_id', '=', 1);  
            })
            ->orWhere(
                function($query) {
                    $query->where('user_two_id', '=', Auth::id())
                    ->where('status_id', '=', 1);
                }
            )->get();
            foreach($relationships as $rel) {
                $otherUserId = $rel->user_one_id == Auth::id() ? $rel->user_two_id : $rel->user_one_id;
                $otherUser = User::find($otherUserId);
                $friends[] = [
                    'first_name' =>  $otherUser->first_name,
                    'last_name' => $otherUser->last_name,
                    'common_name' => $otherUser->common_name,
                    'id' => $otherUser->id,
                    'action_date' => $rel->action_date,
                    'img_url' => $otherUser->img_url
                 ];
            };
            
        return $friends;
    }
    public function updateRelationship(Request $request) {
        $currentUser = Auth::id();
        $otherUser = $request['id'];
        $userIDs = [$currentUser, $otherUser];
        sort($userIDs);

        if($request['status'] == 0) {
            //write a new line to the table with status 
            //status 2
           $newRel =  DB::table('relationships')->insert(
                [
                    'user_one_id' => $userIDs[0],
                    'user_two_id' => $userIDs[1],
                    'action_user_id' => Auth::id(),
                    'status_id' => 2,
                    'action_date' => date('Y-m-d H:i:s'),
                    'date_created' => date('Y-m-d H:i:s')
                ]);
                return 2;
        } else if ($request['status'] == 1) {
            return "Already Friends";
        } else if ($request['status'] == 2) {
            return "Waiting on action from other user";
        } else if ($request['status'] == 3) {
            $newRel =  DB::table('relationships')
                ->where('user_one_id', '=', $userIDs[0])
                ->where('user_two_id', '=', $userIDs[1])
                ->update(
                [
                    'action_user_id' => Auth::id(),
                    'status_id' => 1,
                    'action_date' => date('Y-m-d H:i:s'),
                ]);
                return 1;
        } else if ($request['status'] == 4) {
            
            $newRel =  DB::table('relationships')->where(
                [
                    'user_one_id' => $userIDs[0],
                    'user_two_id' => $userIDs[1],
                ])->delete();
                return 'Rejected Bitch!';
        }
        return 400;
    }
    
    public function getNewsFeed() {

        $friends = $this->getRelationships();
        $newAdditions = [];
        foreach($friends as $friend) {
            $this->getRecentActivity($friend['id'], $newAdditions);
        }
          
        usort($newAdditions, function($a, $b)
        {
            $t1 = strtotime($a['date']);
            $t2 = strtotime($b['date']);
            return $t2 - $t1;
        });

        return $newAdditions; 
    }
}
