<?php

namespace App\Http\Controllers;

use App\Jobs\StoreDataFromExternalSource;
use App\Movie;
use App\Person;
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
            ->delay(2);

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
        $result['year'] = $movie->year();
        $result['tagline'] = $movie->tagline();
        $result['rating'] = $movie->rating();
        $result['votes_nr'] = $movie->votes();
        $result['genre'] = $movie->genre();
        $result['type'] = $movie->movietype();
        $result['types'] = $movie->movietypes();
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
        $result['mpaa'] = $movie->mpaa();
        $result['plot'] = $movie->plot();
        $result['sysopsis'] = $movie->synopsis();
        $result['director'] = $movie->director();
        $result['cast'] = $movie->cast();
        $result['writing'] = $movie->writing();
        $result['producer'] = $movie->producer();

        $movie2 = Movie::find($movie_id);

            $name = $result['orig_name'] == "" ? $result['name'] : $result['orig_name'];

            if($result['type'] == 'Movie') {
                if($result['genre'] == "Documentary") {
                    $type = 6;
                } else {
                    $type = 1;
                }                   
            } elseif($result['type'] == 'TV Movie') {
                $type = 2;
            } elseif($result['type'] == 'TV Series') {
                $type = 3;
            } elseif($result['type'] == 'TV Special') {
                $type = 4;
            } elseif($result['type'] == 'TV Mini-Series') {
                $type = 5;
            } elseif($result['type'] == 'Video Game') {
                $type = 7;
            } elseif($result['type'] == 'Video') {
                $type = 8;
            } elseif($result['type'] == 'TV Mini-Series') {
                $type = 8;
            } else {
                $type = 1;
            }

            if($movie2['imdb_id'] == NULL) {
                

                $fill = [
                    'imdb_id' => $result['imdb_id'] + 0,
                    'name' => $name,
                    'year' => $result['year'],
                    'rating' => $result['rating'],
                    'votes_nr' => $result['votes_nr'],
                    'tagline' => $result['tagline'],
                    'seasons' => $result['seasons'],
                    'is_serial' => $result['is_serial'],
                    'storyline' => $result['storyline'],
                    'imdb_movie_type_id' => $type,

                ];
                $newMovie = Movie::create($fill);
            }
            else {
                // $name = $result['orig_name'] == "" ? $result['name'] : $result['orig_name'];
                $movie2['name'] = $name;
                $movie2['year'] = $result['year'];
                $movie2['rating'] = $result['rating'];
                $movie2['votes_nr'] = $result['votes_nr'];
                $movie2['tagline'] = $result['tagline'];
                $movie2['seasons'] = $result['seasons'];
                $movie2['is_serial'] = $result['is_serial'];
                $movie2['storyline'] = $result['storyline'];
                $movie2['imdb_movie_type_id'] = $type;

                $movie2->save();

            }
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
                'tagline' => $results[$i]->tagline(),
                'rating' => $results[$i]->rating(),
                'votes_nr' => $results[$i]->votes(),
                'genre' => $results[$i]->genre(),
                'type' => $results[$i]->movietype(),
                'types' => $results[$i]->movietypes(),
                'seasons' => $results[$i]->seasons(),
                'is_serial' => $results[$i]->is_serial(),
                'episodes' => $results[$i]->episodes(),
                'is_episode' => $results[$i]->episodeTitle(),
                'episodeSeason' => $results[$i]->episodeSeason(),
                'episodeAirDate' => $results[$i]->episodeAirDate(),
                'episodeDetails' => $results[$i]->get_episode_details(),
                'plotoutline' => $results[$i]->plotoutline(),
                'storyline' => $results[$i]->storyline(),
                'photoSmall' => $results[$i]->photo(),
                'photoLarge' => $results[$i]->photo(false),
                'mainPictures' => $results[$i]->mainPictures(),
                'mpaa' => $results[$i]->mpaa(),
                'plot' => $results[$i]->plot(),
                'sysopsis' => $results[$i]->synopsis(),
                'director' => $results[$i]->director(),
                'cast' => $results[$i]->cast(),
                'writing' => $results[$i]->writing(),
                'producer' => $results[$i]->producer(),
            ];
        }        
        $count = 0;
        foreach ($fetchedExternalData as $item) {
            
            $movie = Movie::find($item['imdb_id']);
            $name = $item['orig_name'] == "" ? $item['name'] : $item['orig_name'];
            $img_path = $item['photoLarge'] == "" || $item['photoLarge'] == false ? "" : $this->storeMovieImage($item, $name);

            if($item['type'] == 'Movie') {
                if($item['genre'] == "Documentary") {
                    $type = 6;
                } else {
                    $type = 1;
                }                   
            } elseif($item['type'] == 'TV Movie') {
                $type = 2;
            } elseif($item['type'] == 'TV Series') {
                $type = 3;
            } elseif($item['type'] == 'TV Special') {
                $type = 4;
            } elseif($item['type'] == 'TV Mini-Series') {
                $type = 5;
            } elseif($item['type'] == 'Video Game') {
                $type = 7;
            } elseif($item['type'] == 'Video') {
                $type = 8;
            } elseif($item['type'] == 'TV Mini-Series') {
                $type = 8;
            } else {
                $type = 1;
            }

            if($movie['imdb_id'] == NULL) {
                

                $fill = [
                    'imdb_id' => $item['imdb_id'] + 0,
                    'name' => $name,
                    'year' => $item['year'],
                    'rating' => $item['rating'],
                    'votes_nr' => $item['votes_nr'],
                    'tagline' => $item['tagline'],
                    'seasons' => $item['seasons'],
                    'is_serial' => $item['is_serial'],
                    'storyline' => $item['storyline'],
                    'imdb_movie_type_id' => $type,
                    'imdb_img' => $img_path

                ];
                $newMovie = Movie::create($fill);
            }
            else {
                $movie['name'] = $name;
                $movie['year'] = $item['year'];
                $movie['rating'] = $item['rating'];
                $movie['votes_nr'] = $item['votes_nr'];
                $movie['tagline'] = $item['tagline'];
                $movie['seasons'] = $item['seasons'];
                $movie['is_serial'] = $item['is_serial'];
                $movie['storyline'] = $item['storyline'];
                $movie['imdb_movie_type_id'] = $type;
                $movie['imdb_img'] = $img_path;
                $movie->save();
            }
        

        }
        $this->storeCast($fetchedExternalData);
        return($fetchedExternalData);
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
    protected function storeCast($fetchedExternalData) {
        foreach ($fetchedExternalData as $item) {
            $castCount = count($item['cast']) < 4 ? count($item['cast']) : 4;
            for ($i = 0; $i < $castCount; $i++) {
                $actor= $item['cast'][$i];
                $image = $actor['photo'] == "" || $actor['photo'] == NULL ? "" : $this->storePersonImage($actor, $actor['name']);
                $dbActor = Person::find($actor['imdb']);
                if($dbActor['imdb_id'] == NULL) {
                    $fill = [
                        'imdb_id' => $actor['imdb'],
                        'fullname' => $actor['name'],
                        'person_img' => $image,
                    ];
                    $newPerson = Person::create($fill);
                } else {
                    $dbActor['person_img'] = $image;
                    $dbActor->save();
                    $thisMovie = Movie::find($item['imdb_id']);
                    if(
                        count($thisMovie->Persons()
                        ->where('imdb_id', $dbActor['imdb_id'])
                        ->get()) == 0
                    ) {
                        dd("actor not there");
                    } else {
                        dd("actor there");
                    }
                }
            }
        }
    }
    protected function storeMovieImage($result, $name)
    {

        $url = $result['photoLarge'];
        $info = pathinfo($url);
        
        $file_ext = $info['extension'] == '_V1' ? 'jpg' : $info['extension'];
        
        $contents = file_get_contents($url);
        $file_name = preg_replace("/[^a-z0-9]/i", "_", $name) . "-" . $result['year'];
        $file_name_ext = $file_name . "." . $file_ext;
        $datapath = "img/movie_img/";
        $file = "../storage/app/public/" . $datapath . $file_name_ext;
        file_put_contents($file, $contents);
        
        // $img = Image::make($file);
        // $img_width_300 = 300;
        // $img->resize($img_width_300, null, function ($constraint) {
        //     $constraint->aspectRatio();
        // });
        // $img->save(public_path('../storage/app/public/img/movie_img/' . $file_name . '_' . $img_width_300 . '.' . $file_ext));

        return $datapath . $file_name . '.' . $file_ext;
    }

    protected function storePersonImage($actor, $name)
    {

        $url = $actor['photo'];
        $info = pathinfo($url);
        
        $file_ext = $info['extension'] == '_V1' ? 'jpg' : $info['extension'];
        
        $contents = file_get_contents($url);
        $file_name = preg_replace("/[^a-z0-9]/i", "_", $name) . "-" . $actor['imdb'];
        $file_name_ext = $file_name . "." . $file_ext;
        $datapath = "img/person_img/";
        $file = "../storage/app/public/" . $datapath . $file_name_ext;
        file_put_contents($file, $contents);
        
        // $img = Image::make($file);
        // $img_width_300 = 300;
        // $img->resize($img_width_300, null, function ($constraint) {
        //     $constraint->aspectRatio();
        // });
        // $img->save(public_path('../storage/app/public/img/movie_img/' . $file_name . '_' . $img_width_300 . '.' . $file_ext));

        return $datapath . $file_name . '.' . $file_ext;
    }

    /*    public function delete(Movie $movie)
        {
            $movie->delete();

            return response()->json(null, 204);
        }*/
}
