<?php

namespace App\Http\Controllers;

use App\Movie;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;

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

        $result = Movie::where('name', 'LIKE', '%' . $movie . '%')
            ->orderBy('votes_nr', 'desc')
            ->take(20)
            ->get();

        return [$movie, $result];
    }

    public function externalGetDetails($movie_id)
    {
        $movie = new \Imdb\Title($movie_id);
        $result['title'] = $movie->title();
        $result['orig_title'] = $movie->orig_title();
        $result['tagline'] = $movie->tagline();
        $result['rating'] = $movie->rating();
        $result['votes'] = $movie->votes();
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

        $this->resizeAndStoreImage($result);

        // $uploaded_file = new UploadedFile($file, $file_name);

        // $result['alsoknow'] = $movie->alsoknow();

        // $movie->savephoto("public/img/movie_img");
        return $result;
    }

    public function exSearch($searchString) {
        $search = new \Imdb\TitleSearch(); // Optional $config parameter
        $results = $search->search($searchString, array(\Imdb\TitleSearch::MOVIE));
        // dd(count($results));
        $count = count($results) < 20 ? count($results) : 20;
        $stuff = [];

        // function compare_votes($a, $b) {
        //     if ($a['votes'] == $b['votes']) return 0;
        //     return ($a['votes'] < $b['votes']) ? -1 : 1;
        // }
        
        

            for($i = 0; $i < $count; $i++) { /* @var $result \Imdb\Title */
                $stuff[] = [
                    'id'=>$results[$i]->imdbID(),
                    'title'=>$results[$i]->title(),
                    'orig_title'=>$results[$i]->orig_title(),
                    'year'=>$results[$i]->year(),               
                    'rating'=>$results[$i]->rating(),
                    'votes'=>$results[$i]->votes()
                ];
            };

            usort($stuff, function($a, $b) {
                if ($a['votes'] == $b['votes']) return 0;
                return ($a['votes'] > $b['votes']) ? -1 : 1;
            });

            // $stuff[] = $this->externalGetDetails('0094963');
            // for($i = 0; $i < 5; $i++) {
            //     $stuff[] = $this->externalGetDetails($results[$i]->imdbID());
            // }
        return $stuff;
    }
    public function searchActors($imdb_id)
    {
        $movie = Movie::find($imdb_id);

        $actors = $movie->Persons()
            ->where('imdb_position_id', 254)
            ->orderBy('priority', 'desc')
            ->take(4)
            ->get();
        $director = $movie->Persons()
            ->where('imdb_position_id', 255)
            ->orderBy('priority', 'desc')
            ->take(2)
            ->get();
        return [$actors, $director];
    }

    protected function resizeAndStoreImage($result)
    {

        $url = $result['photoLarge'];
        $info = pathinfo($url);

        $file_ext = $info['extension'] == '_V1' ? 'jpg': $info['extension'];

        $contents = file_get_contents($url);
        $file_name = preg_replace("/[\s_]/", "_", $result['title']) . "-" . str_random(6);
        $file_name_ext = $file_name ."." . $file_ext;

        $file = "../storage/app/public/img/movie_img/" . $file_name_ext;
        file_put_contents($file, $contents);


        $img = Image::make($file);
        $img_width_300 = 300;
        $img->resize($img_width_300, null, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save(public_path('../storage/app/public/img/movie_img/' . $file_name . '_' . $img_width_300 . '.' . $file_ext));
    }

    /*    public function delete(Movie $movie)
        {
            $movie->delete();

            return response()->json(null, 204);
        }*/
}
