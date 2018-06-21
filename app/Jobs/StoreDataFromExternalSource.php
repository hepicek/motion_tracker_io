<?php

namespace App\Jobs;

use App\Movie;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class StoreDataFromExternalSource implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    private $searchString;
    private $movie;

    public function __construct($searchString)
    {
        $this->searchString = $searchString;
        $this->movie = new Movie;
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
        // dd(count($results));
        $count = count($results) < 20 ? count($results) : 20;
        $stuff = [];

        // function compare_votes($a, $b) {
        //     if ($a['votes'] == $b['votes']) return 0;
        //     return ($a['votes'] < $b['votes']) ? -1 : 1;
        // }


        for ($i = 0; $i < $count; $i++) {
            /* @var $result \Imdb\Title */
            $stuff[] = [
                'id' => $results[$i]->imdbID(),
                'title' => $results[$i]->title(),
                'orig_title' => $results[$i]->orig_title(),
                'year' => $results[$i]->year(),
                'rating' => $results[$i]->rating(),
                'votes_nr' => $results[$i]->votes()
            ];
        }

        usort($stuff, function ($a, $b) {
            if ($a['votes'] == $b['votes']) return 0;
            return ($a['votes'] > $b['votes']) ? -1 : 1;
        });

        foreach ($stuff as $item) {
            $this->movie->create($item);
            $this->movie->save();
        }

        // $stuff[] = $this->externalGetDetails('0094963');
        // for($i = 0; $i < 5; $i++) {
        //     $stuff[] = $this->externalGetDetails($results[$i]->imdbID());
        // }
    }
}
