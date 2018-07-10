<?php

namespace App\Jobs;

use App\Movie;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ScrapeMovie implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $result;

    public function __construct($result)
    {
        $this->result = $result;
    }

    public function handle()
    {
        $result_imdb_id = $this->result->imdbID() + 0;
        $history = DB::table('search_history')->where('imdb_id', '=', $result_imdb_id)->where('type', '=', 0)->get()->toArray();
        $date = Carbon::now()->subDays(180)->toDateTimeString();
        if (count($history) > 0 && $history[0]->updated_at > $date) {
            return;

        }
            $item = [
                'imdb_id' => $this->result->imdbID() + 0,
                'name' => $this->result->title(),
                'orig_name' => $this->result->orig_title(),
                'year' => $this->result->year(),
                'tagline' => $this->result->tagline(),
                'rating' => $this->result->rating(),
                'votes_nr' => $this->result->votes(),
                'genre' => $this->result->genre(),
                'type' => $this->result->movietype(),
                'runTime' => $this->result->runtime(),
                'releaseInfo' => $this->result->releaseInfo(),
                // 'types' => $this->result->movietypes(),
                'seasons' => $this->result->seasons(),
                'is_serial' => $this->result->is_serial(),
                // 'episodes' => $this->result->episodes(),
                // 'is_episode' => $this->result->episodeTitle(),
                // 'episodeSeason' => $this->result->episodeSeason(),
                // 'episodeAirDate' => $this->result->episodeAirDate(),
                // 'episodeDetails' => $this->result->get_episode_details(),
                // 'plotoutline' => $this->result->plotoutline(),
                'storyline' => $this->result->storyline(),
                'photoSmall' => $this->result->photo(),
                'photoLarge' => $this->result->photo(false),
                // 'mainPictures' => $this->result->mainPictures(),
                // 'mpaa' => $this->result->mpaa(),
                // 'plot' => $this->result->plot(),
                // 'sysopsis' => $this->result->synopsis(),
                'director' => $this->result->director(),
                'cast' => $this->result->cast(),
                // 'writing' => $this->result->writing(),
                // 'producer' => $this->result->producer(),
            ];
            $movie = Movie::find($item['imdb_id']);
            $name = $item['orig_name'] == "" ? $item['name'] : $item['orig_name'];
            $img_path = $item['photoLarge'] == "" || $item['photoLarge'] == false ? "" : $this->storeMovieImage($item, $name);
            $releaseDate = "";
            $releaseLength = count($item['releaseInfo']);
            for ($i = 0; $i < $releaseLength; $i++) {

                if ($item['releaseInfo'][$i]['country'] == 'USA') {
                    $releaseDate = $item['releaseInfo'][$i]['day'] . ". " . $item['releaseInfo'][$i]['mon'] . ". " . $item['releaseInfo'][$i]['year'];
                    break;
                }
            }
            $type = $this->setType($item['type'], $item);


            if ($movie['imdb_id'] == NULL) {
                $newMovie = $this->newMovie($name, $img_path, $type, $item, $releaseDate);
            } else {
                $this->saveMovie($name, $img_path, $type, $item, $movie, $releaseDate);
            }

        
        if (!count($history)) {
            DB::table('search_history')->insert(['imdb_id' => $result_imdb_id, 'type' => 0,'created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')]);
        } else {
            DB::table('search_history')
                ->where('imdb_id', '=', $result_imdb_id)
                ->where('type', '=', 0)
                ->update(['updated_at' => date('Y-m-d H:i:s')]);

        }
        foreach($item['cast'] as $actor) {
            ScrapeActor::dispatch($actor, $result_imdb_id);
        }
        

    }

    protected function storeMovieImage($result, $name)
    {

        $url = $result['photoSmall'];
        $info = pathinfo($url);

        $file_ext = $info['extension'] == '_V1' ? 'jpg' : $info['extension'];

        $contents = file_get_contents($url);
        $file_name = preg_replace("/[^a-z0-9]/i", "_", $name) . "-" . $result['year'];
        $file_name_ext = $file_name . "." . $file_ext;
        $datapath = "img/movie_img/";
        $file = "./storage/app/public/" . $datapath . $file_name_ext;
        Storage::disk('s3')->put("public/img/movie_img/" . $file_name_ext, $contents, 'public');
       // file_put_contents($file, $contents);

        return $datapath . $file_name . '.' . $file_ext;
    }
    protected function setType($input, $item)
    {
        if ($input == 'Movie') {
            if ($item['genre'] == "Documentary") {
                $type = 6;
            } else {
                $type = 1;
            }
        } elseif ($input == 'TV Movie') {
            $type = 2;
        } elseif ($input == 'TV Series') {
            $type = 3;
        } elseif ($input == 'TV Special') {
            $type = 4;
        } elseif ($input == 'TV Mini-Series') {
            $type = 5;
        } elseif ($input == 'Video Game') {
            $type = 7;
        } elseif ($input == 'Video') {
            $type = 8;
        } elseif ($input == 'TV Mini-Series') {
            $type = 8;
        } else {
            $type = 1;
        }
        return $type;
    }

    protected function newMovie($name, $img_path, $type, $item, $releaseDate)
    {
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
            'runTime' => $item['runTime'],
            'releaseInfo' => $releaseDate,
            'imdb_movie_type_id' => $type,
            'imdb_img' => $img_path
        ];
        return Movie::create($fill);
    }

    protected function saveMovie($name, $img_path, $type, $item, $movie, $releaseDate)
    {
        $movie['name'] = $name;
        $movie['year'] = $item['year'];
        $movie['rating'] = $item['rating'];
        $movie['votes_nr'] = $item['votes_nr'];
        $movie['tagline'] = $item['tagline'];
        $movie['seasons'] = $item['seasons'];
        $movie['is_serial'] = $item['is_serial'];
        $movie['storyline'] = $item['storyline'];
        $movie['runTime'] = $item['runTime'];
        $movie['releaseInfo'] = $releaseDate;
        $movie['imdb_movie_type_id'] = $type;
        $movie['imdb_img'] = $img_path;
        $movie->save();
    }
}
