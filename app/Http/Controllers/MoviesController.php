<?php

namespace App\Http\Controllers;
use App\Movie;
use Illuminate\Http\Request;

class MoviesController extends Controller
{
    public function index()
    {
        return Movie::paginate(15);
    }

    public function show(Movie $movie)
    {
        return $movie;
    }

    public function store(Request $request)
    {
        $movie = Movie::create($request->all());

        return response()->json($movie, 201);
    }

    public function update(Request $request, Movie $movie)
    {
        $movie->update($request->all());

        return response()->json($movie, 200);
    }

    public function searchMovies($movie)
    {

        $result = Movie::where('name','LIKE','%'.$movie.'%')
            ->orderBy('votes_nr', 'desc')
            ->take(20)
            ->get();

        return [$movie, $result];
    }
    public function imdbTest() {
        $movie = new \Imdb\Title(335266);
        $result['title'] = $movie->orig_title();
        $result['tagline'] = $movie->tagline();
        $result['seasons'] = $movie->seasons();
        $result['is_serial'] = $movie->is_serial();
        $result['episodes'] = $movie->episodes();
        $result['is_episode'] = $movie->episodeTitle();
        $result['episodeSeason'] = $movie->episodeSeason();
        $result['episodeAirDate'] = $movie->episodeAirDate();
        $result['episodeDetails'] = $movie->get_episode_details();
        $result['plotoutline'] = $movie->plotoutline();
        $result['storyline'] = $movie->storyline();
        $result['photoSmall'] = $movie->photo();
        $result['photoLarge'] = $movie->photo(false);
        $result['mainPictures'] = $movie->mainPictures();
        $result['rating'] = $movie->mpaa();
        $result['plot'] = $movie->plot();
        $result['sysopsis'] = $movie->synopsis();
        $result['director'] = $movie->director();
        $result['cast'] = $movie->cast();
        $result['writing'] = $movie->writing();
        $result['producer'] = $movie->producer();

        // $result['alsoknow'] = $movie->alsoknow();

        // $movie->savephoto("public/img/movie_img");
        return  $result;
    public function searchActors($imdb_id)
    {
        $movie = Movie::find($imdb_id);

        $actors = $movie->Persons()
            ->where('imdb_position_id', 254)
            ->orderBy('priority', 'desc')
            ->take(4)
            ->get();

        return $actors;
    }

/*    public function delete(Movie $movie)
    {
        $movie->delete();

        return response()->json(null, 204);
    }*/
}
