<?php

namespace App\Http\Controllers;

use App\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingsController extends Controller
{
    public function index() {
        return Auth::id();
    }

    public function storeMovieRating(Request $request)
    {
        $curr_user_id = Auth::id();
        $curr_imdb_id = $request['imdb_id'];
        $mt_votes_from_db = Rating::where('imdb_id', $request['imdb_id'])->get(['mt_votes'])->toArray();
        $mt_votes = $mt_votes_from_db[0]['mt_votes'] + 1;
        $mt_rating_from_db = Rating::where('imdb_id', $request['imdb_id'])->get(['mt_rating'])->toArray();
        $mt_rating = ($request['rating'] + $mt_rating_from_db[0]['mt_rating']) / $mt_votes;
        $input['imdb_id'] = $curr_imdb_id;
        $input['user_id'] = $curr_user_id;
        $input['mt_rating'] = $mt_rating;
        $input['mt_votes'] = $mt_votes;

        $user_voted = Rating::where(['user_id', $curr_user_id], ['imdb_id', $curr_imdb_id])->get()->toArray();
        if ($user_voted->isEmpty()) {
            Rating::create($input);
        } else {
            Rating::where('imdb_id', $curr_imdb_id)->update(['mt_votes' => $mt_votes, 'mt_rating' => $mt_rating]);

        }

        return Rating::where('imdb_id', $request['imdb_id'])->get()->toArray();
    }
}
