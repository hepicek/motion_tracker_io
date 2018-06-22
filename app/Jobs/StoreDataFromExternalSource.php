<?php

namespace App\Jobs;

use App\Movie;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;

class StoreDataFromExternalSource implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    private $searchString;

    public function __construct($searchString)
    {
        $this->searchString = $searchString;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
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

        // $stuff[] = $this->externalGetDetails('0094963');
        // for($i = 0; $i < 5; $i++) {
        //     $stuff[] = $this->externalGetDetails($results[$i]->imdbID());
        // }

    }
}
