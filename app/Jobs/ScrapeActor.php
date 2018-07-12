<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Carbon\Carbon;
use DB;
use App\Movie;
use App\Person;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

class ScrapeActor implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $actor;
    protected $movie_id;

    public function __construct($actor, $movie_id)
    {
        $this->actor = $actor;
        $this->movie_id = $movie_id;
    }

    public function handle()
    {
        $item = $this->actor;
        
        $history = DB::table('search_history')->where('imdb_id', '=', $item['imdb'])->where('type', '=', 1)->get()->toArray();
        $date = Carbon::now()->subDays(180)->toDateTimeString(); 
        if (count($history) > 0 && $history[0]->updated_at > $date) {
            return;
        }
        $image = $item['photo'] == "" || $item['photo'] == NULL ? "" : $this->storePersonImage($item);

        $dbActor = Person::find($item['imdb']);

        if ($dbActor['imdb_id'] == NULL) {
            $fill = [
                'imdb_id' => $item['imdb'],
                'fullname' => $item['name'],
                'person_img' => $image,
            ];
            $newPerson = Person::create($fill);
            $dbActor = Person::find($item['imdb']);

            $this->addPersonToMovie($item, $dbActor);

        } else {
            $dbActor['person_img'] = $image;
            $dbActor->save();
            $thisMovie = Movie::find($this->movie_id);
            if (
                count($thisMovie->Persons()
                    ->where('imdb_id', $dbActor['imdb_id'])
                    ->get()) == 0
            ) {
                $this->addPersonToMovie($item, $dbActor);
            }
        }
        if (!count($history)) {
            DB::table('search_history')->insert(['imdb_id' => $item['imdb'], 'type' => 1,'created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')]);
        } else {
            DB::table('search_history')
                ->where('imdb_id', '=', $item['imdb'])
                ->where('type', '=', 1)
                ->update(['updated_at' => date('Y-m-d H:i:s')]);

        }
        
    }
    protected function addPersonToMovie($item, $dbActor)
    {
        DB::table('imdb_movie_has_person')->insert(
            [
                'imdb_movie_id' => $this->movie_id,
                'imdb_person_id' => $dbActor['imdb_id'],
                'imdb_position_id' => 254,
                'description' => $item['role'],
                'priority' => 1
            ]
        );
    }
    protected function storePersonImage($actor)
    {

        $url = $actor['photo'];
        $info = pathinfo($url);

        $file_ext = $info['extension'] == '_V1' ? 'jpg' : $info['extension'];

        $contents = file_get_contents($url);
        $file_name = preg_replace("/[^a-z0-9]/i", "_", $actor['name']) . "-" . $actor['imdb'];
        $file_name_ext = $file_name . "." . $file_ext;
        $datapath = "img/person_img/";
        $file = "./storage/app/public/" . $datapath . $file_name_ext;
        $img = Image::make($url);
        // dd($img);
        $img_width_300 = 300;
        $img->resize($img_width_300, null, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save('./storage/app/public/img/movie_img/' . $file_name_ext);
        // Storage::disk('s3')->put("public/img/person_img/" . $file_name_ext, $contents, 'public');

        return $datapath . $file_name . '.' . $file_ext;
    }
}
