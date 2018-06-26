<?php

namespace App\Jobs;

use App\Movie;
use App\Person;
use DB;
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
        ini_set('memory_limit', '256M');
        set_time_limit(240);
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
                'runTime' => $results[$i]->runtime(),
                'releaseInfo' => $results[$i]->releaseInfo(),
                // 'types' => $results[$i]->movietypes(),
                'seasons' => $results[$i]->seasons(),
                'is_serial' => $results[$i]->is_serial(),
                // 'episodes' => $results[$i]->episodes(),
                // 'is_episode' => $results[$i]->episodeTitle(),
                // 'episodeSeason' => $results[$i]->episodeSeason(),
                // 'episodeAirDate' => $results[$i]->episodeAirDate(),
                // 'episodeDetails' => $results[$i]->get_episode_details(),
                // 'plotoutline' => $results[$i]->plotoutline(),
                'storyline' => $results[$i]->storyline(),
                'photoSmall' => $results[$i]->photo(),
                'photoLarge' => $results[$i]->photo(false),
                // 'mainPictures' => $results[$i]->mainPictures(),
                // 'mpaa' => $results[$i]->mpaa(),
                // 'plot' => $results[$i]->plot(),
                // 'sysopsis' => $results[$i]->synopsis(),
                'director' => $results[$i]->director(),
                'cast' => $results[$i]->cast(),
                // 'writing' => $results[$i]->writing(),
                // 'producer' => $results[$i]->producer(),
            ];
        }

        foreach ($fetchedExternalData as $item) {

            $movie = Movie::find($item['imdb_id']);
            $name = $item['orig_name'] == "" ? $item['name'] : $item['orig_name'];
            $img_path = $item['photoLarge'] == "" || $item['photoLarge'] == false ? "" : $this->storeMovieImage($item, $name);

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

        }

        $this->storeCast($fetchedExternalData);

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
        file_put_contents($file, $contents);

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
        $file = "./storage/app/public/" . $datapath . $file_name_ext;
        file_put_contents($file, $contents);

        return $datapath . $file_name . '.' . $file_ext;
    }

    protected function storeCast($fetchedExternalData)
    {
        foreach ($fetchedExternalData as $item) {
            $castCount = count($item['cast']) < 4 ? count($item['cast']) : 4;
            for ($i = 0; $i < $castCount; $i++) {

                $actor = $item['cast'][$i];

                $image = $actor['photo'] == "" || $actor['photo'] == NULL ? "" : $this->storePersonImage($actor, $actor['name']);

                $dbActor = Person::find($actor['imdb']);
                if ($dbActor['imdb_id'] == NULL) {
                    $fill = [
                        'imdb_id' => $actor['imdb'],
                        'fullname' => $actor['name'],
                        'person_img' => $image,
                    ];
                    $newPerson = Person::create($fill);
                    $dbActor = Person::find($actor['imdb']);
                    // $thisMovie = Movie::find($item['imdb_id']);

                    $this->addPersonToMovie($item, $dbActor, $actor);

                } else {
                    $dbActor['person_img'] = $image;
                    $dbActor->save();
                    $thisMovie = Movie::find($item['imdb_id']);
                    if (
                        count($thisMovie->Persons()
                            ->where('imdb_id', $dbActor['imdb_id'])
                            ->get()) == 0
                    ) {
                        $this->addPersonToMovie($item, $dbActor, $actor);
                    }
                }
            }
        }
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

    protected function addPersonToMovie($item, $dbActor, $actor)
    {
        DB::table('imdb_movie_has_person')->insert(
            [
                'imdb_movie_id' => $item['imdb_id'],
                'imdb_person_id' => $dbActor['imdb_id'],
                'imdb_position_id' => 254,
                'description' => $actor['role'],
                'priority' => 1
            ]
        );
    }
}
