<?php

namespace App\Http\Controllers;

use App\Jobs\StoreDataFromExternalSource;
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
        StoreDataFromExternalSource::dispatch($movie)
            ->delay(10);

        $result = Movie::where('name', 'LIKE', '%' . $movie . '%')
            ->orderBy('votes_nr', 'desc')
            ->take(20)
            ->get();

        return [$movie, $result];
    }

    public function externalGetDetails($movie_id)
    {
        $movie = new \Imdb\Title($movie_id);
        $result['name'] = $movie->title();
        $result['orig_name'] = $movie->orig_title();
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

    public function exSearch($searchString)
    {

        $search = new \Imdb\TitleSearch(); // Optional $config parameter
        $results = $search->search($searchString, array(\Imdb\TitleSearch::MOVIE));
        $count = count($results) < 20 ? count($results) : 20;
        $fetchedExternalData = [];

        for ($i = 0; $i < $count; $i++) {
            $fetchedExternalData[] = [
                'imdb_id' => $results[$i]->imdbID() + 0,
                'name' => $results[$i]->title(),
                'orig_name' => $results[$i]->orig_title(),
                'year' => $results[$i]->year(),
                'rating' => $results[$i]->rating(),
                'votes_nr' => $results[$i]->votes()
            ];
        }

        $queryDbData = [];
        // dd($fetchedExternalData);

        foreach ($fetchedExternalData as $item) {

            $movie = Movie::find($item['imdb_id']);

            if($movie['imdb_id'] == NULL) {
                $name = $item['orig_name'] == "" ? $item['name'] : $item['orig_name'];
                $fill = [
                    'imdb_id' => $item['imdb_id'] + 0,
                    'name' => $name,
                    'year' => $item['year'],
                    'rating' =>  $item['rating'],
                    'votes_nr' =>  $item['votes_nr'],
                ];
                $newMovie = Movie::create($fill);
                //    var_dump($newMovie);
            }
            else {
                $name = $item['orig_name'] == "" ? $item['name'] : $item['orig_name'];
                $movie['name'] = $name;
                $movie['year'] = $item['year'];
                $movie['rating'] = $item['rating'];
                $movie['votes_nr'] = $item['votes_nr'];

                $movie->save();
            }
            //
        }
        dd($fetchedExternalData);
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

        $file_ext = $info['extension'] == '_V1' ? 'jpg' : $info['extension'];

        $contents = file_get_contents($url);
        $file_name = preg_replace("/[\s_]/", "_", $result['title']) . "-" . str_random(6);
        $file_name_ext = $file_name . "." . $file_ext;

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
