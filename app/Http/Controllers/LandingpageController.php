<?php

namespace App\Http\Controllers;

use App\Movie;
use Illuminate\Http\Request;

class LandingpageController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function randomPopularMovies()
    {

        $popularMovies = Movie::where('year', '=', date('Y'))
            ->whereNotNull('imdb_img')
            ->orderBy('votes_nr', 'desc')
            ->take(50)
            ->get()
            ->toArray();

        shuffle($popularMovies);
        $popularMoviesSix = array_slice($popularMovies, 0, 6);
        return $popularMoviesSix;
    }
}
