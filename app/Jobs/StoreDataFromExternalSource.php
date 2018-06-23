<?php

namespace App\Jobs;

use App\Movie;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;
use Intervention\Image\ImageManagerStatic as Image;

class StoreDataFromExternalSource implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $searchString;

    public function __construct($searchString)
    {
        $this->searchString = $searchString;
    }

    public function handle()
    {
        $search = new \Imdb\TitleSearch(); // Optional $config parameter
        $results = $search->search($this->searchString, array(\Imdb\TitleSearch::MOVIE));
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
        
        foreach ($fetchedExternalData as $item) {
            
            $movie = Movie::find($item['imdb_id']);
            $name = $item['orig_name'] == "" ? $item['name'] : $item['orig_name'];
            $img_path = $item['photoLarge'] == "" || $item['photoLarge'] == false ? "" : $this->resizeAndStoreImage($item, $name, $count);

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


    }
    protected function resizeAndStoreImage($result, $name, $count)
    {

        $url = $result['photoLarge'];
        $info = pathinfo($url);
        
        $file_ext = $info['extension'] == '_V1' ? 'jpg' : $info['extension'];
        
        $contents = file_get_contents($url);
        $file_name = preg_replace("/[^a-z0-9]/i", "_", $name) . "-" . $result['year'];
        $file_name_ext = $file_name . "." . $file_ext;
        $datapath = "img/movie_img/";
        $file = "./storage/app/public/" . $datapath . $file_name_ext;
        file_put_contents($file, $contents);
        
        $img = Image::make($file);
        $img_width_300 = 300;
        $img->resize($img_width_300, null, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save('./storage/app/public/img/movie_img/' . $file_name . '_' . $img_width_300 . '.' . $file_ext);

        return $datapath . $file_name . '_' . $img_width_300 . '.' . $file_ext;
    }
}