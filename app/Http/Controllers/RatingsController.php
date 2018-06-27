<?php

namespace App\Http\Controllers;

use App\Movie;
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
        $curr_imdb_id = $request[0];
        $curr_user_rating = $request[1];
        $user_voted = Rating::where(['user_id' => $curr_user_id,'imdb_id' => $curr_imdb_id])->get()->toArray();

        $input['imdb_id'] = $curr_imdb_id;
        $input['user_id'] = $curr_user_id;
        $input['mt_user_rating'] = $curr_user_rating;
        $input['mt_votes'] = 1;

        if (!$user_voted) {
            Rating::create($input);
            $this->updateRatingInDb($curr_imdb_id);
        } else {
            Rating::where(['user_id' => $curr_user_id,'imdb_id' => $curr_imdb_id])
                ->update(['mt_user_rating' => $curr_user_rating]);
            $this->updateRatingInDb($curr_imdb_id);
        }
        return Rating::where(['user_id' => $curr_user_id,'imdb_id' => $curr_imdb_id])->get(['mt_user_rating']);
    }

    private function getUserRatingFromDb($curr_imdb_id) {
        $mt_rating_from_db = Rating::where('imdb_id', $curr_imdb_id)->get(['mt_user_rating'])->toArray();
        $counted_ratings = 0;

        foreach ($mt_rating_from_db as $i => $item) {
            $counted_ratings += $item['mt_user_rating'];
        }
        return  $counted_ratings;
    }
    private function getUserVotesFromDb($curr_imdb_id) {
        return Rating::where('imdb_id', $curr_imdb_id)->get(['mt_votes'])->toArray();
    }
    private function updateUserRatingInDb($curr_imdb_id, $mt_rating) {
        return Movie::where('imdb_id', $curr_imdb_id)->update(['mt_rating' => $mt_rating]);
    }
    private function updateRatingInDb($curr_imdb_id) {
        $counted_ratings = $this->getUserRatingFromDb($curr_imdb_id);
        $mt_rating = $counted_ratings / count($this->getUserVotesFromDb($curr_imdb_id));
        $this->updateUserRatingInDb($curr_imdb_id, $mt_rating);

    }
}

